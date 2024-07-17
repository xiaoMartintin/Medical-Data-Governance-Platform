from flask import Flask, request, jsonify
from flask_cors import CORS
from ocr_service.paddle_ocr import ocr_ct, ocr_mr
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


@app.route('/ocr/CT_Report', methods=['POST'])
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
            ocr_result = ocr_ct(pdf_path)
            ocr_result['pdf_id'] = pdf_id
            results.append(ocr_result)
        else:
            # 如果文档不存在，记录错误信息
            results.append({'error': 'Document not found'})

    # 返回所有处理结果
    return jsonify({'message': 'IDs processed successfully', 'results': results}), 200


@app.route('/ocr/MR_Report', methods=['POST'])
def ocr_mr_report():
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
            ocr_result = ocr_mr(pdf_path)
            ocr_result['pdf_id'] = pdf_id
            results.append(ocr_result)
        else:
            # 如果文档不存在，记录错误信息
            results.append({'error': 'Document not found'})

    # 返回所有处理结果
    return jsonify({'message': 'IDs processed successfully', 'results': results}), 200


if __name__ == '__main__':
    app.run()
