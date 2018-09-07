package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 用户角色关系表
*/
@TableName("sys_user_role_rel")
public class UserRoleRel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 用户角色关系ID
	 */
	private Integer id;
	/**
	 * 用户ID
	 */
	private Integer userId;
	/**
	 * 角色ID
	 */
	private Integer roleId;
	
	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setUserId(Integer userId){
		this.userId=userId;
	}
	public Integer getUserId(){
		return this.userId;
	}
	
	public void setRoleId(Integer roleId){
		this.roleId=roleId;
	}
	public Integer getRoleId(){
		return this.roleId;
	}
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("UserRoleRel[");
		sb.append("id=");
		sb.append(id);
		sb.append(",userId=");
		sb.append(userId);
		sb.append(",roleId=");
		sb.append(roleId);
		sb.append("]");
		return sb.toString();
	}
}
