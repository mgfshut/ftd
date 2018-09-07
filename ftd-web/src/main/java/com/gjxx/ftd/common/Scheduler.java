package com.gjxx.ftd.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

/**
 * Created by Administrator on 2018/4/28 0028.
 */
@Controller
public class Scheduler {

	private static Logger logger= LoggerFactory.getLogger(Scheduler.class);
	/**
	 * 定时任务，每个整点统计一次
	 */
	public void timingCountJob(){
		System.out.println("定时任务，每个整点统计一次");
	}
}
