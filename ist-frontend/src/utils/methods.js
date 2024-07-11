import {message} from 'antd'
import {host} from './fetch'

export function convertDataToCSV(data) {
    let result = ''

    if (!data || data.length === 0) {
        return result
    }

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(item => {
        let ctr = 0
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter
            result += item[key]
            ctr++
        })
        result += lineDelimiter
    })

    return result
}

export function downloadCSV(data, filename = 'exported_data.csv') {
    const csv = convertDataToCSV(data)
    if (!csv) return

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'})
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
}

export function downloadZip(url, filename = 'exported_data.zip') {
    fetch(host[process.env.NODE_ENV] + url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP状态码${response.status}`)
            }
            return response.blob()
        })
        .then(blob => {
            const downloadUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = filename
            link.style.visibility = 'hidden'

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            URL.revokeObjectURL(downloadUrl)
        })
        .catch(error => {
            message.error(`下载失败：${error.message}`)
        })
}
