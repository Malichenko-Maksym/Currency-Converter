package com.example.demo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;



@Controller
@RequestMapping("/")
public class HelloController {

    private double exchangeRate;
    public double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    @GetMapping
    public String mainPage(Model model) {
        setExchangeRate(WebRequest.getRateFrom("http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json"));
        model.addAttribute("exchangeRate", getExchangeRate());
        return "main";
    }
}