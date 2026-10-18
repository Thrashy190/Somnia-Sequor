output "api_url" {
  description = "Full URL the form must POST to"
  value       = "${aws_apigatewayv2_api.main.api_endpoint}/dreams"
}

output "lambda_function_name" {
  description = "Name of the dream-submission Lambda"
  value       = aws_lambda_function.submit_dream.function_name
}

output "ses_identities_to_verify" {
  description = "Mailboxes that must click the AWS verification link before mail can be sent"
  value       = sort(keys(aws_sesv2_email_identity.address))
}
