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

## Run-instructions
### Running Single Page Application Web app
```sh
cd app
npm install
npm run start
```

### Running local docker production environment
```sh
cd app
docker compose down
sudo docker compose up --build -d
docker compose down #To terminate
```

### Running local docker testing environment
Ensure that you have setup docker and docker-compose on your local machine in wsl 
```sh
```
Retrieve your wsl endpoint
```.sh
wsl hostname -I
```
Define a .env file like so in the app directory
```.env
PORT_LOCAL=80
MODE=debug
DB_ENDPOINT={wsl endpoint}
DB_PASSWORD=StrongPassword123*
DB_NAME=FocusTimer
DB_USERNAME=db_user
DB_PORT=1433

```
Run the following commands
```sh
cd app
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
