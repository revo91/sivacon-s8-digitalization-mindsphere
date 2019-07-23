import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TimesSeriesChart from './TimeSeriesChart';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import TimelineIcon from '@material-ui/icons/Timeline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TweenLite from 'gsap';
import { randomizeChartData, manageDialogOpen, zoom, manageShownDialogContentType } from '../actions/index';

const styles = theme => ({
  sliderBar: {
    position: 'relative',
    top: '44px'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  sliderContent: {
    marginTop: '60px',
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  },
  floatRight: {
    float: 'right'
  },
  marginFAB: {
    margin: theme.spacing(1)
  },
  svgMaxHeight: {
    maxHeight: '60vh'
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SlideupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.bottomSwitchRef = React.createRef();
  }

  myTween = null;

  changeDeviceState = () => {
    console.log(this.myTween)
    let breaker = this.props.breakers.cb_2FP1.state;
    if (breaker === 0) {
      this.myTween = TweenLite.to(this.bottomSwitchRef.current, 1, { rotation: 0, transformOrigin: "100% 100%" })
    }
    else if (breaker === 1) {
      this.myTween = TweenLite.to(this.bottomSwitchRef.current, 1, { rotation: 45, transformOrigin: "100% 100%" })
    }
    
  }

  changeView = (content) => {
    this.props.dispatch(manageShownDialogContentType(content))
  }

  randomizeData = (numberOfPoints) => {
    let data = [];
    for (let i = 0; i < numberOfPoints; i++) {
      let point = new Date(`15 July 2019 12:${i}:15 UTC`);

      data.push({ x: point.toISOString(), y: Math.floor(Math.random() * 1000) })
    }
    this.props.dispatch(randomizeChartData(data));
  }

  chartZoomDateRange = (InOut) => {
    let currentZoomValue = this.props.params.zoom;
    console.log(currentZoomValue)
    if (currentZoomValue < 2 && InOut === "In") {
      this.props.dispatch(zoom((currentZoomValue * 10 + 0.1 * 10) / 10));
    }
    else if (currentZoomValue > 0.1 && InOut === 'Out') {
      this.props.dispatch(zoom((currentZoomValue * 10 - 0.1 * 10) / 10));
    }
  }

  handleDialogOpen = (open) => {
    this.props.dispatch(manageDialogOpen(open))
  }

  render() {
    const { classes, params } = this.props;
    return (
      <div>
        <Dialog fullScreen open={params.openDialog} onClose={() => this.handleDialogOpen(false)}
          TransitionComponent={Transition} transitionDuration={400} onEnter={this.changeDeviceState}>
          <AppBar className={classes.sliderBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => this.handleDialogOpen(false)} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {params.datasetName}
              </Typography>
              {this.props.params.contentType !== 'deviceOverview' ?
                <div>
                  <Tooltip title="Powrót" >
                    <IconButton color="inherit" onClick={() => this.changeView("deviceOverview")}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Przewiń czas w lewo">
                    <IconButton color="inherit" onClick={() => this.randomizeData(23)}>
                      <ChevronLeft />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Przewiń czas w prawo">
                    <IconButton color="inherit" onClick={() => this.randomizeData(23)}>
                      <ChevronRight />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Przybliż">
                    <IconButton color="inherit" onClick={() => this.chartZoomDateRange("Out")}>
                      <ZoomOutIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Oddal">
                    <IconButton color="inherit" onClick={() => this.chartZoomDateRange("In")}>
                      <ZoomInIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                : null}
            </Toolbar>
          </AppBar>
          <div className={classes.sliderContent}>
            {this.props.params.contentType === 'deviceOverview' ?
              <div>
                <Grid container spacing={2} alignItems="flex-start" justify="center">
                  <Grid container item xs={12} sm={4} md={4} spacing={2}>
                    <Grid item xs={12}>
                      <svg id="Overview_device_bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.41 244.83" className={classes.svgMaxHeight}>
                        <line x1="25.32" y1="128.59" x2="41.22" y2="112.69" fill="none" stroke="#1d1d1b" strokeLinecap="square"
                          strokeMiterlimit="10" strokeWidth="2" />
                        <line x1="41.22" y1="128.59" x2="25.32" y2="112.69" fill="none" stroke="#1d1d1b" strokeLinecap="square"
                          strokeMiterlimit="10" strokeWidth="2" />
                        <line x1="33.27" y1="16.11" x2="33.27" y2="120.64" fill="none" stroke="#1d1d1b" strokeLinecap="round"
                          strokeMiterlimit="10" strokeWidth="2" />
                        <line x1="33.27" y1="156.56" x2="33.27" y2="225.51" fill="none" stroke="#1d1d1b" strokeLinecap="round"
                          strokeMiterlimit="10" strokeWidth="2" />
                        <line ref={this.bottomSwitchRef} id="Switch" x1="8.02" y1="131.39" x2="33.27" y2="156.64" fill="none" stroke="#1d1d1b" strokeMiterlimit="10"
                          strokeWidth="2" />
                        <line x1="1" y1="16.11" x2="105.53" y2="16.11" fill="none" stroke="#1d1d1b" strokeLinecap="round"
                          strokeMiterlimit="10" strokeWidth="2" /><text id="FeederName" transform="translate(1 10.3)" fontSize="12"
                            fill="#1d1d1b" fontFamily="ArialMT, Arial">S</text><text id="SwitchName" transform="translate(56.8 138.21)"
                              fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">W</text><text id="OutgoingFeederName"
                                transform="translate(1 239.02)" fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">B</text>
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} sm={8} md={8} spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Status wyłącznika</Typography>
                        <Typography variant="body1" color="primary">Załączony</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Ostatnie wyzwolenie</Typography>
                        <Typography variant="body1" gutterBottom>Przyczyna ostatniego wyzwolenia</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Prąd
                  <Tooltip title="Pokaż wykres prądów" placement="top">
                            <IconButton className={classes.marginFAB} onClick={() => this.changeView("chart")}>
                              <TimelineIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <div>
                          <Typography variant="body1" display="inline">Prąd L1</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 A</Typography>
                        </div>
                        <div>
                          <Typography variant="body1" display="inline">Prąd L2</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 A</Typography>
                        </div>
                        <div>
                          <Typography variant="body1" display="inline">Prąd L3</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 A</Typography>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>Moc
                  <Tooltip title="Pokaż wykres mocy" placement="top">
                            <IconButton className={classes.marginFAB}>
                              <TimelineIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        <div>
                          <Typography variant="body1" display="inline">Moc czynna</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 kW</Typography>
                        </div>
                        <div>
                          <Typography variant="body1" display="inline">Moc bierna</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 kvar</Typography>
                        </div>
                        <div>
                          <Typography variant="body1" display="inline">Moc pozorna</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0 kVa</Typography>
                        </div>
                        <div>
                          <Typography variant="body1" display="inline">Cos Total</Typography>
                          <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">0.0</Typography>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              : <TimesSeriesChart />}
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params: state.chartData,
    breakers: state.breakers
  };
}

export default connect(mapStateToProps)(withStyles(styles)(SlideupDialog))