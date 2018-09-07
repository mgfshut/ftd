package com.gjxx.core.utils;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;


/**
 * @author mgf
 */
public class AESCription {
    public static String AES_KEY = "uYQgiJfxYn5AWxG4Q*Oy!h&#QDrNa1#z";
    /**
     * 加密
     *
     * @param strMing 需要加密的内容
     * @param strKey  加密密码
     * @return  String
     */
    public static String encrypt(String strMing, String strKey) {
        try {
            SecretKey secretKey = getKey(strKey);
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            byte[] byteContent = strMing.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            return parseByte2HexStr(result); // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static SecretKey getKey(String strKey) throws NoSuchAlgorithmException {
        KeyGenerator kgen = KeyGenerator.getInstance("AES");
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        random.setSeed(strKey.getBytes());
        kgen.init(128, random);
        SecretKey secretKey = kgen.generateKey();
        return secretKey;
    }

    public static String decrypt(String strMing, String strKey) {
        byte[] result = decrypt(parseHexStr2Byte(strMing), strKey);
        if (result == null || result.length == 0) {
            return null;
        }
        return new String(result);
    }

    /**
     * 解密
     *
     * @param strMing 待解密内容
     * @param strKey  解密密钥
     * @return  byte[]
     */
    public static byte[] decrypt(byte[] strMing, String strKey) {
        try {
            SecretKey secretKey = getKey(strKey);
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(strMing);
            return result; // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将二进制转换成16进制
     *
     * @param buf   byte[]
     * @return  String
     */
    public static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    /**
     * 将16进制转换为二进制
     *
     * @param hexStr    String
     * @return  byte[]
     */
    public static byte[] parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1)
            return null;
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < hexStr.length() / 2; i++) {
            int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
            int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    public static void main(String[] args) {
        String password = "uYQgiJfxYn5UWxG4Q*Oy!h&#QDrNa1#z";
//        password = "uYQgiJfxYn5UWxG4Q*Oy!h&#QDrNa1#z";
        String content = "42f07eb701b64a6fbc3174d386cbad38";// 445A7F7F46D63C6266D7149945DABCCAE4BAB0AD3A5D7551E883DE4624863AD4
       // 7CFEF3CFC9895534D739B4C494FED6086504A0088031DEB2CD5F6073388C65C5867F440347C8091F3974340C3C0733FE
//        content = System.currentTimeMillis() + "-" + "6e4966d70a3d4954a56a1caa49dcc689";

        // 加密
        long start = System.currentTimeMillis();
        System.out.println("加密前：" + content);
        String encryptResult = encrypt(content, password);
        long end = System.currentTimeMillis();
        System.out.println(String.format("加密后：%s, 耗时 %s ms", encryptResult, (end-start)));
        // 解密
        start = System.currentTimeMillis();
        String decryptResult = decrypt("7CFEF3CFC9895534D739B4C494FED6086504A0088031DEB2CD5F6073388C65C5867F440347C8091F3974340C3C0733FE", password);
        end = System.currentTimeMillis();
        System.out.println(String.format("解密后：%s, 耗时 %s ms", decryptResult, (end-start)));
    }
}
