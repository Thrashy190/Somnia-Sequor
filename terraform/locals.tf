locals {
  name = var.project_name

  allowed_origins = distinct(concat(var.allowed_origins, var.extra_allowed_origins))

  # With sender == recipient this collapses to a single identity
  email_identities = toset([var.sender_email, var.recipient_email])

  api_route = "POST /dreams"
}
