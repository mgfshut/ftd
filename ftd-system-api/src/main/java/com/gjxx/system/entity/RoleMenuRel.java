package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 角色菜单关系表
*/
@TableName("sys_role_menu_rel")
public class RoleMenuRel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 角色菜单关系ID
	 */
	private Integer id;
	/**
	 * 角色ID
	 */
	private Integer roleId;
	/**
	 * 菜单ID
	 */
	private Integer menuId;
	
	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setRoleId(Integer roleId){
		this.roleId=roleId;
	}
	public Integer getRoleId(){
		return this.roleId;
	}
	
	public void setMenuId(Integer menuId){
		this.menuId=menuId;
	}
	public Integer getMenuId(){
		return this.menuId;
	}
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("RoleMenuRel[");
		sb.append("id=");
		sb.append(id);
		sb.append(",roleId=");
		sb.append(roleId);
		sb.append(",menuId=");
		sb.append(menuId);
		sb.append("]");
		return sb.toString();
	}
}
