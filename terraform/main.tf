provider "aws" {
  region = "us-east-1"
}

# Create an ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "loanify-ecs-cluster"

  setting {
    name  = "containerInsights"
    value = true
  }
}

# Create an IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Create an ECS Task Definition
resource "aws_ecs_task_definition" "main" {
  family                   = "my-task-family"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions    = jsonencode([
    {
      name      = "my-container"
      image     = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/loanify-repo:${var.image_tag}"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
}

# Create an ECS Service
resource "aws_ecs_service" "main" {
  name            = "my-ecs-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnets
    security_groups = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }
}

# Security Group for ECS Service
resource "aws_security_group" "ecs_service" {
  name        = "ecs_service_sg"
  description = "Security group for ECS service"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP traffic from the internet"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS traffic from the internet"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic to the internet"
  }
}

# Create an Application Load Balancer (ALB)
resource "aws_lb" "main" {
  name               = "loanify-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ecs_service.id]
  subnets            = var.subnets
  enable_deletion_protection = false
}

# Create a Target Group for ALB
resource "aws_lb_target_group" "main" {
  name     = "loanify-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

# Create a Listener for ALB
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}


# Create a WAF Web ACL
resource "aws_wafv2_web_acl" "main" {
  name        = "loanify-web-acl"
  scope       = "REGIONAL"  # Use "CLOUDFRONT" for global WAF if using CloudFront
  description = "Web ACL for my Express API"
  
  default_action {
    allow {}
  }

  rule {
    name     = "SQLInjectionProtection"
    priority = 0
    action {
      block {}
    }
    statement {
      managed_rule_group_statement {
      name           = "AWSManagedRulesSQLiRuleSet"
      vendor_name    = "AWS"
    }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name               = "SQLInjectionProtectionMetric"
      sampled_requests_enabled  = true
    }
  }

  rule {
    name     = "XSSProtection"
    priority = 1
    action {
      block {}
    }
    statement {
      managed_rule_group_statement {
      name           = "AWSManagedRulesSQLiRuleSet"
      vendor_name    = "AWS"
    }

    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name               = "XSSProtectionMetric"
      sampled_requests_enabled  = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name               = "loanify-metric"
    sampled_requests_enabled  = true
  }
}



# Associate the WAF Web ACL with the ALB
resource "aws_wafv2_web_acl_association" "alb_association" {
  resource_arn = aws_lb.main.arn
  web_acl_arn  = aws_wafv2_web_acl.main.arn
}
