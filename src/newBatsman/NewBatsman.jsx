import React from 'react';
import { selectNewBatsmanAction } from '../home/actions';
import {connect} from 'react-redux';

const NewBatsman = (props) => (
  <div>
    Select New Batsman
  </div>
);

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
    onBatsmanSelect: (batsmanId) => {
        selectNewBatsmanAction.batsmanId = batsmanId;
        dispatch(onBatsmanSelect);
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBatsman);