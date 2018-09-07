package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.RoleMapper;
import com.gjxx.system.entity.Role;
import com.gjxx.system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 角色信息表操作相关
 */
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

	@Autowired
	private RoleMapper roleMapper;

}
