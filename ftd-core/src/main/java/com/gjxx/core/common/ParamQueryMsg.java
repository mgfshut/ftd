package com.gjxx.core.common;

import java.io.Serializable;
import java.util.List;

/**
 * 参数查询
 */
public class ParamQueryMsg extends PackageData{
	// 应答流水号
	// byte[0-1]
	private int msgFlowId;
	// 应答参数个数
	// byte[2-3]
	private long paramNum;
	// byte[3-x] 参数项列表
	private List<Param> paramList;

	public ParamQueryMsg() {}

	public ParamQueryMsg(PackageData packageData) {
		this();
		this.channel = packageData.getChannel();
		this.checkSum = packageData.getCheckSum();
		this.calculatedCheckSum = packageData.getCalculatedCheckSum();
		this.msgBodyBytes = packageData.getMsgBodyBytes();
		this.msgHeader = packageData.getMsgHeader();
	}

	public int getMsgFlowId() {
		return msgFlowId;
	}

	public void setMsgFlowId(int msgFlowId) {
		this.msgFlowId = msgFlowId;
	}

	public long getParamNum() {
		return paramNum;
	}

	public void setParamNum(long paramNum) {
		this.paramNum = paramNum;
	}

	public List<Param> getParamList() {
		return paramList;
	}

	public void setParamList(List<Param> paramList) {
		this.paramList = paramList;
	}

	@Override
	public String toString() {
		return "ParamQueryMsg{" +
				"msgFlowId=" + msgFlowId +
				", paramNum=" + paramNum +
				", paramList=" + paramList +
				'}';
	}

	public static class Param implements Serializable {
		// byte[0-2] 参数ID
		private int paramId;
		// byte[3-4] 参数长度
		private int paramLong;
		// byte[4-x] 参数值
		private String paramValue;

		public int getParamId() {
			return paramId;
		}

		public void setParamId(int paramId) {
			this.paramId = paramId;
		}

		public int getParamLong() {
			return paramLong;
		}

		public void setParamLong(int paramLong) {
			this.paramLong = paramLong;
		}

		public String getParamValue() {
			return paramValue;
		}

		public void setParamValue(String paramValue) {
			this.paramValue = paramValue;
		}

		@Override
		public String toString() {
			return "Param{" +
					"paramId='" + paramId + '\'' +
					", paramLong=" + paramLong +
					", paramValue='" + paramValue + '\'' +
					'}';
		}
	}
}
