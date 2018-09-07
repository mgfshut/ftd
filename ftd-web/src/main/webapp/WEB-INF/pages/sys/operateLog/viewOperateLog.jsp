<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>查看详情</title>
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
                                <td class="td_colo">操作人</td>
                                <td>${item.operateUser}</td>
                                <td class="td_colo">登录IP</td>
                                <td>${item.operateIp}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">操作类型</td>
                                <td>${item.operateType}</td>
                                <td class="td_colo">操作目标</td>
                                <td>${item.operateObject}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">操作详情</td>
                                <td>${item.operateDetail}</td>
                                <td class="td_colo">操作时间</td>
                                <td>${item.operateTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <%@include file="../common/footer.jsp"%>
    </body>
</html>