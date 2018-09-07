<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@include file="common/tag.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <%@include file="common/header.jsp" %>
        <link rel="stylesheet" href="${ctx}/static/assets/css/login/login.css">
        <title>逐梦云服务平台</title>
    </head>
    <body>
        <div class="header">
            <img class="logo-img" src="${ctx}/static/assets/img/login/logo.png"/>
            <span>逐梦云服务平台</span>
        </div>
        <div id="login_dialog">
            <img class="login-bg" src="${ctx}/static/assets/img/login/bgGps.jpg"/>
            <div class="loginbar">
                <form action="">
                    <div class="login-title">
                        <span>用户登录</span>
                    </div>
                    <ul class="reg-box">
                        <li class="user">
                            <div class="form-img"><img src="${ctx}/static/assets/img/login/user.png"/></div>
                            <input type="text" name="userName" value="用户名" class="account" maxlength="30" style="color:#999;"
                                   onBlur="textBlur(this)" onFocus="textFocus(this)"/>
                            <span class="error error5"></span>
                        </li>
                        <li>
                            <div class="form-img"><img src="${ctx}/static/assets/img/login/lock.png"/></div>
                            <input type="password" class="admin_pwd" name="password" style="color:#999;" onBlur="textBlur(this)"
                                   onFocus="textFocus(this)"/>
                            <span class="error error6"></span>
                        </li>

                        <li>
                            <input type="text" autocomplete="off" name="code" class="sradd photokey" value="请输入验证码"
                                   style="color:#999;ime-mode:disabled;-webkit-ime-mode:inactive;" onBlur="textBlur(this)"
                                   onFocus=" textFocus(this) "/>
                            <span id="codefonSize" class="add phoKey"></span><span class="error error7"></span>
                            <img class="freshen-img" src="${ctx}/static/assets/img/login/freshen2.png"/>
                        </li>
                    </ul>
                    <div class="sub">
                        <input type="submit" value="登&nbsp;&nbsp;&nbsp;录"/>
                    </div>
                    <div class="remember">
                        <input type="checkbox" value="记住密码"/>
                        <label for="">记住密码</label>
                        <a href="#">忘记密码</a>
                    </div>
                </form>
            </div>
        </div>
        <footer>
            <p>
                <a href="#">技术支持：逐梦科技有限公司</a>
            </p>
        </footer>
        <%@include file="common/footer.jsp" %>
        <script src="${ctx}/static/assets/js/login/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="${ctx}/static/assets/js/login/login.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {
                $("form").submit(function (e) {
                    e.preventDefault();
                    var key = $("span.phoKey").text().toLowerCase();
                    var code = $("input[name=code]").val().toLowerCase();
                    if (key != code) {
                        layer.msg("验证码错误", {
                            icon: 2,
                            time: 1000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    submit($, $("form").serialize());
                    return false;
                });
            });
            function submit($, params) {
                $.post('${pageContext.request.contextPath}/loginAjax', params, function (json) {
                    if (json.errorcode == 0) {
                        window.location.href = "${pageContext.request.contextPath}/index";
                    } else {
                        layer.msg(json.message, {
                            icon: 2,
                            time: 1000 //2秒关闭（如果不配置，默认是3秒）
                        }, function () {
                        });
                    }
                }, 'json');
            }
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer,
                    $ = layui.jquery,
                    form = layui.form;

                form.verify({
                    name: function (value) {
                        if (value === '')
                            return '请输入用户名';
                    },
                    passwd: function (value) {
                        if (value === '')
                            return '请输入密码';
                    }
                });
            });
        </script>
    </body>
</html>