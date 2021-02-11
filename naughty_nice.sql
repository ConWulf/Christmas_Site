use christmas_db;

create table people(
    id int unsigned not null auto_increment,
    first_name varchar(50) default 'not given',
    last_name varchar(80) not null,
    age int unsigned,
    birthday date not null,
    nice tinyint,
    wishlist text,
    primary key (id)
);

-- friends <-> user: one to many
-- friends table
-- posts <--> users
-- posts table
-- upload media
-- media tables
-- tables for likes
-- visibility