export const getRequest_noToken = (url, callback) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((error) => console.log(error))
}

export const postRequest_formData = (url, values, callback) => {
  fetch(url, {
    method: "POST",
    body: values,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((values) => callback(values))
    .catch((error) => console.error(error))
}

export const postRequest_json = (url, values, callback) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((values) => callback(values))
    .catch((error) => console.error(error))
}

export const root_url = "http://127.0.0.1:8080"
export const flask_url = "http://127.0.0.1:5000"