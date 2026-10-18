data "archive_file" "archive_dreams" {
  type        = "zip"
  source_dir  = "${path.module}/src/archive"
  output_path = "${path.module}/.build/archive_dreams.zip"
  excludes    = ["__pycache__", "*.pyc"]
}

resource "aws_cloudwatch_log_group" "archive" {
  name              = "/aws/lambda/${local.name}-archive-dreams"
  retention_in_days = var.log_retention_days
}

resource "aws_iam_role" "archive" {
  name               = "${local.name}-archive-dreams"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "archive" {
  statement {
    sid       = "WriteLogs"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.archive.arn}:*"]
  }

  statement {
    sid       = "ReadDreamsStream"
    actions   = ["dynamodb:DescribeStream", "dynamodb:GetRecords", "dynamodb:GetShardIterator", "dynamodb:ListStreams"]
    resources = [aws_dynamodb_table.dreams.stream_arn]
  }

  statement {
    sid       = "WriteArchive"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.archive.arn}/dreams/*"]
  }
}

resource "aws_iam_role_policy" "archive" {
  name   = "archive-dreams"
  role   = aws_iam_role.archive.id
  policy = data.aws_iam_policy_document.archive.json
}

resource "aws_lambda_function" "archive_dreams" {
  function_name = "${local.name}-archive-dreams"
  description   = "Copies every new dream from the DynamoDB stream to S3 as JSON Lines"
  role          = aws_iam_role.archive.arn

  runtime       = "python3.13"
  architectures = ["arm64"]
  handler       = "handler.handler"
  memory_size   = 128
  timeout       = 30

  filename         = data.archive_file.archive_dreams.output_path
  source_code_hash = data.archive_file.archive_dreams.output_base64sha256

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.archive.id
    }
  }

  depends_on = [aws_iam_role_policy.archive, aws_cloudwatch_log_group.archive]
}

resource "aws_lambda_event_source_mapping" "archive_dreams" {
  event_source_arn  = aws_dynamodb_table.dreams.stream_arn
  function_name     = aws_lambda_function.archive_dreams.arn
  starting_position = "TRIM_HORIZON"

  batch_size                         = 100
  maximum_batching_window_in_seconds = var.archive_batching_window_seconds

  # A failing batch is split to isolate the bad record; retries continue until the stream
  # record expires (24h), so a transient S3 error never drops a dream.
  bisect_batch_on_function_error = true
  maximum_retry_attempts         = -1

  # Only new dreams. Without this, the TTL deletions would also reach the Lambda (REMOVE events)
  filter_criteria {
    filter {
      pattern = jsonencode({ eventName = ["INSERT"] })
    }
  }
}
