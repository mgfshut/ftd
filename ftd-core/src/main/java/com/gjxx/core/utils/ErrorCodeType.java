package com.gjxx.core.utils;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ErrorCodeType {
	SUCCESS(0),//成功
	P_FAILURE(1),//数据异常
	P_NOTONLINE(2),//不在线
	P_NOTLONG(1001),
	P_OVERDUE(1010),//请求过期
	P_RESOURCEABSENT(1011),//资源缺乏
	P_NOPRIV(1101),
	P_VALIDATIONFAILURE(1120),//验证失败
	P_HAVEUSERNAME(1111),//用户名已经存在
	
	DATABASEEXCEPTION(800),//数据库异常
	TIMESTAMP(201),//时间戳
	CERTIFICATE(202),//证书
	NOPRIV(1000),
	NOTLOGIN(1100),
	VALIDATIONFAILURE(2000),
	RESOURCEABSENT(2010),
	FILEISERRO(2020),
	
	ORGANIZ_PR(4001),
	ORGANIZ_CI(4002),
	ORGANIZ_CO(4003),
	ORGANIZ_OT(4006);
	
	
	
	private int value;
	private ErrorCodeType(int val){
		this.value = val;
	}
	
	@JsonValue
	public int getValue() {
		return value;
	}
}
