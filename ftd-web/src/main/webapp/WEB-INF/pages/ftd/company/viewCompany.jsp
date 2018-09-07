<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@include file="../common/tag.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>查看详情</title>
    <meta name="renderer" content="webkit">
    <%@include file="../common/header.jsp" %>
</head>
<body>
<table class="layui-table del-table">
    <colgroup>
        <col width="100">
        <col width="120">
        <col width="100">
        <col width="120">
    </colgroup>
    <tbody>
    <tr>
        <td class="td_colo">企业全称</td>
        <td>${item.fullName}</td>
        <td class="td_colo">企业名称</td>
        <td>${item.name}</td>
    </tr>
    <tr>
        <td class="td_colo">归属类型</td>
        <td>${item.belongType}</td>
        <td class="td_colo">统一信用代码</td>
        <td>${item.unifiedSocialCreditCode}</td>
    </tr>
    <tr>
        <td class="td_colo">企业性质</td>
        <td>${item.nature}</td>
        <td class="td_colo">成立日期</td>
        <td>${item.establishmenDate}</td>
    </tr>
    <tr>
        <td class="td_colo">联系人</td>
        <td>${item.linkman}</td>
        <td class="td_colo">联系方式</td>
        <td>${item.linkWay}</td>
    </tr>
    <tr>
        <td class="td_colo">办公电话</td>
        <td>${item.officePhone}</td>
        <td class="td_colo">经营许可证号</td>
        <td>${item.businessLicense}</td>
    </tr>
    <tr>
        <td class="td_colo">经营范围</td>
        <td>${item.businessScope}</td>
        <td class="td_colo">核发机关</td>
        <td>${item.nuclearAuthority}</td>
    </tr>
    <tr>
        <td class="td_colo">核发日期</td>
        <td>${item.nuclearDate}</td>
        <td class="td_colo">有效起始日期</td>
        <td>${item.validStartTime}</td>
    </tr>
    <tr>
        <td class="td_colo">有效截止日期</td>
        <td>${item.validEndTime}</td>
        <td class="td_colo">证照状态</td>
        <td>${item.evidenceState}</td>
    </tr>
    <tr>
        <td class="td_colo">创建人</td>
        <td>${item.createUser}</td>
        <td class="td_colo">创建时间</td>
        <td>${item.createTime}</td>
    </tr>
    <tr>
        <td class="td_colo">修改人</td>
        <td>${item.updateUser}</td>
        <td class="td_colo">修改时间</td>
        <td>${item.updateTime}</td>
    </tr>
    </tbody>
</table>
<%@include file="../common/footer.jsp" %>
</body>
</html>