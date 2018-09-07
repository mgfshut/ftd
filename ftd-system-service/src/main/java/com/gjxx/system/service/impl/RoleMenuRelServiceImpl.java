package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.RoleMenuRelMapper;
import com.gjxx.system.entity.RoleMenuRel;
import com.gjxx.system.service.RoleMenuRelService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 角色菜单关系表操作相关
 */
public class RoleMenuRelServiceImpl extends ServiceImpl<RoleMenuRelMapper, RoleMenuRel> implements RoleMenuRelService {

	@Autowired
	private RoleMenuRelMapper roleMenuRelMapper;

}
