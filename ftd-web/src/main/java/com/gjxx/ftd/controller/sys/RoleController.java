package com.gjxx.ftd.controller.sys;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.type.LogType;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.Role;
import com.gjxx.system.entity.RoleMenuRel;
import com.gjxx.system.entity.UserRoleRel;
import com.gjxx.system.service.RoleMenuRelService;
import com.gjxx.system.service.RoleService;
import com.gjxx.core.utils.*;
import com.gjxx.system.service.UserRoleRelService;
import org.apache.commons.lang3.ArrayUtils;
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
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 角色信息表
 */
@Controller
@RequestMapping(value = "/role")
public class RoleController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(RoleController.class);
    private String logType = LogType.Role.getValue();

    @Autowired
    private RoleService roleService;
    @Autowired
    private RoleMenuRelService roleMenuRelService;
    @Autowired
    private UserRoleRelService userRoleRelService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/role/listRole";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, String id){
        if (id != null) {
            Role item = roleService.selectById(id);
            model.addAttribute("item", item);
        }
        Jedis jedis = RedisUtil.getJedis();
        Map<String, String> statusMap = jedis.hgetAll("dict:status");
        model.addAttribute("statusMap", statusMap);
        jedis.close();
        return "sys/role/addRole";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            Role item = roleService.selectById(id);
            Jedis jedis = RedisUtil.getJedis();
            Map<String, String> statusMap = jedis.hgetAll("dict:status");
            jedis.close();
            item.setRoleStatus(statusMap.get(item.getRoleStatus()));
            model.addAttribute("item", item);
        }
        return "sys/role/viewRole";
    }

    /**
     * 跳转到权限设置页面
     */
    @RequestMapping(value = "/setAuth", method = RequestMethod.GET)
    public String setAuth(Model model, Integer id) {
        List<Integer> result = new ArrayList<>();
        List<RoleMenuRel> list = roleMenuRelService.selectList(new EntityWrapper<RoleMenuRel>().eq("role_id",id));
        for (RoleMenuRel entity : list) {
            result.add(entity.getMenuId());
        }
        model.addAttribute("roleId", id);
        model.addAttribute("menuIds", JSON.toJSON(result));
        return "sys/role/menuTree";
    }

    @ResponseBody
    @RequestMapping(value = "/setAuthAjax", method = RequestMethod.POST)
    public ResultEntity setAuthAjax(Integer roleId, Integer[] menuIds, HttpSession session) {
        List<RoleMenuRel> list = roleMenuRelService.selectList(new EntityWrapper<RoleMenuRel>().eq("role_id",roleId));
        List<Integer> idList = new ArrayList<>();
        for (RoleMenuRel roleMenuRel : list) {
            Integer menuId = roleMenuRel.getMenuId();
            int index = ArrayUtils.indexOf(menuIds, menuId);
            if (index == -1) {
                idList.add(roleMenuRel.getId());
            } else {
                menuIds = ArrayUtils.remove(menuIds, index);
            }
        }
        for (Integer menuId : menuIds) {
            RoleMenuRel record = new RoleMenuRel();
            record.setRoleId(roleId);
            record.setMenuId(menuId);
            roleMenuRelService.insert(record);
        }
        if (idList.size() > 0) {
            roleMenuRelService.deleteBatchIds(idList);
        }
        return new ResultEntity(ErrorCodeType.SUCCESS, "成功", null);
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, Role item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getRoleName())){
            res.setMessage("角色名称不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getRoleStatus())){
            res.setMessage("角色状态不能为空！");
            return res;
        }
        try {
            Role entity = roleService.selectById(item.getId());
            List<Role> roleList = roleService.selectList(
                new EntityWrapper<Role>().eq("role_name", item.getRoleName()));
            if (entity == null) {
                if(roleList.size() > 0){
                    res.setMessage("角色名称已存在！");
                    return res;
                }
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                item.setCreateUser(getLoginUser(request).getUserName());
            }else{
                if(roleList.size() > 0){
                    if(!roleList.get(0).getId().equals(item.getId())){
                        res.setMessage("角色名称已存在！");
                        return res;
                    }
                }
            }
            item.setUpdateUser(getLoginUser(request).getUserName());
            item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            boolean result = roleService.insertOrUpdate(item);
            if (result) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                if (entity == null) {
                    logger(request,logType,item.getRoleName(),"新增成功");
                }else{
                    logger(request,logType,item.getRoleName(),"修改成功");
                }
            }else{
                if (entity == null) {
                    logger(request,logType,item.getRoleName(),"新增失败");
                }else{
                    logger(request,logType,item.getRoleName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getRoleName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("RoleController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
    String roleName,
    String roleStatus,
    String createUser,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<Role> entityWrapper = new EntityWrapper<>();
            if(roleName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("roleName"),roleName);
            }
            if(roleStatus != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("roleStatus"),roleStatus);
            }
            if(createUser != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("createUser"),createUser);
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
            Page<Role> page = new Page<>(pageIndex, rows);
            Page<Role> pageList = roleService.selectPage(page,
                    entityWrapper.orderBy("update_time",false));
            List<Role> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> statusMap = jedis.hgetAll("dict:status");
                jedis.close();
                for(Role role:list){
                    role.setRoleStatus(statusMap.get(role.getRoleStatus()));
                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("RoleController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(
    String roleName,
    String roleStatus,
    String createUser,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<Role> entityWrapper = new EntityWrapper<>();
            if(roleName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("roleName"),roleName);
            }
            if(roleStatus != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("roleStatus"),roleStatus);
            }
            if(createUser != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("createUser"),createUser);
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
            long count = roleService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("RoleController[queryByCount]===="+e.toString());
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
            Role role = roleService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(role.getRoleName());
            userRoleRelService.delete(new EntityWrapper<UserRoleRel>().eq("role_id", id));
            roleMenuRelService.delete(new EntityWrapper<RoleMenuRel>().eq("role_id", id));
        }
        try {
            boolean bool = roleService.deleteBatchIds(idList);
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
            logger.error("RoleController[batchDelete]===="+e.toString());
        }
        return res;
    }
}
