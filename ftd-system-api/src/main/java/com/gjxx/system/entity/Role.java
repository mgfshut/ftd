package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 角色信息表
*/
@TableName("sys_role")
public class Role implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 角色ID
	 */
	private Integer id;
	/**
	 * 角色名称
	 */
	private String roleName;
	/**
	 * 角色状态
	 */
	private String roleStatus;
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
	 * 是否拥有
	 */
	@TableField(exist = false)
	private boolean checked;

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setRoleName(String roleName){
		this.roleName=roleName;
	}
	public String getRoleName(){
		return this.roleName;
	}
	
	public void setRoleStatus(String roleStatus){
		this.roleStatus=roleStatus;
	}
	public String getRoleStatus(){
		return this.roleStatus;
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
		sb.append("Role[");
		sb.append("id=");
		sb.append(id);
		sb.append(",roleName=");
		sb.append(roleName);
		sb.append(",roleStatus=");
		sb.append(roleStatus);
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
