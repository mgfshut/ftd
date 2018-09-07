package com.gjxx.ftd;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

public class FtdServiceApplication {
	public static void main(String[] args) {
		try {
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
					"classpath:META-INF/spring/dubbo-service-provider.xml");
			ctx.start();
			System.out.println("服务已启动。。。");
			try {
				System.in.read();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
