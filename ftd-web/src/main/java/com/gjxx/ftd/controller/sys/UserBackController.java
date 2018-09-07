package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.type.LogType;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.Role;
import com.gjxx.system.entity.UserBack;
import com.gjxx.system.entity.UserRoleRel;
import com.gjxx.system.service.RoleService;
import com.gjxx.system.service.UserBackService;
import com.gjxx.system.service.UserRoleRelService;
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

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 后台用户
 */
@Controller
@RequestMapping(value = "/userBack")
public class UserBackController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(UserBackController.class);
    private String logType = LogType.UserBack.getValue();
    
    @Autowired
    private UserBackService userBackService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserRoleRelService userRoleRelService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        return "sys/userBack/listUserBack";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id){
        if (id != null) {
            UserBack item = userBackService.selectById(id);
            model.addAttribute("item", item);
            List<UserRoleRel> userRoleRelList = userRoleRelService.selectList(new EntityWrapper<UserRoleRel>().eq("user_id",id));
            List<Integer> roleIdList = new ArrayList<>();
            for(UserRoleRel userRoleRel:userRoleRelList){
                roleIdList.add(userRoleRel.getRoleId());
            }
            List<Role> roleList = roleService.selectList(new EntityWrapper<Role>());
            for(Role role:roleList){
                if(roleIdList.contains(role.getId())){
                    role.setChecked(true);
                }
            }
            model.addAttribute("roleList", roleList);
        }else{
            List<Role> roleList = roleService.selectList(new EntityWrapper<Role>());
            model.addAttribute("roleList", roleList);
        }
        return "sys/userBack/addUserBack";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            UserBack item = userBackService.selectById(id);
            model.addAttribute("item", item);
        }
        return "sys/userBack/viewUserBack";
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, UserBack item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getUserName())){
            res.setMessage("用户名不能为空！");
            return res;
        }
        try {
            UserBack entity = userBackService.selectById(item.getId());
            List<UserBack> userBackList = userBackService.selectList(
                new EntityWrapper<UserBack>().eq("user_name", item.getUserName()));
            if (entity == null) {
                if(userBackList.size() > 0){
                    res.setMessage("用户名已存在！");
                    return res;
                }
                if (org.apache.commons.lang3.StringUtils.isBlank(item.getPassword())) {
                    return new ResultEntity(ErrorCodeType.P_FAILURE, "密码不能为空", null);
                }
                if(!item.getPassword().equals(item.getConfirmPassword())){
                    return new ResultEntity(ErrorCodeType.P_FAILURE, "两次密码输入不一致", null);
                }
                item.setPassword(MD5Encoder.encode(item.getPassword()));
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                item.setCreateUser(getLoginUser(request).getUserName());
            }else{
                if(userBackList.size() > 0){
                    if(!userBackList.get(0).getId().equals(item.getId())){
                        res.setMessage("用户名已存在！");
                        return res;
                    }
                }
            }
            item.setUpdateUser(getLoginUser(request).getUserName());
            item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            boolean result = userBackService.addUserBack(item);
            if (result) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                if (entity == null) {
                    logger(request,logType,item.getUserName(),"新增成功");
                }else{
                    logger(request,logType,item.getUserName(),"修改成功");
                }
            }else{
                if (entity == null) {
                    logger(request,logType,item.getUserName(),"新增失败");
                }else{
                    logger(request,logType,item.getUserName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getUserName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("UserBackController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
    String userName,
    String phone,
    String email,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<UserBack> entityWrapper = new EntityWrapper<>();
            if(userName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("userName"),userName);
            }
            if(phone != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("phone"),phone);
            }
            if(email != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("email"),email);
            }
            if (create_start_time != null) {
                create_start_time = create_start_time + " 00:00:00";
                entityWrapper.ge("create_time",create_start_time);
            }
            if (update_start_time != null) {
                update_start_time = update_start_time + " 00:00:00";
                entityWrapper.ge("update_time",update_start_time);
            }
            if (create_end_time != null) {
                create_end_time = create_end_time + " 23:59:59";
                entityWrapper.le("create_time",create_end_time);
            }
            if (update_end_time != null) {
                update_end_time = update_end_time + " 23:59:59";
                entityWrapper.le("update_time",update_end_time);
            }
            if (rows == null) {
                rows = 10;
            }
            if (pageIndex == null) {
                pageIndex = 1;
            }
            Page<UserBack> page = new Page<>(pageIndex, rows);
            Page<UserBack> pageList = userBackService.selectPage(page,
                    entityWrapper.orderBy("update_time",false));
            List<UserBack> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                for(UserBack userBack:list){

                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("UserBackController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(
    String userName,
    String phone,
    String email,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<UserBack> entityWrapper = new EntityWrapper<>();
            if(userName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("userName"),userName);
            }
            if(phone != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("phone"),phone);
            }
            if(email != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("email"),email);
            }
            if (create_start_time != null) {
                create_start_time = create_start_time + " 00:00:00";
                entityWrapper.ge("create_time",create_start_time);
            }
            if (update_start_time != null) {
                update_start_time = update_start_time + " 00:00:00";
                entityWrapper.ge("update_time",update_start_time);
            }
            if (create_end_time != null) {
                create_end_time = create_end_time + " 23:59:59";
                entityWrapper.le("create_time",create_end_time);
            }
            if (update_end_time != null) {
                update_end_time = update_end_time + " 23:59:59";
                entityWrapper.le("update_time",update_end_time);
            }
            long count = userBackService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("UserBackController[queryByCount]===="+e.toString());
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
            UserBack userBack = userBackService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(userBack.getUserName());
            userRoleRelService.delete(new EntityWrapper<UserRoleRel>().eq("user_id", id));
        }
        try {
            boolean bool = userBackService.deleteBatchIds(idList);
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
            logger.error("UserBackController[batchDelete]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/updatePassword", method = RequestMethod.GET)
    public String updatePassword(HttpServletRequest request, Model model) {
        UserBack user = getLoginUser(request);
        model.addAttribute("user", user);
        return "sys/userBack/updatePassword";
    }

    @RequestMapping(value = "/updatePasswordAjax")
    @ResponseBody
    public ResultEntity updatePasswordAjax(HttpServletRequest request, String oldPwd, String newPwd, String newPwd2) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(oldPwd)){
            res.setMessage("原始密码不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(newPwd)){
            res.setMessage("新密码不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(newPwd2)){
            res.setMessage("确认新密码不能为空！");
            return res;
        }
        UserBack user = getLoginUser(request);
        if (!MD5Encoder.encode(oldPwd).equals(user.getPassword())) {
            res = new ResultEntity(ErrorCodeType.P_FAILURE, "原始密码错误！", null);
            return res;
        }
        if (!newPwd.equals(newPwd2)) {
            res = new ResultEntity(ErrorCodeType.P_FAILURE, "两次密码不一致！", null);
            return res;
        }
        try {
            user.setPassword(MD5Encoder.encode(newPwd));
            userBackService.updateById(user);
            res = new ResultEntity(ErrorCodeType.SUCCESS, "成功", null);
        } catch (Exception e) {
            res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        }
        return res;
    }
}
