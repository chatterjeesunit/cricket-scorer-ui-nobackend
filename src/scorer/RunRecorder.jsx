import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Button, Modal , Nav, NavLink, NavItem} from 'reactstrap';
import { recordScore } from './../home/actions';
import NewBatsman from '../newPlayer/NewBatsman';
import { ExtraTypes } from '../newGame/gameConstants';

class RunRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: 0,
      extras: undefined,
      isCurrentBatsmanOut: false,
      runSelected: 0,
    };
  }

  onSubmit() {
    this.props.recordScore(this.state);
    this.setState({
      run: 0,
      extras: undefined,
      isCurrentBatsmanOut: false,
      runSelected: 0,
    });
  }

  saveExtra(currenSelectdExtra) {
    let selectedExtra = currenSelectdExtra;
    if (this.state.extras === currenSelectdExtra) {
      selectedExtra = undefined;
    }
    this.setState({
      extras: selectedExtra,
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
          <div className="col-md-12 offset-2 ">
            Extras :&nbsp;&nbsp;
            <Button className="button" size="lg" outline color="info" id="W" active={this.state.extras === ExtraTypes.WIDE} onClick={() => this.saveExtra(ExtraTypes.WIDE)}>W</Button>
            <Button className="button" size="lg" outline color="info" id="N" active={this.state.extras === ExtraTypes.NO_BALL} type="button" onClick={() => this.saveExtra(ExtraTypes.NO_BALL)}>N</Button>
            <Button className="button" size="lg" outline color="info" id="L" active={this.state.extras === ExtraTypes.BIES} type="button" onClick={() => this.saveExtra(ExtraTypes.BIES)}>B</Button>
            <Button className="button" size="lg" outline color="info" id="B" active={this.state.extras === ExtraTypes.LB} type="button" onClick={() => this.saveExtra(ExtraTypes.LB)}>Lb</Button>
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
            <Button className="button" size="lg" disabled={this.props.battingTeamWickets === 10} color="info" onClick={() => this.onSubmit()}>
              Next Ball
            </Button>
            <Modal isOpen={this.props.isNewBatsmanModalOpen}>
              <NewBatsman />
            </Modal>
            <Button className = "button float-right" size="lg" color="info" href="#">Summary</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isNewBatsmanModalOpen: state.gameInformation.appState.isNewBatsmanModalOpen,
  battingTeamWickets: state.gameInformation.team1.isBatting ?
    state.gameInformation.team1.totalWickets :
    state.gameInformation.team1.totalWickets,
});

const mapDispatchAsProps = dispatch => ({
  recordScore: localState =>
    dispatch(recordScore(localState.run, localState.isCurrentBatsmanOut, localState.extras)),
});

export default connect(mapStateToProps, mapDispatchAsProps)(RunRecorder);
