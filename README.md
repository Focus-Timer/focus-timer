# Project
Hocus pocus, let's help you focus

## Sections
- [SQL Migrations instructions](#SQL-Migrations-instructions)
- [Postman](#Postman)
- [Run-instructions](#Run-instrutions)
- [Access the database using MS SQL Server studio](#database-access)

## SQL Migrations instructions
- upload your sql to the migrations folder as a new file with this naming convention V{year}{month}{day}{24hour}{min}__{description}.sql

## Postman
- Launch postman and import postman folder 

## OPENSSL
https://slproweb.com/download/Win64OpenSSL-3_2_1.exe

## Run-instructions

### Running local docker testing environment
i. Ensure that you have setup docker and docker-compose on your local machine in wsl 
```sh
https://cuteprogramming.blog/2023/05/21/using-docker-and-kubernetes-without-docker-desktop-on-windows-11/
```
ii. Trust the server cert
```
Double-click the certificate
Click on the Install Certificate
Select Current User
And place the cert in Trusted Root Certification Authorities
Run in FireFox
```
iii. Open wsl
iv. Run the following commands
```sh
cd app
npm install
sudo docker compose -f ./docker-compose.local.yml up --build -d
docker compose -f ./docker-compose.local.yml down #To terminate
```

## Access the database using MS SQL Server studio
- Open ms sql sever studio
- Set server type to database engine
- Insert {focus-timer-db.cltqgxhlp0db.eu-west-1.rds.amazonaws.com} as the server name
- Select SQL sever authentication
- login as admin
- Password: 

## ERD Design
