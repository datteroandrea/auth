drop database if exists testdb;
create database testdb;
use testdb;
create table Users (
    id integer primary key auto_increment,
    username varchar(255) not null,
    birthDate timestamp not null,
    email varchar(255) not null unique,
    userpass varchar(255) not null
);
