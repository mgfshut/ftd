package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.constant.RedisConstant;
import com.gjxx.core.type.LogType;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.DictDefine;
import com.gjxx.system.entity.DictDetail;
import com.gjxx.system.service.DictDefineService;
import com.gjxx.system.service.DictDetailService;
import com.gjxx.core.utils.*;
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
 * 数据字典参数
 */
@Controller
@RequestMapping(value = "/dictDetail")
public class DictDetailController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(DictDetailController.class);
    private String logType = LogType.DictDetail.getValue();

    @Autowired
    private DictDetailService dictDetailService;
    @Autowired
    private DictDefineService dictDefineService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model, String dictDefineId) {
        model.addAttribute("dictDefineId", dictDefineId);
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/dictDetail/listDictDetail";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id, String dictDefineId){
        if (id != null) {
            DictDetail item = dictDetailService.selectById(id);
            model.addAttribute("item", item);
            model.addAttribute("dictDefineId", item.getDictDefineId());
        }else{
            model.addAttribute("dictDefineId", dictDefineId);
        }
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/dictDetail/addDictDetail";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            DictDetail item = dictDetailService.selectById(id);
            model.addAttribute("item", item);
        }
        return "sys/dictDetail/viewDictDetail";
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, DictDetail item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getDictDetailName())){
            res.setMessage("参数明细名称不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getDictDetailValue())){
            res.setMessage("参数明细值不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getDictDetailStatus())){
            res.setMessage("参数明细状态不能为空！");
            return res;
        }
        try {
            DictDetail entity = dictDetailService.selectById(item.getId());
            DictDefine dictDefine = dictDefineService.selectById(item.getDictDefineId());
            Wrapper<DictDetail> wrapper = new EntityWrapper<>();
            wrapper.eq("dict_detail_value", item.getDictDetailValue());
            wrapper.eq("dict_define_id", item.getDictDefineId());
            List<DictDetail> dictDetailList = dictDetailService.selectList(wrapper);
            if (entity == null) {
                if(dictDetailList.size() > 0){
                    res.setMessage("参数明细已存在！");
                    return res;
                }
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                boolean result = dictDetailService.insert(item);
                if (result) {
                    res.setErrorcode(ErrorCodeType.SUCCESS);
                    res.setMessage("成功!");
                    if("01".equals(item.getDictDetailStatus())) {
                        RedisUtil.hset(RedisConstant.KEY_PREFIX_DICT + dictDefine.getDictDefineName(),
                                item.getDictDetailValue(), item.getDictDetailName());
                    }
                    logger(request,logType,item.getDictDetailName(),"新增成功");
                }else{
                    logger(request,logType,item.getDictDetailName(),"新增失败");
                }
            }else{
                if(dictDetailList.size() > 0){
                    if(!dictDetailList.get(0).getId().equals(item.getId())){
                        res.setMessage("参数明细已存在！");
                        return res;
                    }
                }
                item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                boolean result = dictDetailService.insertOrUpdate(item);
                if (result) {
                    res.setErrorcode(ErrorCodeType.SUCCESS);
                    res.setMessage("成功!");
                    if (item.getDictDetailStatus().equals("01")) {
                        RedisUtil.hset(RedisConstant.KEY_PREFIX_DICT + dictDefine.getDictDefineName(), item.getDictDetailValue(),
                                item.getDictDetailName());
                    } else {
                        RedisUtil.hdel(RedisConstant.KEY_PREFIX_DICT + dictDefine.getDictDefineName(), item.getDictDetailValue());
                    }
                    logger(request,logType,item.getDictDetailName(),"修改成功");
                }else{
                    logger(request,logType,item.getDictDetailName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getDictDetailName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("DictDetailController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
        String dictDefineId, String dictDetailName, String dictDetailStatus) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<DictDetail> entityWrapper = new EntityWrapper<>();
            if(dictDefineId != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineId"),dictDefineId);
            }
            if(dictDetailName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDetailName"),dictDetailName);
            }
            if(dictDetailStatus != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDetailStatus"),dictDetailStatus);
            }
            if (rows == null) {
                rows = 10;
            }
            if (pageIndex == null) {
                pageIndex = 1;
            }
            Page<DictDetail> page = new Page<>(pageIndex, rows);
            Page<DictDetail> pageList = dictDetailService.selectPage(page,
                    entityWrapper.orderBy("dict_detail_value",true));
            List<DictDetail> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> statusMap = jedis.hgetAll("dict:status");
                jedis.close();
                for(DictDetail dictDetail:list){
                    dictDetail.setDictDetailStatus(statusMap.get(dictDetail.getDictDetailStatus()));
                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("DictDetailController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(String dictDefineId, String dictDetailName, String dictDetailStatus){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<DictDetail> entityWrapper = new EntityWrapper<>();
            if(dictDefineId != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDefineId"),dictDefineId);
            }
            if(dictDetailName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDetailName"),dictDetailName);
            }
            if(dictDetailStatus != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("dictDetailStatus"),dictDetailStatus);
            }
            long count = dictDetailService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("DictDetailController[queryByCount]===="+e.toString());
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
            DictDetail dictDetail = dictDetailService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(dictDetail.getDictDetailValue());
            DictDefine dictDefine = dictDefineService.selectById(dictDetail.getDictDefineId());
            if("01".equals(dictDetail.getDictDetailStatus())) {
                RedisUtil.hdel(RedisConstant.KEY_PREFIX_DICT + dictDefine.getDictDefineName(),
                        dictDetail.getDictDetailValue(), dictDetail.getDictDetailName());
            }
        }
        try {
            boolean bool = dictDetailService.deleteBatchIds(idList);
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
            logger.error("DictDetailController[batchDelete]===="+e.toString());
        }
        return res;
    }
}
