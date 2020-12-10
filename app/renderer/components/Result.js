import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Result = (props) => {
  const { result } = props;

  return (
    <div className="result">
      <div className="result-content">
        <Card className="canvas-card">
          <CardContent>
          <img id="result-image" src={result} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    result: state.result,
  };
};
export default connect(mapStateToProps)(Result);
