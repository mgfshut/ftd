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
                                <td class="td_colo">用户名</td>
                                <td>${item.userName}</td>
                                <td class="td_colo">手机号</td>
                                <td>${item.phone}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">邮箱</td>
                                <td>${item.email}</td>
                                <td class="td_colo">创建人</td>
                                <td>${item.createUser}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">创建时间</td>
                                <td>${item.createTime}</td>
                                <td class="td_colo">修改人</td>
                                <td>${item.updateUser}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">修改时间</td>
                                <td>${item.updateTime}</td>
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <%@include file="../common/footer.jsp"%>
    </body>
</html>