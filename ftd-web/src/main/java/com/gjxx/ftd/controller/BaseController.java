package com.gjxx.ftd.controller;

import com.gjxx.core.kit.CookieKit;
import com.gjxx.core.utils.DateUtil;
import com.gjxx.core.utils.GetIp;
import com.gjxx.system.entity.OperateLog;
import com.gjxx.system.entity.UserBack;
import com.gjxx.system.service.OperateLogService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public class BaseController {
    public static final String USER_COOKIEID = "USERID";
    public static final String USER_SESSIONID = "USERSESSIONID";

    @Autowired
    private OperateLogService operateLogService;

    /**
     * 从cookie获取当前登陆的用户
     *
     * @param request
     * @return
     */
    protected UserBack getLoginUser(HttpServletRequest request) {
        String value = CookieKit.getCookieValue(request, USER_COOKIEID);
        if (StringUtils.isNotBlank(value)) {
            UserBack user = (UserBack) request.getSession().getAttribute(USER_SESSIONID);
            if (user != null) {
                return user;
            }
        }
        return null;
    }

    /**
     * 保存操作日志
     */
    protected void logger(HttpServletRequest request, String logType, String objectName, String detail) {
        OperateLog operateLog = new OperateLog();
        operateLog.setOperateUser(getLoginUser(request).getUserName());
        operateLog.setOperateIp(GetIp.getIp(request));
        operateLog.setOperateType(logType);
        operateLog.setOperateObject(objectName);
        operateLog.setOperateDetail(detail);
        operateLog.setOperateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
        operateLogService.insertOrUpdate(operateLog);
    }
}
