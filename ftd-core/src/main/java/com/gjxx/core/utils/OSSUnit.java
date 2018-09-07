package com.gjxx.core.utils;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Random;
import java.util.ResourceBundle;

public class OSSUnit {

    private static final Logger logger = LoggerFactory.getLogger(OSSUnit.class);
    public static OSSClient ossClient;
    public static String bucket;
    public static String ep;
    public static String url;

    static {
        try {
            // 读取相关的配置
            ResourceBundle resourceBundle = ResourceBundle.getBundle("config/oss");
            url = resourceBundle.getString("oss.url");// 阿里云展示图片的url
            ep = resourceBundle.getString("oss.ep");// 阿里云API的内或外网域名
            String ak = resourceBundle.getString("oss.ak");// 阿里云API的密钥Access Key ID
            String aks = resourceBundle.getString("oss.aks");// 阿里云API的密钥Access Key Secret
            bucket = resourceBundle.getString("oss.bucket");

            // 初始化连接池
            ossClient = new OSSClient(ep, ak, aks);
        } catch (Exception e) {
            logger.error("First create JedisPool error : " + e);
        }
    }

    public String uploadObject2OSS(byte[] bb) {
        String result = "";
        try {
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bb);
            ObjectMetadata meta = new ObjectMetadata();
            // 设置上传内容类型
            meta.setContentType("image/jpeg");
            String fileName = getDir()+getFileName();
            // 上传文件
            ossClient.putObject(bucket, fileName, byteArrayInputStream, meta);
            result = fileName;
        } catch (Exception e) {
            logger.error("上传阿里云OSS服务器异常." + e.getMessage(), e);
        }
        return result;
    }

    /**
     * 获取目录
     * 
     * @return
     */
    private String getDir() {
        StringBuilder sb = new StringBuilder();
        Calendar calendar = Calendar.getInstance();
        sb.append(calendar.get(Calendar.YEAR) + "/");
        sb.append((calendar.get(Calendar.MONTH) + 1) + "/");
        sb.append(calendar.get(Calendar.DAY_OF_MONTH) + "/");
        return sb.toString();
    }

    private String getFileName() {
        StringBuilder sb = new StringBuilder(DateUtil.getDateTimeString());
        sb.append(getRandomNum());
        sb.append(".jpg");
        return sb.toString();
    }

    private int getRandomNum() {
        Random r = new Random();
        return r.nextInt(900000) + 100000;
    }

    /**
     * 向阿里云的OSS存储中存储文件 --file也可以用InputStream替代
     * 
     * @param client
     *            OSS客户端
     * @param file
     *            上传文件
     * @param bucketName
     *            bucket名称
     * @param diskName
     *            上传文件的目录 --bucket下文件的路径
     * @return String 唯一MD5数字签名
     */
    public static final String uploadObject2OSS(OSSClient client, File file, String bucketName, String diskName) {
        String resultStr = null;
        try {
            InputStream is = new FileInputStream(file);
            String fileName = file.getName();
            Long fileSize = file.length();
            // 创建上传Object的Metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(is.available());
            metadata.setCacheControl("no-cache");
            metadata.setHeader("Pragma", "no-cache");
            metadata.setContentEncoding("utf-8");
            metadata.setContentType(getContentType(fileName));
            metadata.setContentDisposition("filename/filesize=" + fileName + "/" + fileSize + "Byte.");
            // 上传文件
            PutObjectResult putResult = client.putObject(bucketName, diskName + fileName, is, metadata);
            // 解析结果
            resultStr = putResult.getETag();
        } catch (Exception e) {
            logger.error("上传阿里云OSS服务器异常." + e.getMessage(), e);
        }
        return resultStr;
    }

    /**
     * 根据key获取OSS服务器上的文件输入流
     * 
     * @param client
     *            OSS客户端
     * @param bucketName
     *            bucket名称
     * @param diskName
     *            文件路径
     * @param key
     *            Bucket下的文件的路径名+文件名
     */
    public static final InputStream getOSS2InputStream(OSSClient client, String bucketName, String diskName,
													   String key) {
        OSSObject ossObj = client.getObject(bucketName, diskName + key);
        return ossObj.getObjectContent();
    }

    /**
     * 根据key删除OSS服务器上的文件
     * 
     * @param client
     *            OSS客户端
     * @param bucketName
     *            bucket名称
     * @param diskName
     *            文件路径
     * @param key
     *            Bucket下的文件的路径名+文件名
     */
    public static void deleteFile(OSSClient client, String bucketName, String diskName, String key) {
        client.deleteObject(bucketName, diskName + key);
        logger.info("删除" + bucketName + "下的文件" + diskName + key + "成功");
    }

    /**
     * 通过文件名判断并获取OSS服务文件上传时文件的contentType
     * 
     * @param fileName
     *            文件名
     * @return 文件的contentType
     */
    public static final String getContentType(String fileName) {
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        if ("bmp".equalsIgnoreCase(fileExtension))
            return "image/bmp";
        if ("gif".equalsIgnoreCase(fileExtension))
            return "image/gif";
        if ("jpeg".equalsIgnoreCase(fileExtension) || "jpg".equalsIgnoreCase(fileExtension)
                || "png".equalsIgnoreCase(fileExtension))
            return "image/jpeg";
        if ("html".equalsIgnoreCase(fileExtension))
            return "text/html";
        if ("txt".equalsIgnoreCase(fileExtension))
            return "text/plain";
        if ("vsd".equalsIgnoreCase(fileExtension))
            return "application/vnd.visio";
        if ("ppt".equalsIgnoreCase(fileExtension) || "pptx".equalsIgnoreCase(fileExtension))
            return "application/vnd.ms-powerpoint";
        if ("doc".equalsIgnoreCase(fileExtension) || "docx".equalsIgnoreCase(fileExtension))
            return "application/msword";
        if ("xml".equalsIgnoreCase(fileExtension))
            return "text/xml";
        return "text/html";
    }

}
