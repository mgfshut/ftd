package com.gjxx.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.gjxx.system.dao.OperateLogMapper;
import com.gjxx.system.entity.OperateLog;
import com.gjxx.system.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 操作日志表操作相关
 */
public class OperateLogServiceImpl extends ServiceImpl<OperateLogMapper, OperateLog> implements OperateLogService {

	@Autowired
	private OperateLogMapper operateLogMapper;

}
