<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@include file="../common/tag.jsp" %>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>企业管理</title>
    <%@include file="../common/header.jsp" %>
    <%--<link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/global.css" media="all">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/personal.css" media="all">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/system/management.css">--%>
    <script type="text/javascript">
        var path = "<%=path%>";
    </script>
</head>
<body>
<form class="layui-form" action="" id="tableFrom">
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">企业名称</label>
            <div class="layui-input-inline">
                <input type="" name="name" lay-verify="" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">归属类型</label>
            <div class="layui-input-inline">
                <select name="belongType">
                    <option value=" ">---请选择---</option>
                    <c:forEach items="${companyTypeMap}" var="belongType">
                        <option value="${belongType.key}">${belongType.value}</option>
                    </c:forEach>
                </select>
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">联系人</label>
            <div class="layui-input-inline">
                <input type="" name="linkman" lay-verify="" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">统一社会信用代码</label>
            <div class="layui-input-inline">
                <input type="" name="unifiedSocialCreditCode" lay-verify="" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="btn-layui">
            <a href="javascript:termQueryPage();" class="layui-btn layui-btn-small">查询</a>
            <a href="javascript:resetFrom();" class="layui-btn layui-btn-small">清空</a>
        </div>
    </div>
</form>

<div class="container" style="width: 100%; padding: 0; margin: 0;">
    <table class="layui-table tree table-bordered table-hover" lay-even="" lay-skin="">
        <thead>
        <tr>
            <th colspan="11">
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
<%@include file="../common/footer.jsp" %>
<script type="text/javascript" src="<%=path%>/static/js/ftd/company/companyLayui.js"></script>
<script type="text/javascript" src="<%=path%>/static/plugins/jquery/jquery.page.js"></script>
<script type="text/javascript" src="<%=path%>/static/js/common/layui.date.js"></script>
<script type="text/javascript" src="<%=path%>/static/js/ftd/company/companyPage.js"></script>
</body>
</html>