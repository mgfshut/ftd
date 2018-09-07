package com.gjxx.ftd.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.ftd.entity.Company;
import com.gjxx.ftd.service.CompanyService;
import com.gjxx.ftd.dao.CompanyMapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 企业信息表操作相关
 */
public class CompanyServiceImpl extends ServiceImpl<CompanyMapper, Company> implements CompanyService {

	@Autowired
	private CompanyMapper companyMapper;

}
