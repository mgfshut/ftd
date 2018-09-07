package com.gjxx.ftd.common;

/**
 * Created by Administrator on 2018/2/27 0027.
 */
public class TempDemo {
	/**
	 * SIM卡号
	 */
	private String simCardNo;
	/**
	 * 经度
	 */
	private String longitude;
	/**
	 * 纬度
	 */
	private String latitude;
	/**
	 * 视频播放请求是否成功
	 */
	private boolean playBool;

	public boolean isPlayBool() {
		return playBool;
	}

	public void setPlayBool(boolean playBool) {
		this.playBool = playBool;
	}

	public String getSimCardNo() {
		return simCardNo;
	}

	public void setSimCardNo(String simCardNo) {
		this.simCardNo = simCardNo;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
}
