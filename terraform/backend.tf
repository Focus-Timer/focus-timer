# State bucket for storing and sharing terraform state
terraform {
  backend "s3" {
    bucket  = "focus-timer-bucket-1455"
    key     = "terraform-state/terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}
