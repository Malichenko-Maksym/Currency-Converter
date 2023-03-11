package com.example.demo;

import org.json.JSONArray;
import org.json.JSONObject;

public class ParseJSON {

    public static Double getRate(String responceBody) {
        JSONObject jsonObj = new JSONObject(responceBody);
        return jsonObj.getJSONArray("rates").getJSONObject(0).getDouble("mid");
    }
    
}
