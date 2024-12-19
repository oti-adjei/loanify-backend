output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.main.name
}

output "task_definition_arn" {
  value = aws_ecs_task_definition.main.arn
}

# output "db_url" {
#   description = "The connection URL for the RDS database"
#   value       = "postgres://${var.db_username}:${var.db_password}@${aws_db_instance.loanify_db.endpoint}:${aws_db_instance.loanify_db.port}/${var.db_name}"
# }
