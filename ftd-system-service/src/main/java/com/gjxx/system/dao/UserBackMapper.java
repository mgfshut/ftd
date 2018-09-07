package com.gjxx.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.gjxx.system.entity.UserBack;

/**
 * 后台用户操作相关
 */
public interface UserBackMapper extends BaseMapper<UserBack>{
	/**
	 * 新增
	 * @param userBack
	 * @return
	 */
	Integer insertSelective(UserBack userBack);
}
