resource "aws_security_group" "database_sg" {
  name_prefix = "database-sg"
  vpc_id = module.vpc.vpc_id
}

resource "aws_security_group_rule" "database_ingress_ssh" {
  type        = "ingress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.database_sg.id
}

resource "aws_security_group_rule" "databse_ingress" {
  type        = "ingress"
  from_port   = 3306
  to_port     = 3306
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.database_sg.id
}

resource "aws_security_group_rule" "database_egress_all" {
  type             = "egress"
  from_port        = 0
  to_port          = 0
  protocol         = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.database_sg.id
}