-- sqlite3 nextvm.db 打开数据库
-- .tables 查看数据库所有表
-- DROP TABLE user_info;
-- .schema user_info 查看表结构
CREATE TABLE user_info(
    id INTEGER PRIMARY KEY     NOT NULL,
    key            TEXT    NOT NULL,
    name           TEXT    NOT NULL,
    salary         INT     NOT NULL,
    count          INT     NOT NULL,
    stars          INT     NOT NULL,
    ang            INT     NOT NULL
);
INSERT INTO user_info (key, name, salary, count, stars, ang) VALUES (?,?,?,?,?,?);
SELECT * FROM user_info;
SELECT stars, ang, count(1) as count FROM user_info GROUP BY stars, ang;
