package com.gjxx.system.entity;

import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
* 参数明细
*/
@TableName("sys_dict_detail")
public class DictDetail implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 参数明细ID
	 */
	private Integer id;
	/**
	 * 系统参数ID
	 */
	private Integer dictDefineId;
	/**
	 * 参数明细名称
	 */
	private String dictDetailName;
	/**
	 * 参数明细值
	 */
	private String dictDetailValue;
	/**
	 * 参数明细描述
	 */
	private String dictDetailDescribe;
	/**
	 * 参数明细状态
	 */
	private String dictDetailStatus;
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

	public void setDictDefineId(Integer dictDefineId){
		this.dictDefineId=dictDefineId;
	}
	public Integer getDictDefineId(){
		return this.dictDefineId;
	}

	public void setDictDetailName(String dictDetailName){
		this.dictDetailName=dictDetailName;
	}
	public String getDictDetailName(){
		return this.dictDetailName;
	}

	public void setDictDetailValue(String dictDetailValue){
		this.dictDetailValue=dictDetailValue;
	}
	public String getDictDetailValue(){
		return this.dictDetailValue;
	}

	public void setDictDetailDescribe(String dictDetailDescribe){
		this.dictDetailDescribe=dictDetailDescribe;
	}
	public String getDictDetailDescribe(){
		return this.dictDetailDescribe;
	}

	public void setDictDetailStatus(String dictDetailStatus){
		this.dictDetailStatus=dictDetailStatus;
	}
	public String getDictDetailStatus(){
		return this.dictDetailStatus;
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
		sb.append("DictDetail[");
		sb.append("id=");
		sb.append(id);
		sb.append(",dictDefineId=");
		sb.append(dictDefineId);
		sb.append(",dictDetailName=");
		sb.append(dictDetailName);
		sb.append(",dictDetailValue=");
		sb.append(dictDetailValue);
		sb.append(",dictDetailDescribe=");
		sb.append(dictDetailDescribe);
		sb.append(",dictDetailStatus=");
		sb.append(dictDetailStatus);
		sb.append(",createTime=");
		sb.append(createTime);
		sb.append(",updateTime=");
		sb.append(updateTime);
		sb.append("]");
		return sb.toString();
	}
}
