package com.gjxx.core.common;

/**
 * 位置信息查询
 */
public class PhotoScreenMsg extends PackageData{
	// byte[0-1] 应答流水号
	private int msgFlowId;
	// byte[2] 结果  0：成功；1：失败；2：通道不支持。
	private int result;
	// byte[3] 多媒体ID个数
	private int mediaCount;
	// byte[4] 多媒体ID列表
	private int mediaList;

	public PhotoScreenMsg() {}

	public PhotoScreenMsg(PackageData packageData) {
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

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public int getMediaCount() {
		return mediaCount;
	}

	public void setMediaCount(int mediaCount) {
		this.mediaCount = mediaCount;
	}

	public int getMediaList() {
		return mediaList;
	}

	public void setMediaList(int mediaList) {
		this.mediaList = mediaList;
	}

	@Override
	public String toString() {
		return "PhotoScreenMsg{" +
				"msgFlowId=" + msgFlowId +
				", result=" + result +
				", mediaCount=" + mediaCount +
				", mediaList=" + mediaList +
				'}';
	}
}
