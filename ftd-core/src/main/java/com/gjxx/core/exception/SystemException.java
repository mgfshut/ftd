package com.gjxx.core.exception;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * 系统异常
 * 
 * @author wugang
 * @version 1.0
 */
public class SystemException extends RuntimeException implements Serializable {

	private static final long serialVersionUID = 3787730660315875183L;
	@Getter
	@Setter
	private Exception exception;
	@Getter
	@Setter
	private String message;
	@Getter
	@Setter
	private String code;
	@Setter
	private String title = "系统出错了！";

	/**
	 * constructor
	 * 
	 * @param code
	 *            code
	 * @param message
	 *            message
	 * @param e
	 *            Exception
	 */
	public SystemException(String code, String message, Exception e) {
		super(message);
		this.message = message;
		this.code = code;
		this.exception = e;
	}

	/**
	 * constructor
	 * 
	 * @param code
	 *            code
	 * @param title
	 *            title
	 * @param message
	 *            message
	 * @param e
	 *            Exception
	 */
	public SystemException(String code, String title, String message,
						   Exception e) {
		super(message);
		this.message = message;
		this.code = code;
		this.exception = e;
		this.title = title;
	}

	/**
	 * constructor
	 * 
	 * @param message
	 *            message
	 * @param e
	 *            Exception
	 */
	public SystemException(String message, Exception e) {
		super(message);
		this.code = ErrorCode.UNKNOW_ERROR;
		this.exception = e;
	}

	public String getTitle() {
		if (null == title || "".equals(title)) {
			return "系统异常！";
		} else {
			return title;
		}
	}
}
