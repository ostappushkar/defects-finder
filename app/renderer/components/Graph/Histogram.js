import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Histogram = (props) => {
  const { histogram } = props;

  return (
    <div className="main">
      <div className="graph-content">
        <Card className="canvas-card">
          <CardContent>
            <AreaChart
              width={800}
              height={550}
              data={histogram}
              margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4B2B" stopOpacity={1} />
                  <stop offset="95%" stopColor="#FF4B2B" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pattern"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="etalon"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </CardContent>
        </Card>
      </div>

      <AppBar position="absolute" className="status-bar" color="default"></AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    histogram: state.histogram,
  };
};
export default connect(mapStateToProps)(Histogram);
