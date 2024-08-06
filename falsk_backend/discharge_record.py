from pdf2image import convert_from_path
from PIL import Image, ImageDraw
from paddleocr import PaddleOCR
import numpy as np
import re


# 生成语义标签
def generate_semantic_tags(report_text, semantic_tags):
    tags = []
    for category, keywords in semantic_tags.items():
        for keyword in keywords:
            if keyword in report_text:
                tags.append(keyword)
    return tags


def get_crop_box(start_coords, end_coords, image_width):
    """根据起始和结束坐标计算裁剪区域，只考虑y坐标"""
    min_y = min(start_coords[2][1], end_coords[2][1])
    max_y = max(start_coords[1][1], end_coords[1][1])
    return (0, min_y, image_width, max_y)


def get_text_coordinates(ocr_results, target_texts):
    """提取包含目标文本的坐标信息"""
    coordinates = {}
    for line in ocr_results[0]:
        text = line[1][0]
        box = line[0]  # 文字的坐标框
        for target_text in target_texts:
            if target_text in text:
                coordinates[target_text] = box
                break  # 一旦找到匹配的文本就退出内层循环
    return coordinates


def ocr_discharge_record(pdf_path):
    images = convert_from_path(pdf_path)
    # 定义语义标签库
    semantic_tags = {
        "肺病": ["肺结节", "肺癌", "肺炎", "肺结核", "肺纤维化", "慢性阻塞性肺疾病", "胸腔积液", "气胸", "支气管扩张", "肺不张"],
        "肝病": ["肝肿瘤", "肝细胞癌", "肝硬化", "肝炎", "脂肪肝", "肝囊肿", "肝脓肿", "血管瘤"],
        "肾病": ["肾结石", "肾肿瘤", "肾囊肿", "肾盂肾炎", "肾积水", "肾梗死"],
        "胃肠道疾病": ["胃癌", "结直肠癌", "阑尾炎", "肠梗阻", "憩室炎", "克罗恩病", "溃疡性结肠炎"],
        "心血管疾病": ["主动脉瘤", "动脉粥样硬化", "冠心病", "心包积液", "心脏扩大"],
        "其他": ["淋巴结病", "脾肿大", "肾上腺肿瘤", "胰腺肿瘤", "腹水", "骨转移", "骨折", "胆囊炎", "胆囊结石", "静脉曲张"]
    }

    # 初始化PaddleOCR
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")

    # 指定要识别的文本
    target_texts = ["病案号", "页"]

    # 识别第一页的图像
    first_image = images[0]
    image_np = np.array(first_image)
    result = ocr.ocr(image_np, cls=True)

    # 提取表头信息坐标
    text_coords = get_text_coordinates(result, target_texts)

    # 确保两个目标文本都被识别
    if len(target_texts) == len(text_coords):
        start_coords = text_coords["病案号"]
        end_coords = text_coords["页"]

        # 获取裁剪区域的坐标
        image_width = first_image.width
        crop_box = get_crop_box(start_coords, end_coords, image_width)

        # 使用PIL绘制裁剪区域
        draw = ImageDraw.Draw(first_image)
        draw.rectangle(crop_box, outline="red", width=5)
        # 显示图像
        # first_image.show()

        # 提取第一页的表头信息
        header_text = ""
        for line in result[0]:
            box = line[0]
            if box[0][1] < crop_box[1] or box[2][1] > crop_box[3]:
                header_text += line[1][0]

        header_text = header_text.replace("：", '')
        header_text = header_text.replace(":", '')
        print("表头信息:\n", header_text)
        header_patterns = {
            "name": r"姓名(.*?)登记号",
            "record_id": r"登记号(.*?)科别",
            "department": r"科别(.*?)病区",
            "ward": r"病区(.*?)床号",
            "bed_number": r"床号(.*?)病案号",
            "medical_record_number": r"病案号(.*?)第",
        }

        # 提取字段
        structured_data = {}
        for key, pattern in header_patterns.items():
            match = re.search(pattern, header_text)
            if match:
                structured_data[key] = match.group(1).strip()
            else:
                structured_data[key] = ""

        # 打印结构化数据
        for key, value in structured_data.items():
            print(f"{key}: {value}")

        # 提取每页主体部分信息
        main_text = ""
        for i, image in enumerate(images):
            cropped_image = image.crop(crop_box)
            image_np = np.array(cropped_image)
            result = ocr.ocr(image_np, cls=True)
            for line in result[0]:
                main_text += line[1][0]
            main_text += "\n"  # 每页结束后换行

        print("主体信息:\n", main_text)
        main_text = main_text.replace("：", ":")
        tags = generate_semantic_tags(main_text, semantic_tags)
        print("语义标签：", tags)
        structured_data["pdf_id"] = ""
        structured_data["pdf_name"] = ""
        structured_data["tags"] = tags
        structured_data["main_text"] = main_text
        structured_data["type"] = "出院记录"
        structured_data["gender"] = re.search(r"性别:(.*?)年龄", main_text).group(1).strip()
        structured_data["age"] = re.search(r"年龄:(.*?)婚姻", main_text).group(1).strip()
        structured_data["married"] = re.search(r"婚姻:(.*?)入院", main_text).group(1).strip()
        structured_data["charge_time"] = re.search(r"入院日期:(.*?)出院", main_text).group(1).strip()
        structured_data["discharge_time"] = re.search(r"出院日期:(.*?)住院", main_text).group(1).strip()
        structured_data["duration"] = re.search(r"住院天数:(.*?)入院", main_text).group(1).strip()
        dr_info = structured_data
        return dr_info

    else:
        print("没有指定文本")
        dr_info = {
            "pdf_id": "",
            "type": "出院记录",
            "pdf_name": "",
        }
        return dr_info
