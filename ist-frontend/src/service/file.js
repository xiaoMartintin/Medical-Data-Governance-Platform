import { getRequest_noToken, root_url, flask_url, postRequest_formData, postRequest_json } from "../utility/fetch"

export function submitFile (fileInfo, callback) {
  postRequest_formData(root_url + "/ocr/UpdatePDF", fileInfo, callback)
}

export function ocr (id, callback) {
  getRequest_noToken(flask_url + "/ocr/TextExtraction?id=" + id, callback)
}

export function ocr_multi (ids, callback) {
  postRequest_json(flask_url + "/ocr/TextExtractionMulti", ids, callback)
}

export function ocr_ct (ids, callback) {
  postRequest_json(flask_url + "/ocr/CT_Report", ids, callback)
}

export function ocr_mr (ids, callback) {
  postRequest_json(flask_url + "/ocr/MR_Report", ids, callback)
}