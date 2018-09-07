package com.gjxx.core.common;


/**
 * 位置信息汇报消息
 */
public class LocationInfoUploadMsg extends PackageData {
	// 告警信息
	// byte[0-3]
	private String warningFlagField;
	// byte[4-7] 状态(DWORD(32))
	private String statusField;
	// byte[8-11] 纬度(DWORD(32))
	private long latitude;
	// byte[12-15] 经度(DWORD(32))
	private long longitude;
	// byte[16-17] 高程(WORD(16)) 海拔高度，单位为米（ m）
	// TODO ==>int?海拔
	private int elevation;
	// byte[18-19] 速度(WORD) 1/10km/h
	// TODO ==>long?速度
	private long speed;
	// byte[20-21] 方向(WORD) 0-359，正北为 0，顺时针
	private int direction;
	// byte[22-x] 时间(BCD[6]) YY-MM-DD-hh-mm-ss
	// GMT+8 时间，本标准中之后涉及的时间均采用此时区
	private String TrajectoryTime;
	// byte[28-29] 附加信息ID
	private String addInfoId;
	// byte[30-x] 附加信息
	private String addInfo;

	public String getAddInfoId() {
		return addInfoId;
	}

	public void setAddInfoId(String addInfoId) {
		this.addInfoId = addInfoId;
	}

	public String getAddInfo() {
		return addInfo;
	}

	public void setAddInfo(String addInfo) {
		this.addInfo = addInfo;
	}

	public LocationInfoUploadMsg() {
	}

	public LocationInfoUploadMsg(PackageData packageData) {
		this();
		this.channel = packageData.getChannel();
		this.checkSum = packageData.getCheckSum();
		this.calculatedCheckSum = packageData.getCalculatedCheckSum();
		this.msgBodyBytes = packageData.getMsgBodyBytes();
		this.msgHeader = packageData.getMsgHeader();
	}

	public long getLatitude() {
		return latitude;
	}

	public void setLatitude(long latitude) {
		this.latitude = latitude;
	}

	public long getLongitude() {
		return longitude;
	}

	public void setLongitude(long longitude) {
		this.longitude = longitude;
	}

	public int getElevation() {
		return elevation;
	}

	public void setElevation(int elevation) {
		this.elevation = elevation;
	}

	public long getSpeed() {
		return speed;
	}

	public void setSpeed(long speed) {
		this.speed = speed;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}
	public String getTrajectoryTime() {
		return TrajectoryTime;
	}

	public void setTrajectoryTime(String trajectoryTime) {
		TrajectoryTime = trajectoryTime;
	}

	public String getWarningFlagField() {
		return warningFlagField;
	}

	public void setWarningFlagField(String warningFlagField) {
		this.warningFlagField = warningFlagField;
	}

	public String getStatusField() {
		return statusField;
	}

	public void setStatusField(String statusField) {
		this.statusField = statusField;
	}

	@Override
	public String toString() {
		return "LocationInfoUploadMsg{" +
				"warningFlagField=" + warningFlagField +
				", statusField=" + statusField +
				", latitude=" + latitude +
				", longitude=" + longitude +
				", elevation=" + elevation +
				", speed=" + speed +
				", direction=" + direction +
				", TrajectoryTime='" + TrajectoryTime + '\'' +
				", addInfoId='" + addInfoId + '\'' +
				", addInfo='" + addInfo + '\'' +
				'}';
	}
}
