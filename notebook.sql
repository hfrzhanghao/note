-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-08-16 11:16:16
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notebook`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `article` text CHARACTER SET utf8 NOT NULL,
  `note_belong` int(11) NOT NULL,
  `article_date` bigint(20) NOT NULL,
  `state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `article`, `note_belong`, `article_date`, `state`) VALUES
(1, 'hhhhh', '<p>这是一行文字</p><p>这是一行文字</p><p>这是一行文字</p><p>这是一行文字，这是一行文字，<span style=\"color:#01b468\">这是一行文字</span></p>', 4, 123456, 0);

-- --------------------------------------------------------

--
-- 表的结构 `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `note_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `note_des` text CHARACTER SET utf8,
  `notebook_belong` int(11) NOT NULL,
  `note_date` bigint(20) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `article` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `note`
--

INSERT INTO `note` (`id`, `note_name`, `note_des`, `notebook_belong`, `note_date`, `state`, `article`) VALUES
(51, '人格分裂后是怎样一种感受', NULL, 57, 1502870191000, 1, '<h5></h5><h1></h1><h1>史上最短的时间简史</h1><p>如果138亿年的宇宙历史压缩到一年，人类出现在哪个月？5月？9月？</p><p>著名科普作者、天文学家卡尔﹒萨根在《伊甸园的龙》中提出的宇宙年历，会让你惊掉下巴。</p><p>让我们一起来看一看，宇宙、地球和人类的大事件，都出现在什么时刻吧！</p><p>如果把138亿年的历史压缩到1年里，很明显时间加速了。在这个日历里，日历的每一秒相当于438年，日历上的一小时相当于158万年，日历上的一天相当于3780万年。</p><p>在这个宇宙年历里，一个人活到80岁，宇宙才过去了0.18秒。</p><p><img style=\"max-width:100%;\" src=\"https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=36c639db17950a7b756046c03fe14eef/50da81cb39dbb6fd28a887cb0324ab18962b376f.jpg\"><br></p><p><br></p>'),
(52, '史上最短的时间简史', NULL, 57, 1502870407000, 0, '<h3>史上最短的时间简史</h3><p><img style=\"max-width:100%;\" src=\"https://timgsa.baidu.com/timg?image&quality=80&amp;size=b9999_10000&amp;sec=1502881303945&amp;di=59937e09677f7a9a8f0c86db09968745&amp;imgtype=0&amp;src=http%3A%2F%2Fatt.x2.hiapk.com%2Fforum%2F201302%2F08%2F134645cl3o0o0cie4ig3cn.jpg\"><br></p><p>如果138亿年的宇宙历史压缩到一年，人类出现在哪个月？5月？9月？</p><p>著名科普作者、天文学家卡尔﹒萨根在《伊甸园的龙》中提出的宇宙年历，会让你惊掉下巴。</p><p>让我们一起来看一看，宇宙、地球和人类的大事件，都出现在什么时刻吧！</p><p>如果把138亿年的历史压缩到1年里，很明显时间加速了。在这个日历里，日历的每一秒相当于438年，日历上的一小时相当于158万年，日历上的一天相当于3780万年。</p><p>在这个宇宙年历里，一个人活到80岁，宇宙才过去了0.18秒。</p><p><br></p>'),
(53, '不会融化的冰激凌', NULL, 57, 1502870880000, 0, '<h3>不会融化的冰激凌</h3><p>视频中已经说明了是使用来自草莓的草莓多酚，这种物质提升水油结合力来提高冰淇淋的融点了.</p><p>草莓多酚这种玩意其实早就已经被制作出来了,但是一直广泛应用于祛痘产品中,直到近期才被发现可以提高低温下水油的结合力.&nbsp;</p><p>吃冰淇淋最烦的就是化了一手这种情况,而这种冰淇淋一方面是为了解决这个问题,另一方面,容易融化的冰淇淋限制了冰淇淋的造型能力,防化冰淇淋可以有效解决这个问题</p><p><br></p>'),
(54, 'vue.js简介', NULL, 55, 1502871327000, 0, '<p>Vue.js（读音 /vjuː/，类似于&nbsp;view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与<a href=\"https://cn.vuejs.org/v2/guide/single-file-components.html\">单文件组件</a>和&nbsp;<a href=\"https://github.com/vuejs/awesome-vue#libraries--plugins\">Vue 生态系统支持的库</a>结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。</p><p>如果你是有经验的前端开发者，想知道 Vue.js 与其它库/框架的区别，查看<a href=\"https://cn.vuejs.org/v2/guide/comparison.html\">对比其它框架</a>。</p><p><br></p>'),
(55, 'vue.js声明式渲染', NULL, 55, 1502871377000, 0, '<p>Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM：</p><figure><table><tbody><tr><td><pre><div>&lt;div id=\"app\"&gt;</div><div>  {{ message }}</div><div>&lt;/div&gt;</div></pre></td></tr></tbody></table></figure><figure><table><tbody><tr><td><pre><div>var app = new Vue({</div><div>  el: \'#app\',</div><div>  data: {</div><div>    message: \'Hello Vue!\'</div><div>  }</div><div>})</div></pre></td></tr></tbody></table></figure><p><br></p>'),
(56, 'Java 基础语法', NULL, 34, 1502871421000, 0, '<p>一个Java程序可以认为是一系列对象的集合，而这些对象通过调用彼此的方法来协同工作。下面简要介绍下类、对象、方法和实例变量的概念。</p><ul><li>对象：对象是类的一个实例，有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。</li><li>类：类是一个模板，它描述一类对象的行为和状态。</li><li>方法：方法就是行为，一个类可以有很多方法。逻辑运算、数据修改以及所有动作都是在方法中完成的。</li><li>实例变量：每个对象都有独特的实例变量，对象的状态由这些实例变量的值决定。</li></ul><p><br></p>'),
(57, '尼康D7000单反相机的使用功能', NULL, 54, 1502871485000, 0, '<h3>尼康D7000单反相机的使用功能</h3><p>尼康D7000单反相机作为一款优质的中端数码单反相机，完全可以满足普通摄影爱好者的拍摄使用，其功能众多，还具备了尼康当时最新的39点自动对焦系统。但是，对初次接触尼康D7000的用户来说，还需要逐步熟悉（很多细节需要注意）各种开关和设置菜单，才能运用自如</p><p><img style=\"max-width:100%;\" src=\"http://2d.zol-img.com.cn/product/69_500x2000/725/ceIezJBzrpLOY.jpg\"><br></p><p><img src=\"http://2f.zol-img.com.cn/product/69_500x2000/721/ce1eQnCN0QcyM.jpg\" alt=\"从零开始玩单反 编辑教您怎样正确曝光（未完成） \"></p><p><br></p>'),
(58, '摄影时用到的小技巧', NULL, 54, 1502871502000, 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `notebook`
--

CREATE TABLE `notebook` (
  `notebook_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `notebook_des` text CHARACTER SET utf8,
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `notebook_create_date` bigint(20) NOT NULL,
  `state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `notebook`
--

INSERT INTO `notebook` (`notebook_name`, `notebook_des`, `id`, `userid`, `notebook_create_date`, `state`) VALUES
('专业知识', NULL, 34, 1, 1502541828000, 0),
('摄影技巧', NULL, 54, 1, 1502870045000, 0),
('前端', NULL, 55, 1, 1502870054000, 0),
('随笔', NULL, 56, 1, 1502870083000, 1),
('随便写点啥', NULL, 57, 1, 1502870120000, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 NOT NULL,
  `state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `state`) VALUES
(1, '111', '123456', 0),
(3, '小白', '123456', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notebook`
--
ALTER TABLE `notebook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- 使用表AUTO_INCREMENT `notebook`
--
ALTER TABLE `notebook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
