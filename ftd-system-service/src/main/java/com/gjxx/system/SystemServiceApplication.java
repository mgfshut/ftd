package com.gjxx.system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

public class SystemServiceApplication {
    private static Logger _log = LoggerFactory.getLogger(SystemServiceApplication.class);

    public static void main(String[] args) {
        _log.info(">>>>> dubbo-producer 正在启动 <<<<<");

        try {
            ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
                    "classpath:META-INF/spring/dubbo-system-provider.xml");
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

        _log.info(">>>>> dubbo-producer 启动完成 <<<<<");
    }
}
