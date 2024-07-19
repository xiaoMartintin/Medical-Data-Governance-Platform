import React, {useRef, useState} from 'react';
import { Button, message, Steps, theme } from 'antd';
import PieChartCommon from "./PieChartCommon";
import BarChartCommon from "./BarChartCommon";



const MySteps = ({info, current, setCurrent}) => {
    const { token } = theme.useToken();
    //const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const chartRefs = [useRef(null),useRef(null),useRef(null)]
    const chartInstances = [useRef(null),useRef(null),useRef(null)];
    const TempAges = info.studies.map(item => parseInt(item.ExamAge));
    const minAge = Math.min(...TempAges);
    const maxAge = Math.max(...TempAges);

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
        }, 1000);
    };
    const prev = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrent(current - 1);
            setLoading(false);
        }, 1000);
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
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')} loading={loading}>
                        Done
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
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};
export default MySteps;
