import React from 'react';
import Elevation from './Elevation';
import { connect } from 'react-redux';
import { elevationSwitch } from '../actions/index';

class ElevationTest extends React.Component {

    elevationTest = (device) => {
        this.props.dispatch(elevationSwitch(device))
      }

    render() {

        let testButtonsElevation = Object.entries(this.props.params1.elevation).map(([key, value]) => 
        { 
          return <button key={key} onClick={()=>this.elevationTest(key)}>{key}</button>
        });
        
        return(
            <React.Fragment>
                <Elevation/>
                {testButtonsElevation}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      params1: state.overviewReducer
    };
  }

export default connect(mapStateToProps)(ElevationTest)