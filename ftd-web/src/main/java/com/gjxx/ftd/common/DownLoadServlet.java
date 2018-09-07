package com.gjxx.ftd.common;


import com.gjxx.core.utils.PropertiesUtil;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 文件下载既可以是get请求也可以是post
 * @author Administrator
 *
 */
public class DownLoadServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		String name = req.getParameter("name");
		String[] buffer = name.split("/");
		String fileName = buffer[buffer.length-1];//获取要下载的文件名

		// 读取相关的配置
		Properties ossProp = PropertiesUtil.getProperties("oss.properties");
		String ossUrl = "";
		if(ossProp.get("oss.url") != null){
			ossUrl = ossProp.get("oss.url").toString();
		}
		URL url = new URL(ossUrl+name);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		//设置超时间为3秒
		conn.setConnectTimeout(3*1000);
		//防止屏蔽程序抓取而返回403错误
		conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

		//设置响应头，对文件进行url编码
		fileName = URLEncoder.encode(fileName, "UTF-8");
		resp.setHeader("Content-Disposition", "attachment;filename="+fileName);
		resp.setContentType("application/force-download");//应用程序强制下载

		//得到输入流
		InputStream inputStream = conn.getInputStream();
		//获取自己数组
		byte[] getData = readInputStream(inputStream);

		OutputStream out = resp.getOutputStream();
		out.write(getData);
		if(out!=null){
			out.close();
		}
		if(inputStream!=null){
			inputStream.close();
		}
	}
	/**
	 * 从输入流中获取字节数组
	 * @param inputStream
	 * @return
	 * @throws IOException
	 */
	public static  byte[] readInputStream(InputStream inputStream) throws IOException {
		byte[] buffer = new byte[1024];
		int len = 0;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		while((len = inputStream.read(buffer)) != -1) {
			bos.write(buffer, 0, len);
		}
		bos.close();
		return bos.toByteArray();
	}

}