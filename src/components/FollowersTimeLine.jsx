import React, { useState, useEffect } from "react";

import { GroupDataByDate } from "../helpers/GroupDataByDate";

import { CustomizedAxisTick } from "../helpers/CustomizedAxisTick"

import BdmApi from "../api/Bdm";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function FollowersTimeLine(props) {
  const { clientId, profileId, since_str, until_str, interval } = props;
 
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
 
  async function loadChartData(){
  
    const response = await BdmApi.getProfileMetrics(clientId, profileId, since_str, until_str, interval);
  
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
            <LineChart width="100%" height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval="preserveStartEnd"
                tick={<CustomizedAxisTick />}
              />
              <YAxis interval="preserveStartEnd" />
              <Legend
                wrapperStyle={{ position: "relative" }}
                iconType="plainlane"
              />
              <Tooltip />
              <Line
                name="Perfil"
                type="monotone"
                dataKey="followers"
                stroke="#00acee"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}




export default FollowersTimeLine;
