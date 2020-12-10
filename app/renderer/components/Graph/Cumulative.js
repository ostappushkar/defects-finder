import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Cumulative = (props) => {
  const { cumulative } = props;

  return (
    <div className="main">
      <div className="graph-content">
        <Card className="canvas-card">
          <CardContent>
            <LineChart
              data={cumulative}
              width={800}
              height={550}
              margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
              <Line
                connectNulls={true}
                dot={false}
                type="monotone"
                dataKey="etalon"
                strokeWidth={1}
                stroke="#0000ff"
              />
              <Line
                dot={false}
                connectNulls={true}
                type="monotone"
                dataKey="pattern"
                strokeWidth={1}
                stroke="#ff0000"
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Tooltip />
            </LineChart>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cumulative: state.cumulative,
  };
};
export default connect(mapStateToProps)(Cumulative);
