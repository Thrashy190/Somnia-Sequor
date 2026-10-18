variable "allowed_origins" {
  description = "Origins (scheme + host, no trailing slash) allowed to call the API: production domain and Cloudflare Pages test domain"
  type        = list(string)
  default = [
    "https://www.somniasequor.com",
    "https://somniasequor.com",
    "https://somnia-sequor.pages.dev",
  ]

  validation {
    condition     = alltrue([for origin in var.allowed_origins : can(regex("^https?://[^/]+$", origin))])
    error_message = "Each origin must look like https://example.com (no path, no trailing slash)."
  }
}

variable "archive_batching_window_seconds" {
  description = "How long the archiver waits to group new dreams into one S3 file (0-300). Longer means fewer, bigger files"
  type        = number
  default     = 300

  validation {
    condition     = var.archive_batching_window_seconds >= 0 && var.archive_batching_window_seconds <= 300
    error_message = "Must be between 0 and 300 seconds."
  }
}

variable "aws_region" {
  description = "AWS region for every resource. SES identities are regional, so Lambda and SES must share it"
  type        = string
  default     = "us-east-1"
}

variable "dreams_ttl_days" {
  description = "Days a dream stays in DynamoDB before it expires. Every dream is already archived in S3 when it is written"
  type        = number
  default     = 15

  validation {
    condition     = var.dreams_ttl_days >= 1
    error_message = "Must be at least 1 day."
  }
}

variable "dreams_table_deletion_protection" {
  description = "Block deletion of the dreams table (including terraform destroy). Turn off only to tear everything down on purpose"
  type        = bool
  default     = true
}

variable "extra_allowed_origins" {
  description = "Additional origins for local development, e.g. [\"http://localhost:4321\"]. Leave empty in production"
  type        = list(string)
  default     = []
}

variable "lambda_memory_mb" {
  description = "Memory for the dream-submission Lambda"
  type        = number
  default     = 128
}

variable "lambda_timeout_seconds" {
  description = "Timeout for the dream-submission Lambda"
  type        = number
  default     = 10
}

variable "log_retention_days" {
  description = "Days to keep CloudWatch logs for the Lambda and the API; older events are deleted automatically"
  type        = number
  default     = 7

  validation {
    condition     = contains([1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365], var.log_retention_days)
    error_message = "CloudWatch only accepts 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180 or 365 days."
  }
}

variable "project_name" {
  description = "Prefix used to name every resource"
  type        = string
  default     = "somnia-sequor"
}

variable "recipient_email" {
  description = "Mailbox that receives the submitted dreams. In the SES sandbox it must be a verified identity too"
  type        = string
  default     = "somniasequor@gmail.com"
}

variable "sender_email" {
  description = "Address SES sends from (verified identity)"
  type        = string
  default     = "somniasequor@gmail.com"
}

variable "throttle_burst_limit" {
  description = "Maximum burst of concurrent requests the API accepts"
  type        = number
  default     = 10
}

variable "throttle_rate_limit" {
  description = "Steady-state requests per second the API accepts"
  type        = number
  default     = 5
}
