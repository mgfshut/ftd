package com.gjxx.core.utils;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.Map;
import java.util.ResourceBundle;

/**
 * Redis 工具类 Created by shuzheng on 2016/11/26.
 */
public class RedisUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(RedisUtil.class);

    private static GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();
    private static StringRedisSerializer stringSerializer = new StringRedisSerializer();

    /**
     * redis过期时间,以秒为单位
     */
    public final static int EXRP_HOUR = 60 * 60; // 一小时
    public final static int EXRP_DAY = 60 * 60 * 24; // 一天
    public final static int EXRP_MONTH = 60 * 60 * 24 * 30; // 一个月

    /**
     * 初始化Redis连接池
     */
    public static JedisPool jedisPool; // 池化管理jedis链接池

    static {
        try {
            // 读取相关的配置
             ResourceBundle resourceBundle = ResourceBundle.getBundle("config/redis");
            
            int maxActive = Integer.parseInt(resourceBundle.getString("master.redis.max_active"));
            int maxIdle = Integer.parseInt(resourceBundle.getString("master.redis.max_idle"));
            int maxWait = Integer.parseInt(resourceBundle.getString("master.redis.max_wait"));

            int databaseIndex = Integer.parseInt(resourceBundle.getString("master.redis.database_index"));

            String ip = resourceBundle.getString("master.redis.ip");
            int port = Integer.parseInt(resourceBundle.getString("master.redis.port"));

            int timeout = Integer.parseInt(resourceBundle.getString("master.redis.timeout"));
            String pass = resourceBundle.getString("master.redis.author");

            JedisPoolConfig config = new JedisPoolConfig();
            // 设置最大连接数
            config.setMaxTotal(maxActive);
            // 设置最大空闲数
            config.setMaxIdle(maxIdle);
            // 设置超时时间
            config.setMaxWaitMillis(maxWait);
            // 初始化连接池
            jedisPool = new JedisPool(config, ip, port, timeout, pass,databaseIndex);
        } catch (Exception e) {
            LOGGER.error("First create JedisPool error : " + e);
        }
    }

    /**
     * 向缓存中设置字符串内容
     *
     * @param key
     *            key
     * @param value
     *            value
     * @return
     */
    public static boolean set(String key, String value) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            jedis.set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            jedisPool.returnResource(jedis);
        }
    }

    public static boolean set(String key, String value, int hours, int minutes, int seconds) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            // 设置时间
            int time = hours * 3600 + minutes * 60 + seconds;
            jedis.setex(key, time, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            jedisPool.returnResource(jedis);
        }
    }

    /**
     * 向缓存中设置对象
     *
     * @param key
     * @param value
     * @return
     */
    public static boolean set(String key, Object value) {
        Jedis jedis = null;
        try {
            String objectJson = JSON.toJSONString(value);
            jedis = jedisPool.getResource();
            jedis.set(key, objectJson);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            jedisPool.returnResource(jedis);
        }
    }

    public static boolean set(String key, Object value, int hours, int minutes, int seconds) {
        Jedis jedis = null;
        try {
            String objectJson = JSON.toJSONString(value);
            jedis = jedisPool.getResource();
            // 设置时间
            int time = hours * 3600 + minutes * 60 + seconds;
            jedis.setex(key, time, objectJson);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            jedisPool.returnResource(jedis);
        }
    }

    public static void hset(String key, String field, String value) {
        Jedis jedis = jedisPool.getResource();
        try {
            jedis.hset(key, field, value);
        } finally {
            jedis.close();
        }
    }
    
    public static void set(String key, Map<String, String> map) {
        Jedis jedis = jedisPool.getResource();
        try {
            jedis.hmset(key, map);
        } finally {
            jedis.close();
        }
    }
    
    public static void hdel(String key, String... field) {
        Jedis jedis = jedisPool.getResource();
        try {
            jedis.hdel(key, field);
        } finally {
            jedis.close();
        }
    }

    /**
     * 删除缓存中得对象，根据key
     *
     * @param key
     * @return
     */
    public static boolean del(String key) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            jedis.del(key);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            jedis.close();
//            jedisPool.returnResource(jedis);
        }
    }

    /**
     * 根据key 获取内容
     *
     * @param key
     * @return
     */
    public static Object get(String key) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            Object value = jedis.get(key);
            return value;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
//            jedisPool.returnResource(jedis);
            jedis.close();
        }
    }

    /**
     * 根据key 获取对象
     *
     * @param key
     * @return
     */
    public static <T> T get(String key, Class<T> clazz) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            String value = jedis.get(key);
            return JSON.parseObject(value, clazz);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            jedisPool.returnResource(jedis);
        }
    }
    
    public static Jedis getJedis(){
        return jedisPool.getResource();
    }

    /**
     *
     * @param key
     * @param hKey
     * @param value
     */
    public static void hsetSerialize(String key,String hKey,Object value) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            jedis.hset(stringSerializer.serialize(key),stringSerializer.serialize(hKey),jsonSerializer.serialize(value));
        } finally {
            jedis.close();
        }
    }

    /**
     *
     * @param key
     * @param hKey
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T hgetSerialize(String key,String hKey,Class<T> clazz) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            byte[] hget = jedis.hget(stringSerializer.serialize(key), stringSerializer.serialize(hKey));
            return (T) jsonSerializer.deserialize(hget);
        } finally {
            jedis.close();
        }
    }

    /**
     * 根据key 获取对象
     *
     * @param key
     * @return
     */
    public static <T> T hget(String key,String field, Class<T> clazz) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            String value = jedis.hget(key, field);
            return JSON.parseObject(value, clazz);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            jedis.close();
        }
    }

    /**
     * 根据key 获取对象
     *
     * @param key
     * @return
     */
    public static String hget(String key,String field) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            return jedis.hget(key, field);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            jedis.close();
        }
    }

    /**
     * 根据key hash 中所有key
     *
     * @param key
     * @return
     */
    public static Map<String, String> hgetAll(String key) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            return jedis.hgetAll(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            jedis.close();
        }
    }

}
