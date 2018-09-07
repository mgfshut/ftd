package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 操作日志表
*/
@TableName("sys_operate_log")
public class OperateLog implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 操作日志ID
	 */
	private Integer id;
	/**
	 * 操作人
	 */
	private String operateUser;
	/**
	 * 登录IP
	 */
	private String operateIp;
	/**
	 * 操作类型
	 */
	private String operateType;
	/**
	 * 操作目标
	 */
	private String operateObject;
	/**
	 * 操作详情
	 */
	private String operateDetail;
	/**
	 * 操作时间
	 */
	private String operateTime;
	
	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setOperateUser(String operateUser){
		this.operateUser=operateUser;
	}
	public String getOperateUser(){
		return this.operateUser;
	}
	
	public void setOperateIp(String operateIp){
		this.operateIp=operateIp;
	}
	public String getOperateIp(){
		return this.operateIp;
	}
	
	public void setOperateType(String operateType){
		this.operateType=operateType;
	}
	public String getOperateType(){
		return this.operateType;
	}
	
	public void setOperateObject(String operateObject){
		this.operateObject=operateObject;
	}
	public String getOperateObject(){
		return this.operateObject;
	}
	
	public void setOperateDetail(String operateDetail){
		this.operateDetail=operateDetail;
	}
	public String getOperateDetail(){
		return this.operateDetail;
	}
	
	public void setOperateTime(String operateTime){
		this.operateTime=operateTime;
	}
	public String getOperateTime(){
		return this.operateTime;
	}
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("OperateLog[");
		sb.append("id=");
		sb.append(id);
		sb.append(",operateUser=");
		sb.append(operateUser);
		sb.append(",operateIp=");
		sb.append(operateIp);
		sb.append(",operateType=");
		sb.append(operateType);
		sb.append(",operateObject=");
		sb.append(operateObject);
		sb.append(",operateDetail=");
		sb.append(operateDetail);
		sb.append(",operateTime=");
		sb.append(operateTime);
		sb.append("]");
		return sb.toString();
	}
}
