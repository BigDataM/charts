import React, { useState, useEffect } from 'react';

import BdmApi from '../api/Bdm';

import { GroupDataByDate } from '../helpers/GroupDataByDate';

import { CustomizedAxisTick } from '../helpers/CustomizedAxisTick';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

function PostClasificationTimeLine(props) {
    const { clientId, profileId, since_str, until_str, interval } = props;

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        async function loadChartData() {

            const response = await BdmApi.getPostsPerTag(clientId, profileId, since_str, until_str, interval);

            const groupedData = GroupDataByDate(since_str, until_str, interval, response.data);

            setChartData(groupedData); 
            
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
                        <LineChart
                            width={500}
                            height={400}
                            data={chartData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" interval="preserveStartEnd" tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip />

                            <Line name="Clasificación" type="monotone" stackId={1} dataKey="count" fill="#FFC6FF" />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default PostClasificationTimeLine