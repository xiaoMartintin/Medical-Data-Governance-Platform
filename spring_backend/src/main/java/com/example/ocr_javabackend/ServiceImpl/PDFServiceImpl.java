package com.example.ocr_javabackend.ServiceImpl;


import com.example.ocr_javabackend.DAO.PDFDAO;
import com.example.ocr_javabackend.Entity.PDFInfo;
import com.example.ocr_javabackend.Service.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PDFServiceImpl implements PDFService {

    @Autowired
    private PDFDAO pdfdao;
    @Override
    public PDFInfo storeFile(MultipartFile file){
        return pdfdao.storePDF(file);
    }
}
