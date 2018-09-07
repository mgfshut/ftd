package com.gjxx.ftd.common;

import com.gjxx.core.common.LocationInfoQueryMsg;

import java.io.Serializable;

/**
 * @ Author     ：maogf
 * @ Date       ：2018/6/19 0019 17:10
 * @ Description：RTMP协议调用视频服务器接口参数对象
 */
public class VideoRtmpParam implements Serializable{
	/**
	 * 流媒体转发服务地址
	 */
	private String rtmpSvrIP;
	/**
	 * 流媒体转发服务RTMP通信端口
	 */
	private String rtmpSvrPort;
	/**
	 * 接入服务器地址
	 */
	private String pagIP;
	/**
	 * 接入服务器Http通信端口
	 */
	private  String pagPort;
	/**
	 * 车牌号 应采用UTF-8编码，并统一转换为IETF RFC 2854中application/x-www-form-URLencoded MIME格式
	 */
	private String vechileNo;
	/**
	 * 车辆颜色
	 */
	private String vechileColor;
	/**
	 * 终端手机号，固定为12位，手机号不足12位前面补0
	 */
	private String mobileNumber;
	/**
	 * 逻辑通道号
	 */
	private String logicalChn;
	/**
	 * 音视频标志
	 */
	private String dataType;
	/**
	 * 码流类型
	 */
	private String streamType;
	/**
	 * 存储位置
	 */
	private String storageType;
	/**
	 * 回放模式
	 */
	private String replayType;
	/**
	 * 快进或关键帧快退倍数
	 */
	private String multiples;
	/**
	 * 开始时间
	 */
	private String beginTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 当前终端所属线路，从1开始
	 */
	private String netZone;
	/**
	 * 取流校验口令，暂时保留，长度为64个ASII字符，每24h更新一次
	 */
	private String token;
	/**
	 * rtmpUrl
	 */
	private String rtmpUrl;
	/**
	 * 车牌号
	 */
	private String carLicense;
	/**
	 * 位置信息查询返回
	 */
	private LocationInfoQueryMsg locationInfoQueryMsg;

	public LocationInfoQueryMsg getLocationInfoQueryMsg() {
		return locationInfoQueryMsg;
	}

	public String getCarLicense() {
		return carLicense;
	}

	public void setCarLicense(String carLicense) {
		this.carLicense = carLicense;
	}

	public void setLocationInfoQueryMsg(LocationInfoQueryMsg locationInfoQueryMsg) {
		this.locationInfoQueryMsg = locationInfoQueryMsg;
	}

	public String getRtmpUrl() {
		return rtmpUrl;
	}

	public void setRtmpUrl(String rtmpUrl) {
		this.rtmpUrl = rtmpUrl;
	}

	public String getRtmpSvrIP() {
		return rtmpSvrIP;
	}

	public void setRtmpSvrIP(String rtmpSvrIP) {
		this.rtmpSvrIP = rtmpSvrIP;
	}

	public String getRtmpSvrPort() {
		return rtmpSvrPort;
	}

	public void setRtmpSvrPort(String rtmpSvrPort) {
		this.rtmpSvrPort = rtmpSvrPort;
	}

	public String getPagIP() {
		return pagIP;
	}

	public void setPagIP(String pagIP) {
		this.pagIP = pagIP;
	}

	public String getPagPort() {
		return pagPort;
	}

	public void setPagPort(String pagPort) {
		this.pagPort = pagPort;
	}

	public String getVechileNo() {
		return vechileNo;
	}

	public void setVechileNo(String vechileNo) {
		this.vechileNo = vechileNo;
	}

	public String getVechileColor() {
		return vechileColor;
	}

	public void setVechileColor(String vechileColor) {
		this.vechileColor = vechileColor;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getLogicalChn() {
		return logicalChn;
	}

	public void setLogicalChn(String logicalChn) {
		this.logicalChn = logicalChn;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getStreamType() {
		return streamType;
	}

	public void setStreamType(String streamType) {
		this.streamType = streamType;
	}

	public String getStorageType() {
		return storageType;
	}

	public void setStorageType(String storageType) {
		this.storageType = storageType;
	}

	public String getReplayType() {
		return replayType;
	}

	public void setReplayType(String replayType) {
		this.replayType = replayType;
	}

	public String getMultiples() {
		return multiples;
	}

	public void setMultiples(String multiples) {
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

	public String getNetZone() {
		return netZone;
	}

	public void setNetZone(String netZone) {
		this.netZone = netZone;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
