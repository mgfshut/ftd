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
                                                            <td class="td_colo">上级菜单ID</td>
                                <td>${item.parentId}</td>
                                <td class="td_colo">菜单名称</td>
                                <td>${item.menuName}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">菜单类型</td>
                                <td>${item.menuType}</td>
                                <td class="td_colo">菜单路径</td>
                                <td>${item.menuUrl}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">菜单图标</td>
                                <td>${item.menuIcon}</td>
                                <td class="td_colo">菜单状态</td>
                                <td>${item.menuStatus}</td>
                            </tr>
                            <tr>
                                <td class="td_colo">菜单顺序</td>
                                <td>${item.menuSeq}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <%@include file="../common/footer.jsp"%>
    </body>
</html>