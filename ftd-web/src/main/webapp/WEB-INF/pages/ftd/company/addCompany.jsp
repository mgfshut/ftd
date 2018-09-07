<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/tag.jsp"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>添加企业信息表</title>
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
                        <label class="layui-form-label">企业全称<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="fullName" value="${item.fullName}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">企业名称<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="name" value="${item.name}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">归属类型<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <select name="belongType" lay-verify="required">
                                <option value=" ">---请选择---</option>
                                <c:forEach items="${companyTypeMap}" var="belongType">
                                    <option value="${belongType.key}" <c:if test="${item.belongType==belongType.key}">selected</c:if>>${belongType.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">统一信用代码<span style="color: red;"> *</span></label>
                        <div class="layui-input-block">
                            <input type="text" name="unifiedSocialCreditCode" value="${item.unifiedSocialCreditCode}" lay-verify="required" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">企业性质</label>
                        <div class="layui-input-block">
                            <select name="nature">
                                <option value=" ">---请选择---</option>
                                <c:forEach items="${companyNatureMap}" var="nature">
                                    <option value="${nature.key}" <c:if test="${item.nature==nature.key}">selected</c:if>>${nature.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">成立日期</label>
                        <div class="layui-input-block">
                            <input type="text" name="establishmenDate" value="${item.establishmenDate}" lay-verify="" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input layDate">
                        </div>
                    </div>

                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">联系人</label>
                        <div class="layui-input-block">
                            <input type="text" name="linkman" value="${item.linkman}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">联系方式</label>
                        <div class="layui-input-block">
                            <input type="text" name="linkWay" value="${item.linkWay}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">办公电话</label>
                        <div class="layui-input-block">
                            <input type="text" name="officePhone" value="${item.officePhone}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">经营许可证号</label>
                        <div class="layui-input-block">
                            <input type="text" name="businessLicense" value="${item.businessLicense}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">经营范围</label>
                        <div class="layui-input-block">
                            <input type="text" name="businessScope" value="${item.businessScope}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">核发机关</label>
                        <div class="layui-input-block">
                            <input type="text" name="nuclearAuthority" value="${item.nuclearAuthority}" lay-verify="" class="layui-input" />
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">核发日期</label>
                        <div class="layui-input-block">
                            <input type="text" name="nuclearDate" value="${item.nuclearDate}" lay-verify="" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input layDate">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">有效起始日期</label>
                        <div class="layui-input-block">
                            <input type="text" name="validStartTime" value="${item.validStartTime}" lay-verify="" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input layDate">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">有效截止日期</label>
                        <div class="layui-input-block">
                            <input type="text" name="validEndTime" value="${item.validEndTime}" lay-verify="" placeholder="yyyy-mm-dd" autocomplete="off" class="layui-input layDate">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">证照状态</label>
                        <div class="layui-input-block">
                            <select name="evidenceState">
                                <option value=" ">---请选择---</option>
                                <c:forEach items="${evidenceStateMap}" var="evidenceState">
                                    <option value="${evidenceState.key}" <c:if test="${item.evidenceState==evidenceState.key}">selected</c:if>>${evidenceState.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item btn-box">
                    <div class="btn-layui">
                        <button type="button" class="layui-btn" lay-submit lay-filter="add">提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                </div>
            </form>
        </section>
        <%@include file="../common/footer.jsp"%>
        <script type="text/javascript" src="<%=path%>/static/js/ftd/company/company.js" ></script>
        <script type="text/javascript" src="<%=path%>/static/js/ftd/company/companyLayui.js" ></script>
    </body>
</html>