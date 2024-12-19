
# Purpose: Configures the S3 bucket as the Terraform backend to store the state file remotely.
# Changes: Ensure the bucket name and key values match your setup.

terraform {
  backend "s3" {
    bucket         = "loanify-terraform-state-bucket" # Replace with your bucket name
    key            = "s3-github-actions/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
