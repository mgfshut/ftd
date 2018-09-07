package com.gjxx.core.utils;

import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class GetIp {
	
	public static String getIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if(!StringUtil.isEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = ip.indexOf(",");
            if(index != -1){
                return ip.substring(0,index);
            }else{
                return ip;
            }
        }
        ip = request.getHeader("X-Real-IP");
        if(!StringUtil.isEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            return ip;
        }
        return request.getRemoteAddr();
    }

    /**
     * 根据坐标获取具体地址
     * @param coor 坐标字符串
     * @return
     */
    public static String getAdd(String coor){
        String urlString = "http://restapi.amap.com/v3/geocode/regeo?key=8325164e247e15eea68b59e89200988b&s=rsv3&location="+
                coor+"&radius=2800&callback=jsonp_452865_&platform=JS&logversion=2.0&sdkversion=1.3" +
                "&appname=http%3A%2F%2Flbs.amap.com%2Fconsole%2Fshow%2Fpicker&csid=49851531-2AE3-4A3B-A8C8-675A69BCA316";
        String res = "";
        try {
            URL url = new URL(urlString);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection)url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream(),"UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                res += line+"\n";
            }
            in.close();
        } catch (Exception e) {
            System.out.println("error in wapaction,and e is " + e.getMessage());
        }
        String json = res.substring(res.indexOf("(")+1,res.lastIndexOf(")"));
        JSONObject jsonObject = JSONObject.fromObject(json);
        jsonObject = JSONObject.fromObject(jsonObject.get("regeocode"));
        res = jsonObject.getString("formatted_address");
        System.out.println(res);
        return res;
    }
    /**
     * 根据地名获取坐标
     * @param
     */
    public static String getCoor(String address){
        String urlString = "http://restapi.amap.com/v3/place/text?s=rsv3&children=&key=8325164e247e15eea68b59e89200988b&page=1&offset=10&city=610100&language=zh_cn&callback=jsonp_25126_&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Flbs.amap.com%2Fconsole%2Fshow%2Fpicker&csid=19FA0D45-180F-4D45-BCB4-C6C265F55FF6&keywords="+address;
        String res = "";
        try {
            //http://restapi.amap.com/v3/geocode/regeo?key=8325164e247e15eea68b59e89200988b&s=rsv3&location=101.539737903028,36.79828256329313&radius=2800&callback=jsonp_452865_&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Flbs.amap.com%2Fconsole%2Fshow%2Fpicker&csid=49851531-2AE3-4A3B-A8C8-675A69BCA316
            URL url = new URL(urlString);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection)url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream(),"UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                res += line+"\n";
            }
            in.close();
        } catch (Exception e) {
            System.out.println("error in wapaction,and e is " + e.getMessage());
        }
        System.out.println(res);
        return res;
    }
    public static void main(String[] agrs) {
        String add = getAdd("114.401800,30.477600");
//        String json = add.substring(add.indexOf("(")+1,add.lastIndexOf(")"));
//        JSONObject jsonObject = JSONObject.fromObject(json);
//        jsonObject = JSONObject.fromObject(jsonObject.get("regeocode"));
//        System.out.println(jsonObject.getString("formatted_address"));
//        String coor = getCoor("西宁市");
        System.out.println(add);
    }

}
