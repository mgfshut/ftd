package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.List;

/**
* 后台用户
*/
@TableName("sys_user_back")
public class UserBack implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 后台用户ID
	 */
	private Integer id;
	/**
	 * 用户名
	 */
	private String userName;
	/**
	 * 手机号
	 */
	private String phone;
	/**
	 * 邮箱
	 */
	private String email;
	/**
	 * 密码
	 */
	private String password;
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
	 * 角色列表
	 */
	@TableField(exist = false)
	private List<Role> roleList;
	/**
	 * 菜单列表
	 */
	@TableField(exist = false)
	private List<Integer> menuList;
	/**
	 * 确认密码
	 */
	@TableField(exist = false)
	private String confirmPassword;
	/**
	 * 角色ID数组
	 */
	@TableField(exist = false)
	private Integer[] roleIds;
	/**
	 * token
	 */
	@TableField(exist = false)
	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Integer[] getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(Integer[] roleIds) {
		this.roleIds = roleIds;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	public List<Integer> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<Integer> menuList) {
		this.menuList = menuList;
	}

	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setUserName(String userName){
		this.userName=userName;
	}
	public String getUserName(){
		return this.userName;
	}
	
	public void setPhone(String phone){
		this.phone=phone;
	}
	public String getPhone(){
		return this.phone;
	}
	
	public void setEmail(String email){
		this.email=email;
	}
	public String getEmail(){
		return this.email;
	}
	
	public void setPassword(String password){
		this.password=password;
	}
	public String getPassword(){
		return this.password;
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
		sb.append("UserBack[");
		sb.append("id=");
		sb.append(id);
		sb.append(",userName=");
		sb.append(userName);
		sb.append(",phone=");
		sb.append(phone);
		sb.append(",email=");
		sb.append(email);
		sb.append(",password=");
		sb.append(password);
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
