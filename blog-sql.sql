DROP DATABASE IF EXISTS `blog_server`;

CREATE DATABASE `blog_server`;

USE `blog_server`;

-- 创建数据表
CREATE TABLE `article` (
  -- 文章的 ID 属于自增
  `id` INT(11) AUTO_INCREMENT,
  -- 文章标题
  `title` VARCHAR(225) NOT NULL,
  -- 文章作者
  `author` CHAR(32) NOT NULL,
  -- 文章简单的描述
  `description` VARCHAR(225) NOT NULL,
  -- 文章连接地址
  `href` CHAR(32) NOT NULL,
  -- 文章生成的 html 代码片段
  `html` MEDIUMTEXT NOT NULL,
  -- 文章初始的 Markdown 代码片段
  `md` MEDIUMTEXT NOT NULL,
  -- 文章的标签
  `tags` CHAR(128) NOT NULL,
  -- 文章创建时间
  `creationTime` CHAR(32) NOT NULL,
  -- 文章更新时间
  `updateTime` CHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8;

-- 创建用户表
CREATE TABLE `user` (
  `id` INT(11) KEY AUTO_INCREMENT,
  `name` CHAR(32) NOT NULL,
  `password` CHAR(16) NOT NULL,
  `status` INT(1) NOT NULL
) CHARSET=utf8;


-- 测试功能
CREATE TABLE `test` (
  `id` INT(11) KEY AUTO_INCREMENT,
  `name` CHAR(32) NOT NULL,
  `tags` VARCHAR(32) NOT NULL
) CHARSET=utf8;
