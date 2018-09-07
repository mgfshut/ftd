package com.gjxx.ftd.common;

import java.lang.annotation.*;

/**鉴权注解
*/

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Authentication {

//    登录验证注解
//    * 该注解可以标记Controller 或 Controller 中的方法
//    *  如果Controller 有该标记,那么这个Controller下面所有的方法都会被过滤器
//    * 进行验证
//    * 如果Controller 没有有该标记,但Controller中的某个方法拥有该标记
//    * 那么这个方法将被过滤器验证(其他没有被标记的不会被验证)
//     * 特别注意,如果一个Controller 被标记CheckLogin 需要验证

}
