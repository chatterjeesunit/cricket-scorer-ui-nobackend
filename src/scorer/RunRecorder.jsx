import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import './../css/style.css';
import { recordScore } from './../home/actions';

class RunRecorder extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <button className="btn btn-outline-info button" id="zero" type="button" onClick={() => this.run = 0}>0</button>
          <button className="btn btn-outline-info button" id="one" type="button" onClick={() => this.run = 1}>1</button>
          <button className="btn btn-outline-info button" id="two" type="button" onClick={() => this.run = 2}>2</button>
          <button className="btn btn-outline-info button" id="three" type="button" onClick={() => this.run = 3}>3</button>
          <button className="btn btn-outline-info button" id="four" type="button" onClick={() => this.run = 4}>4</button>
          <button className="btn btn-outline-info button" id="five" type="button" onClick={() => this.run = 5}>5</button>
          <button className="btn btn-outline-info button" id="six" type="button" onClick={() => this.run = 6}>6</button>
          <button className="btn btn-outline-info button" id="seven" type="button" onClick={() => this.run = 7}>7</button>
        </div>
        <br />
        <div className="row">
          <button className="btn btn-outline-info button btn-lg" id="submit" type="button" onClick={() => this.props.recordScore(this.run)}>Next Ball</button>
        </div>
      </div>
    );
  }
}

const mapDispatchAsProps = (dispatch) => {
  return {
    recordScore: (run) => {
      dispatch(recordScore(run));
    },
  };
};

export default connect(null, mapDispatchAsProps)(RunRecorder);
