package com.example.ocr_javabackend.DAOImpl;

import com.example.ocr_javabackend.DAO.PDFDAO;
import com.example.ocr_javabackend.Entity.PDFInfo;
import com.example.ocr_javabackend.Repository.PDFRepository;
import org.bson.BsonBinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Repository
public class PDFDAOImpl implements PDFDAO {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private PDFRepository pdfRepository;

    @Override
    public PDFInfo storePDF(MultipartFile file){
        PDFInfo pdfInfo = new PDFInfo();
        pdfInfo.set_id(UUID.randomUUID().toString());
        pdfInfo.setFileName(file.getOriginalFilename());
        try {
            BsonBinary bsonBinary = new BsonBinary(file.getBytes());
            pdfInfo.setFileData(bsonBinary);
        } catch (Exception e) {
            System.out.println("exception occurred");
        }
        mongoTemplate.save(pdfInfo);
        return pdfInfo;
    }
}
