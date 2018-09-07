package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 系统参数定义
*/
@TableName("sys_dict_define")
public class DictDefine implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 系统参数ID
	 */
	private Integer id;
	/**
	 * 系统参数名称
	 */
	private String dictDefineName;
	/**
	 * 系统参数描述
	 */
	private String dictDefineDescribe;
	/**
	 * 系统参数状态
	 */
	private String dictDefineStatus;
	/**
	 * 创建时间
	 */
	private String createTime;
	/**
	 * 修改时间
	 */
	private String updateTime;
	
	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setDictDefineName(String dictDefineName){
		this.dictDefineName=dictDefineName;
	}
	public String getDictDefineName(){
		return this.dictDefineName;
	}
	
	public void setDictDefineDescribe(String dictDefineDescribe){
		this.dictDefineDescribe=dictDefineDescribe;
	}
	public String getDictDefineDescribe(){
		return this.dictDefineDescribe;
	}
	
	public void setDictDefineStatus(String dictDefineStatus){
		this.dictDefineStatus=dictDefineStatus;
	}
	public String getDictDefineStatus(){
		return this.dictDefineStatus;
	}
	
	public void setCreateTime(String createTime){
		this.createTime=createTime;
	}
	public String getCreateTime(){
		return this.createTime;
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
		sb.append("DictDefine[");
		sb.append("id=");
		sb.append(id);
		sb.append(",dictDefineName=");
		sb.append(dictDefineName);
		sb.append(",dictDefineDescribe=");
		sb.append(dictDefineDescribe);
		sb.append(",dictDefineStatus=");
		sb.append(dictDefineStatus);
		sb.append(",createTime=");
		sb.append(createTime);
		sb.append(",updateTime=");
		sb.append(updateTime);
		sb.append("]");
		return sb.toString();
	}
}
