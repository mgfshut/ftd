package com.gjxx.ftd.common;

/**
 * Created by mgf on 2017/9/11.
 */
public class ReturnCodeType {
    public static final String SUCCESS = "0";//成功
    public static final String P_FAILURE = "1";//数据异常
    public static final String P_VALIDATIONFAILURE = "2";//校验失败
    public static final String P_AUTHFAILURE = "3";//鉴权失败
    public static final String P_TOKENTIMEOUT = "2001";//token过期
    public static final String P_TOKENFAILURE = "2002";//token校验失败
    public static final String P_TOKENFORMATFAILURE = "2003";//token格式不合法
}
