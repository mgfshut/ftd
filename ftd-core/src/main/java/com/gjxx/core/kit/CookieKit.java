package com.gjxx.core.kit;

import org.apache.commons.codec.binary.Base64;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

public class CookieKit {
    /**
     * 默认cookie有效期
     */
    private final static Integer COOKIE_MAX_AGE_DEFAULT = 60 * 60 * 12;
    private final static String ENTRYSALT = "WUsxdxR*^7^*%%";// base64加密盐

    /**
     * 添加一条新的Cookie信息
     * 
     * @param response
     * @param name
     * @param value
     */
    public static void setCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, encodeBase64(value));
        cookie.setMaxAge(COOKIE_MAX_AGE_DEFAULT);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /**
     *
     * 根据Cookie名称得到Cookie的值，没有返回Null
     * 
     * @param request
     * @param name
     * @return
     */
    public static String getCookieValue(HttpServletRequest request, String name) {
        Cookie cookie = getCookie(request, name);
        if (cookie != null) {
            return decodeBase64(cookie.getValue());
        } else {
            return null;
        }
    }

    public static Cookie getCookie(HttpServletRequest request, String name) {
        Cookie cookies[] = request.getCookies();
        if (cookies == null || name == null || name.length() == 0)
            return null;
        Cookie cookie = null;
        for (int i = 0; i < cookies.length; i++) {
            if (!cookies[i].getName().equals(name))
                continue;
            cookie = cookies[i];
            if (request.getServerName().equals(cookie.getDomain()))
                break;
        }
        return cookie;
    }

    public static void removeCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    /**
     * 编码
     * 
     * @param cookieStr
     * @return
     */
    public static String encodeBase64(String cookieStr) {
        try {
            cookieStr += ENTRYSALT;
            cookieStr = new String(Base64.encodeBase64(cookieStr.getBytes("UTF-8")));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return cookieStr;
    }

    /**
     * 解码
     * 
     * @param cookieStr
     * @return
     */
    public static String decodeBase64(String cookieStr) {
        try {
            cookieStr = new String(Base64.decodeBase64(cookieStr.getBytes()), "UTF-8");
            cookieStr = cookieStr.replace(ENTRYSALT, "");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return cookieStr;
    }
}
