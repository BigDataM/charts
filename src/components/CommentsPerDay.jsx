import React, { useState, useEffect } from "react";

import { CustomizedAxisTickBarChart } from "../helpers/CustomizedAxisTickBarChart";

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



function CommentsPerDay(props) {
  const [chartData, setChartData] = useState([]);

  const { clientId, profileId } = props

  useEffect(() => {

    async function loadChartData() {

      const response = await BdmApi.getCommentsPerDay(clientId, profileId);

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
            <BarChart width={150} height={40} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#BDB2FF" />
                ))}
              </Bar>
              <Bar dataKey="shares" barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#FFC6FF" />
                ))}
              </Bar>
              <YAxis />
              <XAxis datakey="comment_weekday" tick={<CustomizedAxisTickBarChart />} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}


const CustomTooltip = ({ active, payload, label }) => {
  const getIntroOfPage = (label) => {
    if (label === 0) {
      return "Lunes";
    }
    if (label === 1) {
      return "Martes";
    }
    if (label === 2) {
      return "Miércoles";
    }
    if (label === 3) {
      return "Jueves";
    }
    if (label === 4) {
      return "Viernes";
    }
    if (label === 5) {
      return "Sábado";
    }
    if (label === 6) {
      return "Domingo";
    }
    return "";
  };
  if (active && payload && payload.length) {
    payload[0].color = "#BDB2FF";
    payload[1].color = "#FFC6FF";
    return (
      <div className="custom-tooltip">
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">
          <span style={{ color: payload[0].color }}>
            <strong>{payload[0].value} comentarios</strong>
          </span>{" "}
          <br />
          <span style={{ color: payload[1].color }}>
            <strong>{payload[1].value} compartidos</strong>
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CommentsPerDay;
