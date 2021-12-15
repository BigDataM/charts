import React, { useEffect, useState } from 'react'

import BdmApi from '../api/Bdm';

import { GroupDataByDate } from '../helpers/GroupDataByDate';

import { CustomizedAxisTick } from '../helpers/CustomizedAxisTick';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function SocialCommentsTimeLine(props) {
    const { clientId, profileId, since_str, until_str, interval } = props;
 
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
   
    async function loadChartData(){
    
      const response = await BdmApi.getSocialComments(clientId, profileId, since_str, until_str, interval);
    
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
                        <LineChart width="10%" height={200} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                interval="preserveStartEnd"
                                tick={<CustomizedAxisTick />}
                            />
                            <YAxis />
                            <Legend
                                wrapperStyle={{ position: "relative" }}
                                iconType="plainlane"
                            />
                            <Tooltip />
                            <Line
                                name="Perfil"
                                type="step"
                                dataKey="count"
                                stroke="#00acee"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default SocialCommentsTimeLine
