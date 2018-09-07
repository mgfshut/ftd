package com.gjxx.core.utils;

import java.io.Serializable;

/**
 * @ Author     ：maogf
 * @ Date       ：2018/6/19 0019 17:10
 * @ Description：视频服务器调用接口参数对象
 */
public class VideoParam implements Serializable{
	/**
	 * 车牌号码，采用UTF-8编码
	 */
	private String plateNo;
	/**
	 * 车牌颜色
	 */
	private int plateColor;
	/**
	 * 手机号
	 */
	private String mobileNumber;
	/**
	 * 参数内容对象
	 */
	private  Msg msg;

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public int getPlateColor() {
		return plateColor;
	}

	public void setPlateColor(int plateColor) {
		this.plateColor = plateColor;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Msg getMsg() {
		return msg;
	}

	public void setMsg(Msg msg) {
		this.msg = msg;
	}

	@Override
	public String toString() {
		return "VideoParam{" +
				"plateNo='" + plateNo + '\'' +
				", plateColor=" + plateColor +
				", mobileNumber='" + mobileNumber + '\'' +
				", msg=" + msg +
				'}';
	}

	public static class Msg implements Serializable{
		/**
		 * 逻辑通道号
		 */
		private int logicalChn;
		/**
		 * 数据类型
		 */
		private int dataType;
		/**
		 * 码流类型
		 */
		private int streamType;
		/**
		 * 视频服务器地址
		 */
		private String sinkIP;
		/**
		 * 视频服务器端口
		 */
		private int sinkPort;
		/**
		 * 控制指令
		 */
		private int ctrlCmd;
		/**
		 * 关闭音视频类型
		 */
		private int closeAVType;
		/**
		 * 切换码流类型
		 */
		private int changeStreamType;
		/**
		 * 丢包率
		 */
		private int lossRate;
		/**
		 * 音视频资源类型
		 */
		private int resourceType;
		/**
		 * 存储器类型
		 */
		private int storageType;
		/**
		 * 回放方式
		 */
		private int replayType;
		/**
		 * 快进或快退倍数
		 */
		private int multiples;
		/**
		 * 开始时间
		 */
		private String beginTime;
		/**
		 * 结束时间
		 */
		private String endTime;
		/**
		 * 拖动回放位置
		 */
		private String replayLocation;

		public String getReplayLocation() {
			return replayLocation;
		}

		public void setReplayLocation(String replayLocation) {
			this.replayLocation = replayLocation;
		}

		public int getCtrlCmd() {
			return ctrlCmd;
		}

		public void setCtrlCmd(int ctrlCmd) {
			this.ctrlCmd = ctrlCmd;
		}

		public int getCloseAVType() {
			return closeAVType;
		}

		public void setCloseAVType(int closeAVType) {
			this.closeAVType = closeAVType;
		}

		public int getChangeStreamType() {
			return changeStreamType;
		}

		public void setChangeStreamType(int changeStreamType) {
			this.changeStreamType = changeStreamType;
		}

		public int getLossRate() {
			return lossRate;
		}

		public void setLossRate(int lossRate) {
			this.lossRate = lossRate;
		}

		public int getResourceType() {
			return resourceType;
		}

		public void setResourceType(int resourceType) {
			this.resourceType = resourceType;
		}

		public int getStorageType() {
			return storageType;
		}

		public void setStorageType(int storageType) {
			this.storageType = storageType;
		}

		public int getReplayType() {
			return replayType;
		}

		public void setReplayType(int replayType) {
			this.replayType = replayType;
		}

		public int getMultiples() {
			return multiples;
		}

		public void setMultiples(int multiples) {
			this.multiples = multiples;
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

		public int getLogicalChn() {
			return logicalChn;
		}

		public void setLogicalChn(int logicalChn) {
			this.logicalChn = logicalChn;
		}

		public int getDataType() {
			return dataType;
		}

		public void setDataType(int dataType) {
			this.dataType = dataType;
		}

		public int getStreamType() {
			return streamType;
		}

		public void setStreamType(int streamType) {
			this.streamType = streamType;
		}

		public String getSinkIP() {
			return sinkIP;
		}

		public void setSinkIP(String sinkIP) {
			this.sinkIP = sinkIP;
		}

		public int getSinkPort() {
			return sinkPort;
		}

		public void setSinkPort(int sinkPort) {
			this.sinkPort = sinkPort;
		}

		@Override
		public String toString() {
			return "Msg{" +
					"logicalChn=" + logicalChn +
					", dataType=" + dataType +
					", streamType=" + streamType +
					", sinkIP='" + sinkIP + '\'' +
					", sinkPort=" + sinkPort +
					", ctrlCmd=" + ctrlCmd +
					", closeAVType=" + closeAVType +
					", changeStreamType=" + changeStreamType +
					", lossRate=" + lossRate +
					", resourceType=" + resourceType +
					", storageType=" + storageType +
					", replayType=" + replayType +
					", multiples=" + multiples +
					", beginTime='" + beginTime + '\'' +
					", endTime='" + endTime + '\'' +
					", replayLocation='" + replayLocation + '\'' +
					'}';
		}
	}
}
