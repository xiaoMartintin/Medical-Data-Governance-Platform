package com.example.ocr_javabackend.Repository;


import com.example.ocr_javabackend.Entity.PDFInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PDFRepository extends MongoRepository<PDFInfo, String> {
    PDFInfo findPDFInfoByFileName(String fileName);
}
