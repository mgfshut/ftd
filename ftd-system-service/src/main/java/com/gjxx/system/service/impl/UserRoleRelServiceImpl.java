package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.UserRoleRelMapper;
import com.gjxx.system.entity.UserRoleRel;
import com.gjxx.system.service.UserRoleRelService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 用户角色关系表操作相关
 */
public class UserRoleRelServiceImpl extends ServiceImpl<UserRoleRelMapper, UserRoleRel> implements UserRoleRelService {

	@Autowired
	private UserRoleRelMapper userRoleRelMapper;

}
