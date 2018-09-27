import React from 'react';
import { Button } from 'reactstrap';
import { Routes } from '../routes/routes' ;
const GameDetails = () => (
  <div className="container">
  <div>
    <Button className = "button" size="lg" color="info" href={"#"+ Routes.SCORER}>Run Recorder</Button>
  </div>
  </div>
);

export default GameDetails;