<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加角色信息表</title>
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
                        <label class="layui-form-label">角色名称<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="roleName" value="${item.roleName}" lay-verify="required"  class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">角色状态<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <select name="roleStatus" lay-verify="required">
                                <option value=" ">---请选择---</option>
                                <c:forEach items="${statusMap}" var="dictDetail">
                                    <option value="${dictDetail.key}" <c:if test="${item.roleStatus==dictDetail.key}">selected</c:if>>${dictDetail.value}</option>
                                </c:forEach>
                            </select>
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
        <script type="text/javascript" src="<%=path%>/static/js/sys/role/role.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/role/roleLayui.js" ></script>
    </body>
</html>