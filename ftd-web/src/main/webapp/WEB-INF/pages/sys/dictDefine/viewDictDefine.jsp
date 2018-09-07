<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>查看系统参数详情</title>
        <meta name="renderer" content="webkit">
        <%@include file="../common/header.jsp"%>
    </head>
    <body>
        <section class="my-container">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <table class="layui-table" lay-even="" lay-skin="">
                        <colgroup>
                            <col width="100">
                            <col width="120">
                            <col width="100">
                            <col width="120">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td class="td_colo">系统参数名称</td>
                                <td>${item.dictDefineName}</td>
                                <td class="td_colo">系统参数描述</td>
                                <td>${item.dictDefineDescribe}</td>
                            </tr>
                            <%--<tr>
                                <td class="td_colo">数据字典状态</td>
                                <td>${item.dictDefineStatus}</td>
                                <td class="td_colo">创建时间</td>
                                <td>${item.createTime}</td>
                            </tr>--%>
                            <tr>
                                <td class="td_colo">创建时间</td>
                                <td>${item.createTime}</td>
                                <td class="td_colo">修改时间</td>
                                <td>${item.updateTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <%@include file="../common/footer.jsp"%>
    </body>
</html>