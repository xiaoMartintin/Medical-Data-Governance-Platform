package com.example.ocr_javabackend.Controller;
import com.example.ocr_javabackend.Entity.PDFInfo;
import com.example.ocr_javabackend.Service.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PDFController {

    @Autowired
    private PDFService pdfService;
    @PostMapping("/ocr/UpdatePDF")
    public PDFInfo uploadFile(@RequestParam("file") MultipartFile file){
        if(!file.isEmpty()){
            return pdfService.storeFile(file);
        }
        else{
            return null;
        }
    }

}
