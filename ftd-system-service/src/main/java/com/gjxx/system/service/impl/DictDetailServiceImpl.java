package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.DictDetailMapper;
import com.gjxx.system.entity.DictDetail;
import com.gjxx.system.service.DictDetailService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 数据字典参数操作相关
 */
public class DictDetailServiceImpl extends ServiceImpl<DictDetailMapper, DictDetail> implements DictDetailService {

	@Autowired
	private DictDetailMapper dictDetailMapper;

}
