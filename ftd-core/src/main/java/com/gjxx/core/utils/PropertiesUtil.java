package com.gjxx.core.utils;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Properties;

/**
 * @author maogf
 * @date 2018/6/14 0014 10:41
 */
@Component
public class PropertiesUtil {
	public static Properties getProperties(String fileName) {
		Properties properties = new Properties();
		try {
			properties.load(PropertiesUtil.class.getClassLoader()
					.getResourceAsStream(fileName));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return properties;
	}
}
