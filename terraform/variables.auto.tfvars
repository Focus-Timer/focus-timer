mandatory_tags = {
  owner         = "bryce.grahn@bbd.co.za"
  created-using = "terraform"
}

account_number = "574836245203"

repo = "Focus-Timer/focus-timer"

region = "eu-west-1"

project_name = "focus-timer"

vpc_public_subnets = [
  {
    cidr_block = "15.0.1.0/24"
    az         = "eu-west-1a"
  },
  {
    cidr_block = "15.0.3.0/24"
    az         = "eu-west-1b"
}]

vpc_private_subnets = [
  {
    cidr_block = "15.0.5.0/24"
    az         = "eu-west-1a"
  },
  {
    cidr_block = "15.0.7.0/24"
    az         = "eu-west-1b"
}]

db_port = 1433

eb_port_web = 80


