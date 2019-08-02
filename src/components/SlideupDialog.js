import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TimeSeriesChart from './TimeSeriesChart';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  randomizeChartData, manageDialogOpen, zoom, manageDialogTab, setCurrentDeviceStatus,
  setCurrentDeviceType
} from '../actions/index';
import { clearDatasets } from '../actions/iottimeseriesData';
import ChartLiveUpdateControls from './ChartLiveUpdateControls';
import ChartDataRangeTimePicker from './ChartDataRangeTimePicker';
import ChartDataRangeTimeSlider from './ChartDataRangeTimeSlider';
import '../styles/SlideupDialog.scss';

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
  },
  chartControls: {
    padding:theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: '#dbdbdb'
  },
  chartSlider: {
    width: '95%'
  }
});

function TabContainer({ children, dir }) {
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SlideupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.switchRefBottom = React.createRef();
    this.switchRefMid = React.createRef();
    this.switchRefTop = React.createRef();
  }

  myTween = null;


  handleChangeTabs = (event, val) => {
    this.props.manageDialogTab(val)
    if (val === 0) {
      setTimeout(() => this.changeDeviceState(), 100)
    }
    if(val!==this.props.params.tabIndex)
    {
      this.props.clearDatasets()
    }
  }

  changeDeviceState = () => {
    let currentDevice = this.props.params.selectedDevice;
    let currentTab = this.props.params.tabIndex;
    let middleDevices = ['cb_1FP1', 'cb_1FP2', 'cb_2FP1', 'cb_2FP2'];
    let topDevices = ['TR1', 'TR2', 'GEN'];
    let deviceLevelRef = null;
    //check device type for showing circuit svg
    if (topDevices.indexOf(currentDevice) !== -1) {
      this.props.setCurrentDeviceType('topDevice')
      deviceLevelRef = this.switchRefTop.current;
    }
    else if (middleDevices.indexOf(currentDevice) !== -1) {
      this.props.setCurrentDeviceType('middleDevice')
      deviceLevelRef = this.switchRefMid.current;
    }
    else {
      this.props.setCurrentDeviceType('bottomDevice')
      deviceLevelRef = this.switchRefBottom.current;
    }

    if (currentTab === 0) {
      if (currentDevice.indexOf('cb_') !== -1) {
        let breaker = this.props.breakers[currentDevice].state;
        if (breaker === 0) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 0, transformOrigin: "100% 100%" })
          this.props.setCurrentDeviceStatus(0)
        }
        else if (breaker === 1) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 45, transformOrigin: "100% 100%" })
          this.props.setCurrentDeviceStatus(1)
        }
      }
      else {
        let source = this.props.sources[currentDevice].state;
        if (source === 0) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 0, transformOrigin: "100% 100%" })
          this.props.setCurrentDeviceStatus(0)
        }
        else if (source === 1) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 45, transformOrigin: "100% 100%" })
          this.props.setCurrentDeviceStatus(1)
        }
      }
    }
  }

  getCurrentDeviceStatus = () => {
    return this.props.params.currentDeviceStatus === 0 ? 'Wyłączony' : 'Załączony'
  }

  getCurrentDeviceStatusTextColor = () => {
    return this.props.params.currentDeviceStatus === 0 ? 'secondary' : 'primary'
  }

  randomizeData = (numberOfPoints) => {
    let data = [];
    for (let i = 0; i < numberOfPoints; i++) {
      let point = new Date(`15 July 2019 12:${i}:15 UTC`);

      data.push({ x: point.toISOString(), y: Math.floor(Math.random() * 1000) })
    }
    this.props.randomizeChartData(data);
  }

  chartZoomDateRange = (InOut) => {
    let currentZoomValue = this.props.zoomMultiplier;
    if (currentZoomValue < 2 && InOut === "In") {
      this.props.zoom((currentZoomValue * 10 + 0.1 * 10) / 10);
    }
    else if (currentZoomValue > 0.1 && InOut === 'Out') {
      this.props.zoom((currentZoomValue * 10 - 0.1 * 10) / 10);
    }
  }

  handleDialogOpen = (open) => {
    this.props.manageDialogOpen(open)
  }

  getCurrentDeviceType = () => {
    return this.props.params.currentDeviceType
  }

  render() {
    const { classes, params, zoomMultiplier } = this.props;
    const overviewDeviceCircuitMid = <svg id="main" className={params.currentDeviceType !== 'middleDevice' ? 'invisibleCircuit' : 'visibleCircuit'} data-name="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.76 291.11" >
      <line x1="107.98" x2="107.98" y2="39" fill="#383838" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
      <circle cx="107.98" cy="68.07" r="29.07" fill="none" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
      <circle cx="107.98" cy="97.13" r="29.07" fill="none" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
      <line x1="107.98" y1="158.2" x2="25.98" y2="158.2" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="25.96" y1="158.2" x2="25.96" y2="198.67" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="18.01" y1="206.62" x2="33.91" y2="190.72" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="33.91" y1="206.62" x2="18.01" y2="190.72" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="116.58" y1="197.32" x2="107.98" y2="205.92" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="99.38" y1="197.32" x2="107.98" y2="205.92" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="107.98" y1="126.2" x2="107.98" y2="205.92" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="25.96" y1="232.67" x2="25.96" y2="270.2" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line ref={this.switchRefMid} id="Switch1" x1="0.71" y1="207.42" x2="25.96" y2="232.67" fill="none" stroke="#1d1d1b" strokeMiterlimit="10"
        strokeWidth="2" /><text id="FeederName" transform="translate(1.45 17.38)" fontSize="12" fill="#1d1d1b"
          fontFamily="ArialMT, Arial" letterSpacing="-0.02em">{params.deviceSection}</text><text id="SwitchName"
            transform="translate(36.94 227.86)" fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceTitle}</text><text
              id="OutgoingFeederName" transform="translate(1.45 285.3)" fontSize="12" fill="#1d1d1b"
              fontFamily="ArialMT, Arial">{params.deviceOutgoingFeeder}</text>
    </svg>
    const overviewDeviceCircuitBottom = <svg className={params.currentDeviceType !== 'bottomDevice' ? 'invisibleCircuit' : 'visibleCircuit'} id="overview_device_bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.41 244.83">
      <line x1="25.32" y1="128.59" x2="41.22" y2="112.69" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="41.22" y1="128.59" x2="25.32" y2="112.69" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="33.27" y1="16.11" x2="33.27" y2="120.64" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="33.27" y1="156.56" x2="33.27" y2="225.51" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line ref={this.switchRefBottom} id="Switch" x1="8.02" y1="131.39" x2="33.27" y2="156.64" fill="none" stroke="#1d1d1b" strokeMiterlimit="10"
        strokeWidth="2" />
      <line x1="1" y1="16.11" x2="105.53" y2="16.11" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" /><text id="FeederName" transform="translate(1 10.3)" fontSize="12"
          fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceSection}</text><text id="SwitchName" transform="translate(56.8 138.21)"
            fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceTitle}</text><text id="OutgoingFeederName"
              transform="translate(1 239.02)" fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceOutgoingFeeder}</text>
    </svg>

    const overviewDeviceCircuitTop = <svg className={params.currentDeviceType !== 'topDevice' ? 'invisibleCircuit' : 'visibleCircuit'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.27 319.63" >
      <g id="Main">
        <line x1="36.86" x2="36.86" y2="39" fill="#383838" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
        <circle cx="36.86" cy="68.91" r="29.07" fill="none" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
        <circle cx="36.86" cy="97.98" r="29.07" fill="none" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="36.86" y1="127.04" x2="36.86" y2="213.77" fill="none" stroke="#1d1d1b" strokeLinecap="round"
          strokeMiterlimit="10" strokeWidth="2" /><text id="FeederName" transform="translate(50.85 17.43)"
            fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial" letterSpacing="-0.02em">{params.deviceSection}</text>
        <line x1="28.91" y1="221.72" x2="44.81" y2="205.82" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="44.81" y1="221.72" x2="28.91" y2="205.82" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="36.86" y1="249.69" x2="36.86" y2="318.63" fill="none" stroke="#1d1d1b" strokeLinecap="round"
          strokeMiterlimit="10" strokeWidth="2" />
        <line ref={this.switchRefTop} id="Switch" x1="11.61" y1="224.52" x2="36.86" y2="249.77" fill="none" stroke="#1d1d1b"
          strokeMiterlimit="10" strokeWidth="2" /><text id="SwitchName" transform="translate(50.85 236.33)"
            fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceTitle}</text>
        <line x1="121.27" y1="318.63" y2="318.63" fill="none" stroke="#1d1d1b" strokeMiterlimit="10"
          strokeWidth="2" /><text id="SwitchName-2" data-name="SwitchName" transform="translate(50.85 312.73)"
            fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceOutgoingFeeder}</text></g>
      <g id="drawOut">
        <line x1="45.46" y1="274.13" x2="36.86" y2="282.73" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="28.26" y1="274.13" x2="36.86" y2="282.73" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="45.46" y1="262.54" x2="36.86" y2="271.14" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="28.26" y1="262.54" x2="36.86" y2="271.14" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="28.26" y1="177.88" x2="36.86" y2="169.28" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="45.46" y1="177.88" x2="36.86" y2="169.28" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="28.26" y1="189.47" x2="36.86" y2="180.87" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
        <line x1="45.46" y1="189.47" x2="36.86" y2="180.87" fill="none" stroke="#1d1d1b" strokeLinecap="square"
          strokeMiterlimit="10" strokeWidth="2" />
      </g>
    </svg>

    return (
      <div>
        <Dialog fullScreen open={params.openDialog} onClose={() => this.handleDialogOpen(false)}
          TransitionComponent={Transition} transitionDuration={300}
          onEnter={this.changeDeviceState}
        >
          <AppBar className={classes.sliderBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => this.handleDialogOpen(false)} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {params.deviceTitle}
              </Typography>
              {params.tabIndex !== 0 ?
                <div>
                  <Tooltip title="Powrót" >
                    <IconButton color="inherit" onClick={() => this.handleChangeTabs(null, 0)}>
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
                  <IconButton color="inherit" onClick={() => this.chartZoomDateRange("Out")} disabled={zoomMultiplier <= 1 ? true : false}>
                    <Tooltip title="Oddal">
                      <ZoomOutIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton color="inherit" onClick={() => this.chartZoomDateRange("In")} disabled={zoomMultiplier >= 2 ? true : false}>
                    <Tooltip title="Przybliż">
                      <ZoomInIcon />
                    </Tooltip>
                  </IconButton>
                </div>
                : null}
            </Toolbar>

          </AppBar>
          <div className={`${classes.sliderContent}`}>
            <AppBar position="static" color="default">

              <Tabs
                value={params.tabIndex}
                onChange={this.handleChangeTabs}
                indicatorColor="primary"
                textColor="primary"
                centered

              >
                <Tab label="Przegląd" />
                <Tab label="Napięcie" />
                <Tab label="Prąd" />
                <Tab label="Moc" />
              </Tabs>
            </AppBar>
            {params.tabIndex === 0 && <TabContainer><Grid container spacing={2} alignItems="flex-start" justify="center">
              <Grid container item xs={12} sm={12} md={4} spacing={2}>
                <Grid item xs={12}>
                  {overviewDeviceCircuitBottom}
                  {overviewDeviceCircuitMid}
                  {overviewDeviceCircuitTop}
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={8} spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>Status wyłącznika</Typography>
                    <Typography variant="body1" color={this.getCurrentDeviceStatusTextColor()}>{this.getCurrentDeviceStatus()}</Typography>
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
                        <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 1)}>
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
                        <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 2)}>
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
            </TabContainer>}
            {params.tabIndex === 1 && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                <Grid item xs={11}>
                  <ChartDataRangeTimeSlider/>
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="space-between" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                <Typography variant="h6">Ustawienia</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ChartDataRangeTimePicker/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ChartLiveUpdateControls/>
                </Grid>
              </Grid>
              
              </TabContainer>}
            {params.tabIndex === 2 && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={2} justify="space-between" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                <Typography variant="h6">Ustawienia</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ChartDataRangeTimePicker/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ChartLiveUpdateControls/>
                </Grid>
              </Grid>
              </TabContainer>}
            {params.tabIndex === 3 && <TabContainer>Fourth</TabContainer>}
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params: state.dialogReducer,
    breakers: state.switchesStateReducer.breakers,
    sources: state.switchesStateReducer.sources,
    zoomMultiplier: state.chartReducer.zoom,
    chartDatasets: state.chartReducer.datasets
  };
}

const mapDispatchToProps = {
  randomizeChartData,
  manageDialogOpen,
  zoom,
  manageDialogTab,
  setCurrentDeviceStatus,
  setCurrentDeviceType,
  clearDatasets
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SlideupDialog))