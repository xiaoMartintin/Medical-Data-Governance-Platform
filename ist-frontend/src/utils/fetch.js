export const host = {
    development: 'http://127.0.0.1:9012',
    production: ''
}

function request(url, options = {}) {
    return fetch(host[process.env.NODE_ENV] + url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP状态码${response.status}`)
            }
            return response.json()
        }).then(jsonData => {
            if (jsonData.code !== 200) {
                throw new Error(jsonData.message || '未知错误')
            }
            return jsonData.data
        })
}

export function get(url, data = {}) {
    const params = new URLSearchParams(data)
    const urlWithQuery = `${url}?${params.toString()}`
    return request(urlWithQuery)
}

export function post(url, data = {}) {
    return request(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
}

export function del(url, data = {}) {
    const params = new URLSearchParams(data)
    const urlWithQuery = `${url}?${params.toString()}`
    return request(urlWithQuery, {
        method: 'DELETE'
    })
}

export function put(url, data = {}) {
    return request(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
}
