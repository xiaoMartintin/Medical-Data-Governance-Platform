package com.example.ocr_javabackend.DAO;

import com.example.ocr_javabackend.Entity.PDFInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PDFDAO {
    PDFInfo storePDF(MultipartFile file);
}
