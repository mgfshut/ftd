<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
    <meta name="description" content="basic elements">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>逐梦云服务平台</title>
    <link rel="shortcut icon" type="image/x-icon" href="<%=path%>/static/assets/img/logo_favicon.ico" />
    <link href="<%=path%>/static/assets/css/index/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path%>/static/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="<%=path%>/static/assets/css/index/beyond.min.css" rel="stylesheet">
    <link href="<%=path%>/static/assets/css/index/tabPanel.css" rel="stylesheet">
    <link href="<%=path%>/static/assets/css/index/index.css" rel="stylesheet">
    <style>
        .navbar .navbar-inner .navbar-header .navbar-account .account-area>li .dropdown-menu{
            min-width: auto;
        }
    </style>
    <script type="text/javascript">
        var path = "<%=path%>";
    </script>
</head>
<body>
<div class="navbar" >
    <div class="navbar-inner">
        <div class="navbar-container">
            <!-- Navbar Barnd -->
					<span>
						<img src="img/logo.png" style="width: 48px;height: 48px; float: left;
							margin-top: 6px;">
					</span>
            <div class="navbar-header pull-left">
                <a href="#" class="navbar-brand">
                    <small>
                        逐梦云服务平台
                    </small>
                </a>
            </div>
            <div class="navbar-header pull-right">
                <div class="navbar-account">
                    <ul class="account-area">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="true">
                                <section>
                                    <span class="username">${user.userName}</span>
                                    <img src="img/header.png" style="width: 30px;height: 30px;margin: -5px 0 0 5px;"/>
                                </section>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="text-align-center" href="<%=path%>/logout">
                                        安全退出
                                    </a>
                                </li>
                                <li>
                                    <a class="text-align-center"
                                       href="#" id="z_2_1" icon="undefined" title="修改密码" addtabs="z_2_1" url="<%=path%>/userBack/updatePassword">
                                        修改密码
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <!-- Settings -->
                </div>
            </div>
            <!-- /Account Area and Settings -->
        </div>
    </div>
</div>
<!-- Main Container -->
<div class=" main-container container-fluid">
    <!-- Page Container -->
    <div class="page-container">
        <!-- Page Sidebar -->
        <div class="page-sidebar" id="sidebar">
            <div class="page-sidebar-scrollArea">
                <div class="page-sidebar-content">
                    <!-- 左边栏 -->
                    <ul class="nav sidebar-menu" id="menuHome">

                    </ul>
                    <!-- /左边栏 -->
                </div>
            </div>
        </div>
        <!-- Page Content -->
        <div class="page-content">
            <!-- Page tabs 主页面加载区-->
            <div id="tabs" class="tabbable">
                <div class="tab-panel">
                    <button class="BTabLeft">
                        <i class="fa fa-backward"></i>
                    </button>
                    <nav>
                        <ul id="tabs-nav" class="nav nav-tabs page-header" >
                            <li id="tab_tab_a_64" onclick="RefreshIfame('tab_a_64');showTabActived(this);" class="active">
                                <a href="#tab_a_64" data-toggle="tab">首页</a>
                            </li>
                        </ul>
                    </nav>
                    <div class="tab-dropdown">
                        <button class="btn btn-default" data-toggle="dropdown">
                            关闭操作&nbsp;<span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li class="activeTabLocated">
                                <a>定位当前选项卡</a>
                            </li>
                            <li class="divider"></li>
                            <li class="closeAllTab">
                                <a>关闭全部选项卡</a>
                            </li>
                            <li class="closeOtherTab">
                                <a>关闭其他选项卡</a>
                            </li>
                        </ul>
                    </div>
                    <button class="BTabRight">
                        <i class="fa fa-forward"></i>
                    </button>
                    <a class="sidebar-toggler" href="javascript:void(0)" title="左侧栏折叠">
                        <i class="fa fa-arrows-h"></i>
                    </a>
                    <a class="refresh" id="refresh_ifame" href="javascript:void(0)" title="刷新" onclick="refershIframe('Frame_tab_a_64')">
                        <i class="fa fa-refresh"></i>
                    </a>
                    <a class="fullscreen" id="fullscreen-toggler" href="javascript:void(0)" title="全屏">
                        <i class="fa fa-arrows-alt"></i>
                    </a>
                </div>
                <ul class="tab-content">

                    <div role="tabpanel" class="tab-pane active" id="tab_a_64">
                        <iframe src="<%=path%>/home" id="Frame_tab_a_64" onload="iFrameHeight(this.id)" frameborder="no" width="100%" allowtransparency="yes" height="1118"></iframe>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</div>
<!--[if lt IE 9]>
<script src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js?version=161224-1525"></script>
<script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js?version=161224-1525"></script>
<script src="http://apps.bdimg.com/libs/respond.js?version=161224-1525/1.4.2/respond.min.js"></script>
<![endif]-->
<!--[if gte IE 9]><!-->
<script src="<%=path%>/static/assets/scripts/jquery-2.1.4.min.js"></script>
<!--<![endif]-->
<script src="<%=path%>/static/assets/js/index/skins.min.js"></script>
<script src="<%=path%>/static/assets/js/index/jquery.cookie.js"></script>
<script src="<%=path%>/static/assets/js/index/login/loginout.js"></script>
<script src="<%=path%>/static/assets/js/index/initSet/Utils.js"></script>
<script src="<%=path%>/static/assets/js/index/urlvalue/getUrlValue.js"></script>
<script src="<%=path%>/static/assets/js/index/initSet/IpConfig.js"></script>
<script src="<%=path%>/static/assets/js/index/bootstrap.min.js"></script>

<!--Beyond Scripts-->
<script src="<%=path%>/static/assets/js/index/index/menu.js"></script>
<script src="<%=path%>/static/assets/js/index/index/endmenu.js"></script>
<script src="<%=path%>/static/assets/js/index/beyond.min.js"></script>
<script src="<%=path%>/static/assets/js/index/tabPanel.js"></script>
<script src="<%=path%>/static/assets/scripts/dinky.js"></script>

</body>
</html>