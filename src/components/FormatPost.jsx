import React, { useState, useEffect } from "react";

import BdmApi from "../api/Bdm";

import {
  RadialBar,
  RadialBarChart,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FormatPost(props) {
  const [chartData, setChartData] = useState([]);

  const { clientId, profileId } = props

  useEffect(() => {

    async function loadChartData() {

      const response = await BdmApi.getPostsPerType(clientId, profileId);

      setChartData(fillColorFunction(response.data));

    }

    loadChartData();
  }, [clientId, profileId]);

  //Chart's colors
  function fillColorFunction(data) {
    const colors = ["#ffc658", "#d0ed57", "#a4de6c"];
    data = data.map((item, index) => ({
      type: item.type,
      count: item.count,
      fill: colors[index],
    }));
    return data;
  }

  //Customized content - 1
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>
            Porcentaje:{" "}
            <span style={{ color: payload[0].payload.fill }}>
              {getPercentage(chartData, payload[0].value)}
            </span>
            <br />
            {customLabel(payload[0].payload.type)}:{" "}
            <span style={{ color: payload[0].payload.fill }}>
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="row">
      <div className="description">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="wrap-chart">
        <ResponsiveContainer width="99%" aspect={3}>
          <RadialBarChart
            cx="50%"
            cy="70%"
            innerRadius="50%"
            outerRadius="100%"
            barSize={25}
            startAngle={180}
            endAngle={0}
            data={chartData}
          >
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              clockWise
              dataKey="count"
            />
            <Legend
              width={220}
              height={120}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={<RenderLegend />}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

//Helpers - 1
function customLabel(data) {
  let text = "";
  switch (data) {
    case "text":
      text = "Textos";
      break;
    case "image":
      text = "Imágenes";
      break;
    case "video":
      text = "Videos";
      break;
    default:
      text = "";
      break;
  }
  return text;
}

//Helpers - 2
function getPercentage(data, value) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    let count = data[i].count;
    total += count;
  }
  let percentage = Math.round((value * 100) / total);
  return percentage + "%";
}


//Customized content - 2
const RenderLegend = ({ payload }) => {
  return (
    <ul>
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            color: entry.payload.fill
          }}
          className="format-legend"
        >
          {customLabel(entry.payload.type)}
        </li>
      ))}
    </ul>
  );
};


export default FormatPost;
