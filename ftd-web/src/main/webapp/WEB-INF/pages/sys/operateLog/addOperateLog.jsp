<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加操作日志表</title>
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
                        <label class="layui-form-label">操作人</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateUser" value="${item.operateUser}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">登录IP</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateIp" value="${item.operateIp}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">操作类型</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateType" value="${item.operateType}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">操作目标</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateObject" value="${item.operateObject}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">操作详情</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateDetail" value="${item.operateDetail}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">操作时间</label>
                        <div class="layui-input-block">
                            <input type="text" name="operateTime" value="${item.operateTime}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
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
        <script type="text/javascript" src="<%=path%>/static/js/sys/operateLog/operateLog.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/operateLog/operateLogLayui.js" ></script>
    </body>
</html>