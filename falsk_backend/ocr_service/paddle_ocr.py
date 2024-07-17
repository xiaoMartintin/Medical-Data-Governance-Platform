import numpy as np
from paddleocr import PaddleOCR
from pdf2image import convert_from_path
import os
import re

def ocr_ct(pdf_path):
    images = convert_from_path(pdf_path)
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")
    text = ""
    for i, image in enumerate(images):
        # 进行OCR 识别
        image_np = np.array(image)
        result = ocr.ocr(image_np, cls=True)
        for line in result[0]:
            text += line[1][0]
    text = text.replace("；", ':')
    text = text.replace(";", ':')
    text = text.replace("：", ':')
    text = text.replace(" ", '')

    ct_info = {
        "check_item": re.search(r"检查项目:(.*?)影像所见", text).group(1),
        "image_view": re.search(r"影像所见:(.*?)影像意见", text).group(1),
        "image_opinion": re.search(r"影像意见:(.*?)报告医师", text).group(1),
        # "content": text,
        "pdf_id": ""
    }
    os.remove(pdf_path)
    return ct_info


def ocr_mr(pdf_path):
    images = convert_from_path(pdf_path)
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")
    text = ""
    for i, image in enumerate(images):
        # 进行OCR 识别
        image_np = np.array(image)
        result = ocr.ocr(image_np, cls=True)
        for line in result[0]:
            text += line[1][0]
    text = text.replace("；", ':')
    # text = text.replace(";", ':')
    text = text.replace("：", ':')
    text = text.replace(" ", '')

    mr_info = {
        "check_item": re.search(r"检查项目:(.*?)影像所见", text).group(1),
        "image_view": re.search(r"影像所见:(.*?)影像意见", text).group(1),
        "image_opinion": re.search(r"影像意见:(.*?)报告医师", text).group(1),
        # "content": text,
        "pdf_id": ""
    }
    os.remove(pdf_path)
    return mr_info

