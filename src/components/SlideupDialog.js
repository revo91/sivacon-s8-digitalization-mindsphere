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
import { chartSetRewindDirection } from '../actions/iottimeseriesData';
import { clearDatasets } from '../actions/iottimeseriesData';
import ChartLiveUpdateControls from './ChartLiveUpdateControls';
import ChartDataRangeTimePicker from './ChartDataRangeTimePicker';
import ChartDataRangeTimeSlider from './ChartDataRangeTimeSlider';
import '../styles/SlideupDialog.scss';
import { withTranslation } from 'react-i18next';

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
    padding: theme.spacing(2),
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
    this.switchRefGen = React.createRef();
  }
  //Tween for animation
  myTween = null;

  //for tabs filtering
  topDevices = ['TR1', 'TR2'];
  middleDevices = ['cb_1FP1', 'cb_1FP2', 'cb_2FP1', 'cb_2FP2'];

  handleChangeTabs = (event, val) => {
    this.props.manageDialogTab(val)
    if (val === 'overviewTab') {
      setTimeout(() => this.changeDeviceState(), 100)
    }
    if (val !== this.props.params.tabIndex) {
      this.props.clearDatasets()
    }
  }

  changeDeviceState = () => {
    let currentDevice = this.props.params.selectedDevice;
    let currentTab = this.props.params.tabIndex;
    let deviceLevelRef = null;
    //check device type for showing circuit svg
    if (this.topDevices.indexOf(currentDevice) !== -1) {
      this.props.setCurrentDeviceType('topDevice')
      deviceLevelRef = this.switchRefTop.current;
    }
    else if (this.middleDevices.indexOf(currentDevice) !== -1) {
      this.props.setCurrentDeviceType('middleDevice')
      deviceLevelRef = this.switchRefMid.current;
    }
    else if (currentDevice === 'GEN') {
      this.props.setCurrentDeviceType('topDevice')
      deviceLevelRef = this.switchRefGen.current;
    }
    else {
      this.props.setCurrentDeviceType('bottomDevice')
      deviceLevelRef = this.switchRefBottom.current;
    }

    if (currentTab === 'overviewTab') {
      if (this.props.params.deviceTitle !== '' && this.props.params.deviceTitle !== undefined) {
        let stateClosed = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateClosed;
        let stateOpened = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateOpened;
        let stateTripped = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateTripped;

        if (stateOpened || stateTripped) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 0, transformOrigin: "100% 100%" })
        }
        else if (stateClosed) {
          this.myTween = TweenLite.to(deviceLevelRef, 1, { rotation: 45, transformOrigin: "100% 100%" })
        }
      }
    }
  }

  getLastTripReason = () => {
    let t = this.props.t;
    let device = this.props.selectedDevice
    if (device && device.indexOf('cb_') !== -1) {
      return t(`slideUpDialogLastTripReason${this.props.breakers[device].lastTripReason}`)
    }
    else {
      return 0
    }
  }

  getCurrentDeviceVariables = (variable) => {
    let divider = 1;
    if (this.props.params.selectedDevice !== '' && this.props.params.selectedDevice !== undefined) {
      if (this.props.params.selectedDevice.indexOf('cb_') !== -1) {
        //case breaker
        switch (variable) {
          case 'Total_apparent_power_15_min':
            divider = 1000;
            return !isNaN(Math.sqrt(Math.pow(this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min, 2) +
              Math.pow(this.props.breakers[this.props.params.selectedDevice].Reactive_power_import_15_min, 2))) ?
              (Math.sqrt(Math.pow(this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min, 2) +
                Math.pow(this.props.breakers[this.props.params.selectedDevice].Reactive_power_import_15_min, 2))) / 1000
              : 0.00;
          case 'Total_power_factor_1_min':
            divider = 1000;
            return !isNaN(this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min /
              Math.sqrt(Math.pow(this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min, 2) +
                Math.pow(this.props.breakers[this.props.params.selectedDevice].Reactive_power_import_15_min, 2))) ?
              (this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min /
                Math.sqrt(Math.pow(this.props.breakers[this.props.params.selectedDevice].Active_power_import_15_min, 2) +
                  Math.pow(this.props.breakers[this.props.params.selectedDevice].Reactive_power_import_15_min, 2)))
              : 0.00
          case 'Active_power_import_15_min':
            divider = 1000;
            break;
          case 'Reactive_power_import_15_min':
            divider = 1000;
            break;
          default:
            break;
        }

        return this.props.breakers[this.props.params.selectedDevice][variable] / divider

      }
      else {
        //modify params in case of infeed
        switch (variable) {
          case 'Active_power_import_15_min':
            divider = 1000;
            variable = 'Total_active_power_import'
            break;
          case 'Reactive_power_import_15_min':
            divider = 1000;
            variable = 'Total_reactive_power_import'
            break;
          case 'Total_apparent_power_15_min':
            divider = 1000;
            variable = 'Total_apparent_power'
            break;
          case 'Total_power_factor_1_min':
            variable = 'Total_power_factor'
            break;
          case 'THD_Current_L1':
            variable = 'THD_current_L1'
            break;
          case 'THD_Current_L2':
            variable = 'THD_current_L2'
            break;
          case 'THD_Current_L3':
            variable = 'THD_current_L3'
            break;
          default:
            break;
        }
        return !isNaN(this.props.sources[this.props.params.selectedDevice][variable] / divider) ? this.props.sources[this.props.params.selectedDevice][variable] / divider : 0.00
      }
    }
    else {
      return 0;
    }
  }

  getCurrentDeviceStatus = () => {
    if (this.props.params.deviceTitle !== '' && this.props.params.deviceTitle !== undefined) {
      let t = this.props.t;
      let open = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateOpened;
      let tripped = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateTripped;
      if (open) {
        return t('slideUpDialogBreakerStateOpen')
      }
      else if (tripped) {
        return t('elevationTrippedLong')
      }
      else {
        return t('slideUpDialogBreakerStateClosed')
      }
    }
  }

  getGenReadyStartStop = (requestedParam) => {
    let genStarted = this.props.sources.GEN.started;
    let genReady = this.props.sources.GEN.ready;
    let t = this.props.t;
    if (requestedParam === 'ready') {
      return genReady === true ? {
        state: t('slideUpDialogGeneratorStateReady'),
        textColor: '#00A000'
      } :
        {
          state: t('slideUpDialogGeneratorStateNotReady'),
          textColor: '#ff0000'
        }
    }
    else if (requestedParam === 'started') {
      return genStarted === true ? {
        state: 'Start',
        textColor: '#00A000'
      } :
        {
          state: 'Stop',
          textColor: '#ff0000'
        }
    }
  }

  getCurrentDeviceStatusTextColor = () => {
    if (this.props.params.deviceTitle !== '' && this.props.params.deviceTitle !== undefined) {
      let open = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateOpened;
      let tripped = this.props.breakers[`cb_${this.props.params.deviceTitle}`].stateTripped;
      return (open || tripped) ? '#ff0000' : '#00A000'
    }

  }

  chartZoomDateRange = (InOut) => {
    let currentZoomValue = this.props.zoomMultiplier;
    if (currentZoomValue < 4 && InOut === "In") {
      this.props.zoom((currentZoomValue * 10 + 0.2 * 10) / 10);
    }
    else if (currentZoomValue > 1 && InOut === 'Out') {
      this.props.zoom((currentZoomValue * 10 - 0.2 * 10) / 10);
    }
  }

  setChartRewindDirection = (direction) => {
    let currentDirection = this.props.chartRewindDirection;
    if ((direction === "Forward" && currentDirection < 1) || (direction === "Backward" && currentDirection > -1)) {
      this.props.chartSetRewindDirection(direction);
    }
  }

  handleDialogOpen = (open) => {
    this.props.manageDialogOpen(open)
    this.props.clearDatasets()
  }

  getCurrentDeviceType = () => {
    return this.props.params.currentDeviceType
  }

  render() {
    const { classes, params, zoomMultiplier, chartRewindDirection, t } = this.props;

    const overviewDeviceCircuitTopGen = <svg id="top_gen" className={this.props.selectedDevice !== 'GEN' ? 'invisibleCircuit' : 'visibleCircuit'} data-name="top_gen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.68 212.99">
      <circle cx="30.07" cy="44.41" r="29.07" fill="none" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="2" />
      <line x1="22.12" y1="147.41" x2="38.02" y2="131.51" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="38.02" y1="147.41" x2="22.12" y2="131.51" fill="none" stroke="#1d1d1b" strokeLinecap="square"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="30.07" y1="73.48" x2="30.07" y2="138.73" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line x1="30.07" y1="174.46" x2="30.07" y2="211.99" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
      <line ref={this.switchRefGen} id="Switch" x1="4.82" y1="149.21" x2="30.07" y2="174.46" fill="none" stroke="#1d1d1b" strokeMiterlimit="10"
        strokeWidth="2" /><text id="FeederName" transform="translate(41.32 10.3)" fontSize="12" fill="#1d1d1b"
          fontFamily="ArialMT, Arial">{params.deviceSection}</text><text id="SwitchName" transform="translate(41.32 168.65)" fontSize="12"
            fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceTitle}</text><text id="OutgoingFeederName"
              transform="translate(41.32 204.82)" fontSize="12" fill="#1d1d1b" fontFamily="ArialMT, Arial">{params.deviceOutgoingFeeder}</text><text
                transform="translate(14.18 58.25)" fontSize="39.66" fill="#1d1d1b" fontFamily="ArialMT, Arial">G</text>
      <line x1="4.75" y1="211.99" x2="99.68" y2="211.99" fill="none" stroke="#1d1d1b" strokeLinecap="round"
        strokeMiterlimit="10" strokeWidth="2" />
    </svg>

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

    const overviewDeviceCircuitTop = <svg className={params.currentDeviceType === 'topDevice' && this.props.selectedDevice !== 'GEN' ? 'visibleCircuit' : 'invisibleCircuit'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.27 319.63" >
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
          onExit={() => this.handleChangeTabs(null, 'overviewTab')}
        >
          <AppBar className={classes.sliderBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => this.handleDialogOpen(false)} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {t('slideUpDialogTitlebarBreaker')} {params.deviceTitle}
              </Typography>
              {params.tabIndex !== 'overviewTab' ?
                <div>
                  <Tooltip title={t('slideUpDialogTooltipBackToPreview')} >
                    <IconButton color="inherit" onClick={() => this.handleChangeTabs(null, 'overviewTab')}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton color="inherit" onClick={() => this.setChartRewindDirection("Backward")}
                    disabled={(chartRewindDirection === -1) || (zoomMultiplier === 1) ? true : false}>
                    <Tooltip title={t('slideUpDialogTooltipRewindLeft')}>
                      <ChevronLeft />
                    </Tooltip>
                  </IconButton>
                  <IconButton color="inherit" onClick={() => this.setChartRewindDirection("Forward")}
                    disabled={(chartRewindDirection === 1) || (zoomMultiplier === 1) ? true : false}>
                    <Tooltip title={t('slideUpDialogTooltipRewindRight')}>
                      <ChevronRight />
                    </Tooltip>
                  </IconButton>
                  <IconButton color="inherit" onClick={() => this.chartZoomDateRange("Out")} disabled={zoomMultiplier <= 1 ? true : false}>
                    <Tooltip title={t('slideUpDialogTooltipZoomOut')}>
                      <ZoomOutIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton color="inherit" onClick={() => this.chartZoomDateRange("In")} disabled={zoomMultiplier >= 4 ? true : false}>
                    <Tooltip title={t('slideUpDialogTooltipZoomIn')}>
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
                scrollButtons="auto"
                variant="scrollable"
              >
                <Tab label={t('slideUpDialogTabOverview')} value="overviewTab" />
                <Tab label={`${t('slideUpDialogTabVoltage')} L-N`} value="voltageLNTab"
                  style={{ display: this.props.selectedDevice && this.props.selectedDevice.indexOf('cb_') === -1 ? 'flex' : 'none' }} />
                <Tab label={`${t('slideUpDialogTabVoltage')} L-L`} value="voltageLLTab"
                  style={{ display: this.props.selectedDevice && this.props.selectedDevice.indexOf('cb_') === -1 ? 'flex' : 'none' }} />
                <Tab label={t('slideUpDialogTabCurrent')} value="currentTab" />
                <Tab label={t('slideUpDialogTabPower')} value="powerTab" />
                <Tab label={t('slideUpDialogTabTHDV')} value="THDUtab"
                  style={{ display: this.props.selectedDevice && this.props.selectedDevice.indexOf('cb_') === -1 ? 'flex' : 'none' }} />
                <Tab label={t('slideUpDialogTabTHDI')} value="THDItab" />
              </Tabs>
            </AppBar>
            {params.tabIndex === 'overviewTab' && <TabContainer><Grid container spacing={2} alignItems="flex-start" justify="center">
              <Grid container item xs={12} sm={12} md={4} spacing={2}>
                <Grid item xs={12}>
                  {overviewDeviceCircuitBottom}
                  {overviewDeviceCircuitMid}
                  {overviewDeviceCircuitTop}
                  {overviewDeviceCircuitTopGen}
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={6} md={4} spacing={2} direction="column"
                justify="flex-start"
                alignItems="stretch">
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>{t('slideUpDialogBreakerStateTitle')}</Typography>
                    <Typography variant="body1"><span style={{ color: this.getCurrentDeviceStatusTextColor() }}>{this.getCurrentDeviceStatus()}</span></Typography>
                  </Paper>
                </Grid>
                {this.props.selectedDevice && this.props.selectedDevice === 'GEN' ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>{t('slideUpDialogGeneratorStateTitle')}</Typography>
                      <Typography variant="body1"><span style={{ color: this.getGenReadyStartStop('ready').textColor }}>{this.getGenReadyStartStop('ready').state}</span></Typography>
                      <Typography variant="body1"><span style={{ color: this.getGenReadyStartStop('started').textColor }}>{this.getGenReadyStartStop('started').state}</span></Typography>
                    </Paper>
                  </Grid> : null
                }
                {params.currentDeviceType !== 'topDevice' ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>{t('slideUpDialogLastTripTitle')}</Typography>
                      <Typography variant="body1" gutterBottom>{this.getLastTripReason()}</Typography>
                    </Paper>
                  </Grid> : null
                }
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>{t('slideUpDialogTabCurrent')}
                      <Tooltip title={t('slideUpDialogTooltipShowCurrentChart')} placement="top">
                        <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'currentTab')}>
                          <TimelineIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTabCurrent')} L1</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Current_L1').toFixed(2)} A</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTabCurrent')} L2</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Current_L2').toFixed(2)} A</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTabCurrent')} L3</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Current_L3').toFixed(2)} A</Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>{t('slideUpDialogTabPower')}
                      <Tooltip title={t('slideUpDialogTooltipShowPowerChart')} placement="top">
                        <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'powerTab')}>
                          <TimelineIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogActivePower')}</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Active_power_import_15_min').toFixed(2)} kW</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogReactivePower')}</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Reactive_power_import_15_min').toFixed(2)} kvar</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogApparentPower')}</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Total_apparent_power_15_min').toFixed(2)} kVA</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogCosTotal')}</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Total_power_factor_1_min').toFixed(2)} PF</Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={6} md={4} spacing={2} direction="column"
                justify="flex-start"
                alignItems="stretch">
                {this.props.selectedDeviceType && this.props.selectedDeviceType === 'topDevice' ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>{t('slideUpDialogTabVoltage')} L-L
                      <Tooltip title={t('slideUpDialogTooltipShowVoltageLLChart')} placement="top">
                          <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'voltageLLTab')}>
                            <TimelineIcon />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L1-L2</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L1_L2').toFixed(2)} V</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L2-L3</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L2_L3').toFixed(2)} V</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L3-L1</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L3_L1').toFixed(2)} V</Typography>
                      </div>
                    </Paper>
                  </Grid>
                  : null}
                {this.props.selectedDeviceType && this.props.selectedDeviceType === 'topDevice' ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>{t('slideUpDialogTabVoltage')} L-N
                      <Tooltip title={t('slideUpDialogTooltipShowVoltageLNChart')} placement="top">
                          <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'voltageLNTab')}>
                            <TimelineIcon />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L1-N</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L1_N').toFixed(2)} V</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L2-N</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L2_N').toFixed(2)} V</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTabVoltage')} L3-N</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('Voltage_L3_N').toFixed(2)} V</Typography>
                      </div>
                    </Paper>
                  </Grid>
                  : null}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>{t('slideUpDialogTHDI')}
                      <Tooltip title={t('slideUpDialogTooltipShowTHDIChart')} placement="top">
                        <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'THDItab')}>
                          <TimelineIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTHDI')} L1</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_Current_L1').toFixed(2)} %</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTHDI')} L2</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_Current_L2').toFixed(2)} %</Typography>
                    </div>
                    <div>
                      <Typography variant="body1" display="inline">{t('slideUpDialogTHDI')} L3</Typography>
                      <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_Current_L3').toFixed(2)} %</Typography>
                    </div>
                  </Paper>
                </Grid>
                {this.props.selectedDeviceType && this.props.selectedDeviceType === 'topDevice' ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>{t('slideUpDialogTHDV')}
                        <Tooltip title={t('slideUpDialogTooltipShowTHDVChart')} placement="top">
                          <IconButton className={classes.marginFAB} onClick={() => this.handleChangeTabs(null, 'THDUtab')}>
                            <TimelineIcon />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTHDV')} L1</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_voltage_L1').toFixed(2)} %</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTHDV')} L2</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_voltage_L2').toFixed(2)} %</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" display="inline">{t('slideUpDialogTHDV')} L3</Typography>
                        <Typography className={classes.floatRight} variant="body1" display="inline" color="primary">{this.getCurrentDeviceVariables('THD_voltage_L3').toFixed(2)} %</Typography>
                      </div>
                    </Paper>
                  </Grid>
                  : null}
              </Grid>
            </Grid>
            </TabContainer>}
            {params.tabIndex === 'voltageLNTab' && this.props.selectedDevice && this.props.selectedDevice.indexOf('cb_') === -1 && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                <Grid item xs={11}>
                  <ChartDataRangeTimeSlider />
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>

                <ChartDataRangeTimePicker />

                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
            {(params.tabIndex === 'voltageLLTab' && this.props.selectedDevice && this.props.selectedDevice.indexOf('cb_') === -1) && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                <Grid item xs={11}>
                  <ChartDataRangeTimeSlider />
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>

                <ChartDataRangeTimePicker />

                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
            {params.tabIndex === 'currentTab' && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                <Grid item xs={11}>
                  <ChartDataRangeTimeSlider />
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>
                <ChartDataRangeTimePicker />
                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
            {params.tabIndex === 'powerTab' && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={2} justify="flex-start" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>
                <ChartDataRangeTimePicker />
                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
            {params.tabIndex === 'THDUtab' && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={2} justify="flex-start" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>
                <ChartDataRangeTimePicker />
                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
            {params.tabIndex === 'THDItab' && <TabContainer>
              <TimeSeriesChart />
              <Grid container spacing={2} justify="flex-start" alignItems="flex-start" alignContent="space-around" className={classes.chartControls}>
                <Grid item xs={12}>
                  <Typography variant="h6">{t('chartSettings')}</Typography>
                </Grid>
                <ChartDataRangeTimePicker />
                <Grid item xs={12}>
                  <ChartLiveUpdateControls />
                </Grid>
              </Grid>
            </TabContainer>}
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
    chartDatasets: state.chartReducer.datasets,
    chartRewindDirection: state.chartReducer.zoomedRewindDirection,
    chartDataLoading: state.chartReducer.isChartDataLoading,
    selectedDevice: state.dialogReducer.selectedDevice,
    selectedDeviceType: state.dialogReducer.currentDeviceType
  };
}

const mapDispatchToProps = {
  randomizeChartData,
  manageDialogOpen,
  zoom,
  manageDialogTab,
  setCurrentDeviceStatus,
  setCurrentDeviceType,
  clearDatasets,
  chartSetRewindDirection
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(SlideupDialog)))