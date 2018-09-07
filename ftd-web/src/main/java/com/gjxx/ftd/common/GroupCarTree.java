package com.gjxx.ftd.common;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
* 分组车辆树
*/
public class GroupCarTree implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * ID
	 */
	private String id;
	/**
	 * 上级ID
	 */
	private String pId;
	/**
	 * 节点名称
	 */
	private String name;
	/**
	 * 是否展开
	 */
	private boolean open;
	/**
	 * 是否父节点
	 */
	private boolean isParent;
	/**
	 * 是否有单击事件
	 */
	private boolean click;
	/**
	 * 节点图标
	 */
	private String icon;

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public boolean isClick() {
		return click;
	}

	public void setClick(boolean click) {
		this.click = click;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isOpen() {
		return open;
	}

	public void setOpen(boolean open) {
		this.open = open;
	}

	@JsonProperty(value = "isParent")
	public boolean isParent() {
		return isParent;
	}

	public void setParent(boolean parent) {
		isParent = parent;
	}
}
