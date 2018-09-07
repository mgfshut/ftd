package com.gjxx.core.type;

/**
 * Created by Administrator on 2018/1/30 0030.
 */
public enum LogType {
	OHTHER("99", "其它"), LOGIN("01", "登录"),
	UserBack("02", "后台用户"), Role("03", "角色"),
	Menu("04", "菜单"),DictDefine("05", "系统参数"),
	DictDetail("06", "参数明细"),
	CAR("07", "车辆"), DRIVER("08", "驾驶员"),
	COMPANY("09", "企业"),TERMINAL("10", "终端"),
	photoScreen("11", "拍照"),textSend("12", "文本信息下发"),
	paramSet("13", "参数设置"),phoneCarMonitor("14", "监听"),
	phoneCarTalk("15", "语音对讲"),warning("16", "报警信息");

	private String value;
	private String desc;

	public static LogType get(String value) {
		if(value == null) {
			return OHTHER;
		} else {
			LogType[] items = values();
			LogType[] arr$ = items;
			int len$ = items.length;

			for(int i$ = 0; i$ < len$; ++i$) {
				LogType item = arr$[i$];
				if(item.getValue().equals(value)) {
					return item;
				}
			}

			return OHTHER;
		}
	}

	private LogType(String value, String desc) {
		this.value = value;
		this.desc = desc;
	}

	public String getValue() {
		return this.value;
	}

	public String getDesc() {
		return this.desc;
	}
}
