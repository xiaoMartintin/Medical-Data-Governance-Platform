package com.example.ocr_javabackend.Entity;

import org.bson.BsonBinary;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "pdf_info")
public class PDFInfo {
    @Id
    private String _id;
    private String fileName;
    private BsonBinary fileData;

    public String get_id() {
        return _id;
    }

    public String getFileName(){
        return fileName;
    }

    public BsonBinary getFileData() {
        return fileData;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setFileData(BsonBinary fileData) {
        this.fileData = fileData;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
