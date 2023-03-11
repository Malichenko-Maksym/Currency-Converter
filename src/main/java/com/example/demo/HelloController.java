package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;


@Controller
@RequestMapping("/")
public class HelloController {

    private double exchangeRate = WebRequest.getRateFrom("http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json");

    @GetMapping
    public String mainPage(Model model) {
        model.addAttribute("exchangeRate", exchangeRate);
        return "main";
    }
}