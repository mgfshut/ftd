package com.gjxx.ftd.controller.gps;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.type.LogType;
import redis.clients.jedis.Jedis;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.core.utils.*;
import com.gjxx.ftd.entity.Company;
import com.gjxx.ftd.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 企业信息表
 */
@Controller
@RequestMapping(value = "/company")
public class CompanyController extends BaseController{

    private static  Logger logger= LoggerFactory.getLogger(CompanyController.class);
    private String logType = LogType.COMPANY.getValue();

    @Autowired
    private CompanyService companyService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> companyTypeMap = jedis.hgetAll("dict:companyType");
        model.addAttribute("companyTypeMap", companyTypeMap);
        jedis.close();
        return "ftd/company/listCompany";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id){
        if (id != null) {
            Company item = companyService.selectById(id);
            model.addAttribute("item", item);
        }
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> companyTypeMap = jedis.hgetAll("dict:companyType");
        model.addAttribute("companyTypeMap", companyTypeMap);
        Map<String, String> companyNatureMap = jedis.hgetAll("dict:companyNature");
        model.addAttribute("companyNatureMap", companyNatureMap);
        Map<String, String> evidenceStateMap = jedis.hgetAll("dict:evidenceState");
        model.addAttribute("evidenceStateMap", evidenceStateMap);
        jedis.close();
        return "ftd/company/addCompany";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            Company item = companyService.selectById(id);
            Jedis jedis = RedisUtil.getJedis();
            Map<String, String> companyTypeMap = jedis.hgetAll("dict:companyType");
            item.setBelongType(companyTypeMap.get(item.getBelongType()));
            Map<String, String> companyNatureMap = jedis.hgetAll("dict:companyNature");
            item.setNature(companyNatureMap.get(item.getNature()));
            Map<String, String> evidenceStateMap = jedis.hgetAll("dict:evidenceState");
            item.setEvidenceState(evidenceStateMap.get(item.getEvidenceState()));
            jedis.close();
            model.addAttribute("item", item);
        }
        return "ftd/company/viewCompany";
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, Company item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getFullName())){
            res.setMessage("企业全称不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getName())){
            res.setMessage("企业名称不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getBelongType())){
            res.setMessage("归属类型不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getUnifiedSocialCreditCode())){
            res.setMessage("统一信用代码不能为空！");
            return res;
        }
        try {
            Company entity = companyService.selectById(item.getId());
            List<Company> companyList = companyService.selectList(
                new EntityWrapper<Company>().eq("full_name", item.getFullName()));
            List<Company> comList = companyService.selectList(
                    new EntityWrapper<Company>().eq("unified_social_credit_code", item.getUnifiedSocialCreditCode()));
            if (entity == null) {
                if(companyList.size() > 0){
                    res.setMessage("名称已存在！");
                    return res;
                }
                if(comList.size() > 0){
                    res.setMessage("统一信用代码已存在！");
                    return res;
                }
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                item.setCreateUser(getLoginUser(request).getUserName());
            }else{
                if(companyList.size() > 0){
                    if(!companyList.get(0).getId().equals(item.getId())){
                        res.setMessage("名称已存在！");
                        return res;
                    }
                }
                if(comList.size() > 0){
                    if(!comList.get(0).getId().equals(item.getId())){
                        res.setMessage("统一信用代码已存在！");
                        return res;
                    }
                }
            }
            item.setUpdateUser(getLoginUser(request).getUserName());
            item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            boolean result = companyService.insertOrUpdate(item);
            if (result) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                if (entity == null) {
                    logger(request,logType,item.getFullName(),"新增成功");
                }else{
                    logger(request,logType,item.getFullName(),"修改成功");
                }
            }else{
                if (entity == null) {
                    logger(request,logType,item.getFullName(),"新增失败");
                }else{
                    logger(request,logType,item.getFullName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getFullName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("CompanyController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
                                      String name, String belongType,
                                      String linkman,String unifiedSocialCreditCode) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<Company> entityWrapper = new EntityWrapper<>();
            if(name != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("name"),name);
            }
            if(belongType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("belongType"),belongType);
            }
            if(linkman != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("linkman"),linkman);
            }
            if (unifiedSocialCreditCode != null) {
                entityWrapper.eq(StringUtil.upperCharToUnderLine("unifiedSocialCreditCode"),unifiedSocialCreditCode);
            }
            if (rows == null) {
                rows = 10;
            }
            if (pageIndex == null) {
                pageIndex = 1;
            }
            Page<Company> page = new Page<>(pageIndex, rows);
            Page<Company> pageList = companyService.selectPage(page,
            entityWrapper.orderBy("update_time",false));
            List<Company> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> belongTypMap = jedis.hgetAll("dict:companyType");
                jedis.close();
                for(Company company:list){
                    company.setBelongType(belongTypMap.get(company.getBelongType()));
                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("CompanyController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(String name, String belongType,
                                     String linkman,String unifiedSocialCreditCode){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<Company> entityWrapper = new EntityWrapper<>();
            if(name != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("name"),name);
            }
            if(belongType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("belongType"),belongType);
            }
            if(linkman != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("linkman"),linkman);
            }
            if (unifiedSocialCreditCode != null) {
                entityWrapper.eq(StringUtil.upperCharToUnderLine("unifiedSocialCreditCode"),unifiedSocialCreditCode);
            }
            long count = companyService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("CompanyController[queryByCount]===="+e.toString());
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
            Company company = companyService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(company.getFullName());
        }
        try {
            boolean bool = companyService.deleteBatchIds(idList);
            if (bool) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                logger(request,logType,buff.toString(),"删除成功");
            }else{
                logger(request,logType,buff.toString(),"删除失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("CompanyController[batchDelete]===="+e.toString());
        }
        return res;
    }
}
