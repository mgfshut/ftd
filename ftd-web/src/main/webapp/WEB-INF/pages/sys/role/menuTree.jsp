<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
	<head>
	    <title>菜单权限设置</title>
	    <%@include file="../common/header.jsp"%>
	    <link href="<%=path%>/static/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
	    <script type="text/javascript">
	    
	    var path = "<%=path%>";
	    var menuIds = "${menuIds}";
		menuIds = menuIds.substring(1, menuIds.length - 1);
	    var menuIdArray = menuIds.split(",");
	    </script>  
	</head>
	<body>
	<section class="my-container">
		<%--<div class="layui-breadcrumb">
		  <a href="${ctx}/role/list">角色管理</a>
		  <a><cite>权限设置</cite></a>
		</div>
		<br>--%>
		<ul id="treeDemo" class="ztree tree_list"></ul>
		<form class="layui-form" style="display: inline-block; vertical-align:top;margin-left:20px; overflow: auto;">
		 	<input type="hidden" name="roleId" value="${roleId}"/>
			<div class="layui-form-item1 layui-form-item" id="LAY_demo">
		        <a href="javascript:void(0);" class="layui-btn layui-btn-small" id="openAuthorization">
		        	授权
		        </a>
			</div>		
		</form>
	</section>
		<%@include file="../common/footer.jsp"%>
     	<script type="text/javascript" src="<%=path%>/static/js/common/jquery.ztree.all.js"></script>
		<script type="text/javascript" src="<%=path%>/static/js/sys/role/menuTree.js"></script>
		<script type="text/javascript">
			layui.use('element', function(){
			   var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
			});
		</script>
	</body>
</html>