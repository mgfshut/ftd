package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.MenuMapper;
import com.gjxx.system.entity.Menu;
import com.gjxx.system.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单信息表操作相关
 */
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

	@Autowired
	private MenuMapper menuMapper;
	@Override
	public List<Menu> getAllowedMenu(Integer userId) {
		return menuMapper.getAllowedMenu(userId);
	}

	@Override
	public List<Menu> selectParents(int parentId) {
		List<Menu> parents = new ArrayList<>();
		Menu menu1 = menuMapper.selectById(parentId);
		if(menu1 != null){
			parents.add(menu1);
			Menu menu2 = menuMapper.selectById(menu1.getParentId());
			if(menu2 != null){
				parents.add(menu2);
				Menu menu3 = menuMapper.selectById(menu2.getParentId());
				if(menu3 != null){
					parents.add(menu3);
				}
			}
		}
		return parents;
	}
}
