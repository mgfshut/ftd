package com.gjxx.ftd.common;

import java.util.Map;

/**
 * Created by mgf on 2017/9/11.
 */
public class SimpleResponse {

    private String returncode;

    private String message;

    private Map<String, Object> data;

    public String getReturncode() {
        return returncode;
    }

    public void setReturncode(String returncode) {
        this.returncode = returncode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
