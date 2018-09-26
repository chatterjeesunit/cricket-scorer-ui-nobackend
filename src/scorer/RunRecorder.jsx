import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Button, Modal } from 'reactstrap';
import { recordScore } from './../home/actions';
import NewBatsman from '../newBatsman/NewBatsman';

class RunRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: 0,
      isCurrentBatsmanOut: false,
      runSelected: 0,
    };
  }

  onSubmit() {
    this.props.recordScore(this.state);
    this.setState({
      run: 0,
      isCurrentBatsmanOut: false,
      runSelected: 0,
    });
  }

  save(runsScored, isBatsmanOut) {
    this.setState({
      run: runsScored,
      isCurrentBatsmanOut: isBatsmanOut,
      runSelected: runsScored,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-2">
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 0} onClick={() => this.save(0, this.state.isCurrentBatsmanOut)}>0</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 1} onClick={() => this.save(1, this.state.isCurrentBatsmanOut)}>1</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 2} onClick={() => this.save(2, this.state.isCurrentBatsmanOut)}>2</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 3} onClick={() => this.save(3, this.state.isCurrentBatsmanOut)}>3</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 4} onClick={() => this.save(4, this.state.isCurrentBatsmanOut)}>4</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 5} onClick={() => this.save(5, this.state.isCurrentBatsmanOut)}>5</Button>
            <Button className="button" size="lg" outline color="info" active={this.state.runSelected === 6} onClick={() => this.save(6, this.state.isCurrentBatsmanOut)}>6</Button>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-8 offset-2">
            <Button
              className="button"
              outline
              size="lg"
              color="info"
              active={this.state.isCurrentBatsmanOut}
              onClick={() => this.save(this.state.run, !this.state.isCurrentBatsmanOut)}
            >Out
            </Button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8 offset-2">
            <Button className="button" size="lg" color="info"  onClick={() => this.onSubmit()}>Next Ball</Button>
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
  recordScore: localState =>
    dispatch(recordScore(localState.run, localState.isCurrentBatsmanOut)),
});

export default connect(mapStateToProps, mapDispatchAsProps)(RunRecorder);
