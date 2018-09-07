package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.type.LogType;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.DictDefine;
import com.gjxx.system.entity.DictDetail;
import com.gjxx.system.service.DictDefineService;
import com.gjxx.core.utils.*;
import com.gjxx.system.service.DictDetailService;
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
 * 数据字典定义
 */
@Controller
@RequestMapping(value = "/dictDefine")
public class DictDefineController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(DictDefineController.class);
    private String logType = LogType.DictDefine.getValue();
    
    @Autowired
    private DictDefineService dictDefineService;
    @Autowired
    private DictDetailService dictDetailService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/dictDefine/listDictDefine";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id){
        if (id != null) {
            DictDefine item = dictDefineService.selectById(id);
            model.addAttribute("item", item);
        }
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/dictDefine/addDictDefine";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            DictDefine item = dictDefineService.selectById(id);
            model.addAttribute("item", item);
        }
        return "sys/dictDefine/viewDictDefine";
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, DictDefine item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getDictDefineName())){
            res.setMessage("系统参数名称不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getDictDefineDescribe())){
            res.setMessage("系统参数描述不能为空！");
            return res;
        }
        try {
            DictDefine entity = dictDefineService.selectById(item.getId());
            List<DictDefine> dictDefineList = dictDefineService.selectList(
                new EntityWrapper<DictDefine>().eq("dict_define_name", item.getDictDefineName()));
            if (entity == null) {
                if(dictDefineList.size() > 0){
                    res.setMessage("系统参数名称已存在！");
                    return res;
                }
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            }else{
                if(dictDefineList.size() > 0){
                    if(!dictDefineList.get(0).getId().equals(item.getId())){
                        res.setMessage("系统参数名称已存在！");
                        return res;
                    }
                }
                if(!item.getDictDefineName().equals(entity.getDictDefineName())){
                    List<DictDetail> dictDetailList = dictDetailService.selectList(new EntityWrapper<DictDetail>().eq("dict_define_id",item.getId()));
                    if(dictDetailList.size() > 0){
                        res.setMessage("修改参数名称前请先删除所属参数明细列表!");
                        return res;
                    }
                }
            }
            item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            boolean result = dictDefineService.insertOrUpdate(item);
            if (result) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                if (entity == null) {
                    logger(request,logType,item.getDictDefineName(),"新增成功");
                }else{
                    logger(request,logType,item.getDictDefineName(),"修改成功");
                }
            }else{
                if (entity == null) {
                    logger(request,logType,item.getDictDefineName(),"新增失败");
                }else{
                    logger(request,logType,item.getDictDefineName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getDictDefineName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("DictDefineController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
        String dictDefineName, String dictDefineDescribe) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<DictDefine> entityWrapper = new EntityWrapper<>();
            if(dictDefineName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineName"),dictDefineName);
            }
            if(dictDefineDescribe != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineDescribe"),dictDefineDescribe);
            }
            if (rows == null) {
                rows = 10;
            }
            if (pageIndex == null) {
                pageIndex = 1;
            }
            Page<DictDefine> page = new Page<>(pageIndex, rows);
            Page<DictDefine> pageList = dictDefineService.selectPage(page,
                    entityWrapper.orderBy("update_time",false));
            List<DictDefine> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> statusMap = jedis.hgetAll("dict:status");
                jedis.close();
                for(DictDefine dictDefine:list){
                    dictDefine.setDictDefineStatus(statusMap.get(dictDefine.getDictDefineStatus()));
                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("DictDefineController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(String dictDefineName, String dictDefineDescribe){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<DictDefine> entityWrapper = new EntityWrapper<>();
            if(dictDefineName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineName"),dictDefineName);
            }
            if(dictDefineDescribe != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineDescribe"),dictDefineDescribe);
            }
            long count = dictDefineService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("DictDefineController[queryByCount]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/batchDelete",method = RequestMethod.POST,produces = "application/json;charest=UTF-8")
    @ResponseBody
    public ResultEntity batchDelete(HttpServletRequest request,@RequestParam("id[]") List<String> idList){
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        StringBuilder buff = new StringBuilder();
        for(int i = 0;i<idList.size();i++){
            String id = idList.get(i);
            List<DictDetail> dictDetailList = dictDetailService.selectList(new EntityWrapper<DictDetail>().eq("dict_define_id",id));
            if(dictDetailList.size() > 0){
                res.setMessage("请先删除所属参数明细列表!");
                return res;
            }
            DictDefine dictDefine = dictDefineService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(dictDefine.getDictDefineName());
        }
        try {
            boolean bool = dictDefineService.deleteBatchIds(idList);
            if (bool) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                logger(request,logType,buff.toString(),"删除成功");
            }else{
                logger(request,logType,buff.toString(),"删除失败");
            }
        }catch (Exception e){
            logger(request,logType,buff.toString(),"删除异常");
            e.printStackTrace();
            logger.error("DictDefineController[batchDelete]===="+e.toString());
        }
        return res;
    }
}
