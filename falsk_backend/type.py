import numpy as np
from paddleocr import PaddleOCR
from pdf2image import convert_from_path


def recognize_type(pdf_path):
    images = convert_from_path(pdf_path)
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")
    text = ""
    for i, image in enumerate(images):
        # 进行OCR 识别
        image_np = np.array(image)
        result = ocr.ocr(image_np, cls=True)
        for line in result[0]:
            text += line[1][0]
    # 定义要查找的关键词和对应的报告类型
    keywords = {
        "影像科CT检查报告": "CT",
        "影像科MR检查报告": "MR",
        "医嘱单": "医嘱单",
        "病程记录": "病程记录",
        "出院记录": "出院记录",
        "入院记录": "入院记录",
        "术前病例讨论记录": "术前病例讨论记录",
        "PET-CT检查报告书": "PET-CT"
    }

    # 查找文本中是否包含特定关键词，并返回相应的报告类型
    for keyword, report_type in keywords.items():
        if keyword in text:
            return report_type

