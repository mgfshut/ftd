package com.gjxx.core.common;

import java.io.Serializable;
import java.util.List;

/**
 * 历史音视频资源列表
 */
public class HistoryVideoMsg extends PackageData{
	//byte[0-1]流水号
	private int msgFlowId;
	//byte[2-5]音视频资源总数
	private long videoNum;
	//音视频资源列表
	private List<Video> videoList;


	public HistoryVideoMsg() {}

	public HistoryVideoMsg(PackageData packageData) {
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

	public long getVideoNum() {
		return videoNum;
	}

	public void setVideoNum(long videoNum) {
		this.videoNum = videoNum;
	}

	public List<Video> getVideoList() {
		return videoList;
	}

	public void setVideoList(List<Video> videoList) {
		this.videoList = videoList;
	}

	@Override
	public String toString() {
		return "HistoryVideoMsg{" +
				"msgFlowId=" + msgFlowId +
				", videoNum=" + videoNum +
				", videoList=" + videoList +
				'}';
	}

	public static class Video implements Serializable {
		// byte[0] 逻辑通道号
		private int logicalChn;
		// byte[1-6] 开始时间 (BCD(6))
		private String beginTime;
		// byte[7-12] 结束时间 (BCD(6))
		private String endTime;
		// byte[13-20] 报警标志
		private int warningFlag;
		// byte[21] 音视频资源类型 0：音视频，1：音频，2：视频
		private int resourceType;
		// byte[22] 码流类型 1：主码流，2：子码流
		private int streamType;
		// byte[23] 存储器类型 1：主存储器，2：灾备存储器
		private int storageType;
		// byte[24] 文件大小
		private int fileSize;
		//开始日期
		private String beginDate;
		//开始时间
		private String beginTimeFormat;

		public String getBeginTimeFormat() {
			return beginTimeFormat;
		}

		public void setBeginTimeFormat(String beginTimeFormat) {
			this.beginTimeFormat = beginTimeFormat;
		}

		public String getBeginDate() {
			return beginDate;
		}

		public void setBeginDate(String beginDate) {
			this.beginDate = beginDate;
		}

		public int getLogicalChn() {
			return logicalChn;
		}

		public void setLogicalChn(int logicalChn) {
			this.logicalChn = logicalChn;
		}

		public String getBeginTime() {
			return beginTime;
		}

		public void setBeginTime(String beginTime) {
			this.beginTime = beginTime;
		}

		public String getEndTime() {
			return endTime;
		}

		public void setEndTime(String endTime) {
			this.endTime = endTime;
		}

		public int getWarningFlag() {
			return warningFlag;
		}

		public void setWarningFlag(int warningFlag) {
			this.warningFlag = warningFlag;
		}

		public int getResourceType() {
			return resourceType;
		}

		public void setResourceType(int resourceType) {
			this.resourceType = resourceType;
		}

		public int getStreamType() {
			return streamType;
		}

		public void setStreamType(int streamType) {
			this.streamType = streamType;
		}

		public int getStorageType() {
			return storageType;
		}

		public void setStorageType(int storageType) {
			this.storageType = storageType;
		}

		public int getFileSize() {
			return fileSize;
		}

		public void setFileSize(int fileSize) {
			this.fileSize = fileSize;
		}

		@Override
		public String toString() {
			return "Video{" +
					"logicalChn=" + logicalChn +
					", beginTime='" + beginTime + '\'' +
					", endTime='" + endTime + '\'' +
					", warningFlag=" + warningFlag +
					", resourceType=" + resourceType +
					", streamType=" + streamType +
					", storageType=" + storageType +
					", fileSize=" + fileSize +
					'}';
		}
	}
}
