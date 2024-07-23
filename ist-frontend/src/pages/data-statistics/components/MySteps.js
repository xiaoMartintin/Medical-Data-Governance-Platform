import React, {useRef, useState} from 'react';
import { Button, message, Steps, theme } from 'antd';
import PieChartCommon from "./PieChartCommon";
import BarChartCommon from "./BarChartCommon";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import * as jspdf from "jspdf";
import JSZip from "jszip";



const MySteps = ({info, current, setCurrent, handleClose}) => {
    const { token } = theme.useToken();
    //const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const chartRefs = [useRef(null),useRef(null),useRef(null)]
    const chartInstances = [useRef(null),useRef(null),useRef(null)];
    const [exportGraphs, setExportGraphs] = useState([])
    const TempAges = info.studies.map(item => parseInt(item.ExamAge));
    const [pdfs, setPdfs] = useState([])
    const minAge = Math.min(...TempAges);
    const maxAge = Math.max(...TempAges);

    const handleExportGraphChange = (data,elementName) => {
        let NewExportGraphs = exportGraphs;
        NewExportGraphs = NewExportGraphs.concat(data);
        setExportGraphs(NewExportGraphs);
        html2canvas(data).then(canvas => {
            canvas.toBlob(function(blob) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const imgData = reader.result; // This will be the base64 string
                    const pdf = new jspdf.jsPDF({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });


                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    // Use the base64 string (imgData)
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    let newPdfs = pdfs.concat({data:pdf,name:elementName});
                    setPdfs(newPdfs)
                };
                reader.readAsDataURL(blob);
            }, 'image/png');
        });
    }

    const rangeSize = Math.ceil((maxAge - minAge) / 5);

    const groupCounts = Array(5).fill(0);
    const groupRanges = [];
    let TempAges_= {};
    for (let i = 0; i < 5; i++) {
        const startRange = minAge + i * rangeSize;
        const endRange = minAge + (i + 1) * rangeSize - 1;
        groupRanges.push(`${startRange} - ${endRange}`);
        TempAges_[`${startRange} - ${endRange}`] = 0;
    }

    TempAges.forEach(age => {
        const index = Math.floor((age - minAge) / rangeSize);
        groupCounts[index]++;
        if(TempAges_.hasOwnProperty(groupRanges[index]))
        TempAges_[groupRanges[index]]++

    });

    const AgesSeriesData = Object.keys(TempAges_).map(key => ({name:key,value:TempAges_[key]}));

    const TempAddresses = info.studies.reduce((result, item) => {
        const province = item.Province;
        if (result[province]) {
            result[province] += 1;
        } else {
            result[province] = 1;
        }
        return result;
    }, {});
    const AddressSeriesData = Object.keys(TempAddresses).map(key => {
        return {
            name: key,
            value: TempAddresses[key]
        };
    });



    const TempGenders = info.studies.reduce((result, item) => {
        const Gender = item.Gender;
        if (result[Gender]) {
            result[Gender] += 1;
        } else {
            result[Gender] = 1;
        }
        return result;
    }, {});
    const GenderSeriesData = Object.keys(TempGenders).map(key => {
        return {
            name: key,
            value: TempGenders[key]
        };
    });



    const steps = [
        {
            title: '年龄统计',
            content:
                <BarChartCommon dataSource={AgesSeriesData} text="条形图" elementName={"age_bar_chart"+info.DiseaseID}></BarChartCommon>
        },
        {
            title: '地区统计',
            content: <PieChartCommon seriesData={AddressSeriesData} elementName={"address_pie_chart"+info.DiseaseID} seriesName="地区" chartRef={chartRefs[1]} chartInstance={chartInstances[1]}></PieChartCommon>,
        },
        {
            title: '性别统计',
            content: <PieChartCommon seriesData={GenderSeriesData} elementName={"gender_pie_chart"+info.DiseaseID} seriesName="性别" chartRef={chartRefs[2]} chartInstance={chartInstances[2]}></PieChartCommon>,
        },
    ];
    const next = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrent(current + 1);
            setLoading(false);
        }, 0);
    };
    const prev = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrent(current - 1);
            setLoading(false);
        }, 0);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => {
                        let elementName
                        switch (current){
                            case 0: elementName = "age_bar_chart"+info.DiseaseID;break;
                            case 1: elementName = "address_pie_chart"+info.DiseaseID; break;
                            default:break;
                        }
                        handleExportGraphChange(document.querySelector("#"+elementName),elementName);
                        next()
                    }}>
                        下一步
                    </Button>
                )}
                {current === steps.length - 1 &&(
                    <Button type="primary" onClick={() => {
                        let NewExportGraphs = exportGraphs;
                        const data = document.querySelector("#gender_pie_chart"+info.DiseaseID);
                        NewExportGraphs = NewExportGraphs.concat(data);
                        setExportGraphs(NewExportGraphs);
                        html2canvas(data).then(canvas => {
                            canvas.toBlob(function(blob) {
                                const reader = new FileReader();
                                reader.onloadend = function() {
                                    const imgData = reader.result; // This will be the base64 string
                                    const pdf = new jspdf.jsPDF({
                                        orientation: 'portrait',
                                        unit: 'px',
                                        format: [canvas.width, canvas.height]
                                    });


                                    const pdfWidth = pdf.internal.pageSize.getWidth();
                                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                                    // Use the base64 string (imgData)
                                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                                    let newPdfs = pdfs.concat({data:pdf,name:"gender_pie_chart"+info.DiseaseID});
                                    setPdfs(newPdfs);
                                    // 创建一个 ZIP 对象
                                    const zip = new JSZip();

                                    // 将每个 PDF 添加到 ZIP 中
                                    newPdfs.forEach(item => {
                                        zip.file(item.name + ".pdf", item.data.output('blob'));
                                    });

                                    // 生成 ZIP 文件并下载
                                    zip.generateAsync({ type: "blob" })
                                        .then(function (content) {
                                            // 使用 FileSaver.js 来下载 ZIP 文件
                                            saveAs(content, "pdfs.zip");
                                        });

                                    handleClose()
                                    //pdf.save('exported-page.pdf');
                                };
                                reader.readAsDataURL(blob);
                            }, 'image/png');
                        });

                    }} loading={loading}>
                        导出
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                        loading={loading}
                    >
                        上一步
                    </Button>
                )}
            </div>
        </>
    );
};
export default MySteps;
