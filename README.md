# Node.js | Express.js | MySQL

## Schema
```
users:{
    id: int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email: varchar(40),
    name: varchar(40),
}

interviews:{
    id: int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email1: varchar(40),
    email2: varchar(40),
    startTime: varchar(40), //can also use DATE field
    endTime: varchar(40), //can also use DATE field
}
```

## Initial Queries for Setup
```
1. Create Interviews Table
create table interviews(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   email1 varchar(40),
   email2 varchar(40),
   startTime varchar(40),
   endTime varchar(40)
);

2. Create Users Table
create table users(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   email varchar(40),
   name varchar(40)
);

3. Insert Users
insert into users(email,name) values('Yashwant','yashsn2127@gmail.com');
insert into users(email,name) values('Karan','yashsn218397950022@gmail.com@gmail.com');
insert into users(email,name) values('Pranshu','fydeosonly@gmail.com@gmail.com');
```
