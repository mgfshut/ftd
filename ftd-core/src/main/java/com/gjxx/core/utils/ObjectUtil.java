package com.gjxx.core.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zha on 2017/5/23.
 */
public class ObjectUtil {
    /**
     * 判断是否为空
     *
     * @param v
     * @return
     */
    public static boolean isNull(Object v) {
        if (v == null) {
            return true;
        }
        return false;
    }

    /**
     * 判断是否为空
     *
     * @param v
     * @return
     */
    public static boolean isNotNull(Object v) {
        return !isNull(v);
    }

    /**
     * 判断对象属性是否为空
     * @param v
     * @return
     */
    public static <T> boolean isFieldValueNull(T v) {

        for (Field f : v.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            try {
                Object o = f.get(v);
                System.out.println("o = " + o);
                if (!"serialVersionUID".equals(f.getName()) && f.get(v) != null && !"".equals(f.get(v))) { //判断字段是否为空，并且对象属性中的基本都会转为对象类型来判断
                    return false;
                }
            } catch (IllegalArgumentException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return true;

    }

    public static <T> boolean isFieldValueNotNull(T v) {

        return !isFieldValueNull(v);
    }


    /**
     * 动态获取对象中某属性值
     *
     * @param item
     * @param name
     * @return
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws NoSuchFieldException
     * @throws SecurityException
     */
    @SuppressWarnings("unchecked")
    public static <T, C> C getFieldValue(T item, String name, Class<C> clazz) {

        if ( item instanceof Map ) {
            Map<String,Object> itemMap = (Map<String,Object>)item;
            return (C)itemMap.get(name);
        }


        C value = null;

        Field field = null;

        try {

            field = item.getClass().getDeclaredField(name);

            field.setAccessible(true);

            value = (C) field.get(item);

        } catch (NoSuchFieldException | SecurityException
                | IllegalArgumentException | IllegalAccessException e) {

            e.printStackTrace();

        }

        return value;
    }

    /**
     * 查询list集合对象中某个属性的集合
     *
     * @param list
     * @param fieldName
     * @param clazz
     * @return
     */
    public static <T, C> List<C> getFieldValues(List<T> list, String fieldName,
                                                Class<C> clazz) {

        List<C> result = new ArrayList<C>();

        if ( Collections3.isEmpty(list) )
            return null;

        for (T item : list) {
            C value = ObjectUtil.getFieldValue(item, fieldName, clazz);
            result.add(value);
        }

        return result;
    }

}
