package com.gjxx.core.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

/**
 * 日期公共方法
 */
public class DateUtil {
	private static SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");

	public final static String DATE_PATTERN = "yyyy-MM-dd";
	public final static String DATE_PATTERN_TIME = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 获取形如yyyyMMddHHmmss的当前日期字串
	 *
	 * @return String
	 */
	public static String getDateTimeString() {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
		return dfmt.format(new Date());
	}

	private final static SimpleDateFormat sdfDays = new SimpleDateFormat(
			"yyyyMMdd");
	/**
	 * 获取形如yyyyMMdd的当前日期字串
	 *
	 * @return String
	 */
	public static String getDateString() {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat("yyyyMMdd");
		return dfmt.format(new Date());
	}

	public static String getYYYYMMDDHH24MISS(String strYYYY_MM_DD) {
		String tmp = "";
		try {
			Date d = getDate(strYYYY_MM_DD, "yyyy-mm-dd");
			DateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
			return dfmt.format(d);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return tmp;
	}

	/**
	 * 获取指定格式的当前日期字串
	 *
	 * @return String
	 */
	public static String getDateString(String pattern) {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat(pattern);
		return dfmt.format(new Date());
	}

	/**
	 * 日期运算
	 *
	 * @param days
	 *            和当前日期的差值（单位:天）
	 * @param pattern
	 * @return
	 */
	public static String getDateString(int days, String pattern) {
		DateFormat dfmt = new SimpleDateFormat(pattern);
		long days2 = (long) days;
		return dfmt.format(new Date((new Date()).getTime() + 1000 * 60 * 60 * 24 * days2));
	}

	/**
	 * 获取形如yyyyMMddHHmmss的日期字串
	 *
	 * @param date
	 *            Date
	 * @return String
	 */
	public static String getDateString(Date date) {
		if (date == null) {
			return "";
		}
		DateFormat vdfmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return vdfmt.format(date);
	}

	/**
	 * 获取YYYYMMDD格式
	 *
	 * @return
	 */
	public static String getDays(){
		return sdfDays.format(new Date());
	}
	/**
	 * 获取指定格式的日期字串
	 *
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String getDateString(Date date, String pattern) {
		SimpleDateFormat sdfmt = new SimpleDateFormat(pattern);

		return date != null ? sdfmt.format(date) : "";
	}

	@SuppressWarnings("deprecation")
	public static String getDateString(String date, String pattern) {
		if (date == null || "".equals(date) || "null".equals(date))
			return "";
		try {
			Date d = new Date(date);
			return getDateString(d, pattern);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	public static String getDateString(java.sql.Date date, String pattern) {
		SimpleDateFormat sdfmt = new SimpleDateFormat(pattern);
		return date != null ? sdfmt.format(date) : "";
	}

	public static java.sql.Date getSQLDate(String date) {
		SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd");
		try {
			if (VerifyObject.verifyString(date)) {
				Date d = s.parse(date);
				return new java.sql.Date(d.getTime());
			} else {
				return null;
			}
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}

	}

	/**
	 * 将形如yyyy-MM-dd的字串转换成日期
	 *
	 * @param strDate
	 * @return 如果不能解析，返回null
	 */
	public static Date parseDate(String strDate) {
		Date date = null;
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat("yyyy-MM-dd");
		try {
			date = dfmt.parse(strDate);
		} catch (ParseException e) {
		}
		return date;
	}

	/**
	 * 将形如yyyyMMddHHmmss的字串转换成日期
	 *
	 * @param strDate
	 *            String
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDate(String strDate) throws ParseException {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
		return dfmt.parse(strDate);
	}

	/**
	 * 将形如yyyy-MM-dd HH:mm:ss的字串转换成日期
	 *
	 * @param strDate
	 *            String
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDate_(String strDate) throws ParseException {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dfmt.parse(strDate);
	}

	/**
	 * 将指定格式的字串转换成日期
	 *
	 * @param strDate
	 *            String
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDate(String strDate, String format) throws ParseException {
		// 日期格式
		DateFormat dfmt = new SimpleDateFormat(format);
		return dfmt.parse(strDate);
	}

	/**
	 * 将指定格式的字串(20061111163558)转换成指定格式的字串(2006-11-11 16:35:58)
	 *
	 * @param stringdate
	 * @return Date
	 * @throws ParseException
	 */
	public static String getStringDate(String stringdate) {
		if (stringdate == null)
			return null;

		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = "";
		try {
			Date date = formatter1.parse(stringdate);
			dateString = formatter2.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return dateString;
	}

	public static String getStringDate(String stringdate, String fpattern, String tpattern) {
		if (stringdate == null)
			return null;

		SimpleDateFormat formatter1 = new SimpleDateFormat(fpattern);
		SimpleDateFormat formatter2 = new SimpleDateFormat(tpattern);
		String dateString = "";
		try {
			Date date = formatter1.parse(stringdate.trim());
			dateString = formatter2.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return dateString;
	}

	/**
	 * 得到当前月的后month_num个月的帐期 例如当前为2005-09，返回上个月的帐期，则设置month_num为-1,返回为200508
	 * 例如当前为2005-09，返回下个月的帐期，则设置month_num为1,返回为200510
	 * 例如当前为2006-1，返回上个月的帐期，则设置month_num为1,返回为200512
	 */
	public static String getChdate(int month_num) {
		Calendar c1 = Calendar.getInstance();
		String result = "";
		c1.add(2, month_num);
		result = String.valueOf(c1.get(1));
		if ((c1.get(2) + 1) >= 10) {
			result = result + String.valueOf(c1.get(2) + 1);
		} else {
			result = result + "0" + String.valueOf(c1.get(2) + 1);
		}
		return result;
	}

	public static int getSysYear() {
		Calendar calendar = new GregorianCalendar();
		int iyear = calendar.get(Calendar.YEAR);
		return iyear;
	}

	public static int getSysMonth() {
		Calendar calendar = new GregorianCalendar();
		int imonth = calendar.get(Calendar.MONTH) + 1;
		return imonth;
	}

	public static String getDateOfSp(String sp) {
		String reday = "";
		int y = getSysYear();
		int m = getSysMonth();
		int d = getSysDay();
		reday = y + "" + sp;
		if (m < 10) {
			reday = reday + ("0" + m) + sp;
		} else {
			reday = reday + (m + "") + sp;
		}
		if (d < 10) {
			reday = reday + ("0" + d);
		} else {
			reday = reday + (d + "");
		}
		return reday;
	}

	public static String getDateOfFirstDay(String sp) {
		String reday = "";
		int y = getSysYear();
		int m = getSysMonth();
		reday = y + "" + sp;
		if (m < 10) {
			reday = reday + ("0" + m) + sp + "01";
		} else {
			reday = reday + (m + "") + sp + "01";
		}
		return reday;
	}

	public static int getSysDay() {
		Calendar calendar = new GregorianCalendar();
		int idate = calendar.get(Calendar.DAY_OF_MONTH);
		return idate;
	}

	public static String getDateString2() {
		String tmp = "";
		tmp = getSysYear() + "    " + getSysMonth() + "    " + getSysDay() + "    ";
		return tmp;
	}

	public static int getTwoMonthNum(String startDate, String endDate) {
		int year1 = Integer.parseInt(startDate.substring(0, 4));
		int year2 = Integer.parseInt(endDate.substring(0, 4));
		int month1 = Integer.parseInt(startDate.substring(4));
		int month2 = Integer.parseInt(endDate.substring(4));
		return Math.abs(year1 - year2) * 12 - (month1 - month2) + 1;
	}

	public static String getNextMonth(String startDate, int i) {
		int start = Integer.parseInt(startDate);
		int next = start + i;
		int year = Integer.parseInt(String.valueOf(next).substring(0, 4));
		int month = Integer.parseInt(String.valueOf(next).substring(4));
		if (month > 12) {
			year = year + 1;
			month = month - 12;
		}
		if (month < 10) {
			return year + "0" + month;
		} else {
			return year + "" + month;
		}
	}

	// 取得 某年某月的天数
	// 月的数值为 0-11
	public static int getDays(String yearMonth) {
		int[] days = new int[] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		int year = Integer.parseInt(yearMonth.substring(0, 4));
		int month = Integer.parseInt(yearMonth.substring(4)) - 1;
		if (month == 1) {
			if (year % 4 == 0) {
				if (year % 100 == 0) {
					return 28;
				} else {
					return 29;
				}
			} else {
				return 28;
			}
		} else {
			return days[month];
		}
	}

	public static int isBetweenDays(String startDay, String endDay) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date date = new Date();
		String today = formatter.format(date);
		startDay = today.substring(0, 6) + startDay;
		endDay = today.substring(0, 6) + endDay;
		if (today.compareTo(startDay) >= 0 && today.compareTo(endDay) <= 0) {
			return 0;
		} else {
			return 1;
		}
	}

	public static boolean isDate(String dateStr, String dateFomrat) {
		// "yyyy-mm-dd","yyyyMMddHHmmss"
		boolean tmp = false;
		try {
			Date d = getDate(dateStr, dateFomrat);
			DateFormat dfmt = new SimpleDateFormat(dateFomrat);
			dfmt.format(d);
			tmp = true;
		} catch (ParseException e) {
			tmp = false;
		}
		return tmp;
	}

	public static boolean isBetweenDays(String startDay, String endDay, String dateFomrat) {
		boolean tmp = false;

		if (isDate(startDay, dateFomrat) && isDate(endDay, dateFomrat)) {
			try {
				if (getDate(startDay, dateFomrat).getTime() > (getDate(endDay, dateFomrat)).getTime()) {
					tmp = false;
				} else
					tmp = true;
			} catch (ParseException e) {
				;
			}
		}

		return tmp;
	}

	public static String getYyyyMm(String theDayYyyy_mm_dd) {
		String dayYYYYMMDD = "";
		dayYYYYMMDD = StringUtil.replace(theDayYyyy_mm_dd, "-", "");
		return dayYYYYMMDD.substring(0, 6);
	}

	public static boolean isDateStr(String strDate, String pattern) {
		boolean tmp = true;

		try {
			getDate(strDate, pattern);
		} catch (ParseException e) {
			tmp = false;
		}

		return tmp;
	}

	/**
	 * 获得指定日期之后若干天的日期
	 */
	public static Date getAfterNDaysDate(Date date, int days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_YEAR, days);

		return cal.getTime();
	}

	/**
	 * @author 计算两个日期相隔的分钟数
	 */
	public static long DaysBetweenTwoDate(String firstString, String secondString) throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date firstDate = df.parse(firstString);
		Date secondDate = df.parse(secondString);

		return ((secondDate.getTime() - firstDate.getTime()) / (60 * 1000));
	}

	/**
	 * @author 计算两个日期相隔的天数
	 */
	public static long daysBetweenTwoDate(Date date1, Date date2) {

		long nDay = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000) > 0 ? (date1.getTime() - date2
				.getTime()) / (24 * 60 * 60 * 1000) : (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);

		return nDay;
	}

	/**
	 * 取某jdbc的系统日期
	 *
	 * @return
	 * @throws ParseException
	 */
	public static Date getSysdateByJdbc() {
		// 日期格式
		// String SQL="SELECT TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') FROM DUAL";
		String yyyyMMddHHmmss = "";
		try {
			// /////////////////////////yyyyMMddHHmmss =
			// CommUtil.getString(SQL);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (!yyyyMMddHHmmss.equals("")) {
			DateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
			try {
				return dfmt.parse(yyyyMMddHHmmss);
			} catch (ParseException e) {
				e.printStackTrace();
				return null;
			}
		} else
			return null;
	}

	public static Date addYMD(Date date, int yearNum, int monthNum, int dayNum) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.YEAR, yearNum);
		c.add(Calendar.MONTH, monthNum);
		c.add(Calendar.DAY_OF_MONTH, dayNum);
		return c.getTime();
	}

	/**
	 * 日期按天数增加
	 *
	 * @param endtime
	 *            日期字符串
	 * @param n
	 *            增加天数，减少传负数
	 * @return
	 */
	public static String getDayIncrease(String endtime, int n) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date todate;
		try {
			todate = sdf.parse(endtime);
			Calendar gc = Calendar.getInstance();
			gc.setTime(todate);
			gc.add(Calendar.DAY_OF_MONTH, n);
			endtime = sdf.format(gc.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return endtime;
	}

	/**
	 * 将yyyy-MM-dd （2017-05-22）转为 yyyyMMddHHmmss（20170522105956）
	 * @param date
	 * @return
	 */
	public static String formatDate(String date) {
		Date dateTime = DateUtil.parseDate(date);
		DateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
		return dfmt.format(dateTime);
	}

	/**
	 * 添加分钟数
	 * @param date
	 * @param minute 负数减少
	 * @return
	 */
	public static Date addMinute(Date date,Integer minute) {

		if ( minute == null )
			return date;

		if ( date == null )
			return null;

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, minute);
		return calendar.getTime();
	}

	/**
	 * 添加小时
	 * @param date
	 * @param hour
	 * @return
	 */
	public static Date addHour(Date date,int hour) {

		if (date == null)
			return null;

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR, hour);
		return calendar.getTime();
	}

	/**
	 * 两个时间相差距离多少天多少小时多少分多少秒
	 * @param one
	 * @param two
	 * @return
	 */
	public static String getDistanceTime(Date one, Date two) {

		long day = 0;
		long hour = 0;
		long min = 0;
		long sec = 0;


		long time1 = one.getTime();
		long time2 = two.getTime();
		long diff ;
		if(time1<time2) {
			diff = time2 - time1;
		} else {
			diff = time1 - time2;
		}
		day = diff / (24 * 60 * 60 * 1000);
		hour = (diff / (60 * 60 * 1000) - day * 24);
		min = ((diff / (60 * 1000)) - day * 24 * 60 - hour * 60);
		sec = (diff/1000-day*24*60*60-hour*60*60-min*60);

		if (day > 0) {
			return day + "天" + hour + "小时" + min + "分" + sec + "秒";
		}else if (hour > 0) {
			return hour + "小时" + min + "分" + sec + "秒";
		}else if (min > 0) {
			return min + "分" + sec + "秒";
		}else if (sec > 0) {
			return sec + "秒";
		} else {
			return null;
		}
	}

	/**
	 * 日期格式字符串转换成时间戳
	 *
	 * @param dateStr 字符串日期
	 * @param format   如：yyyy-MM-dd HH:mm:ss
	 *
	 * @return
	 */
	public static String Date2TimeStamp(String dateStr, String format) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			return String.valueOf(sdf.parse(dateStr).getTime() / 1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * Java将Unix时间戳转换成指定格式日期字符串
	 * @param timestampString 时间戳 如："1473048265";
	 * @param formats 要格式化的格式 默认："yyyy-MM-dd HH:mm:ss";
	 *
	 * @return 返回结果 如："2016-09-05 16:06:42";
	 */
	public static String TimeStamp2Date(String timestampString, String formats) {
		if (com.gjxx.core.utils.StringUtil.isEmpty(formats))
			formats = "yyyy-MM-dd HH:mm:ss";
		Long timestamp = Long.parseLong(timestampString) * 1000;
		String date = new SimpleDateFormat(formats, Locale.CHINA).format(new Date(timestamp));
		return date;
	}

	 /**
	 * 得到本月的最后一天   
	 */
	public String getMonthLastDay(String month) {
		String[] str=month.split("-");
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR,Integer.parseInt(str[0]));
		c.set(Calendar.MONTH, Integer.parseInt(str[1])-1);
		c.set(Calendar.MONTH, c.get(Calendar.MONTH)+1);
		c.set(Calendar.DAY_OF_MONTH, 1);
		return dateFormat.format(c.getTime());
	}
	
	/**
	 * 查询当前时间，返回时间类型 
	 */
	public static Date currentDate() {
		long dateLong = System.currentTimeMillis();
		Date date = new Date(dateLong);
		return date;
	}

	public static String getToday(){
	    String time = "";
	    time = getToday("yyyy-MM-dd");
	    return time;
	}
	/**
	 * 获取当前月的第一天
	 * @author maogf
	 * @date 2018/7/11 0011 11:31
	 * @param
	 * @return java.lang.String
	 */
	public static String monthFirstDay(String formatStr){
		SimpleDateFormat format = new SimpleDateFormat(formatStr);
		//获取当前月的第一天
		Calendar cal = Calendar.getInstance();//获取当前日期
		cal.add(Calendar.MONTH, 0);
		cal.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天
		String firstDay = format.format(cal.getTime());
		return firstDay;
	}
	/**
	 * 获取当前月的最后一天
	 * @author maogf
	 * @date 2018/7/11 0011 11:31
	 * @param
	 * @return java.lang.String
	 */
	public static String monthLastDay(String formatStr){
		SimpleDateFormat format = new SimpleDateFormat(formatStr);
		//获取当前月的最后一天
		Calendar cal = Calendar.getInstance();//获取当前日期
		cal.set(Calendar.DAY_OF_MONTH,cal.getActualMaximum(Calendar.DAY_OF_MONTH));//设置本月最后一天
		String lastDay = format.format(cal.getTime());
		return lastDay;
	}
	/**
	 * 获取指定月的第一天
	 * @author maogf
	 * @date 2018/7/11 0011 11:31
	 * @param
	 * @return java.lang.String
	 */
	public static String appointMonthFirstDay(String dataStr,String formatStr){
		String yearStr = dataStr.split("-")[0];
		String monthStr = dataStr.split("-")[1];
		Calendar cal = Calendar.getInstance();
		//设置年份
		cal.set(Calendar.YEAR,Integer.valueOf(yearStr));
		//设置月份
		cal.set(Calendar.MONTH, Integer.valueOf(monthStr)-1);
		//获取某月最小天数
		int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
		//设置日历中月份的最小天数
		cal.set(Calendar.DAY_OF_MONTH, firstDay);
		//格式化日期
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		String firstDayOfMonth = sdf.format(cal.getTime());
		return firstDayOfMonth;
	}
	/**
	 * 获取指定月的最后一天
	 * @author maogf
	 * @date 2018/7/11 0011 11:31
	 * @param
	 * @return java.lang.String
	 */
	public static String appointMonthLastDay(String dataStr,String formatStr){
		String yearStr = dataStr.split("-")[0];
		String monthStr = dataStr.split("-")[1];
		Calendar cal = Calendar.getInstance();
		//设置年份
		cal.set(Calendar.YEAR,Integer.valueOf(yearStr));
		//设置月份
		cal.set(Calendar.MONTH, Integer.valueOf(monthStr)-1);
		//获取某月最大天数
		int firstDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		//设置日历中月份的最大天数
		cal.set(Calendar.DAY_OF_MONTH, firstDay);
		//格式化日期
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		String lastDayOfMonth = sdf.format(cal.getTime());
		return lastDayOfMonth;
	}
	/**
	 * 根据时间格式获取当前日期的字符串
	 */
	public static String getToday(String format){
	    return getDateStr(Calendar.getInstance().getTime(), format);
	}
	   
	public static String getDateStr(Date date, String format){
	    SimpleDateFormat df = new SimpleDateFormat(format);
	    return df.format(date);
	}
	
	public static void main(String[] args) {
		System.out.println(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
		System.out.println( DateUtil.monthFirstDay("yyMMdd")+"000000");
		System.out.println(DateUtil.monthLastDay("yyMMdd")+"235959");
	}
}
