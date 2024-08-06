from flask import Flask, request, jsonify
from flask_cors import CORS
from ct import ocr_ct
from mr import ocr_mr
from doctor_advice import ocr_doctor_advice
from disease_course import ocr_disease_course
from discharge_record import ocr_discharge_record
from charge_record import ocr_charge_record
from discuss_record import ocr_discuss_record
from pet_ct import ocr_pet_ct
from type import recognize_type
import os
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.ocr_test
collection = db.pdf_info

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/ocr/analysis', methods=['POST'])
def ocr_ct_report():
    data = request.get_json()
    ids = data.get('ids')
    # 检查 ids 是否存在
    if not ids:
        return jsonify({'error': 'No IDs provided'}), 400
    results = []
    for pdf_id in ids:
        # 使用 ID 查询 MongoDB
        document = collection.find_one({'_id': pdf_id})
        if document:
            pdf_data = document['fileData']
            pdf_name = document['fileName']
            pdf_path = os.path.join('files', pdf_name)

            # 将 PDF 数据写入文件
            with open(pdf_path, 'wb') as f:
                f.write(pdf_data)

            # 对 PDF 文件进行 OCR 处理
            report_type = recognize_type(pdf_path)
            if report_type == "CT":
                ocr_result = ocr_ct(pdf_path)
            elif report_type == "MR":
                ocr_result = ocr_mr(pdf_path)
            elif report_type == "医嘱单":
                ocr_result = ocr_doctor_advice(pdf_path)
            elif report_type == "病程记录":
                ocr_result = ocr_disease_course(pdf_path)
            elif report_type == "出院记录":
                ocr_result = ocr_discharge_record(pdf_path)
            elif report_type == "入院记录":
                ocr_result = ocr_charge_record(pdf_path)
            elif report_type == "术前病例讨论记录":
                ocr_result = ocr_discuss_record(pdf_path)
            elif report_type == "PET-CT":
                ocr_result = ocr_pet_ct(pdf_path)
            else:
                ocr_result = {
                    'pdf_id': "",
                    'pdf_name': pdf_name,
                    "error": "invalid type"
                }
            ocr_result['pdf_id'] = pdf_id
            ocr_result['pdf_name'] = pdf_name
            results.append(ocr_result)
        else:
            # 如果文档不存在，记录错误信息
            results.append({'error': 'Document not found'})

    # 返回所有处理结果
    return jsonify({'message': 'IDs processed successfully', 'results': results}), 200


if __name__ == '__main__':
    app.run()
