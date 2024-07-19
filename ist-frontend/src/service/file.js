import { root_url, flask_url, postRequest_formData, postRequest_json } from "../utility/fetch"

export function submitFile (fileInfo, callback) {
  postRequest_formData(root_url + "/ocr/UpdatePDF", fileInfo, callback)
}


export function ocr_ct (ids, callback) {
  postRequest_json(flask_url + "/ocr/CT_Report", ids, callback)
}

export function ocr_mr (ids, callback) {
  postRequest_json(flask_url + "/ocr/MR_Report", ids, callback)
}