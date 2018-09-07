package com.gjxx.ftd.common;

import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.UserBack;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends BaseController implements HandlerInterceptor {
    public String[] allowUrls;// 设置不拦截的url

    public void setAllowUrls(String[] allowUrls) {
        this.allowUrls = allowUrls;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        String requestUrl = request.getRequestURI().replace(request.getContextPath(), "");
        if (null != allowUrls && allowUrls.length >= 1) {
            for (String url : allowUrls) {
                if (requestUrl.startsWith(url)) {
                    return true;
                }
            }
        }
        UserBack user = getLoginUser(request);
        if (user != null) {
            return true;
        }
        response.sendRedirect("login");
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
            ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
            Exception e) throws Exception {

    }
}
