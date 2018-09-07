package com.gjxx.core.utils;

import com.fasterxml.jackson.annotation.JsonView;

import java.io.Serializable;

public class ResultEntity implements Serializable{
	
	//定义结果视图接口
	public interface ResultView{}
	
	@JsonView(ResultView.class)
	private ErrorCodeType errorcode;

	@JsonView(ResultView.class)
	private String message;

	@JsonView(ResultView.class)
	private Object data;

	public ResultEntity() {
		errorcode = ErrorCodeType.SUCCESS;
		message = "";
		data = null;
	}

	public ErrorCodeType getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(ErrorCodeType errorcode) {
		this.errorcode = errorcode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public void setErrorInfo(ErrorCodeType err, String msg, Object data) {
		this.errorcode = err;
		this.message = msg;
		this.data = data;
	}

	public ResultEntity(ErrorCodeType errorcode, String message, Object data) {
		super();
		this.errorcode = errorcode;
		this.message = message;
		this.data = data;
	}
}
