import React from 'react';
import Overview from './Overview';
import { connect } from 'react-redux';
import { overviewToggle } from '../actions/index';

class OverviewTest extends React.Component {

    overviewTest = (deviceType, device) => {
        this.props.dispatch(overviewToggle(deviceType, device));
      };

    render() {

        let testButtonsOverview = Object.entries(this.props.params).map(([key, value]) => {
            if(key==='sources' || key==='breakers')
              {
                let type = key;
            return Object.entries(this.props.params[key]).map(([key, value]) => {
                return <button key={key} onClick={()=>this.overviewTest(type,key)}>{key}</button>
            })}
          })
        
        return(
            <React.Fragment>
                <Overview/>
                {testButtonsOverview}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      params: state.switchesStateReducer
    };
  }

export default connect(mapStateToProps)(OverviewTest)