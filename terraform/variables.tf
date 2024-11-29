variable "aws_account_id" {
  description = 559050247232
  default = "559050247232"
}

variable "aws_region" {
  description = "The AWS region to deploy resources"
  default     = "us-east-1"
}

variable "image_tag" {
  description = "The Docker image tag for the container"
  default     = "latest"
}

# variable "subnets" {
#   description = "The subnets for the ECS service"
#   type        = list(string)
# }

# variable "vpc_id" {
#   description = "The VPC ID for the ECS service"
# }

variable "db_username" {
  description = "The username for the database"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "The password for the database"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "The name of the database"
  type        = string
}

variable "db_port" {
  description = "The port for the database"
  type        = string
  default     = "5432"
}

variable "db_instance_class" {
  description = "The instance class for RDS"
  type        = string
  default     = "db.t2.micro"
}

