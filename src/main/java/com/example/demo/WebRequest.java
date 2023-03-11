package com.example.demo;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WebRequest {

    public static Double getRateFrom(String webApiLink) {

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(webApiLink)).build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenApply(ParseJSON::getRate).join();
    }

    // public static void main(String[] args) {
        
    //     System.out.println(WebRequest.getRateFrom("http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json"));
    // }
}