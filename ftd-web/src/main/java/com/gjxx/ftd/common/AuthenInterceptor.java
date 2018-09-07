package com.gjxx.ftd.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**校验过滤器
 */

public class AuthenInterceptor extends HandlerInterceptorAdapter {


    private static Logger logger = LoggerFactory.getLogger(AuthenInterceptor.class);


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean relt = Boolean.TRUE;
        return relt;
    }
}


