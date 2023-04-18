package com.example.demo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;



@Controller
@RequestMapping("/")
public class HelloController {

    String[] currencyArray = {
            "http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json",
            "http://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json",
            "http://api.nbp.pl/api/exchangerates/rates/a/jpy/?format=json",
            "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json",
            "http://api.nbp.pl/api/exchangerates/rates/a/chf/?format=json",
           // "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json"
    };
    String curr = "jpy";
    String testLink = "http://api.nbp.pl/api/exchangerates/rates/a/"+curr+"/?format=json";

    private double exchangeRate;
    public double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    @GetMapping
    public String mainPage(Model model) {
        setExchangeRate(WebRequest.getRateFrom(testLink));
        model.addAttribute("exchangeRate", getExchangeRate());
        model.addAttribute("cur", new String());
        return "main";
    }

    @PostMapping("/firstCur")
    public String firstCur(@ModelAttribute String cur){

        System.out.println(cur);
        return "main";
    }

}