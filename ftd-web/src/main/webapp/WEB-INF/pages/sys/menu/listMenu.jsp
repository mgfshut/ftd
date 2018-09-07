<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>菜单信息表</title>
    <%@include file="../common/header.jsp"%>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/global.css" media="all">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/css/public/personal.css" media="all">
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/system/management.css">
    <link href="${ctx}/static/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="<%=path%>/static/css/tools/Hui-iconfont_v1.0.8/1.0.8/iconfont.css" rel="stylesheet" type="text/css"/>
    <style>
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
    <script type="text/javascript">
        var path = "<%=path%>";
    </script>
</head>
<body>
<div class="container" style="width: 100%; padding: 0; margin: 0;min-height: 500px">
    <div style="margin: 20px 0 20px 10px;font-size: 15px;">
        <c:forEach items="${parents}" var="res">
            <a style="color: #428bca" href="${ctx}/menu/list?id=${res.id}">${res.menuName}</a>&nbsp;&nbsp;>
        </c:forEach>
        <cite style="font-style: italic">详情</cite>
    </div>
    <table class="layui-table tree table-bordered table-hover" lay-even="" lay-skin="">
        <colgroup>
            <!--表格每列宽度-->
            <col width="10">
            <col width="60">
            <col width="110">
            <col width="60">
            <col width="150">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="90">
        </colgroup>
        <thead>
        <tr>
            <th colspan="10">
                <div class="layui-btn-group" id="LAY_demo">
                    <a href="${ctx}/menu/add?parentId=${parentId}" class="layui-btn layui-btn-small">
                        <i class="layui-icon">&#xe608;</i>添加
                    </a>
                    <a class="layui-btn layui-btn-small" onclick="updateItem();">
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
        <tr>
            <td>
                <input name='pageCheckBox' type='checkbox' value='100030'>
            </td>
            <td style="text-align: center;">资源id</td>
            <td style="text-align: center;">排序</td>
            <td style="text-align: center;">图标</td>
            <td style="text-align: center;">菜单名称</td>
            <td style="text-align: center;">菜单路径</td>
            <td style="text-align: center;">创建人</td>
            <td style="text-align: center;">创建时间</td>
            <td style="text-align: center;">修改时间</td>
            <td style="text-align: center;">子菜单详情</td>
        </tr>
        <c:forEach items="${list}" var="item">
            <tr>
                <td><input name='pageCheckBox' type='checkbox' value='${item.id}'></td>
                <td style="text-align: center;">${item.id}</td>
                <td>
                    <form>
                        <div class="input-group">
                            <input type='hidden' name='id' value='${item.id}'>
                            <input type='hidden' name='seq' value='${item.menuSeq}'>
                            <input type="number" name="newSeq" value="${item.menuSeq}" class="form-control">
                            <span class="input-group-addon" style="cursor:pointer;display:none;">变更</span>
                        </div>
                    </form>
                </td>
                <td style="text-align: center;"><i class="${item.menuIcon}"></i></td>
                <td style="text-align: center;">${item.menuName}</td>
                <td>${item.menuUrl}</td>
                <td style="text-align: center;">${item.createUser}</td>
                <td style="text-align: center;">${item.createTime}</td>
                <td style="text-align: center;">${item.updateTime}</td>
                <td style="text-align: center;">
                    <c:if test="${item.menuType == '1'}">
                        <a href='${ctx}/menu/list?id=${item.id}' style='text-decoration:underline'>
                            <img alt="子菜单详情" src="${ctx}/static/img/icon/contrast.png"title="子菜单详情">
                        </a>
                    </c:if>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<%@include file="../common/footer.jsp" %>
<script type="text/javascript" src="<%=path%>/static/js/sys/menu/menuLayui.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/static/plugins/jquery/jquery.page.js"></script>
<script type="text/javascript" src="<%=path%>/static/js/common/layui.date.js"></script>
<script type="text/javascript" src="<%=path%>/static/js/sys/menu/menuPage.js"></script>
<script type="text/javascript">
    $(function () {
        $("span.input-group-addon").click(function (e) {
            var $form = $(e.currentTarget).parents("form");
            var newSeq = $form.find("input[name=newSeq]").val();
            $.ajax({
                url: "${ctx}/menu/updateSeqAjax",
                data: $form.serialize(),
                dataType: "json",
                success: function (json) {
                    layer.msg(json.message, {time: 1000}, function () {
                        location = location;
                    });
                },
                error: function (json) {
                    layer.msg("操作失败！", {time: 1000}, function () {
                        location = location;
                    });
                }
            });
        });
        $("div.input-group").mouseover(function (e) {
            $(e.currentTarget).find("span").show();
        });
        $("div.input-group").mouseout(function () {
            $("span.input-group-addon").hide();
        });
    });
    function updateItem() {
        var $items = $('input:checked');
        if ($items.length == 0) {
            layer.msg("请选择一条记录!!", {time: 1000});
            return;
        } else if ($items.length > 1) {
            layer.msg("一次最多选择一条记录!!", {time: 1000});
            return;
        }
        window.location.href = path + '/menu/add?id=' + $items.val();
    }
    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    });
</script>
</body>
</html>