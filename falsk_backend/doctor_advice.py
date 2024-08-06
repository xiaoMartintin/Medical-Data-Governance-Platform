import re

import tabula
import numpy as np
from paddleocr import PaddleOCR
from pdf2image import convert_from_path

def ocr_doctor_advice(pdf_path):
    # 读取PDF中的表格
    dfs = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)

    # 处理提取的表格数据
    tables_json = []

    for i, df in enumerate(dfs):
        # 处理第一页的特殊情况
        if i == 0:
            # 设置第一行作为列名
            df.columns = df.iloc[0]
            df = df.drop(0)
            df = df.reset_index(drop=True)

            # 替换列名中多余的 'Unnamed: ' 前缀
            df.columns = [col if not col.startswith('Unnamed:') else '' for col in df.columns]
        else:
            # 对于其他页，保持原始结构
            df.columns = df.columns.str.replace('Unnamed: \d+', '').str.strip()

        # 替换 NaN 值
        df = df.replace({np.nan: None})

        # 转换 DataFrame 为 JSON 格式
        table_json = {
            "table_number": i + 1,
            "data": df.to_dict(orient='records')
        }
        tables_json.append(table_json)

    images = convert_from_path(pdf_path)
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")
    text = ""
    for i, image in enumerate(images):
        # 进行OCR 识别
        image_np = np.array(image)
        result = ocr.ocr(image_np, cls=True)
        for line in result[0]:
            text += line[1][0]
    text = text.replace("：", '')
    text = text.replace(":", '')
    text = text.replace("_", '')
    text = text.replace(".", '')
    # print(text)

    advice_info = {
        "tables_json": tables_json,
        "pdf_id": "",
        "pdf_name": "",
        "type": "医嘱单",
        "name": re.search(r"姓名(.*?)性别", text).group(1).strip(),
        "gender": re.search(r"性别(.*?)年龄", text).group(1).strip(),
        "age": re.search(r"年龄(.*?)科别", text).group(1).strip(),
        "department": re.search(r"科别(.*?)病区", text).group(1).strip(),
        "ward": re.search(r"病区(.*?)床号", text).group(1).strip(),
        "bed_number": re.search(r"床号(.*?)病案号", text).group(1).strip(),
        "medical_record_number": re.search(r"病案号(.*?)开始", text).group(1).strip()
    }
    return advice_info
