<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加系统参数</title>
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
                        <label class="layui-form-label">系统参数名称<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="dictDefineName" value="${item.dictDefineName}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">系统参数描述<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="dictDefineDescribe" value="${item.dictDefineDescribe}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <%--<div class="layui-inline">
                        <label class="layui-form-label">数据字典状态</label>
                        <div class="layui-form layui-input-inline index_serachSelect" style="margin-left: 26px;margin-right: 0px;width: 182px;">
                            <select name="dictDefineStatus" lay-verify="required">
                                <option value=" ">---请选择---</option>
                                <c:forEach items="${statusMap}" var="dictDetail">
                                    <option value="${dictDetail.key}" <c:if test="${item.dictDefineStatus==dictDetail.key}">selected</c:if>>${dictDetail.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>--%>
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
        <script type="text/javascript" src="<%=path%>/static/js/sys/dictDefine/dictDefine.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/dictDefine/dictDefineLayui.js" ></script>
    </body>
</html>