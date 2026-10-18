resource "aws_apigatewayv2_api" "main" {
  name          = "${local.name}-api"
  description   = "Public API for the Somnia Sequor dream form"
  protocol_type = "HTTP"

  # Browsers only let pages from these origins read the response. The Lambda
  # also rejects any other Origin, so non-browser callers get a 403 too.
  cors_configuration {
    allow_origins = local.allowed_origins
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

resource "aws_apigatewayv2_integration" "submit_dream" {
  api_id                 = aws_apigatewayv2_api.main.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.submit_dream.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "submit_dream" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = local.api_route
  target    = "integrations/${aws_apigatewayv2_integration.submit_dream.id}"
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/aws/apigateway/${local.name}-api"
  retention_in_days = var.log_retention_days
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = var.throttle_burst_limit
    throttling_rate_limit  = var.throttle_rate_limit
  }

  # Request metadata only: the body (the dream) is never logged
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      requestTime      = "$context.requestTime"
      routeKey         = "$context.routeKey"
      status           = "$context.status"
      responseLatency  = "$context.responseLatency"
      integrationError = "$context.integrationErrorMessage"
    })
  }
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.submit_dream.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}
