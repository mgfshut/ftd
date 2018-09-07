package com.gjxx.ftd.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;
import java.math.BigDecimal;

/**
* 企业信息表
*/
@TableName("g_company")
public class Company extends Model<Company> {

	private static final long serialVersionUID = 1L;
	
	/**
	 * ID
	 */
	private Integer id;
	/**
	 * 企业全称
	 */
	private String fullName;
	/**
	 * 企业名称
	 */
	private String name;
	/**
	 * 归属类型
	 */
	private String belongType;
	/**
	 * 统一社会信用代码
	 */
	private String unifiedSocialCreditCode;
	/**
	 * 企业性质
	 */
	private String nature;
	/**
	 * 成立日期
	 */
	private String establishmenDate;
	/**
	 * 联系人
	 */
	private String linkman;
	/**
	 * 联系方式
	 */
	private String linkWay;
	/**
	 * 办公电话
	 */
	private String officePhone;
	/**
	 * 经营许可证号
	 */
	private String businessLicense;
	/**
	 * 经营范围
	 */
	private String businessScope;
	/**
	 * 核发机关
	 */
	private String nuclearAuthority;
	/**
	 * 核发日期
	 */
	private String nuclearDate;
	/**
	 * 有效起始日期
	 */
	private String validStartTime;
	/**
	 * 有效截止日期
	 */
	private String validEndTime;
	/**
	 * 证照状态
	 */
	private String evidenceState;
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

	public String getUnifiedSocialCreditCode() {
		return unifiedSocialCreditCode;
	}

	public void setUnifiedSocialCreditCode(String unifiedSocialCreditCode) {
		this.unifiedSocialCreditCode = unifiedSocialCreditCode;
	}

	public void setId(Integer id){
		this.id=id;
	}
	public Integer getId(){
		return this.id;
	}
	
	public void setFullName(String fullName){
		this.fullName=fullName;
	}
	public String getFullName(){
		return this.fullName;
	}
	
	public void setName(String name){
		this.name=name;
	}
	public String getName(){
		return this.name;
	}
	
	public void setBelongType(String belongType){
		this.belongType=belongType;
	}
	public String getBelongType(){
		return this.belongType;
	}
	
	public void setNature(String nature){
		this.nature=nature;
	}
	public String getNature(){
		return this.nature;
	}
	
	public void setEstablishmenDate(String establishmenDate){
		this.establishmenDate=establishmenDate;
	}
	public String getEstablishmenDate(){
		return this.establishmenDate;
	}
	
	public void setLinkman(String linkman){
		this.linkman=linkman;
	}
	public String getLinkman(){
		return this.linkman;
	}
	
	public void setLinkWay(String linkWay){
		this.linkWay=linkWay;
	}
	public String getLinkWay(){
		return this.linkWay;
	}
	
	public void setOfficePhone(String officePhone){
		this.officePhone=officePhone;
	}
	public String getOfficePhone(){
		return this.officePhone;
	}
	
	public void setBusinessLicense(String businessLicense){
		this.businessLicense=businessLicense;
	}
	public String getBusinessLicense(){
		return this.businessLicense;
	}
	
	public void setBusinessScope(String businessScope){
		this.businessScope=businessScope;
	}
	public String getBusinessScope(){
		return this.businessScope;
	}
	
	public void setNuclearAuthority(String nuclearAuthority){
		this.nuclearAuthority=nuclearAuthority;
	}
	public String getNuclearAuthority(){
		return this.nuclearAuthority;
	}
	
	public void setNuclearDate(String nuclearDate){
		this.nuclearDate=nuclearDate;
	}
	public String getNuclearDate(){
		return this.nuclearDate;
	}
	
	public void setValidStartTime(String validStartTime){
		this.validStartTime=validStartTime;
	}
	public String getValidStartTime(){
		return this.validStartTime;
	}
	
	public void setValidEndTime(String validEndTime){
		this.validEndTime=validEndTime;
	}
	public String getValidEndTime(){
		return this.validEndTime;
	}
	
	public void setEvidenceState(String evidenceState){
		this.evidenceState=evidenceState;
	}
	public String getEvidenceState(){
		return this.evidenceState;
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
	public String toString() {
		return "Company{" +
				"id=" + id +
				", fullName='" + fullName + '\'' +
				", name='" + name + '\'' +
				", belongType='" + belongType + '\'' +
				", unifiedSocialCreditCode='" + unifiedSocialCreditCode + '\'' +
				", nature='" + nature + '\'' +
				", establishmenDate='" + establishmenDate + '\'' +
				", linkman='" + linkman + '\'' +
				", linkWay='" + linkWay + '\'' +
				", officePhone='" + officePhone + '\'' +
				", businessLicense='" + businessLicense + '\'' +
				", businessScope='" + businessScope + '\'' +
				", nuclearAuthority='" + nuclearAuthority + '\'' +
				", nuclearDate='" + nuclearDate + '\'' +
				", validStartTime='" + validStartTime + '\'' +
				", validEndTime='" + validEndTime + '\'' +
				", evidenceState='" + evidenceState + '\'' +
				", createUser='" + createUser + '\'' +
				", createTime='" + createTime + '\'' +
				", updateUser='" + updateUser + '\'' +
				", updateTime='" + updateTime + '\'' +
				'}';
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}
}
