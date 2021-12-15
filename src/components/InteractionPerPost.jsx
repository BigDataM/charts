import React, { useState, useEffect } from 'react'

import BdmApi from '../api/Bdm';

import { GroupDataByDate } from '../helpers/GroupDataByDate';

import { CustomizedAxisTick } from '../helpers/CustomizedAxisTick';

import {
    ScatterChart,
    Scatter,
    XAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    Cell,
} from 'recharts';

function InteractionPerPost(props) {
    const { clientId, profileId, since_str, until_str, interval } = props;

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        async function loadChartData() {

            const response = await BdmApi.getInteractionsPerPost(clientId, profileId, since_str, until_str, interval);

            const groupedData = GroupDataByDate(since_str, until_str, interval, response.data);

            function TotalInteractions(data) {
                data = data.map((item) => ({
                    date: item.date,
                    likes: item.likes,
                    shares: item.shares,
                    comments: item.comments,
                    total: (item.likes + item.shares + item.comments)
                }));
                return data
            }
        
            setChartData(TotalInteractions(groupedData));

        }

        loadChartData();

    }, [clientId, profileId, since_str, until_str, interval]);

    return (
        <>
            <div className="row">
                <div className="description">
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="wrap-chart">
                    <ResponsiveContainer width="99%" aspect={3}>
                        <ScatterChart>
                            <CartesianGrid />
                            <YAxis />
                            <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                            <ZAxis dataKey="total" range={[60, 600]} />
                            <Tooltip cursor={true} content={<CustomTooltip />} />
                            <Scatter fill="red" dataKey="total" data={chartData} shape="circle">
                                {
                                    chartData.map((entry, index) => {
                                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    })
                                }
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

//Customize Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="intro">{payload[0].value}</p>
                <p className="desc">
                    Ha habido un total de {payload[0].payload.total} interacciones
                </p>
            </div>
        );
    }

    return null;
};

//Custom color
const colors = ["#60D394", "#EE6055"]



export default InteractionPerPost


