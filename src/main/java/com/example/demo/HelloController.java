package com.example.demo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;



@Controller
@RequestMapping("/")
public class HelloController{


    @GetMapping
    public String mainPage(Model model) {
        model.addAttribute("cur", new String());
        return "main";
    }

    @PostMapping("/submitFirstCur")
    @ResponseBody
    public double submitFirstCur(@RequestBody AcceptedResponce accRes){
        String firstCur = accRes.getChosenFirstCur();
        Double firstCurRate;
        if(firstCur.equals("pln")) {
            firstCurRate=1.0;
        } else {
            firstCurRate = WebRequest.getRateFrom("http://api.nbp.pl/api/exchangerates/rates/a/"+firstCur+"/?format=json");
        }
        return firstCurRate;
    }

    @PostMapping("/submitSecondCur")
    @ResponseBody
    public double submitSecondCur(@RequestBody AcceptedResponce accRes){
        String secondCur = accRes.getChosenSecondCur();
        Double secondCurRate;
        if(secondCur.equals("pln")) {
            secondCurRate=1.0;
        } else {
            secondCurRate = WebRequest.getRateFrom("http://api.nbp.pl/api/exchangerates/rates/a/"+secondCur+"/?format=json");
        }
        return secondCurRate;
    }
}

