package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.gjxx.core.type.LogType;
import com.gjxx.system.entity.Menu;
import com.gjxx.system.entity.RoleMenuRel;
import com.gjxx.system.service.MenuService;
import com.gjxx.core.utils.DateUtil;
import com.gjxx.core.utils.ErrorCodeType;
import com.gjxx.core.utils.ResultEntity;
import com.gjxx.core.utils.StringUtil;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.service.RoleMenuRelService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 菜单信息表
 */
@Controller
@RequestMapping(value = "/menu")
public class MenuController extends BaseController {

    private static  Logger logger= LoggerFactory.getLogger(MenuController.class);
    private String logType = LogType.Menu.getValue();

    @Autowired
    private MenuService menuService;
    @Autowired
    private RoleMenuRelService roleMenuRelService;

    /**
    * 跳转到列表页面
    */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model, Integer id) {
        int parentId = 0;
        if (id != null) {
            Menu item = menuService.selectById(id);
            parentId = item.getId();
        }

        List<Menu> list = menuService.selectList(new EntityWrapper<Menu>().eq("parent_id", parentId).orderBy("menu_seq", true));

        //parents
        List<Menu> parents = new ArrayList<>();
        Menu root = new Menu();
        root.setMenuName("系统菜单管理");
        root.setMenuType("0");
        parents.add(root);
        parents.addAll(menuService.selectParents(parentId));
        model.addAttribute("parents", parents);

//        model.addAttribute("type", parents.get(parents.size() - 1).getType());
//        model.addAttribute("id", id);
        model.addAttribute("parentId", parentId);
        model.addAttribute("list", list);
        return "sys/menu/listMenu";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model, Menu item){
        Integer id = item.getId();
        if (id != null) {
            item = menuService.selectById(id);
        }
        model.addAttribute("item", item);
        Integer parentId = item.getParentId();

        List<Menu> parents = new ArrayList<>();
        Menu root = new Menu();
        root.setMenuName("系统菜单管理");
        parents.add(root);
        if (parentId != null && parentId != 0) {
            model.addAttribute("pItem", menuService.selectById(parentId));
            parents.addAll(menuService.selectParents(parentId));
        }
        model.addAttribute("parents", parents);
        return "sys/menu/addMenu";
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public String view(Model model, String id){
        if (id != null) {
            Menu item = menuService.selectById(id);
            model.addAttribute("item", item);
        }
        return "sys/menu/viewMenu";
    }

    /**
     * 获取菜单树
     */
    @RequestMapping(value = "/getMenuTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public ResultEntity getMenuTree(HttpServletRequest request) {
        ResultEntity re = new ResultEntity();
        try {
            List<Menu> list = menuService.selectList(new EntityWrapper<>());
            for(Menu menu:list){
                menu.setName(menu.getMenuName());
            }
            re.setData(list);
            re.setErrorcode(ErrorCodeType.SUCCESS);
        } catch (Exception e) {
            re.setErrorcode(ErrorCodeType.P_FAILURE);
            re.setMessage("获取菜单树异常");
            logger(request,logType,"","获取菜单树异常");
            e.printStackTrace();
            logger.error("MenuController[getMenuTree]===="+e.toString());
        }
        return re;
    }

    @RequestMapping(value = "/addAjax", method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity addAjax(HttpServletRequest request, Menu item) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        if(StringUtil.isEmpty(item.getMenuIcon())){
            res.setMessage("菜单图标不能为空！");
            return res;
        }
        if(StringUtil.isEmpty(item.getMenuName())){
            res.setMessage("菜单名称不能为空！");
            return res;
        }
        if (item.getMenuType() == null || "".equals(item.getMenuType())) {
            item.setMenuType("1");
        } else {
            item.setMenuType(String.valueOf(Integer.parseInt(item.getMenuType()) + 1));
        }
        try {
            Menu entity = menuService.selectById(item.getId());
            List<Menu> menuList = menuService.selectList(
                new EntityWrapper<Menu>().eq("menu_name", item.getMenuName()));
            if (entity == null) {
                if(menuList.size() > 0){
                    res.setMessage("菜单名称已存在！");
                    return res;
                }
                item.setCreateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
                item.setCreateUser(getLoginUser(request).getUserName());
                List<Menu> list = menuService.selectList(new EntityWrapper<Menu>().eq("parent_id", item.getParentId()).
                        orderBy("menu_seq", false));
                if (list != null && list.size() > 0) {
                    item.setMenuSeq(String.valueOf(Integer.parseInt(list.get(0).getMenuSeq()) + 1));
                } else {
                    item.setMenuSeq("1");
                }
            }else{
                if(menuList.size() > 0){
                    if(!menuList.get(0).getId().equals(item.getId())){
                        res.setMessage("菜单名称已存在！");
                        return res;
                    }
                }
            }
            item.setUpdateUser(getLoginUser(request).getUserName());
            item.setUpdateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
            boolean result = menuService.insertOrUpdate(item);
            if (result) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("成功!");
                if (entity == null) {
                    logger(request,logType,item.getMenuName(),"新增成功");
                }else{
                    logger(request,logType,item.getMenuName(),"修改成功");
                }
            }else{
                if (entity == null) {
                    logger(request,logType,item.getMenuName(),"新增失败");
                }else{
                    logger(request,logType,item.getMenuName(),"修改失败");
                }
            }
        }catch (Exception e){
            logger(request,logType,item.getMenuName(),"新增或修改异常");
            e.printStackTrace();
            logger.error("MenuController[addAjax]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryPageList",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryPageList(Integer pageIndex, Integer rows,
    String parentId,
    String menuName,
    String menuType,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time) {
        ResultEntity res = new ResultEntity(ErrorCodeType.P_FAILURE, "查询失败!", null);
        try {
            EntityWrapper<Menu> entityWrapper = new EntityWrapper<>();
            if(parentId != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("parentId"),parentId);
            }
            if(menuName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("menuName"),menuName);
            }
            if(menuType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("menuType"),menuType);
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
            Page<Menu> page = new Page<>(pageIndex, rows);
            Page<Menu> pageList = menuService.selectPage(page,
                    entityWrapper.orderBy("menu_seq",true));
            List<Menu> list = pageList.getRecords();
            if (list != null) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                for(Menu menu:list){

                }
                res.setData(list);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("MenuController[queryPageList]===="+e.toString());
        }
        return res;
    }

    @RequestMapping(value = "/queryByCount",method = RequestMethod.POST)
    @ResponseBody
    public ResultEntity queryByCount(
    String parentId,
    String menuName,
    String menuType,
    String create_start_time, String create_end_time, String update_start_time, String update_end_time){
        ResultEntity res = new ResultEntity(ErrorCodeType.SUCCESS,"查询失败!",null);
        try {
            EntityWrapper<Menu> entityWrapper = new EntityWrapper<>();
            if(parentId != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("parentId"),parentId);
            }
            if(menuName != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("menuName"),menuName);
            }
            if(menuType != null){
                entityWrapper.eq(StringUtil.upperCharToUnderLine("menuType"),menuType);
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
            long count = menuService.selectCount(entityWrapper);
            if (count >= 0) {
                res.setErrorcode(ErrorCodeType.SUCCESS);
                res.setMessage("查询成功!");
                res.setData(count);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("MenuController[queryByCount]===="+e.toString());
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
            Menu menu = menuService.selectById(id);
            if(i > 0){
                buff.append(",");
            }
            buff.append(menu.getMenuName());
            List<Menu> childMenuList = menuService.selectList(new EntityWrapper<Menu>().eq("parent_id",id));
            if(childMenuList.size() > 0){
                res.setMessage("菜单下面存在子菜单，不能删除");
                return res;
            }
        }
        for(int i = 0;i<idList.size();i++){
            String id = idList.get(i);
            roleMenuRelService.delete(new EntityWrapper<RoleMenuRel>().eq("menu_id",id));
        }
        try {
            boolean bool = menuService.deleteBatchIds(idList);
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
            logger.error("MenuController[batchDelete]===="+e.toString());
        }
        return res;
    }

    /**
     * 根据登录用户查询有权限的菜单列表
     * 只查询所属角色状态为启用状态的
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getAllowedMenu", method = RequestMethod.POST)
    public ResultEntity getAllowedMenu(HttpServletRequest request) {
        ResultEntity re = null;
        List<Menu> menuList = menuService.getAllowedMenu(getLoginUser(request).getId());
        if (menuList != null) {
            if (menuList.size() > 0) {
                List<Menu> menus = toTreeList(menuList);
                re = new ResultEntity(ErrorCodeType.SUCCESS, "成功", menus);
            } else {
                re = new ResultEntity(ErrorCodeType.SUCCESS, "成功", null);
            }
        } else {
            re = new ResultEntity(ErrorCodeType.P_FAILURE, "失败", null);
        }
        return re;
    }
    /**
     * 修改菜单顺序
     * @param request
     * @param id
     * @param newSeq
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateSeqAjax")
    public ResultEntity updateSeqAjax(HttpServletRequest request, Integer id, Integer newSeq) {
        if (newSeq == null) {
            return new ResultEntity(ErrorCodeType.P_FAILURE, "数据异常", null);
        }
        if (newSeq < 1) {
            newSeq = 1;
        }
        Menu entity = menuService.selectById(id);
        List<Menu> list = menuService.selectList(new EntityWrapper<Menu>().eq("parent_id", entity.getParentId()).orderBy("menu_seq", true));
        if (newSeq > list.size()) {
            newSeq = list.size();
        }
        for (Menu item : list) {
            String seq = item.getMenuSeq();
            if (seq.equals(entity.getMenuSeq())) {
                item.setMenuSeq(String.valueOf(newSeq));
                continue;
            }
            int i_seq =  Integer.parseInt(seq);
            if (Integer.parseInt(entity.getMenuSeq()) < newSeq) {
                if (i_seq > Integer.parseInt(entity.getMenuSeq()) && i_seq <= newSeq) {
                    item.setMenuSeq(String.valueOf(i_seq - 1));
                }
            } else {
                if (i_seq < Integer.parseInt(entity.getMenuSeq()) && i_seq >= newSeq) {
                    item.setMenuSeq(String.valueOf(i_seq + 1));
                }
            }
        }
        menuService.updateBatchById(list);
        return new ResultEntity(ErrorCodeType.SUCCESS, "操作成功!", null);
    }

	/**
	 * 组装树
	 * @param menuList
	 * @return
	 */
	private List<Menu> toTreeList(List<Menu> menuList) {
		Map<Object,Menu> maps = new HashMap<>();
		List<Menu> list = new ArrayList<>();
		for (Menu menu : menuList) {
			addTreeNode(menu,maps,list);
		}
		return list;
	}

	private void addTreeNode(Menu menu, Map<Object, Menu> maps,
							 List<Menu> list) {
		if(maps.containsKey(menu.getId())){
			maps.get(menu.getId()).setEntity(menu);
		}else{
			maps.put(menu.getId(), menu);
		}
		if(menu.getParentId() == 0){
			list.add(maps.get(menu.getId()));
		}else{
			if(maps.containsKey(menu.getParentId())){
				maps.get(menu.getParentId()).addChildren(menu);
			}else{
				Menu parent = new Menu();
				parent.addChildren(menu);
				maps.put(menu.getParentId(),parent);
			}
		}
	}
}
