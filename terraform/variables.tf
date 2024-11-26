variable "aws_account_id" {
  description = "Your AWS Account ID"
}

variable "aws_region" {
  description = "The AWS region to deploy resources"
  default     = "us-east-1"
}

variable "image_tag" {
  description = "The Docker image tag for the container"
  default     = "latest"
}

variable "subnets" {
  description = "The subnets for the ECS service"
  type        = list(string)
}

variable "vpc_id" {
  description = "The VPC ID for the ECS service"
}
