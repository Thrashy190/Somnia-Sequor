# One item per dream. Partition key groups dreams by month (keeps partitions small and lets
# you list a month in order); the sort key starts with the UTC timestamp, so items come back
# chronologically. The permanent copy lives in S3 (see archive.tf); the table only keeps recent dreams.
resource "aws_dynamodb_table" "dreams" {
  name         = "${local.name}-dreams"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "pk"
  range_key = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  # Every new item is pushed to the archiver Lambda through this stream
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"

  # Items carry an `expires_at` epoch; DynamoDB deletes them for free once it passes
  # (usually within hours, at most ~48h late)
  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  deletion_protection_enabled = var.dreams_table_deletion_protection
}
