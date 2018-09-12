package com.gjxx.core.utils;

import java.text.ParseException;
import java.util.*;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;

import net.minidev.json.JSONObject;
import redis.clients.jedis.Jedis;

/**
 * @ Author     ：maogf
 * @ Date       ：2018/9/12 0012 9:09
 * @ Description：${description}
 */
public class Jwt {


	/**
	 * 秘钥
	 */
	private static final byte[] SECRET="3d990d2276917dfac04467df11fff26d".getBytes();

	/**
	 * 初始化head部分的数据为
	 * {
	 * 		"alg":"HS256",
	 * 		"type":"JWT"
	 * }
	 */
	private static final JWSHeader header=new JWSHeader(JWSAlgorithm.HS256, JOSEObjectType.JWT, null, null, null, null, null, null, null, null, null, null, null);

	/**
	 * 生成token，该方法只在用户登录成功后调用
	 *
	 * @param payload Map集合，可以存储用户id，token生成时间，token过期时间等自定义字段
	 * @return token字符串,若失败则返回null
	 */
	public static String createToken(Map<String, Object> payload) {
		String tokenString=null;
		// 创建一个 JWS object
		JWSObject jwsObject = new JWSObject(header, new Payload(new JSONObject(payload)));
		try {
			// 将jwsObject 进行HMAC签名
			jwsObject.sign(new MACSigner(SECRET));
			tokenString=jwsObject.serialize();
		} catch (JOSEException e) {
			System.err.println("签名失败:" + e.getMessage());
			e.printStackTrace();
		}
		return tokenString;
	}



	/**
	 * 校验token是否合法，返回Map集合,集合中主要包含    state状态码   data鉴权成功后从token中提取的数据
	 * 该方法在过滤器中调用，每次请求API时都校验
	 * @param token
	 * @return  Map<String, Object>
	 */
	public static Map<String, Object> validToken(String tokenId,String token) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			JWSObject jwsObject = JWSObject.parse(token);
			Payload payload = jwsObject.getPayload();
			JWSVerifier verifier = new MACVerifier(SECRET);
			//从redis服务器中读取token
			Jedis jedis = RedisUtil.getJedis();
			String readToken =jedis.get(tokenId);
			jedis.close();
			if (jwsObject.verify(verifier)) {
				if (token.equals(readToken)) {
					JSONObject jsonOBj = payload.toJSONObject();
					// 若payload包含ext字段，则校验是否过期
					if (jsonOBj.containsKey("ext")) {
						long extTime = Long.valueOf(jsonOBj.get("ext").toString());
						long curTime = System.currentTimeMillis();
						// 过期了
						if (curTime > extTime) {
							resultMap.clear();
							resultMap.put("code", "999");
							resultMap.put("message", "token过期！");
							return resultMap;
						}
					}
					resultMap.put("code", "200");
					resultMap.put("message", "token校验成功！");
				}else{
					// 校验失败
					resultMap.put("code", "999");
					resultMap.put("message", "token校验失败！");
				}
			} else {
				// 校验失败
				resultMap.put("code", "999");
				resultMap.put("message", "token校验失败！");
			}

		} catch (Exception e) {
			//e.printStackTrace();
			// token格式不合法导致的异常
			resultMap.clear();
			// 校验失败
			resultMap.put("code", "999");
			resultMap.put("message", "token格式不合法！");
		}
		return resultMap;
	}

	public static void main(String[] args) throws ParseException {
		//生成token
		Map<String , Object> payload=new HashMap<>();
		payload.put("uid", 1);//用户ID
		Calendar ca = Calendar.getInstance();
		payload.put("iat", ca.getTime().getTime());//生成时间
		ca.add(Calendar.DATE, 30);// num为增加的天数，可以改变的
		payload.put("ext",ca.getTime().getTime());//过期时间30天
		String token=Jwt.createToken(payload);
		System.out.println(token);

		JWSObject jwsObject = JWSObject.parse(token);
		Payload paypayload = jwsObject.getPayload();
		JSONObject jsonOBj = paypayload.toJSONObject();
		// 若payload包含ext字段，则校验是否过期
		if (jsonOBj.containsKey("ext")) {
			long extTime = Long.valueOf(jsonOBj.get("ext").toString());
			long curTime = System.currentTimeMillis();
			// 过期了
			if (curTime > extTime) {
				System.out.println("过期了");
			}
		}
	}

}
