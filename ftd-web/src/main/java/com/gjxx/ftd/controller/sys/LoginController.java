package com.gjxx.ftd.controller.sys;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.gjxx.core.constant.RedisConstant;
import com.gjxx.core.type.LogType;
import com.gjxx.ftd.controller.BaseController;
import com.gjxx.system.entity.DictDefine;
import com.gjxx.system.entity.DictDetail;
import com.gjxx.system.entity.OperateLog;
import com.gjxx.system.entity.UserBack;
import com.gjxx.core.kit.CookieKit;
import com.gjxx.system.service.DictDefineService;
import com.gjxx.system.service.DictDetailService;
import com.gjxx.system.service.OperateLogService;
import com.gjxx.system.service.UserBackService;
import com.gjxx.core.utils.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * 用户登录
 */
@Controller
public class LoginController extends BaseController {

    private static Logger logger= LoggerFactory.getLogger(LoginController.class);
    private String logType = LogType.LOGIN.getValue();

    @Autowired
    private UserBackService userBackService;
    @Autowired
    private OperateLogService operateLogService;
    @Autowired
    private DictDetailService dictDetailService;
    @Autowired
    private DictDefineService dictDefineService;

    @RequestMapping("index")
    public String indexAction(){
        return "sys/index";
    }

    @RequestMapping("home")
    public String homeAction(Model model){
        return "sys/home";
    }

    @RequestMapping("login")
    public String login(){
        return "sys/login";
    }

    /**
     * 用户登录方法
     */
    @ResponseBody
    @RequestMapping(value = "loginAjax", method = RequestMethod.POST)
    public ResultEntity loginAjax(UserBack user, HttpSession session, HttpServletResponse response, HttpServletRequest request) {
        ResultEntity re = null;
        // 非空校验
        if ("".equals(user.getUserName()) || user.getUserName() == null) {
            return new ResultEntity(ErrorCodeType.P_FAILURE, "用户名不能为空", null);
        }
        if ("".equals(user.getPassword()) || user.getPassword() == null) {
            return new ResultEntity(ErrorCodeType.P_FAILURE, "密码不能为空", null);
        }

        Wrapper<UserBack> wrapper = new EntityWrapper<>();
        wrapper.eq("user_name", user.getUserName());
        wrapper.eq("password", MD5Encoder.encode(user.getPassword()));
        try {
            user = userBackService.selectOne(wrapper);
            if (user != null) {
                session.setAttribute("user", user);
                CookieKit.setCookie(response, USER_COOKIEID, user.getId().toString());
                session.setAttribute(USER_SESSIONID, user);
                logger(user.getUserName(), GetIp.getIp(request), logType,"登录成功");
                re = new ResultEntity(ErrorCodeType.SUCCESS, "登录成功", null);
                Jedis jedis = RedisUtil.getJedis();
                Map<String, String> statusMap = jedis.hgetAll("dict:status");
                jedis.close();
                if(statusMap == null || statusMap.size() == 0){
                    Wrapper<DictDetail> dictDetailWrapper = new EntityWrapper<>();
                    dictDetailWrapper.eq("dict_detail_status", "01");
                    List<DictDetail> dictDetailList = dictDetailService.selectList(dictDetailWrapper);
                    for(DictDetail dictDetail:dictDetailList){
                        DictDefine dictDefine = dictDefineService.selectById(dictDetail.getDictDefineId());
                        RedisUtil.hset(RedisConstant.KEY_PREFIX_DICT + dictDefine.getDictDefineName(),
                                dictDetail.getDictDetailValue(), dictDetail.getDictDetailName());
                    }
                }
            } else {
                re = new ResultEntity(ErrorCodeType.P_FAILURE, "用户名或密码错误", null);
            }
        } catch (Exception e) {
            re = new ResultEntity(ErrorCodeType.P_FAILURE, "登录异常", null);
            logger.error("LoginController[loginAjax]"+e.toString());
            e.printStackTrace();
        }
        return re;
    }

    /**
     * 注销
     */
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        CookieKit.removeCookie(response, USER_COOKIEID);
        request.getSession().removeAttribute(USER_SESSIONID);
        return "redirect:/login";
    }

    private void logger(String username, String ip, String logType,String detail){
        OperateLog operateLog = new OperateLog();
        operateLog.setOperateUser(username);
        operateLog.setOperateIp(ip);
        operateLog.setOperateType(logType);
        operateLog.setOperateObject(username);
        operateLog.setOperateDetail(detail);
        operateLog.setOperateTime(DateUtil.getToday("yyyy-MM-dd HH:mm:ss"));
        operateLogService.insertOrUpdate(operateLog);
    }
}
