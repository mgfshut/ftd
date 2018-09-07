package com.gjxx.core.utils;

import java.util.Collection;

/**
 * 验证对象的有效性
 * 
 * @author ZhaoKang
 * 
 */
public class VerifyObject {

	/**
	 * 验证String是否为空，是否为“”
	 * 
	 * @param s
	 * @return
	 */
	public static boolean verifyString(String s) {
		if (s != null && !s.trim().equals("")) {
			return true;
		}
		return false;
	}

	/**
	 * 验证collection类型集合类是否为空，长度是否>0
	 * 
	 * @param <E>
	 * @param c
	 * @return
	 */
	public static <E> boolean verifyCollection(Collection<E> c) {
		if (c != null && c.size() > 0) {
			return true;
		}
		return false;
	}

	/**
	 * 验证数组是否为空
	 * 
	 * @param a
	 * @return
	 */
	public  static <E> boolean verifyArray(E[] a) {
		if (a != null && a.length > 0) {
			return true;
		}
		return false;
	}

}
