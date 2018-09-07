package com.gjxx.core.kit;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeKit {
    /**
     * 默认的日期时间格式化字符串
     */
    public static String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    /**
     * 默认的日期格式化字符串
     */
    public static String DATE_FORMAT = "yyyy-MM-dd";
    
    /**
     * 默认的时间格式化字符串
     */
    public static String TIME_FORMAT = "HH:mm:ss";
    
    /**
     * 从Date对象获取时间戳，精确到毫秒，10位数字
     * @param date
     * @return
     */
    public static int UnixTimestampFromDate(Date date){
        return (int) (date.getTime()/1000);
    }
    
    /**
     * 从字符串时间解析时间戳，精确到秒，10位数字
     * 
     * @param time
     * @param format
     * @return 字符串为空，返回为0
     */
    public static int getUnixTimestamp(String time, String format) {
        if(StringUtils.isBlank(time)){
            return 0;
        }
        Date datetime = parse(time, format);
        if (datetime != null) {
            return UnixTimestampFromDate(datetime);
        }
        return 0;
    }
    
    /**
     * 从字符串时间解析时间
     * @param time
     * @param format
     * @return
     */
    public static Date parse(String time, String format){
        SimpleDateFormat formater = new SimpleDateFormat(format);
        Date datetime;
        try {
            datetime = formater.parse(time);
        } catch (ParseException e) {
            datetime = null;
        }
        return datetime;
    }
}
