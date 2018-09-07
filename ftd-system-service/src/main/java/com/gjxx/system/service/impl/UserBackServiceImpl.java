package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.toolkit.ArrayUtils;
import com.gjxx.system.dao.UserBackMapper;
import com.gjxx.system.entity.UserBack;
import com.gjxx.system.entity.UserRoleRel;
import com.gjxx.system.service.UserBackService;
import com.gjxx.system.service.UserRoleRelService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * 后台用户操作相关
 */
public class UserBackServiceImpl extends ServiceImpl<UserBackMapper, UserBack> implements UserBackService {

	@Autowired
	private UserBackMapper userBackMapper;
	@Autowired
	private UserRoleRelService userRoleRelService;

	@Override
	public boolean addUserBack(UserBack userBack) {
		boolean result = true;
		if (userBack.getId() != null) {
			userRoleRelService.delete(new EntityWrapper<UserRoleRel>().eq("user_id", userBack.getId()));
			result = insertOrUpdate(userBack);
		}else{
			userBackMapper.insertSelective(userBack);
		}
		if (ArrayUtils.isEmpty(userBack.getRoleIds())) {
			return result;
		}
		List<UserRoleRel> list = new ArrayList<>();
		for (Integer roleId : userBack.getRoleIds()) {
			UserRoleRel item = new UserRoleRel();
			item.setUserId(userBack.getId());
			item.setRoleId(roleId);
			list.add(item);
		}
		result = userRoleRelService.insertBatch(list);
		return result;
	}
}
