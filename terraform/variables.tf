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

variable "aws_region" {
  description = "AWS region for every resource. SES identities are regional, so Lambda and SES must share it"
  type        = string
  default     = "us-east-1"
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
  description = "Days to keep CloudWatch logs for the Lambda and the API"
  type        = number
  default     = 30
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
