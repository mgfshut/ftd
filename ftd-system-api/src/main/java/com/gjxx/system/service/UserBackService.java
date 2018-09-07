package com.gjxx.system.service;

import com.baomidou.mybatisplus.service.IService;
import com.gjxx.system.entity.UserBack;

/**
 * 后台用户操作相关
 */
public interface UserBackService extends IService<UserBack>{
	/**
	 * 新增或修改用户
	 * @param userBack
	 */
	boolean addUserBack(UserBack userBack);

}
