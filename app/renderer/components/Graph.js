import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Graph = (props) => {
  console.log(props);
  let cumulative = JSON.parse(localStorage.getItem("cumulative") || "[]");

  const getData = () => {
    cumulative = JSON.parse(localStorage.getItem("cumulative") || "[]");
  };

  useEffect(() => {
    window.addEventListener("storage", getData, false);
    return () => {
      window.removeEventListener("storage", getData);
    };
    // console.log("looooooading");
    // cumulative = JSON.parse(localStorage.getItem("cumulative") || "[]");
  }, []);
  return (
    <div className='main' style={{ height: "100vh" }}>
      <div className='graph-content'>
        <Card className='canvas-card'>
          <CardContent>
            <LineChart data={cumulative} width={550} height={550}>
              <Line
                dot={false}
                type='monotone'
                dataKey='etalon'
                strokeWidth={1}
                stroke='#0000ff'
              />
              <Line
                dot={false}
                type='monotone'
                dataKey='pattern'
                strokeWidth={1}
                stroke='#ff0000'
              />
              <XAxis dataKey='name' />
              <YAxis />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Tooltip />
            </LineChart>
          </CardContent>
        </Card>
      </div>

      <AppBar
        position='absolute'
        className='status-bar'
        color='default'
      ></AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cumulative: state.cumulative,
  };
};
export default connect(mapStateToProps)(Graph);
