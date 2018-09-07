<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加角色菜单关系表</title>
        <meta name="renderer" content="webkit">
        <%@include file="../common/header.jsp"%>
        <script type="text/javascript">
            var path = "<%=path%>";
        </script>
    </head>
    <body>
        <section class="my-container">
            <form class="layui-form" id="addFrom" method="post">
                <input type="hidden" name="id" value="${item.id}">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">角色ID</label>
                        <div class="layui-input-block">
                            <input type="text" name="roleId" value="${item.roleId}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">菜单ID</label>
                        <div class="layui-input-block">
                            <input type="text" name="menuId" value="${item.menuId}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="add">提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                </div>
            </form>
        </section>
        <%@include file="../common/footer.jsp"%>
        <script type="text/javascript" src="<%=path%>/static/js/sys/roleMenuRel/roleMenuRel.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/roleMenuRel/roleMenuRelLayui.js" ></script>
    </body>
</html>