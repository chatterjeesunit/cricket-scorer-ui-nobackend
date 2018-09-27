import React from 'react';
import { Button } from 'reactstrap';
import { Routes } from '../routes/routes';
const GameDetails = () => (
  <div className="center">
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-2">
          <div>
            <Button className="button" size="lg" color="info" href={"#" + Routes.SCORER}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default GameDetails;