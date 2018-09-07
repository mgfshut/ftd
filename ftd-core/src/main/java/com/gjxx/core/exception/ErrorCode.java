package com.gjxx.core.exception;

/**
 * 异常错误代码
 * 
 * @author wugang
 * @version 1.0
 */
public interface ErrorCode {

	/** 未知错误 */
	String UNKNOW_ERROR = "0000";

	/** 没有数据 */
	String NODATA_ERROR = "0001";

	/** 数据库错误 */
	String DB_ERROR = "0002";

	/** 缺少配置文件 */
	String NO_CFG_FILE = "0003";

	/** 配置文件中缺少数据 */
	String NO_CFG_DATA = "0004";

	/** 配置文件中缺少数据 */
	String IO_ERROR = "0005";

	/** BUSI_ERROR */
	String BUSI_ERROR = "0008";

}
