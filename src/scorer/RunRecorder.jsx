import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import './../css/style.css';
import { recordScore } from './../home/actions';
import NewBatsman from '../newBatsman/NewBatsman';

class RunRecorder extends Component {
  save(runsScored, isBatsmanOut) {
    this.run = runsScored;
    this.isCurrentBatsmanOut = isBatsmanOut;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3">
            <button className="btn btn-outline-info button" id="zero" type="button" onClick={() => this.save(0, false)}>0</button>
            <button className="btn btn-outline-info button" id="one" type="button" onClick={() => this.save(1, false)}>1</button>
            <button className="btn btn-outline-info button" id="two" type="button" onClick={() => this.save(2, false)}>2</button>
            <button className="btn btn-outline-info button" id="three" type="button" onClick={() => this.save(3, false)}>3</button>
            <button className="btn btn-outline-info button" id="four" type="button" onClick={() => this.save(4, false)}>4</button>
            <button className="btn btn-outline-info button" id="five" type="button" onClick={() => this.save(5, false)}>5</button>
            <button className="btn btn-outline-info button" id="six" type="button" onClick={() => this.save(6, false)}>6</button>
            <button className="btn btn-outline-info button" id="seven" type="button" onClick={() => this.save(7, false)}>7</button>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-6 offset-3">
            <button
              className="btn btn-outline-info button btn-lg"
              id="submit"
              type="button"
              onClick={() => this.save(0, true)}
            >Out
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 offset-3">
            <button
              className="btn btn-outline-info button btn-lg"
              id="submit"
              type="button"
              onClick={() => this.props.recordScore(this.run, this.isCurrentBatsmanOut)}
            >
              Next Ball
            </button>
            <Modal isOpen={this.props.isNewBatsmanModalOpen}>
              <NewBatsman />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isNewBatsmanModalOpen: state.gameInformation.appState.isNewBatsmanModalOpen,
});

const mapDispatchAsProps = dispatch => ({
  recordScore: (run, isOut) => dispatch(recordScore(run, isOut)),
});

export default connect(mapStateToProps, mapDispatchAsProps)(RunRecorder);
