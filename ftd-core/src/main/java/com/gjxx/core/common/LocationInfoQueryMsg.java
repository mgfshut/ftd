package com.gjxx.core.common;

/**
 * 位置信息查询
 */
public class LocationInfoQueryMsg extends PackageData{
	// 位置信息查询流水号
	// byte[0-1]
	private int msgFlowId;
	// 告警信息
	// byte[2-5]
	private String warningFlagField;
	// byte[6-9] 状态(DWORD(32))
	private String statusField;
	// byte[10-13] 纬度(DWORD(32))
	private String latitude;
	// byte[14-17] 经度(DWORD(32))
	private String longitude;
	// byte[18-19] 高程(WORD(16)) 海拔高度，单位为米（ m）
	// TODO ==>int?海拔
	private int elevation;
	// byte[20-21] 速度(WORD) 1/10km/h
	// TODO ==>String?速度
	private String speed;
	// byte[22-23] 方向(WORD) 0-359，正北为 0，顺时针
	private int direction;
	// byte[24-x] 时间(BCD[6]) YY-MM-DD-hh-mm-ss
	// GMT+8 时间，本标准中之后涉及的时间均采用此时区
	private String TrajectoryTime;
	// byte[30-31] 附加信息ID
	private String addInfoId;
	// byte[31-x] 附加信息
	private String addInfo;
	/**
	 * 车牌号码
	 */
	private String carLicense;
	/**
	 * 车辆型号
	 */
	private String carModel;
	/**
	 * 企业名称
	 */
	private String companyName;
	/**
	 * 在线状态
	 */
	private String onlineStatus;
	/**
	 * 位置
	 */
	private String location;
	/**
	 * 发动机状态
	 */
	private String accStatus;

	public String getAccStatus() {
		return accStatus;
	}

	public void setAccStatus(String accStatus) {
		this.accStatus = accStatus;
	}

	public String getCarLicense() {
		return carLicense;
	}

	public void setCarLicense(String carLicense) {
		this.carLicense = carLicense;
	}

	public String getCarModel() {
		return carModel;
	}

	public void setCarModel(String carModel) {
		this.carModel = carModel;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getOnlineStatus() {
		return onlineStatus;
	}

	public void setOnlineStatus(String onlineStatus) {
		this.onlineStatus = onlineStatus;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public LocationInfoQueryMsg() {}

	public LocationInfoQueryMsg(PackageData packageData) {
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

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public int getElevation() {
		return elevation;
	}

	public void setElevation(int elevation) {
		this.elevation = elevation;
	}

	public String getSpeed() {
		return speed;
	}

	public void setSpeed(String speed) {
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

	@Override
	public String toString() {
		return "LocationInfoQueryMsg{" +
				"msgFlowId=" + msgFlowId +
				", warningFlagField=" + warningFlagField +
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
