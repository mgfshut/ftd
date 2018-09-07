<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>逐梦云服务平台</title>
	<style type="text/css">
		*{margin: 0;padding: 0;}
		ul li{list-style-type: none;float: left;}
		.contact .school:hover{color: #0195ff;cursor: pointer;}
		.contact .policy:hover{color: #56df4c;cursor: pointer;}
		.contact .juide:hover{color: #f0833f;cursor: pointer;}
		.contact .community:hover{color: #edca13;cursor: pointer;}
		body{
			background-color: #fbfbfb;
		}
		.header p{
			padding: 30px 40px;
		}
		.header span{
			color: #1796F0;
		}
		.main{
			text-align: center;
		}
		.main img{
			width: 350px;height: 350px;
		}
		.contact ul{
			margin: 10px auto;
			width: 420px;
		}
	</style>
</head>
<body>
<div class="header">
	<p>欢迎登录，<span>逐梦云服务平台!</span></p>
</div>
<div class="main">
	<img src="<%=path%>/static/img/home/bg.png" alt=""/>
</div>
</body>
</html>