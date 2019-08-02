import React from 'react';
import { TweenLite } from "gsap/TweenMax";
import '../styles/Overview.scss';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { manageDialogOpen } from '../actions/index';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.cb_2FP1_ref = React.createRef();
        this.cb_2FP2_ref = React.createRef();
        this.cb_Q2_ref = React.createRef();
        this.cb_Q4_ref = React.createRef();
        this.cb_2F1_ref = React.createRef();
        this.cb_2F2_ref = React.createRef();
        this.cb_2F3_ref = React.createRef();
        this.cb_2F4_ref = React.createRef();
        this.cb_2F5_ref = React.createRef();
        this.cb_2F6_ref = React.createRef();
        this.cb_1F1_ref = React.createRef();
        this.cb_1F2_ref = React.createRef();
        this.cb_1F3_ref = React.createRef();
        this.cb_1F4_ref = React.createRef();
        this.cb_1F5_ref = React.createRef();
        this.cb_1F6_ref = React.createRef();
        this.cb_1F7_ref = React.createRef();
        this.cb_3F1_ref = React.createRef();
        this.cb_3F2_ref = React.createRef();
        this.cb_Q5_ref = React.createRef();
        this.cb_Q1_ref = React.createRef();
        this.cb_1FP1_ref = React.createRef();
        this.cb_1FP2_ref = React.createRef();
        this.cb_Q3_ref = React.createRef();
    }

    //GSAP
    myTween = null;

    openProperties = (name, title, section, outgoingFeeder) => {
        this.props.manageDialogOpen(true, name, title, section, outgoingFeeder)
    }

    changeDeviceState = () => {
        let breakers = this.props.params.breakers;
        Object.entries(breakers).forEach(
            ([key, value]) => {
                let refName = `${key}_ref`;
                if (value.state === 0) {
                    this.myTween = TweenLite.to(this[refName].current, 1, { rotation: 0, transformOrigin: "100% 100%" })
                }
                else if (value.state === 1) {
                    this.myTween = TweenLite.to(this[refName].current, 1, { rotation: 45, transformOrigin: "100% 100%" })
                }
            }
        );
    }

    componentDidMount() {
        this.changeDeviceState()
    }

    componentDidUpdate() {
        this.changeDeviceState()
    }

    render() {
        const breakers = this.props.params.breakers;
        const sources = this.props.params.sources;

        //voltage to 1-3FX shortcuts
        const breakers_2FX = (breakers.cb_Q2.state === 1 && sources.TR2.state === 1)
            || (breakers.cb_Q1.state === 1 && breakers.cb_Q4.state === 1 && sources.TR1.state === 1)
            || (breakers.cb_Q3.state === 1 && breakers.cb_Q5.state === 1 && breakers.cb_Q4.state === 1 && sources.GEN.state === 1)
        const breakers_1FX = (breakers.cb_Q2.state === 1 && breakers.cb_Q4.state === 1 && sources.TR2.state === 1)
            || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1)
            || (breakers.cb_Q3.state === 1 && breakers.cb_Q5.state === 1 && sources.GEN.state === 1)
        const breakers_3FX = (breakers.cb_Q2.state === 1 && breakers.cb_Q4.state === 1 && breakers.cb_Q5.state === 1 && sources.TR2.state === 1)
            || (breakers.cb_Q1.state === 1 && breakers.cb_Q5.state === 1 && sources.TR1.state === 1)
            || (breakers.cb_Q3.state === 1 && sources.GEN.state === 1)

        return (
            <div className="minwidth">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            Przegląd
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <svg id="All" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1065.27 522.57">
                            <g id="TR2" className={this.props.params.sources.TR2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="252.54" x2="252.54" y2="39" fill="#383838" strokeMiterlimit="10" strokeWidth="2" />
                                <circle cx="252.54" cy="68.07" r="29.07" fill="none" strokeMiterlimit="10" strokeWidth="2" />
                                <circle cx="252.54" cy="97.13" r="29.07" fill="none" strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="252.54" y1="158.2" x2="170.54" y2="158.2" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="170.54" y1="158.2" x2="170.54" y2="136.4" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="170.54" y1="136.4" x2="56.07" y2="136.4" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="133" y1="136.4" x2="133" y2="176.87" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="56.07" y1="136.4" x2="56.07" y2="176.87" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="48.12" y1="184.82" x2="64.02" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="64.02" y1="184.82" x2="48.12" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="125.05" y1="184.82" x2="140.95" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="140.95" y1="184.82" x2="125.05" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="244.59" y1="238.68" x2="260.49" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="260.49" y1="238.68" x2="244.59" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="243.94" y1="189.92" x2="252.54" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="261.14" y1="189.92" x2="252.54" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="243.94" y1="201.51" x2="252.54" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="261.14" y1="201.51" x2="252.54" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="252.54" y1="126.2" x2="252.54" y2="230.73" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="TR2_Tab" onClick={() => this.openProperties('TR2','Wyłącznik Q2','Transformator TR2','Sekcja TR2')}>
                                <rect x="303.91" y="64.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="303.91" y="82.6" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="303.91" y="101.2" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="303.91" y="44.07" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(307.23 55.99)" fontSize="12" fill="#fff"
                                        fontFamily="ArialMT, Arial">
                                    <tspan letterSpacing="-0.04em">T</tspan>
                                    <tspan x="6.88" y="0">rafo</tspan>
                                    <tspan x="27.56" y="0" letterSpacing="-0.02em"> </tspan>
                                    <tspan x="30.68" y="0">TR2</tspan>
                                </text><text transform="translate(305.91 77.52) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                    fontFamily="ArialMT, Arial">{this.props.params.sources.TR2.power}</text><text
                                        transform="translate(305.91 96.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                        fontFamily="ArialMT, Arial">{this.props.params.sources.TR2.current}</text><text
                                            transform="translate(305.91 114.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{this.props.params.sources.TR2.capacity}</text></g>
                            <g id="Opisy"><text transform="translate(76.93 161.2)" fontSize="24" fill="#1d1d1b"
                                fontFamily="SiemensSans-Roman, Siemens Sans">2FP2</text><text transform="translate(0 161.2)" fontSize="24"
                                    fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">2FP1</text><text
                                        transform="translate(170.28 32.33)" fontSize="36" fill="#1d1d1b"
                                        fontFamily="SiemensSans-Roman, Siemens Sans">TR2</text><text transform="translate(206.98 219.27)"
                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">Q2</text><text
                                                transform="translate(629.86 32.33)" fontSize="36" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans">TR1</text><text transform="translate(1005.19 109.3)"
                                                    fontSize="36" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">G</text><text
                                                        transform="translate(952.14 32.33)" fontSize="36" fill="#1d1d1b"
                                                        fontFamily="SiemensSans-Roman, Siemens Sans">GEN</text><text transform="translate(338.28 219.27)"
                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">Q4</text><text
                                                                transform="translate(666.69 219.27)" fontSize="24" fill="#1d1d1b"
                                                                fontFamily="SiemensSans-Roman, Siemens Sans">Q1</text><text transform="translate(798.05 219.27)"
                                                                    fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">Q5</text><text
                                                                        transform="translate(1032.26 219.27)" fontSize="24" fill="#1d1d1b"
                                                                        fontFamily="SiemensSans-Roman, Siemens Sans">Q3</text><text transform="translate(459.74 161.2)"
                                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">1FP1</text><text
                                                                                transform="translate(536.67 161.2)" fontSize="24" fill="#1d1d1b"
                                                                                fontFamily="SiemensSans-Roman, Siemens Sans">1FP2</text><text transform="translate(6.11 359.07)"
                                                                                    fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">2F1</text><text
                                                                                        transform="translate(71.14 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                        fontFamily="SiemensSans-Roman, Siemens Sans">2F2</text><text transform="translate(136.82 359.07)"
                                                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">2F3</text><text
                                                                                                transform="translate(202.51 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                fontFamily="SiemensSans-Roman, Siemens Sans">2F4</text><text transform="translate(268.19 359.07)"
                                                                                                    fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">2F5</text><text
                                                                                                        transform="translate(333.87 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                        fontFamily="SiemensSans-Roman, Siemens Sans">2F6</text><text transform="translate(399.55 359.07)"
                                                                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">1F1</text><text
                                                                                                                transform="translate(465.23 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                                fontFamily="SiemensSans-Roman, Siemens Sans">1F2</text><text transform="translate(530.92 359.07)"
                                                                                                                    fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">1F3</text><text
                                                                                                                        transform="translate(596.6 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                                        fontFamily="SiemensSans-Roman, Siemens Sans">1F4</text><text transform="translate(662.28 359.07)"
                                                                                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">1F5</text><text
                                                                                                                                transform="translate(727.96 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                                                fontFamily="SiemensSans-Roman, Siemens Sans">1F6</text><text transform="translate(793.65 359.07)"
                                                                                                                                    fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">1F7</text><text
                                                                                                                                        transform="translate(902.17 359.07)" fontSize="24" fill="#1d1d1b"
                                                                                                                                        fontFamily="SiemensSans-Roman, Siemens Sans">3F1</text><text transform="translate(967.85 359.07)"
                                                                                                                                            fontSize="24" fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">3F2</text></g>
                            <g id="_2F" data-name="2F"
                                className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1)
                                    || (breakers.cb_Q1.state === 1 && breakers.cb_Q4.state === 1 && sources.TR1.state === 1)
                                    || (breakers.cb_Q3.state === 1 && breakers.cb_Q5.state === 1 && breakers.cb_Q4.state === 1 && sources.GEN.state === 1)
                                    ? "voltageApplied" : "noVoltage"}
                            >
                                <line x1="252.54" y1="265.66" x2="252.54" y2="334.6" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="243.94" y1="301.99" x2="252.54" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="261.14" y1="301.99" x2="252.54" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="243.94" y1="290.4" x2="252.54" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="261.14" y1="290.4" x2="252.54" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="392.54" y1="334.6" x2="14.94" y2="334.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="252.47" y1="334.6" x2="252.47" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="244.52" y1="383.02" x2="260.42" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="260.42" y1="383.02" x2="244.52" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="121.1" y1="334.6" x2="121.1" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="113.15" y1="383.02" x2="129.05" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="129.05" y1="383.02" x2="113.15" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="186.79" y1="334.6" x2="186.79" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="178.84" y1="383.02" x2="194.74" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="194.74" y1="383.02" x2="178.84" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="318.15" y1="334.6" x2="318.15" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="310.2" y1="383.02" x2="326.1" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="326.1" y1="383.02" x2="310.2" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="56.07" y1="334.6" x2="56.07" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="48.12" y1="383.02" x2="64.02" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="64.02" y1="383.02" x2="48.12" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="383.83" y1="334.6" x2="383.83" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="375.88" y1="383.02" x2="391.78" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="391.78" y1="383.02" x2="375.88" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="383.85" y1="265.66" x2="383.85" y2="334.6" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="375.25" y1="301.99" x2="383.85" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="392.45" y1="301.99" x2="383.85" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="375.25" y1="290.4" x2="383.85" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="392.45" y1="290.4" x2="383.85" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="Q4" ref={this.cb_Q4_ref}
                                className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1)
                                    || (breakers.cb_Q1.state === 1 && breakers.cb_Q4.state === 1 && sources.TR1.state === 1)
                                    || (breakers.cb_Q3.state === 1 && breakers.cb_Q5.state === 1 && breakers.cb_Q4.state === 1 && sources.GEN.state === 1)
                                    ? "voltageApplied" : "noVoltage"}

                            >
                                <line x1="358.6" y1="240.48" x2="383.85" y2="265.73" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="Q2" ref={this.cb_Q2_ref} className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1)
                                || (breakers.cb_Q1.state === 1 && breakers.cb_Q4.state === 1 && sources.TR1.state === 1)
                                || (breakers.cb_Q3.state === 1 && breakers.cb_Q5.state === 1 && breakers.cb_Q4.state === 1 && sources.GEN.state === 1)
                                ? "voltageApplied" : "noVoltage"}>
                                <line x1="227.28" y1="240.48" x2="252.54" y2="265.73" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F" data-name="1F" className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1 && breakers.cb_Q4.state === 1)
                                || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1)
                                || (breakers.cb_Q5.state === 1 && breakers.cb_Q3.state === 1 && sources.GEN.state === 1)
                                ? "voltageApplied" : "noVoltage"}>
                                <line x1="375.88" y1="238.68" x2="391.78" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="391.78" y1="238.68" x2="375.88" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="375.23" y1="189.92" x2="383.83" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="392.43" y1="189.92" x2="383.83" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="375.23" y1="201.51" x2="383.83" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="392.43" y1="201.51" x2="383.83" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="383.83" y1="158.2" x2="449.51" y2="158.2" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="449.51" y1="158.2" x2="449.51" y2="334.6" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="449.51" y1="334.6" x2="449.51" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="441.56" y1="383.02" x2="457.46" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="457.46" y1="383.02" x2="441.56" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="515.2" y1="334.6" x2="515.2" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="507.25" y1="383.02" x2="523.15" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="523.15" y1="383.02" x2="507.25" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="580.88" y1="334.6" x2="580.88" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="572.93" y1="383.02" x2="588.83" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="588.83" y1="383.02" x2="572.93" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="843.61" y1="334.6" x2="843.61" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="835.66" y1="383.02" x2="851.56" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="851.56" y1="383.02" x2="835.66" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="777.93" y1="334.6" x2="777.93" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="769.98" y1="383.02" x2="785.88" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="785.88" y1="383.02" x2="769.98" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="712.24" y1="334.6" x2="712.24" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="704.29" y1="383.02" x2="720.19" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.19" y1="383.02" x2="704.29" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="646.56" y1="334.6" x2="646.56" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="638.61" y1="383.02" x2="654.51" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="654.51" y1="383.02" x2="638.61" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="441.74" y1="334.6" x2="851.47" y2="334.6" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="712.27" y1="265.66" x2="712.27" y2="334.6" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="703.67" y1="301.99" x2="712.27" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.87" y1="301.99" x2="712.27" y2="310.59" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="703.67" y1="290.4" x2="712.27" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.87" y1="290.4" x2="712.27" y2="299" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="843.6" y1="265.66" x2="843.6" y2="334.6" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="383.83" y1="158.2" x2="383.83" y2="230.83" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="Q5" ref={this.cb_Q5_ref}
                                className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1 && breakers.cb_Q4.state === 1)
                                    || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1)
                                    || (breakers.cb_Q5.state === 1 && breakers.cb_Q3.state === 1 && sources.GEN.state === 1)
                                    ? "voltageApplied" : "noVoltage"}
                            >
                                <line x1="818.35" y1="240.48" x2="843.6" y2="265.73" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="Q1" ref={this.cb_Q1_ref} className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1 && breakers.cb_Q4.state === 1)
                                || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1)
                                || (breakers.cb_Q5.state === 1 && breakers.cb_Q3.state === 1 && sources.GEN.state === 1)
                                ? "voltageApplied" : "noVoltage"}>
                                <line x1="687.02" y1="240.48" x2="712.27" y2="265.73" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="TR1" className={this.props.params.sources.TR1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="704.29" y1="238.68" x2="720.19" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.19" y1="238.68" x2="704.29" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="703.64" y1="189.92" x2="712.24" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.84" y1="189.92" x2="712.24" y2="181.32" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="703.64" y1="201.51" x2="712.24" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="720.84" y1="201.51" x2="712.24" y2="192.91" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="712.27" y1="158.2" x2="630.27" y2="158.2" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="630.27" y1="158.2" x2="630.27" y2="136.4" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="630.27" y1="136.4" x2="515.81" y2="136.4" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="515.81" y1="136.4" x2="515.81" y2="176.87" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="507.86" y1="184.82" x2="523.76" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="523.76" y1="184.82" x2="507.86" y2="168.92" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="592.74" y1="136.99" x2="592.74" y2="177.46" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="584.79" y1="185.41" x2="600.69" y2="169.51" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="600.69" y1="185.41" x2="584.79" y2="169.51" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="712.27" x2="712.27" y2="39" fill="#383838" strokeMiterlimit="10" strokeWidth="2" />
                                <circle cx="712.27" cy="68.07" r="29.07" fill="none" strokeMiterlimit="10" strokeWidth="2" />
                                <circle cx="712.27" cy="97.13" r="29.07" fill="none" strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="712.24" y1="126.2" x2="712.24" y2="231.03" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="TR1_Tab" onClick={() => this.openProperties('TR1','Wyłącznik Q1','Transformator TR1','Sekcja TR1')}>
                                <rect x="763.65" y="64.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="763.65" y="82.6" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="763.65" y="101.2" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="763.65" y="44.07" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(766.97 55.99)" fontSize="12" fill="#fff"
                                        fontFamily="ArialMT, Arial">
                                    <tspan letterSpacing="-0.04em">T</tspan>
                                    <tspan x="6.88" y="0">rafo</tspan>
                                    <tspan x="27.56" y="0" letterSpacing="-0.02em"> </tspan>
                                    <tspan x="30.68" y="0">TR1</tspan>
                                </text><text transform="translate(765.64 77.52) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                    fontFamily="ArialMT, Arial">{this.props.params.sources.TR1.power}</text><text
                                        transform="translate(765.64 96.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                        fontFamily="ArialMT, Arial">{this.props.params.sources.TR1.current}</text><text
                                            transform="translate(765.64 114.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{this.props.params.sources.TR1.capacity}</text></g>
                            <g id="GEN" className={sources.GEN.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="1009.87" y1="238.68" x2="1025.77" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="1025.77" y1="238.68" x2="1009.87" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <circle cx="1017.82" cy="97.13" r="29.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="1017.82" y1="126.2" x2="1017.82" y2="230.14" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="GEN_Tab" onClick={() => this.openProperties('GEN','Wyłącznik Q3','Generator','Sekcja GEN')}>
                                <rect x="937.85" y="155.2" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="937.85" y="173.46" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="937.85" y="192.06" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="937.85" y="134.94" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(940.84 146.86)" fontSize="12" fill="#fff"
                                        fontFamily="ArialMT, Arial">Generator</text><text transform="translate(939.85 168.39) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none" fontFamily="ArialMT, Arial">{sources.GEN.power}</text><text
                                                transform="translate(939.85 186.99) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{sources.GEN.current}</text><text transform="translate(939.85 205.59) scale(1 1.1)" fontSize="12"
                                                    fill="#3c3c3b" fontFamily="ArialMT, Arial" stroke="none">{sources.GEN.capacity}</text></g>
                            <g id="GEN_Stop"><text transform="translate(942.88 114.67)" fontSize="18" fill="#1d1d1b"
                                fontFamily="SiemensSans-Roman, Siemens Sans">
                                <tspan letterSpacing="-0.03em">S</tspan>
                                <tspan x="8.88" y="0" letterSpacing="-0.02em">t</tspan>
                                <tspan x="14.79" y="0">op</tspan>
                            </text></g>
                            <g id="GEN_Gotowosc"><text transform="translate(900.01 90.3)" fontSize="18" fill="#1d1d1b"
                                fontFamily="SiemensSans-Roman, Siemens Sans">G<tspan x="12.11" y="0" letterSpacing="-0.02em">o</tspan>
                                <tspan x="21.97" y="0" letterSpacing="-0.02em">t</tspan>
                                <tspan x="27.89" y="0" letterSpacing="-0.01em">o</tspan>
                                <tspan x="37.92" y="0" letterSpacing="-0.01em">w</tspan>
                                <tspan x="51.88" y="0">ość</tspan>
                            </text></g>
                            <g id="_3F" data-name="3F"
                                className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1 && breakers.cb_Q4.state === 1 && breakers.cb_Q5.state === 1)
                                    || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1 && breakers.cb_Q5.state === 1)
                                    || (breakers.cb_Q3.state === 1 && sources.GEN.state === 1)
                                    ? "voltageApplied" : "noVoltage"}>
                                <line x1="835.66" y1="238.68" x2="851.56" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="851.56" y1="238.68" x2="835.66" y2="222.78" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="843.61" y1="158.2" x2="909.29" y2="158.2" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="909.29" y1="158.2" x2="909.29" y2="334.6" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="901.34" y1="334.6" x2="1064.27" y2="334.6" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="952.14" y1="334.6" x2="952.14" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="944.19" y1="383.02" x2="960.09" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="960.09" y1="383.02" x2="944.19" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="1017.82" y1="334.6" x2="1017.82" y2="375.07" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="1009.87" y1="383.02" x2="1025.77" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="1025.77" y1="383.02" x2="1009.87" y2="367.12" fill="none" strokeLinecap="square"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="1017.82" y1="265.66" x2="1017.82" y2="334.6" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <line x1="843.6" y1="158.2" x2="843.6" y2="231.03" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="Q3" ref={this.cb_Q3_ref}
                                className={(breakers.cb_Q2.state === 1 && sources.TR2.state === 1 && breakers.cb_Q4.state === 1 && breakers.cb_Q5.state === 1)
                                    || (breakers.cb_Q1.state === 1 && sources.TR1.state === 1 && breakers.cb_Q5.state === 1)
                                    || (breakers.cb_Q3.state === 1 && sources.GEN.state === 1)
                                    ? "voltageApplied" : "noVoltage"}
                            >
                                <line x1="992.57" y1="240.48" x2="1017.82" y2="265.73" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1FP2_Tab" data-name="1FP2_Tab" 
                            onClick={() => this.openProperties('cb_1FP2','Wyłącznik 1FP2','Sekcja TR1','RPZOK')}
                                className={(sources.TR1.state === 1) && (breakers.cb_1FP2.state === 1) ? "voltageApplied" : "noVoltage"
                                }>
                                <line x1="592.74" y1="212.29" x2="592.74" y2="249.82" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <rect x="562.74" y="270.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="562.74" y="288.59" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="562.74" y="307.19" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="562.74" y="250.06" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(572.07 261.98)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">RPZOK</text><text transform="translate(564.74 283.52) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1FP2.power}</text><text
                                                transform="translate(564.74 302.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1FP2.current}</text><text
                                                    transform="translate(564.74 320.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1FP2.capacity}</text></g>
                            <g id="_1FP2" data-name="1FP2" ref={this.cb_1FP2_ref}
                                className={(sources.TR1.state === 1) && (breakers.cb_1FP2.state === 1) ? "voltageApplied" : "noVoltage"
                                }>
                                <line x1="567.49" y1="187.04" x2="592.74" y2="212.29" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1FP1_Tab" data-name="1FP1_Tab"
                            onClick={() => this.openProperties('cb_1FP1','Wyłącznik 1FP1','Sekcja TR1','Budynek 01 - MSF')}
                                className={(sources.TR1.state === 1) && (breakers.cb_1FP1.state === 1) ? "voltageApplied" : "noVoltage"
                                }>
                                <line x1="515.81" y1="212.06" x2="515.81" y2="249.59" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <rect x="485.81" y="270.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="485.81" y="288.59" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="485.81" y="307.19" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="485.81" y="250.06" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(490.8 261.98)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B01 MSF</text><text transform="translate(487.81 283.52) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1FP1.power}</text><text
                                                transform="translate(487.81 302.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1FP1.current}</text><text
                                                    transform="translate(487.81 320.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1FP1.capacity}</text></g>
                            <g id="_1FP1" data-name="1FP1" ref={this.cb_1FP1_ref}
                                className={(sources.TR1.state === 1) && (breakers.cb_1FP1.state === 1) ? "voltageApplied" : "noVoltage"
                                }
                            >
                                <line x1="490.56" y1="186.81" x2="515.81" y2="212.06" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2FP2_Tab" data-name="2FP2_Tab" 
                            onClick={() => this.openProperties('cb_2FP2','Wyłącznik 2FP2','Sekcja TR2','RPZOK')}
                            className={breakers.cb_2FP2.state === 1 && sources.TR2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="134.29" y1="211.87" x2="134.29" y2="249.4" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <rect x="104.29" y="270.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="104.29" y="288.59" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="104.29" y="307.19" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="104.29" y="250.06" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(113.62 261.98)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">RPZOK</text><text transform="translate(106.29 283.52) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2FP2.power}</text><text
                                                transform="translate(106.29 302.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2FP2.current}</text><text
                                                    transform="translate(106.29 320.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2FP2.capacity}</text></g>
                            <g id="_2FP2" data-name="2FP2" ref={this.cb_2FP2_ref} className={breakers.cb_2FP2.state === 1 && sources.TR2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="109.03" y1="186.62" x2="134.29" y2="211.87" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2FP1_Tab" data-name="2FP1_Tab" 
                            onClick={() => this.openProperties('cb_2FP1','Wyłącznik 2FP1','Sekcja TR2','Budynek 01 - MSF')}
                            className={breakers.cb_2FP1.state === 1 && sources.TR2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="56.07" y1="211.87" x2="56.07" y2="249.4" fill="none" strokeLinecap="round"
                                    strokeMiterlimit="10" strokeWidth="2" />
                                <rect x="26.07" y="270.33" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="26.07" y="288.59" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="26.07" y="307.19" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="26.07" y="250.06" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(31.06 261.98)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B01 MSF</text><text transform="translate(28.07 283.52) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2FP1.power}</text><text
                                                transform="translate(28.07 302.12) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2FP1.current}</text><text
                                                    transform="translate(28.07 320.72) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2FP1.capacity}</text></g>
                            <g id="_2FP1" data-name="2FP1" ref={this.cb_2FP1_ref}
                                className={breakers.cb_2FP1.state === 1 && sources.TR2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="30.82" y1="186.62" x2="56.07" y2="211.87" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_3F2_Tab" data-name="3F2_Tab"
                            onClick={() => this.openProperties('cb_3F2','Wyłącznik 3F2','Sekcja GEN','Budynek 01 - MSG')}
                                className={breakers_3FX && breakers.cb_3F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="1017.82" y1="410.07" x2="1017.82" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="987.82" y="466.6" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="987.82" y="484.87" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="987.82" y="503.47" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="987.82" y="446.34" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(991.81 458.26)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B01 MSG</text><text transform="translate(989.82 479.79) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none" fontFamily="ArialMT, Arial">{breakers.cb_3F2.power}</text><text
                                                transform="translate(989.82 498.39) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_3F2.current}</text><text transform="translate(989.82 516.99) scale(1 1.1)" fontSize="12"
                                                    fill="#3c3c3b" fontFamily="ArialMT, Arial" stroke="none">{breakers.cb_3F2.capacity}</text></g>
                            <g id="_3F2" data-name="3F2" ref={this.cb_3F2_ref}
                                className={breakers_3FX && breakers.cb_3F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="992.57" y1="384.82" x2="1017.82" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_3F1_Tab" data-name="3F1_Tab"
                            onClick={() => this.openProperties('cb_3F1','Wyłącznik 3F1','Sekcja GEN','Budynek 2 - serwer.')}
                                className={breakers_3FX && breakers.cb_3F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="952.14" y1="410.07" x2="952.14" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="922.14" y="466.6" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="922.14" y="484.87" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="922.14" y="503.47" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="922.14" y="446.34" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(923.79 458.26)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B2 serwe<tspan x="50.02" y="0" letterSpacing="-0.06em">r</tspan>
                                    <tspan x="53.36" y="0">.</tspan>
                                </text><text transform="translate(924.14 479.79) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                    fontFamily="ArialMT, Arial">{breakers.cb_3F1.power}</text><text transform="translate(924.14 498.39) scale(1 1.1)" fontSize="12"
                                        fill="#3c3c3b" fontFamily="ArialMT, Arial" stroke="none">{breakers.cb_3F1.current}</text><text transform="translate(924.14 516.99) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none" fontFamily="ArialMT, Arial">{breakers.cb_3F1.capacity}</text></g>
                            <g id="_3F1" data-name="3F1" ref={this.cb_3F1_ref}
                                className={breakers_3FX && breakers.cb_3F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="926.88" y1="384.82" x2="952.14" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F7_Tab" data-name="1F7_Tab"
                            onClick={() => this.openProperties('cb_1F7','Wyłącznik 1F7','Sekcja TR1','Budynek 2 - RG')}
                                className={breakers_1FX && breakers.cb_1F7.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="844.89" y1="410.07" x2="844.89" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="814.89" y="466.6" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="814.89" y="484.87" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="814.89" y="503.47" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="814.89" y="446.34" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(826.89 458.26)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B2 RG</text><text transform="translate(816.89 479.79) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F7.power}</text><text
                                                transform="translate(816.89 498.39) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1F7.current}</text><text
                                                    transform="translate(816.89 516.99) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1F7.capacity}</text></g>
                            <g id="_1F7" data-name="1F7" ref={this.cb_1F7_ref}
                                className={breakers_1FX && breakers.cb_1F7.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="819.64" y1="384.82" x2="844.89" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F6_Tab" data-name="1F6_Tab"
                            onClick={() => this.openProperties('cb_1F6','Wyłącznik 1F6','Sekcja TR1','Budynek 2 - RG')}
                                className={breakers_1FX && breakers.cb_1F6.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="779.21" y1="410.07" x2="779.21" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="749.21" y="466.6" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="749.21" y="484.87" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="749.21" y="503.47" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="749.21" y="446.34" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(761.2 458.26)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B2 RG</text><text transform="translate(751.21 479.79) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F6.power}</text><text
                                                transform="translate(751.21 498.39) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1F6.current}</text><text
                                                    transform="translate(751.21 516.99) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1F6.capacity}</text></g>
                            <g id="_1F6" data-name="1F6" ref={this.cb_1F6_ref}
                                className={breakers_1FX && breakers.cb_1F6.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="753.96" y1="384.82" x2="779.21" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F5_Tab" data-name="1F5_Tab"
                            onClick={() => this.openProperties('cb_1F5','Wyłącznik 1F5','Sekcja TR1','Budynek 3 - RG')}
                                className={breakers_1FX && breakers.cb_1F5.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="713.53" y1="410.07" x2="713.53" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="683.53" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="683.53" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="683.53" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="683.53" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(695.52 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B3 RG</text><text transform="translate(685.53 479.65) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F5.power}</text><text
                                                transform="translate(685.53 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1F5.current}</text><text
                                                    transform="translate(685.53 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1F5.capacity}</text></g>
                            <g id="_1F5" data-name="1F5" ref={this.cb_1F5_ref}
                                className={breakers_1FX && breakers.cb_1F5.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="688.28" y1="384.82" x2="713.53" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F4_Tab" data-name="1F4_Tab"
                            onClick={() => this.openProperties('cb_1F4','Wyłącznik 1F4','Sekcja TR1','Budynek 1A - klim.')}
                                className={breakers_1FX && breakers.cb_1F4.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="647.84" y1="410.07" x2="647.84" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="617.84" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="617.84" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="617.84" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="617.84" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(622.84 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B1<tspan x="14.68" y="0" letterSpacing="-0.06em">A</tspan>
                                    <tspan x="22.02" y="0"> klim.</tspan>
                                </text><text transform="translate(619.84 479.65) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                    fontFamily="ArialMT, Arial">{breakers.cb_1F4.power}</text><text
                                        transform="translate(619.84 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                        fontFamily="ArialMT, Arial">{breakers.cb_1F4.current}</text><text
                                            transform="translate(619.84 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F4.capacity}</text></g>
                            <g id="_1F4" data-name="1F4" ref={this.cb_1F4_ref}
                                className={breakers_1FX && breakers.cb_1F4.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="622.59" y1="384.82" x2="647.84" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F3_Tab" data-name="1F3_Tab"
                            onClick={() => this.openProperties('cb_1F3','Wyłącznik 1F3','Sekcja TR1','Budynek 1A - komp.')}
                                className={breakers_1FX && breakers.cb_1F3.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="582.16" y1="410.07" x2="582.16" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="552.16" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="552.16" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="552.16" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="552.16" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(553.15 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B1<tspan x="14.68" y="0" letterSpacing="-0.06em">A</tspan>
                                    <tspan x="22.02" y="0" > komp.</tspan>
                                </text><text transform="translate(554.16 479.65) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                    fontFamily="ArialMT, Arial">{breakers.cb_1F3.power}</text><text
                                        transform="translate(554.16 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                        fontFamily="ArialMT, Arial">{breakers.cb_1F3.current}</text><text
                                            transform="translate(554.16 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F3.capacity}</text></g>
                            <g id="_1F3" data-name="1F3" ref={this.cb_1F3_ref}
                                className={breakers_1FX && breakers.cb_1F3.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="556.91" y1="384.82" x2="582.16" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F2_Tab" data-name="1F2_Tab"
                            onClick={() => this.openProperties('cb_1F2','Wyłącznik 1F2','Sekcja TR1','Budynek 3 - komp.')}
                                className={breakers_1FX && breakers.cb_1F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="516.48" y1="410.07" x2="516.48" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="486.48" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="486.48" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="486.48" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="486.48" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(491.14 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B3 komp.</text><text transform="translate(488.48 479.65) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F2.power}</text><text
                                                transform="translate(488.48 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1F2.current}</text><text
                                                    transform="translate(488.48 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1F2.capacity}</text></g>
                            <g id="_1F2" data-name="1F2" ref={this.cb_1F2_ref}
                                className={breakers_1FX && breakers.cb_1F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="491.23" y1="384.82" x2="516.48" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_1F1_Tab" data-name="1F1_Tab"
                            onClick={() => this.openProperties('cb_1F1','Wyłącznik 1F1','Sekcja TR1','Budynek 01 - MSB1')}
                                className={breakers_1FX && breakers.cb_1F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="450.8" y1="410.07" x2="450.8" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="420.8" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="420.8" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="420.8" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="420.8" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(422.12 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B01 MSB1</text><text transform="translate(422.8 479.65) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_1F1.power}</text><text
                                                transform="translate(422.8 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_1F1.current}</text><text
                                                    transform="translate(422.8 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_1F1.capacity}</text></g>
                            <g id="_1F1" data-name="1F1" ref={this.cb_1F1_ref}
                                className={breakers_1FX && breakers.cb_1F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="425.55" y1="384.82" x2="450.8" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F6_Tab" data-name="2F6_Tab"
                            onClick={() => this.openProperties('cb_2F6','Wyłącznik 2F6','Sekcja TR2','Parking')}
                                className={breakers_2FX && breakers.cb_2F6.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="385.12" y1="410.07" x2="385.12" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="355.12" y="466.46" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="355.12" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="355.12" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="355.12" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(364.77 458.12)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">Parking</text><text transform="translate(357.12 479.65) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F6.power}</text><text
                                                transform="translate(357.12 498.25) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F6.current}</text><text
                                                    transform="translate(357.12 516.85) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F6.capacity}</text></g>
                            <g id="_2F6" data-name="2F6" ref={this.cb_2F6_ref}
                                className={breakers_2FX && breakers.cb_2F6.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="359.87" y1="384.82" x2="385.12" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F5_Tab" data-name="2F5_Tab" 
                            onClick={() => this.openProperties('cb_2F5','Wyłącznik 2F5','Sekcja TR2','Budynek 1A')}
                            className={breakers_2FX && breakers.cb_2F5.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="319.43" y1="410.07" x2="319.43" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="289.43" y="466.47" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="289.43" y="484.73" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="289.43" y="503.33" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="289.43" y="446.2" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(308.42 458.13)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B1<tspan x="14.68" y="0" letterSpacing="-0.06em">A</tspan></text><text
                                            transform="translate(291.43 479.66) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F5.power}</text><text
                                                transform="translate(291.43 498.26) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F5.current}</text><text
                                                    transform="translate(291.43 516.86) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F5.capacity}</text></g>
                            <g id="_2F5" data-name="2F5" ref={this.cb_2F5_ref}
                                className={breakers_2FX && breakers.cb_2F5.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="294.18" y1="384.82" x2="319.43" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F4_Tab" data-name="2F4_Tab"
                            onClick={() => this.openProperties('cb_2F4','Wyłącznik 2F4','Sekcja TR2','Budynek 2 - R1')}
                                className={breakers_2FX && breakers.cb_2F4.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="253.75" y1="410.07" x2="253.75" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="223.75" y="466.53" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="223.75" y="484.8" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="223.75" y="503.4" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="223.75" y="446.27" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(237.08 458.19)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B2 R1</text><text transform="translate(225.75 479.72) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F4.power}</text><text
                                                transform="translate(225.75 498.32) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F4.current}</text><text
                                                    transform="translate(225.75 516.93) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F4.capacity}</text></g>
                            <g id="_2F4" data-name="2F4" ref={this.cb_2F4_ref}
                                className={breakers_2FX && breakers.cb_2F4.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="228.5" y1="384.82" x2="253.75" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F3_Tab" data-name="2F3_Tab"
                            onClick={() => this.openProperties('cb_2F3','Wyłącznik 2F3','Sekcja TR2','Budynek 01 - MSB2')}
                                className={breakers_2FX && breakers.cb_2F3.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="188.07" y1="410.07" x2="188.07" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="158.07" y="466.53" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="158.07" y="484.8" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="158.07" y="503.4" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="158.07" y="446.27" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(159.39 458.19)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B01 MSB2</text><text transform="translate(160.07 479.72) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F3.power}</text><text
                                                transform="translate(160.07 498.32) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F3.current}</text><text
                                                    transform="translate(160.07 516.93) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F3.capacity}</text></g>
                            <g id="_2F3" data-name="2F3" ref={this.cb_2F3_ref}
                                className={breakers_2FX && breakers.cb_2F3.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="162.82" y1="384.82" x2="188.07" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F2_Tab" data-name="2F2_Tab"
                            onClick={() => this.openProperties('cb_2F2','Wyłącznik 2F2','Sekcja TR2','Budynek 2 - RG')}
                                className={breakers_2FX && breakers.cb_2F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="122.39" y1="410.07" x2="122.39" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="92.39" y="466.53" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="92.39" y="484.8" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="92.39" y="503.4" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="92.39" y="446.27" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(104.38 458.19)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B2 RG</text><text transform="translate(94.39 479.72) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F2.power}</text><text
                                                transform="translate(94.39 498.32) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F2.current}</text><text
                                                    transform="translate(94.39 516.93) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F2.capacity}</text></g>
                            <g id="_2F2" data-name="2F2" ref={this.cb_2F2_ref}
                                className={breakers_2FX && breakers.cb_2F2.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="97.14" y1="384.82" x2="122.39" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="_2F1_Tab" data-name="2F1_Tab"
                            onClick={() => this.openProperties('cb_2F1','Wyłącznik 2F1','Sekcja TR2','Budynek 1B - P2')}
                                className={breakers_2FX && breakers.cb_2F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <rect x="26.07" y="466.53" width="60" height="18.27" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="26.07" y="484.8" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <rect x="26.07" y="503.4" width="60" height="18.6" fill="#c6c6c6" stroke="#575756" strokeLinecap="square"
                                    strokeMiterlimit="10" />
                                <line x1="56.07" y1="410.07" x2="56.07" y2="447.6" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <rect x="26.07" y="446.27" width="60" height="19.93" fill="#575756" stroke="#575756" strokeMiterlimit="10"
                                    strokeWidth="2" /><text transform="translate(35.72 458.19)" fontSize="12" fill="#fff" stroke="none"
                                        fontFamily="ArialMT, Arial">B1B P2</text><text transform="translate(28.07 479.72) scale(1 1.1)"
                                            fontSize="12" fill="#3c3c3b" stroke ="none"
                                            fontFamily="ArialMT, Arial">{breakers.cb_2F1.power}</text><text
                                                transform="translate(28.07 498.32) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                fontFamily="ArialMT, Arial">{breakers.cb_2F1.current}</text><text
                                                    transform="translate(28.07 516.93) scale(1 1.1)" fontSize="12" fill="#3c3c3b" stroke ="none"
                                                    fontFamily="ArialMT, Arial">{breakers.cb_2F1.capacity}</text></g>
                            <g id="_2F1" data-name="2F1" ref={this.cb_2F1_ref}
                                className={breakers_2FX && breakers.cb_2F1.state === 1 ? "voltageApplied" : "noVoltage"}>
                                <line x1="30.81" y1="384.82" x2="56.06" y2="410.07" fill="none" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                        </svg>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        params: state.switchesStateReducer
    };
}

const mapDispatchToProps = {
    manageDialogOpen
  };

export default connect(mapStateToProps, mapDispatchToProps)(Overview);