package com.gjxx.core.utils;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 * @ Author     ：maogf
 * @ Date       ：2018/6/19 0019 17:28
 * @ Description：视频服务器调用接口返回对象
 */
public class VideoReturn implements Serializable {
	/**
	 * 状态码: 0成功，其他失败
	 */
	private int resultCode;
	/**
	 * 结果返回信息
	 */
	private String resultMsg;
	/**
	 * 录像资源列表
	 */
	private List<Video> records;

	public int getResultCode() {
		return resultCode;
	}

	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

	public List<Video> getRecords() {
		return records;
	}

	public void setRecords(List<Video> records) {
		this.records = records;
	}

	@Override
	public String toString() {
		return "VideoReturn{" +
				"resultCode=" + resultCode +
				", resultMsg='" + resultMsg + '\'' +
				", records=" + records +
				'}';
	}

	public static class Video{
		/**
		 * 逻辑通道号
		 */
		private int logicalChn;
		/**
		 * 开始时间
		 */
		private String startTime;
		/**
		 * 结束时间
		 */
		private String endTime;
		/**
		 * 报警类型
		 */
		private int[] alarmTypeArray;
		/**
		 * 音视频资源类型
		 */
		private int resourceType;
		/**
		 * 码流类型
		 */
		private int streamType;
		/**
		 * 存储位置
		 */
		private int storageType;
		/**
		 * 文件大小，单位字节
		 */
		private int fileSize;
		public int getLogicalChn() {
			return logicalChn;
		}

		public void setLogicalChn(int logicalChn) {
			this.logicalChn = logicalChn;
		}

		public String getStartTime() {
			return startTime;
		}

		public void setStartTime(String startTime) {
			this.startTime = startTime;
		}

		public String getEndTime() {
			return endTime;
		}

		public void setEndTime(String endTime) {
			this.endTime = endTime;
		}

		public int[] getAlarmTypeArray() {
			return alarmTypeArray;
		}

		public void setAlarmTypeArray(int[] alarmTypeArray) {
			this.alarmTypeArray = alarmTypeArray;
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
					", startTime='" + startTime + '\'' +
					", endTime='" + endTime + '\'' +
					", alarmTypeArray=" + Arrays.toString(alarmTypeArray) +
					", resourceType=" + resourceType +
					", streamType=" + streamType +
					", storageType=" + storageType +
					", fileSize=" + fileSize +
					'}';
		}
	}

}
