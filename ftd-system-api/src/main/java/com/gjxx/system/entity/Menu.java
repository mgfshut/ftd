package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
* 菜单信息表
*/
@TableName("sys_menu")
public class Menu implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 菜单ID
	 */
	private Integer id;
	/**
	 * 上级菜单ID
	 */
	private Integer parentId;
	/**
	 * 菜单名称
	 */
	private String menuName;
	/**
	 * 菜单类型
	 */
	private String menuType;
	/**
	 * 菜单路径
	 */
	private String menuUrl;
	/**
	 * 菜单图标
	 */
	private String menuIcon;
	/**
	 * 菜单状态
	 */
	private String menuStatus;
	/**
	 * 菜单顺序
	 */
	private String menuSeq;
	/**
	 * 创建人
	 */
	private String createUser;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 修改人
	 */
	private String updateUser;
	/**
	 * 修改时间
	 */
	private String updateTime;
	/**
	 * 子级菜单
	 */
	@TableField(exist = false)
	private List<Menu> childrens = new ArrayList<Menu>();
	/**
	 * 菜单名称
	 */
	@TableField(exist = false)
	private String name;

	public void setEntity(Menu menu){
		setId(menu.getId());
		setParentId(menu.getParentId());
		setMenuName(menu.getMenuName());
		setMenuType(menu.getMenuType());
		setMenuUrl(menu.getMenuUrl());
		setMenuIcon(menu.getMenuIcon());
		setMenuStatus(menu.getMenuStatus());
		setMenuSeq(menu.getMenuSeq());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addChildren(Menu menu){
		this.childrens.add(menu);
	}

	public List<Menu> getChildrens() {
		return childrens;
	}

	public void setChildrens(List<Menu> childrens) {
		this.childrens = childrens;
	}

	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setParentId(Integer parentId){
		this.parentId=parentId;
	}
	public Integer getParentId(){
		return this.parentId;
	}
	
	public void setMenuName(String menuName){
		this.menuName=menuName;
	}
	public String getMenuName(){
		return this.menuName;
	}
	
	public void setMenuType(String menuType){
		this.menuType=menuType;
	}
	public String getMenuType(){
		return this.menuType;
	}
	
	public void setMenuUrl(String menuUrl){
		this.menuUrl=menuUrl;
	}
	public String getMenuUrl(){
		return this.menuUrl;
	}
	
	public void setMenuIcon(String menuIcon){
		this.menuIcon=menuIcon;
	}
	public String getMenuIcon(){
		return this.menuIcon;
	}
	
	public void setMenuStatus(String menuStatus){
		this.menuStatus=menuStatus;
	}
	public String getMenuStatus(){
		return this.menuStatus;
	}
	
	public void setMenuSeq(String menuSeq){
		this.menuSeq=menuSeq;
	}
	public String getMenuSeq(){
		return this.menuSeq;
	}
	
	public void setCreateUser(String createUser){
		this.createUser=createUser;
	}
	public String getCreateUser(){
		return this.createUser;
	}
	
	public void setCreateTime(String createTime){
		this.createTime=createTime;
	}
	public String getCreateTime(){
		return this.createTime;
	}
	
	public void setUpdateUser(String updateUser){
		this.updateUser=updateUser;
	}
	public String getUpdateUser(){
		return this.updateUser;
	}
	
	public void setUpdateTime(String updateTime){
		this.updateTime=updateTime;
	}
	public String getUpdateTime(){
		return this.updateTime;
	}
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("Menu[");
		sb.append("id=");
		sb.append(id);
		sb.append(",parentId=");
		sb.append(parentId);
		sb.append(",menuName=");
		sb.append(menuName);
		sb.append(",menuType=");
		sb.append(menuType);
		sb.append(",menuUrl=");
		sb.append(menuUrl);
		sb.append(",menuIcon=");
		sb.append(menuIcon);
		sb.append(",menuStatus=");
		sb.append(menuStatus);
		sb.append(",menuSeq=");
		sb.append(menuSeq);
		sb.append(",createUser=");
		sb.append(createUser);
		sb.append(",createTime=");
		sb.append(createTime);
		sb.append(",updateUser=");
		sb.append(updateUser);
		sb.append(",updateTime=");
		sb.append(updateTime);
		sb.append("]");
		return sb.toString();
	}
}
