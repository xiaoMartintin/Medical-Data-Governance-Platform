package com.example.ocr_javabackend.Service;

import com.example.ocr_javabackend.Entity.PDFInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PDFService {
    PDFInfo storeFile(MultipartFile file);
}
