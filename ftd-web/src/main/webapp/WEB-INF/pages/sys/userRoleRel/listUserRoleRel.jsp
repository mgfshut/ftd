<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>用户角色关系表</title>
        <%@include file="../common/header.jsp"%>
        <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/bootstrap/css/bootstrap.css" media="all">
        <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/global.css" media="all">
        <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/personal.css" media="all">
        <link rel="stylesheet" type="text/css" href="${ctx}/static/css/system/management.css">
        <script type="text/javascript">
            var path = "<%=path%>";
        </script>
    </head>
    <body>
        <form class="layui-form" action="" id="tableFrom">
            <div class="index_serachT">
                <span class="index_serachSpan">用户ID</span>
                <div class="layui-input-inline index_serachSelect">
                    <input type="" name="userId" lay-verify="" autocomplete="off" class="layui-input">
                </div>
                <span class="index_serachSpan">角色ID</span>
                <div class="layui-input-inline index_serachSelect">
                    <input type="" name="roleId" lay-verify="" autocomplete="off" class="layui-input">
                </div>
                <br/>
                <span class="index_serachSpan" >创建时间</span>
                <div class="layui-input-inline" style="margin-top: -8px;">
                    <input type="text" name="create_start_time" id="cstdate" lay-verify="date" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})" style="width: 143px;display: inline-block;"> --
                    <input type="text" name="create_end_time" id="cetdate" lay-verify="date" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})" style="width: 143px;display: inline-block;">
                </div>

                <span class="index_serachSpan" style="margin-left: 10px;">修改时间</span>
                <div class="layui-input-inline" style="margin-top: -8px;">
                    <input type="text" name="update_start_time" id="ustdate" lay-verify="date" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})" style="width: 143px;display: inline-block;"> --
                    <input type="text" name="update_end_time" id="uetdate" lay-verify="date" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})" style="width: 143px;display: inline-block;">
                </div>

                <div class="layui-btn-group layui-input-inline index_serachBut">
                    <a href="javascript:termQueryPage();" class="layui-btn layui-btn-small">查询</a>
                    <a href="javascript:resetFrom();" class="layui-btn layui-btn-small">清空</a>
                </div>
            </div>
        </form>

        <div class="container" style="width: 100%; padding: 0; margin: 0;">
            <table class="layui-table tree table-bordered table-hover" lay-even="" lay-skin="">
                <thead>
                    <tr>
                        <th colspan="9">
                            <div class="layui-btn-group" id="LAY_demo">
                                <a class="layui-btn layui-btn-small" data-method="notice">
                                    <i class="layui-icon">&#xe608;</i>添加
                                </a>
                                <a class="layui-btn layui-btn-small" data-method="notice2">
                                    <i class="layui-icon">&#xe642;</i>修改
                                </a>
                                <a class="layui-btn layui-btn-small" data-method="notice3">
                                    <i class="layui-icon">&#xe640;</i>删除
                                </a>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody id="list">

                </tbody>
            </table>
            <div id="demo7"></div>
        </div>
        <%@include file="../common/footer.jsp"%>
        <script type="text/javascript" src="<%=path%>/static/js/sys/userRoleRel/userRoleRelLayui.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/plugins/jquery/jquery.page.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/common/layui.date.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/userRoleRel/userRoleRelPage.js" ></script>
    </body>
</html>