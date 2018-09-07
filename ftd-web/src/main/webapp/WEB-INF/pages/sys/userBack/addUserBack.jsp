<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加后台用户</title>
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
                        <label class="layui-form-label">用户名<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="userName" value="${item.userName}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-block">
                            <input type="text" name="phone" value="${item.phone}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">邮箱</label>
                        <div class="layui-input-block">
                            <input type="text" name="email" value="${item.email}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <c:if test="${empty item}">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">密码<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="password" value="" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">确认密码<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="confirmPassword" value="" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                </div>
                </c:if>
                <div class="layui-form-item">
                    <label class="layui-form-label">用户角色</label>
                    <div class="layui-input-block" id="userRole">
                        <c:forEach items="${roleList}" var="item">
                            <input type="checkbox" name="roleIds" value="${item.id}" title="${item.roleName}" <c:if test="${item.checked}">checked</c:if>>
                        </c:forEach>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="formSubmit">提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                </div>
            </form>
        </section>
        <%@include file="../common/footer.jsp"%>
        <%--<script type="text/javascript" src="<%=path%>/static/js/sys/userBack/userBack.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/sys/userBack/userBackLayui.js" ></script>--%>
        <script type="text/javascript">
            layui.use(['form', 'layedit', 'laydate'], function(){
                var form = layui.form
                        ,layedit = layui.layedit
                        ,laydate = layui.laydate;
                form.on('submit(formSubmit)', function(data){
                    $.ajax({
                        type: "POST",
                        url: "${ctx}/userBack/addAjax",
                        data:$("#addFrom").serialize(),
                        dataType: "json",
                        error:function(){
                            layer.alert("请求失败!", {
                                title: '提交结果'
                            })
                        },
                        success : function(json) {
                            if(json.errorcode == 0){
                                layer.alert("保存成功!", {
                                    title: '提交结果',
                                    cancel: function(index, layero){
                                        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                                        parent.layer.close(index);
                                        parent.queryPageCount();
                                        return true;
                                    },
                                    yes: function(index, layero){
                                        var index1 = parent.layer.getFrameIndex(window.name); //获取窗口索引
                                        parent.layer.close(index1);
                                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                                        parent.queryPageCount();
                                    }
                                })
                            }else{
                                layer.alert(json.message, {
                                    title: '提交结果'
                                })
                            }
                        }
                    });
                    return false;
                });
            });
        </script>
    </body>
</html>