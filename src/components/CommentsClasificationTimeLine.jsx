import React, { useState, useEffect } from 'react';

import BdmApi from '../api/Bdm';

import { GroupDataByDate } from '../helpers/GroupDataByDate';

import { CustomizedAxisTick } from '../helpers/CustomizedAxisTick';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

function CommentsClasificationTimeLine(props) {
    const { clientId, profileId, since_str, until_str, interval } = props;
 
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
   
    async function loadChartData(){
    
      const response = await BdmApi.getCommentsByTagTimeline(clientId, profileId, since_str, until_str, interval);
    
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
                        <AreaChart
                            width={500}
                            height={400}
                            data={chartData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" interval="preserveStartEnd" tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip/>}/>
                            <Area name="Perfil" type="monotone" dataKey="count" stroke="#8884d8" stackId="1" fill="#8884d8" />
                            <Legend/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
  
      return (
        <div className="custom-tooltip">
          <p className="desc">
              <span style={{color: payload[0].fill}}>
                  {(payload[0].name)} : {payload[0].value}
              </span>
          </p>
        </div>
      );
    }
  
    return null;
  };


export default CommentsClasificationTimeLine