package com.gjxx.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.gjxx.system.entity.Menu;

import java.util.List;

/**
 * 菜单信息表操作相关
 */
public interface MenuMapper extends BaseMapper<Menu>{
	/**
	 * 根据用户ID查询系统菜单列表
	 * @param id
	 * @return
	 */
	List<Menu> getAllowedMenu(Integer id);
}
