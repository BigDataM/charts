import React, { useState, useEffect } from "react";

import BdmApi from "../api/Bdm";

import { GroupDataByDate } from "../helpers/GroupDataByDate";

import { CustomizedAxisTick } from "../helpers/CustomizedAxisTick";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

function CommentsAndShares(props) {

  const { clientId, profileId, since_str, until_str, interval } = props;

  const [chartData, setChartData] = useState([]);

  const [pieData, setPieData] = useState([{ "interaction": "Me gusta", "value": 1 }, { "interaction": "Compartidos", "value": 1 }, { "interaction": "Comentarios", "value": 1 }])

  useEffect(() => {

    async function loadChartData() {

      const response = await BdmApi.getCommentsAndShares(clientId, profileId, since_str, until_str, interval);
  
      const groupedData = GroupDataByDate(since_str, until_str, interval, response.data);
  
      setChartData(groupedData);
  
    }

    loadChartData();

  }, [clientId, profileId, since_str, until_str, interval]);


  //Customize pie data
  function CustomMouseHover(payload) {
    let data = [payload.activePayload[0].payload];
    if (data[0].count === null) {
      let noValue = {
        "interaction": "No hubo interacción",
        "value": 1
      }
      data.push(noValue);
    } else {
      let likes = {
        "interaction": "Me gusta",
        "value": data[0].likes
      }
      let shares = {
        "interaction": "Compartidos",
        "value": data[0].shares
      };
      let comments = {
        "interaction": "Comentarios",
        "value": data[0].comments
      }
      data.push(likes, shares, comments)
    }

    setPieData(data);
  }


  return (
    <>
      <div className="row">
        <div className="description">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart width="100%" height={200}
              onMouseEnter={CustomMouseHover} data={chartData}>
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
                name="Me gusta"
                type="monotone"
                dataKey="likes"
                stroke="#00C49F"
                strokeWidth={3}
              />
              <Line
                name="Comentarios"
                type="monotone"
                dataKey="comments"
                stroke="#FF8042"
                strokeWidth={3}
              />
              <Line
                name="Compartidos"
                type="monotone"
                dataKey="shares"
                stroke="#FFBB28"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    if (payload[0].payload.interaction === "No hubo interacción") {
      return (
        <div className="custom-tooltip">
          <p className="intro">{payload[0].payload.interaction}</p>
        </div>
      )
    }
    return (
      <div className="custom-tooltip">
        <p className="intro">{payload[0].payload.interaction}</p>
        <p className="desc">
          Ha habido un total de {payload[0].value} interacciones
        </p>
      </div>
    );
  }

  return null;
};

  // PieChart //
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    let x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log("este es x" + x + " y este es y" + y);
    if(x < 500){
      x += 15
    }
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {(percent * 100) === 0 ? null : `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


export default CommentsAndShares;
