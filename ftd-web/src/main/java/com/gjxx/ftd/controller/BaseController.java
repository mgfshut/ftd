package com.gjxx.ftd.controller;

import com.gjxx.core.utils.DateUtil;
import com.gjxx.core.utils.GetIp;
import com.gjxx.core.utils.Jwt;
import com.gjxx.system.entity.OperateLog;
import com.gjxx.system.entity.UserBack;
import com.gjxx.system.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class BaseController {
    public static final String USER = "USER";
    public static final String USER_TOKENID = "USERTOKENID";
    public static final String USER_TOKEN = "USERTOKEN";

    @Autowired
    private OperateLogService operateLogService;

    /**
     * 从session获取当前登陆的用户
     */
    protected UserBack getLoginUser(HttpServletRequest request) {
        UserBack user = (UserBack) request.getSession().getAttribute(USER);
        if (user != null) {
            return user;
        }
        return null;
    }

    /**
     * 校验用户登录token
     */
    protected boolean validToken(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String token = "";
        if(session.getAttribute(USER_TOKEN) != null){
            token = session.getAttribute(USER_TOKEN).toString();
        }
        String tokenId = "";
        if(session.getAttribute(USER_TOKENID) != null){
            tokenId = session.getAttribute(USER_TOKENID).toString();
        }
        Map<String, Object> result = Jwt.validToken(tokenId,token);
        if ("200".equals(result.get("code").toString())) {
            return true;
        }else{
            return false;
        }
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
