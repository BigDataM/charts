import React, { useState, useEffect } from 'react'

import BdmApi from '../api/Bdm';

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


function CommentsClasificationBarchart(props) {
  const [chartData, setChartData] = useState([]);

  const { clientId, profileId } = props

  useEffect(() => {

    async function loadChartData() {

      const response = await BdmApi.getCommentsByTagBarchart(clientId, profileId);

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
                  <Cell key={`cell-${index}`} fill="#BDB2FF" />
                ))}
              </Bar>
              <YAxis type="category" datakey="tag" />
              <XAxis type="number" />
              <Tooltip cursor={false} content={<CustomTooltip/>} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="desc">
          Han habido <strong>{payload[0].value}</strong> comentarios
        </p>
      </div>
    );
  }

  return null;
};

export default CommentsClasificationBarchart
