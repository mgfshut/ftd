package com.gjxx.core.common;

import java.io.Serializable;

/**
 * 多媒体文件信息
 */
public class MediaFileMsg implements Serializable {
	// byte[0-3] 多媒体ID
	private long mediaFileId;
	// byte[4] 多媒体类型 0：图像；1：音频；2：视频；
	private int mediaType;
	// byte[5] 多媒体格式编码
	private int formatCode;
	// byte[6] 事件项编码
	private int eventCode;
	// byte[7] 通道ID
	private int chnId;
	// byte[8-35] 位置信息汇报(0x0200)消息体
	private byte[] locationUpload;
	// byte[36-X] 多媒体数据包
	private byte[] file;
	//手机号
	private String terminalPhone;

	public String getTerminalPhone() {
		return terminalPhone;
	}

	public void setTerminalPhone(String terminalPhone) {
		this.terminalPhone = terminalPhone;
	}

	public long getMediaFileId() {
		return mediaFileId;
	}

	public void setMediaFileId(long mediaFileId) {
		this.mediaFileId = mediaFileId;
	}

	public int getMediaType() {
		return mediaType;
	}

	public void setMediaType(int mediaType) {
		this.mediaType = mediaType;
	}

	public int getFormatCode() {
		return formatCode;
	}

	public void setFormatCode(int formatCode) {
		this.formatCode = formatCode;
	}

	public int getEventCode() {
		return eventCode;
	}

	public void setEventCode(int eventCode) {
		this.eventCode = eventCode;
	}

	public int getChnId() {
		return chnId;
	}

	public void setChnId(int chnId) {
		this.chnId = chnId;
	}

	public byte[] getLocationUpload() {
		return locationUpload;
	}

	public void setLocationUpload(byte[] locationUpload) {
		this.locationUpload = locationUpload;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	@Override
	public String toString() {
		return "MediaFileMsg{" +
				"mediaFileId=" + mediaFileId +
				", mediaType=" + mediaType +
				", formatCode=" + formatCode +
				", eventCode=" + eventCode +
				", chnId=" + chnId +
				", terminalPhone='" + terminalPhone + '\'' +
				'}';
	}
}
