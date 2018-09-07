package com.gjxx.system.service;

import com.baomidou.mybatisplus.service.IService;
import com.gjxx.system.entity.Menu;

import java.util.List;

/**
 * 菜单信息表操作相关
 */
public interface MenuService extends IService<Menu>{
	/**
	 * 根据用户ID查询系统菜单列表
	 * @param userId
	 * @return
	 */
	List<Menu> getAllowedMenu(Integer userId);

	/**
	 * 根据ID查询所有父级对象（包括对象本身）
	 * @param parentId
	 * @return
	 */
	List<Menu> selectParents(int parentId);

}
