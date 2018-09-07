<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>角色信息表</title>
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
                <span class="index_serachSpan">角色名称</span>
                <div class="layui-input-inline index_serachSelect">
                    <input type="" name="roleName" lay-verify="" autocomplete="off" class="layui-input">
                </div>
                <span class="index_serachSpan">角色状态</span>
                <div class="layui-form layui-input-inline index_serachSelect">
                    <select name="roleStatus">
                        <option value=" ">---请选择---</option>
                        <c:forEach items="${statusMap}" var="dictDetail">
                            <option value="${dictDetail.key}">${dictDetail.value}</option>
                        </c:forEach>
                    </select>
                </div>
                <br/>
                <span class="index_serachSpan" >创建时间</span>
                <div class="layui-input-inline" style="margin-top: -8px;">
                    <input type="text" name="create_start_time" class="layui-input" id="create_start_time" style="width: 143px;display: inline-block;"> --
                    <input type="text" name="create_end_time" class="layui-input" id="create_end_time" style="width: 143px;display: inline-block;">
                </div>

                <span class="index_serachSpan" style="margin-left: 10px;">修改时间</span>
                <div class="layui-input-inline" style="margin-top: -8px;">
                    <input type="text" name="update_start_time" class="layui-input" id="update_start_time" style="width: 143px;display: inline-block;"> --
                    <input type="text" name="update_end_time" class="layui-input" id="update_end_time" style="width: 143px;display: inline-block;">
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
                                <a class="layui-btn layui-btn-small" data-method="notice4">
                                    <i class="layui-icon">&#xe640;</i>权限设置
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
        <script type="text/javascript" src="<%=path%>/static/js/sys/role/roleLayui.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/plugins/jquery/jquery.page.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/common/layui.date.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/role/rolePage.js" ></script>
    </body>
</html>