package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.DictDefineMapper;
import com.gjxx.system.entity.DictDefine;
import com.gjxx.system.service.DictDefineService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 数据字典定义操作相关
 */
public class DictDefineServiceImpl extends ServiceImpl<DictDefineMapper, DictDefine> implements DictDefineService {

	@Autowired
	private DictDefineMapper dictDefineMapper;

}
