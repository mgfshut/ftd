<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>修改密码</title>
		<%@include file="../common/header.jsp"%>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/bootstrap/css/bootstrap.css" media="all">
		<%--<link rel="stylesheet" type="text/css" href="${ctx}/static/assets/css/public/global.css" media="all">--%>
		<%--<link rel="stylesheet" type="text/css" href="${ctx}/static/assets/css/public/personal.css" media="all">--%>
		<%--<link rel="stylesheet" type="text/css" href="${ctx}/static/assets/css/index/theme.css" media="all">--%>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/system/updatePassword.css" media="all">
		<script type="text/javascript">
			var path = "<%=path%>";
		</script>
	</head>

	<body>
		<form class="layui-form">
			<div class="wrapper">
				<div class="wrapper-content">
					<div class="wrapper-header">
						<span class="modifyPassword">修改密码</span>
					</div>
					<div class="wrapper-body">
						<table class="layui-table" lay-even="" lay-skin="">
							<tr>
								<td>用户名</td>
								<td>${user.userName}</td>
							</tr>
							<tr>
								<td>输入原始密码</td>
								<td><input type="password" name="oldPwd" lay-verify="required" autocomplete="off" class="layui-input"></td>
							</tr>
							<tr>
								<td>输入新密码</td>
								<td><input type="password" name="newPwd" lay-verify="required" autocomplete="off" class="layui-input"></td>
							</tr>
							<tr>
								<td>确认新密码</td>
								<td><input type="password" name="newPwd2" lay-verify="required" autocomplete="off" class="layui-input"></td>
							</tr>
							<tr>
								<td colspan="2" style="" class="passwordButton">
									<button class="layui-btn" lay-submit lay-filter="formSubmit">
										保存
									</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</form>
		<%@include file="../common/footer.jsp"%>
		<script src="<%=path%>/static/js/sys/userBack/updatePassword.js"></script>
	</body>
</html>