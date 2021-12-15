import React, { useState, useEffect } from "react";

import BdmApi from "../api/Bdm";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function SentimentPerComment(props) {
  const [chartData, setChartData] = useState([]);

  const { clientId, profileId } = props

  useEffect(() => {

    async function loadChartData() {

      const response = await BdmApi.getCommentsPerFeeling(clientId, profileId);

      setChartData(response.data);

    }

    loadChartData();
  }, [clientId, profileId]);

  return (
    <>
      <div className="row">
        <div className="description">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="wrap-chart">
          <ResponsiveContainer width="99%" aspect={3}>
            <BarChart layout="vertical" data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                ))}
              </Bar>
              <YAxis type="category" tick={<CustomizedAxisTick />} />
              <XAxis datakey="sentiment" type="number" />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

const barColors = ["#60D394", "#FFD97D", "#EE6055"];

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  const barLabels = ["Positivo", "Neutro", "Negativo"];
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-32}
        y={-12}
        className="labels-feelings"
        dy={16}
        textAnchor="middle"
        fill="#666"
      >
        {barLabels[payload.index]}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  const getIntroOfPage = (label) => {
    if (label === 0) {
      return "Positivo";
    }
    if (label === 1) {
      return "Neutral";
    }
    if (label === 2) {
      return "Negativo";
    }
  
    return "";
  };
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">
          Han habido <strong>{payload[0].value}</strong> posteos
        </p>
      </div>
    );
  }

  return null;
};

export default SentimentPerComment;
