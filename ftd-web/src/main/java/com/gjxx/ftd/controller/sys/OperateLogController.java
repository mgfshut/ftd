package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.OperateLog;
import com.gjxx.system.service.OperateLogService;
import com.gjxx.core.utils.ErrorCodeType;
import com.gjxx.core.utils.RedisUtil;
import com.gjxx.core.utils.ResultEntity;
import com.gjxx.core.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 操作日志表
 */
@Controller
@RequestMapping(value = "/operateLog")
public class OperateLogController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(OperateLogController.class);

    @Autowired
    private OperateLogService operateLogService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> logTypeMap = jedis.hgetAll("dict:logType");
        model.addAttribute("logTypeMap", logTypeMap);
        jedis.close();
        return "sys/operateLog/listOperateLog";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id){
        if (id != null) {
            OperateLog item = operateLogService.selectById(id);
            model.addAttribute("item", item);
        }
        return "sys/operateLog/addOperateLog";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            OperateLog item = operateLogService.selectById(id);
            Jedis jedis = RedisUtil.getJedis();
            Map<String, String> logTypeMap = jedis.hgetAll("dict:logType");
            jedis.close();
            item.setOperateType(logTypeMap.get(item.getOperateType()));
            model.addAttribute("item", item);
        }
        return "sys/operateLog/viewOperateLog";
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
              String operateUser, String operateIp, String operateType,
              String operate_start_time, String operate_end_time) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<OperateLog> entityWrapper = new EntityWrapper<>();
            if(operateUser != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateUser"),operateUser);
            }
            if(operateIp != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateIp"),operateIp);
            }
            if(operateType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateType"),operateType);
            }
            if (operate_start_time != null) {
                operate_start_time = operate_start_time + " 00:00:00";
                entityWrapper.ge("operate_time",operate_start_time);
            }
            if (operate_end_time != null) {
                operate_end_time = operate_end_time + " 23:59:59";
                entityWrapper.le("operate_time",operate_end_time);
            }
            if (rows == null) {
                rows = 10;
            }
            if (pageIndex == null) {
                pageIndex = 1;
            }
            Page<OperateLog> page = new Page<>(pageIndex, rows);
            Page<OperateLog> pageList = operateLogService.selectPage(page,
                    entityWrapper.orderBy("operate_time",false));
            List<OperateLog> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> logTypeMap = jedis.hgetAll("dict:logType");
                jedis.close();
                for(OperateLog operateLog:list){
                    operateLog.setOperateType(logTypeMap.get(operateLog.getOperateType()));
                    if(operateLog.getOperateObject().length() > 28){
                        operateLog.setOperateObject(operateLog.getOperateObject().substring(0,27)+"……");
                    }
                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("OperateLogController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(String operateUser, String operateIp,
        String operateType, String operate_start_time, String operate_end_time){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<OperateLog> entityWrapper = new EntityWrapper<>();
            if(operateUser != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateUser"),operateUser);
            }
            if(operateIp != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateIp"),operateIp);
            }
            if(operateType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("operateType"),operateType);
            }
            if (operate_start_time != null) {
                operate_start_time = operate_start_time + " 00:00:00";
                entityWrapper.ge("operate_time",operate_start_time);
            }
            if (operate_end_time != null) {
                operate_end_time = operate_end_time + " 23:59:59";
                entityWrapper.le("operate_time",operate_end_time);
            }
            long count = operateLogService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("OperateLogController[queryByCount]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/batchDelete",method = RequestMethod.POST,produces = "application/json;charest=UTF-8")
    @ResponseBody
    public ResultEntity batchDelete(HttpServletRequest request,@RequestParam("id[]") List<String> idList){
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
//        try {
//            boolean bool = operateLogService.deleteBatchIds(idList);
//            if (bool) {
//                res.setErrorcode(ErrorCodeType.SUCCESS);
//                res.setMessage("成功!");
//            }else{
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//            logger.error("OperateLogController[batchDelete]===="+e.toString());
//        }
        return res;
    }
}
