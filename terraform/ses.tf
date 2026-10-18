# Verifying an email identity makes AWS send a confirmation link to that mailbox.
# Open it once after `terraform apply`; until then the identity stays "pending".
resource "aws_sesv2_email_identity" "address" {
  for_each = local.email_identities

  email_identity = each.key
}
