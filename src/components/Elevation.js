import React from 'react';
import '../styles/Elevation.scss';
import '../styles/Overview.scss';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { manageDialogOpen } from '../actions/index';
import { withTranslation } from 'react-i18next';

class Elevation extends React.Component {
    
    manageSwitchesState = (name) => {
    
            let t = this.props.t;
            let deviceStateClosed = this.props.params.breakers[name].stateClosed;
            let deviceStateOpen = this.props.params.breakers[name].stateOpened;
            let deviceStateTripped = this.props.params.breakers[name].stateTripped;
            let namesToShort = ['cb_2FP1','cb_2FP2','cb_1FP1','cb_1FP2']
    
            if(namesToShort.indexOf(name)!==-1)
            {
                if(deviceStateClosed === true)
                {
                    return t('elevationClosedShort')
                }
                else if(deviceStateOpen === true)
                {
                    return t('elevationOpenShort')
                }
                else if(deviceStateTripped === true)
                {
                    return t('elevationTrippedShort')
                }
            }
            else {
                if(deviceStateClosed === true)
                {
                    return t('elevationClosedLong')
                }
                else if(deviceStateOpen === true)
                {
                    return t('elevationOpenLong')
                }
                else if(deviceStateTripped === true)
                {
                    return t('elevationTrippedLong')
                }
            }
        
         
    }

    manageSwitchesClassName = (name) => {        
            let deviceStateClosed = this.props.params.breakers[name].stateClosed;
            let deviceStateOpen = this.props.params.breakers[name].stateOpened;
            let deviceStateTripped = this.props.params.breakers[name].stateTripped;
    
            if(deviceStateClosed === true)
            {
                return 'closed'
            }
            else if(deviceStateOpen === true)
            {
                return 'open'
            }
            else if(deviceStateTripped === true)
            {
                return 'tripped'
            }
        
        
    }

    openProperties = (name, title, section, outgoingFeeder) => {
        this.props.manageDialogOpen(true, name, title, section, outgoingFeeder)
    }

    render() {
        const { t } = this.props;
        return (
            <div className="minwidth">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            {t('elevation')}
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1722.85 1008.01" className="maxheight">
                            <defs>
                                <clipPath id="clip-path" transform="translate(-83.96 -51.18)">
                                    <rect x="149.42" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-2" transform="translate(-83.96 -51.18)">
                                    <rect x="444.92" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-3" transform="translate(-83.96 -51.18)">
                                    <rect x="581.92" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-4" transform="translate(-83.96 -51.18)">
                                    <rect x="740.42" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-5" transform="translate(-83.96 -51.18)">
                                    <rect x="898.72" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-6" transform="translate(-83.96 -51.18)">
                                    <rect x="1057.22" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-7" transform="translate(-83.96 -51.18)">
                                    <rect x="1352.92" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-8" transform="translate(-83.96 -51.18)">
                                    <rect x="1511.42" y="84.67" width="55.95" height="29.86" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-9" transform="translate(-83.96 -51.18)">
                                    <rect x="307.4" y="230.37" width="59.36" height="60" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-10" transform="translate(-83.96 -51.18)">
                                    <rect x="580.22" y="230.37" width="59.36" height="60" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-11" transform="translate(-83.96 -51.18)">
                                    <rect x="897.02" y="230.37" width="59.36" height="60" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-12" transform="translate(-83.96 -51.18)">
                                    <rect x="1661.92" y="230.37" width="59.36" height="60" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-13" transform="translate(-83.96 -51.18)">
                                    <rect x="1509.72" y="230.37" width="59.36" height="60" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-14" transform="translate(-83.96 -51.18)">
                                    <rect x="427.74" y="506.45" width="90.32" height="154.8" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-15" transform="translate(-83.96 -51.18)">
                                    <rect x="550.4" y="506.45" width="118.99" height="154.8" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-16" transform="translate(-83.96 -51.18)">
                                    <rect x="1335.74" y="506.45" width="90.32" height="154.8" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-17" transform="translate(-83.96 -51.18)">
                                    <rect x="1463.53" y="334.24" width="65.47" height="112.2" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-18" transform="translate(-83.96 -51.18)">
                                    <rect x="1549.67" y="334.24" width="65.47" height="112.2" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-19" transform="translate(-83.96 -51.18)">
                                    <rect x="549.12" y="844.86" width="55.62" height="95.32" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-20" transform="translate(-83.96 -51.18)">
                                    <rect x="615.12" y="844.86" width="55.62" height="95.32" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-21" transform="translate(-83.96 -51.18)">
                                    <rect x="866.68" y="844.86" width="55.62" height="95.32" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-22" transform="translate(-83.96 -51.18)">
                                    <rect x="930.58" y="844.86" width="55.62" height="95.32" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-23" transform="translate(-83.96 -51.18)">
                                    <rect x="708.9" y="506.45" width="118.99" height="154.8" fill="none" />
                                </clipPath>
                                <clipPath id="clip-path-24" transform="translate(-83.96 -51.18)">
                                    <rect x="867.2" y="506.45" width="118.99" height="154.8" fill="none" />
                                </clipPath>
                            </defs>
                            <g id="Stripes">
                                <rect x="3.44" y="121.32" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="78.62" width="1666.4" height="14" fill="#055f87" />
                                <rect x="3.44" y="202.19" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="283.06" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="363.93" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="444.8" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="525.67" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="606.54" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="687.41" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="768.28" width="180" height="14" fill="#055f87" />
                                <rect x="3.44" y="849.15" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="121.32" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="202.19" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="283.06" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="363.93" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="444.8" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="525.67" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="606.54" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="687.41" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="768.28" width="180" height="14" fill="#055f87" />
                                <rect x="911.04" y="849.15" width="180" height="14" fill="#055f87" />
                                <rect x="320.44" y="363.93" width="590.6" height="14" fill="#055f87" />
                                <rect x="320.44" y="687.41" width="590.6" height="14" fill="#055f87" />
                                <rect x="1228.44" y="363.93" width="137" height="14" fill="#055f87" />
                                <rect x="1228.44" y="687.41" width="317" height="14" fill="#055f87" />
                                <rect x="1365.44" y="606.54" width="180" height="14" fill="#055f87" />
                                <rect x="1365.44" y="525.67" width="180" height="14" fill="#055f87" />
                                <rect x="1365.44" y="444.8" width="180" height="14" fill="#055f87" />
                                <rect x="1365.44" y="768.28" width="180" height="14" fill="#055f87" />
                            </g>
                            <g id="Contour">
                                <rect x="3.44" y="33.62" width="1666.4" height="910.4" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="53.44" y1="1.82" x2="1719.44" y2="1.82" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="183.44" y1="33.62" x2="183.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="320.44" y1="33.62" x2="320.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="457.44" y1="33.62" x2="457.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="594.44" y1="33.62" x2="594.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="774.44" y1="33.62" x2="774.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="911.04" y1="33.62" x2="911.04" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="1091.44" y1="33.62" x2="1091.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="1228.44" y1="33.62" x2="1228.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="1365.44" y1="33.62" x2="1365.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                                <line x1="1545.44" y1="33.62" x2="1545.44" y2="944.02" fill="none" stroke="#055f87" strokeMiterlimit="10"
                                    strokeWidth="2" />
                            </g>
                            <g id="Side">
                                <polygon points="1719.84 912.22 1669.84 944.02 1669.84 33.37 1719.44 1.82 1719.84 912.22" fill="none"
                                    stroke="#055f87" strokeMiterlimit="10" strokeWidth="2" />
                            </g>
                            <g id="Logo">
                                <polygon points="121.07 63 65.8 63 65.8 33.84 121.07 33.84 121.07 63 121.07 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path)">
                                    <polygon points="121.07 63 65.8 63 65.8 33.84 121.07 33.84 121.07 63 121.07 63" fill="none" stroke="#055f87"
                                        strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="117.89 49.41 69.25 49.41 69.25 36.35 117.89 36.35 117.89 49.41 117.89 49.41" fill="#006174" />
                                <text transform="translate(71.72 46.14)" fontSize="9.63" fill="#e5f3f8"
                                    fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(71.51 60.52)" fontSize="11.3"
                                        fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                            transform="translate(86.7 60.52)" fontSize="11.3" fill="#1d1d1b"
                                            fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                transform="translate(99.73 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="65.39" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="416.57 63 361.3 63 361.3 33.84 416.57 33.84 416.57 63 416.57 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-2)">
                                    <polygon points="416.57 63 361.3 63 361.3 33.84 416.57 33.84 416.57 63 416.57 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="413.39 49.41 364.75 49.41 364.75 36.35 413.39 36.35 413.39 49.41 413.39 49.41"
                                    fill="#006174" /><text transform="translate(367.22 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(367.01 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(382.2 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(395.23 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="360.89" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="553.57 63 498.3 63 498.3 33.84 553.57 33.84 553.57 63 553.57 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-3)">
                                    <polygon points="553.57 63 498.3 63 498.3 33.84 553.57 33.84 553.57 63 553.57 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="550.39 49.41 501.75 49.41 501.75 36.35 550.39 36.35 550.39 49.41 550.39 49.41"
                                    fill="#006174" /><text transform="translate(504.22 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(504.01 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(519.2 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(532.23 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="497.89" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="712.07 63 656.8 63 656.8 33.84 712.07 33.84 712.07 63 712.07 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-4)">
                                    <polygon points="712.07 63 656.8 63 656.8 33.84 712.07 33.84 712.07 63 712.07 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="708.89 49.41 660.25 49.41 660.25 36.35 708.89 36.35 708.89 49.41 708.89 49.41"
                                    fill="#006174" /><text transform="translate(662.72 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(662.51 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(677.7 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(690.73 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="656.39" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="870.37 63 815.1 63 815.1 33.84 870.37 33.84 870.37 63 870.37 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-5)">
                                    <polygon points="870.37 63 815.1 63 815.1 33.84 870.37 33.84 870.37 63 870.37 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="867.19 49.41 818.55 49.41 818.55 36.35 867.19 36.35 867.19 49.41 867.19 49.41"
                                    fill="#006174" /><text transform="translate(821.02 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(820.81 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(836 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(849.03 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="814.69" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="1028.87 63 973.6 63 973.6 33.84 1028.87 33.84 1028.87 63 1028.87 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-6)">
                                    <polygon points="1028.87 63 973.6 63 973.6 33.84 1028.87 33.84 1028.87 63 1028.87 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="1025.69 49.41 977.05 49.41 977.05 36.35 1025.69 36.35 1025.69 49.41 1025.69 49.41"
                                    fill="#006174" /><text transform="translate(979.52 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(979.31 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(994.5 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(1007.53 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="973.19" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="1324.57 63 1269.3 63 1269.3 33.84 1324.57 33.84 1324.57 63 1324.57 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-7)">
                                    <polygon points="1324.57 63 1269.3 63 1269.3 33.84 1324.57 33.84 1324.57 63 1324.57 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="1321.39 49.41 1272.75 49.41 1272.75 36.35 1321.39 36.35 1321.39 49.41 1321.39 49.41"
                                    fill="#006174" /><text transform="translate(1275.22 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(1275.01 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(1290.2 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(1303.23 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="1268.89" y="33.62" width="56.1" height="29.6" fill="none" />
                                <polygon points="1483.07 63 1427.8 63 1427.8 33.84 1483.07 33.84 1483.07 63 1483.07 63" fill="#e5f3f8" />
                                <g clipPath="url(#clip-path-8)">
                                    <polygon points="1483.07 63 1427.8 63 1427.8 33.84 1483.07 33.84 1483.07 63 1483.07 63" fill="none"
                                        stroke="#055f87" strokeMiterlimit="10" strokeWidth="0.7" />
                                </g>
                                <polygon points="1479.89 49.41 1431.25 49.41 1431.25 36.35 1479.89 36.35 1479.89 49.41 1479.89 49.41"
                                    fill="#006174" /><text transform="translate(1433.72 46.14)" fontSize="9.63" fill="#e5f3f8"
                                        fontFamily="SiemensLogo, Siemens Logo">s</text><text transform="translate(1433.51 60.52)" fontSize="11.3"
                                            fill="#1d1d1b" fontFamily="SiemensSans-Roman, Siemens Sans">SIV</text><text
                                                transform="translate(1448.7 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                fontFamily="SiemensSans-Roman, Siemens Sans" letterSpacing="-0.02em">AC</text><text
                                                    transform="translate(1461.73 60.52)" fontSize="11.3" fill="#1d1d1b"
                                                    fontFamily="SiemensSans-Roman, Siemens Sans">ON</text>
                                <rect x="1427.39" y="33.62" width="56.1" height="29.6" fill="none" />
                            </g>
                            <g id="PAC">
                                <g clipPath="url(#clip-path-9)">
                                    <polygon
                                        points="223.96 179.72 282.26 179.72 282.26 238.66 223.96 238.66 223.96 179.72 223.96 179.72 223.96 179.72"
                                        fill="#a6c7d5" />
                                    <path d="M308.46,289.32H365.7V231.43H308.46v57.89Zm58.3,1.05H307.4v-60h59.36v60Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <polygon
                                    points="226.38 182.43 239.41 182.43 239.41 185.71 226.38 185.71 226.38 182.43 226.38 182.43 226.38 182.43"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="279.76 235.52 226.46 235.52 226.46 218.29 279.76 218.29 279.76 235.52 279.76 235.52"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <polygon
                                    points="231.92 226.29 241.06 226.29 241.06 235.43 231.92 235.43 231.92 226.29 231.92 226.29 231.92 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M316,286.46h8.83v-8.84H316v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="231.92 223.8 236.34 223.8 236.34 228.27 231.92 228.27 231.92 223.8 231.92 223.8 231.92 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M316,279.29h4.11v-4.15H316v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon
                                    points="265.17 226.29 274.31 226.29 274.31 235.43 265.17 235.43 265.17 226.29 265.17 226.29 265.17 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M349.28,286.46h8.84v-8.84h-8.84v8.84Zm9.15.31H349v-9.46h9.46v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="265.17 223.8 269.59 223.8 269.59 228.27 265.17 228.27 265.17 223.8 265.17 223.8 265.17 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M349.28,279.29h4.12v-4.15h-4.12v4.15Zm4.43.31H349v-4.78h4.74v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="242.94 226.29 252.09 226.29 252.09 235.43 242.94 235.43 242.94 226.29 242.94 226.29 242.94 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M327.06,286.46h8.84v-8.84h-8.84v8.84Zm9.15.31h-9.46v-9.46h9.46v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="242.94 223.8 247.37 223.8 247.37 228.27 242.94 228.27 242.94 223.8 242.94 223.8 242.94 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M327.06,279.29h4.12v-4.15h-4.12v4.15Zm4.43.31h-4.74v-4.78h4.74v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="254.14 226.29 263.28 226.29 263.28 235.43 254.14 235.43 254.14 226.29 254.14 226.29 254.14 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M338.26,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31H338v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="254.14 223.8 258.56 223.8 258.56 228.27 254.14 228.27 254.14 223.8 254.14 223.8 254.14 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M338.26,279.29h4.11v-4.15h-4.11v4.15Zm4.42.31H338v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="230.55 187.65 275.68 187.65 275.68 221.51 230.55 221.51 230.55 187.65 230.55 187.65 230.55 187.65"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="223.96 274.5 282.26 274.5 282.26 333.45 223.96 333.45 223.96 274.5 223.96 274.5"
                                    fill="#a6c7d5" />
                                <path d="M366.76,385.16H307.4v-60h59.36Zm-58.3-1.06H365.7V326.21H308.46Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="226.38 277.21 239.41 277.21 239.41 280.49 226.38 280.49 226.38 277.21 226.38 277.21"
                                    fill="#055f87" fillRule="evenodd" />
                                <rect x="226.46" y="313.08" width="53.3" height="17.23" fill="#d9e7ed" />
                                <polygon points="231.92 321.07 241.06 321.07 241.06 330.22 231.92 330.22 231.92 321.07 231.92 321.07"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M325.18,381.55h-9.45V372.1h9.45Zm-9.14-.31h8.83v-8.83H316Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="231.92 318.59 236.34 318.59 236.34 323.06 231.92 323.06 231.92 318.59 231.92 318.59"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M320.46,374.39h-4.73v-4.78h4.73Zm-4.42-.31h4.11v-4.16H316Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="265.17 321.07 274.31 321.07 274.31 330.22 265.17 330.22 265.17 321.07 265.17 321.07"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M358.43,381.55H349V372.1h9.46Zm-9.15-.31h8.84v-8.83h-8.84Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="265.17 318.59 269.59 318.59 269.59 323.06 265.17 323.06 265.17 318.59 265.17 318.59"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M353.71,374.39H349v-4.78h4.74Zm-4.43-.31h4.12v-4.16h-4.12Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="242.94 321.07 252.09 321.07 252.09 330.22 242.94 330.22 242.94 321.07 242.94 321.07"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M336.21,381.55h-9.46V372.1h9.46Zm-9.15-.31h8.84v-8.83h-8.84Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="242.94 318.59 247.37 318.59 247.37 323.06 242.94 323.06 242.94 318.59 242.94 318.59"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M331.49,374.39h-4.74v-4.78h4.74Zm-4.43-.31h4.12v-4.16h-4.12Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="254.14 321.07 263.28 321.07 263.28 330.22 254.14 330.22 254.14 321.07 254.14 321.07"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M347.4,381.55H338V372.1h9.45Zm-9.14-.31h8.83v-8.83h-8.83Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="254.14 318.59 258.56 318.59 258.56 323.06 254.14 323.06 254.14 318.59 254.14 318.59"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M342.68,374.39H338v-4.78h4.73Zm-4.42-.31h4.11v-4.16h-4.11Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="230.55 282.43 275.68 282.43 275.68 316.29 230.55 316.29 230.55 282.43 230.55 282.43"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <g clipPath="url(#clip-path-10)">
                                    <polygon
                                        points="496.79 179.72 555.09 179.72 555.09 238.66 496.79 238.66 496.79 179.72 496.79 179.72 496.79 179.72"
                                        fill="#a6c7d5" />
                                    <path d="M581.28,289.32h57.24V231.43H581.28v57.89Zm58.3,1.05H580.22v-60h59.36v60Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <polygon
                                    points="499.21 182.43 512.23 182.43 512.23 185.71 499.21 185.71 499.21 182.43 499.21 182.43 499.21 182.43"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="552.59 235.52 499.28 235.52 499.28 218.29 552.59 218.29 552.59 235.52 552.59 235.52"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <polygon
                                    points="504.74 226.29 513.88 226.29 513.88 235.43 504.74 235.43 504.74 226.29 504.74 226.29 504.74 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M588.86,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46H598v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="504.74 223.8 509.16 223.8 509.16 228.27 504.74 228.27 504.74 223.8 504.74 223.8 504.74 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M588.86,279.29H593v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="537.99 226.29 547.13 226.29 547.13 235.43 537.99 235.43 537.99 226.29 537.99 226.29 537.99 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M622.11,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31H621.8v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="537.99 223.8 542.41 223.8 542.41 228.27 537.99 228.27 537.99 223.8 537.99 223.8 537.99 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M622.11,279.29h4.11v-4.15h-4.11v4.15Zm4.42.31H621.8v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="515.77 226.29 524.91 226.29 524.91 235.43 515.77 235.43 515.77 226.29 515.77 226.29 515.77 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M599.89,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46H609v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="515.77 223.8 520.19 223.8 520.19 228.27 515.77 228.27 515.77 223.8 515.77 223.8 515.77 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M599.89,279.29H604v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="526.96 226.29 536.1 226.29 536.1 235.43 526.96 235.43 526.96 226.29 526.96 226.29 526.96 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M611.08,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="526.96 223.8 531.38 223.8 531.38 228.27 526.96 228.27 526.96 223.8 526.96 223.8 526.96 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M611.08,279.29h4.11v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="503.37 187.65 548.5 187.65 548.5 221.51 503.37 221.51 503.37 187.65 503.37 187.65 503.37 187.65"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <g clipPath="url(#clip-path-11)">
                                    <polygon
                                        points="813.59 179.72 871.89 179.72 871.89 238.66 813.59 238.66 813.59 179.72 813.59 179.72 813.59 179.72"
                                        fill="#a6c7d5" />
                                    <path d="M898.08,289.32h57.24V231.43H898.08v57.89Zm58.3,1.05H897v-60h59.36v60Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <polygon
                                    points="816.01 182.43 829.03 182.43 829.03 185.71 816.01 185.71 816.01 182.43 816.01 182.43 816.01 182.43"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="869.38 235.52 816.08 235.52 816.08 218.29 869.38 218.29 869.38 235.52 869.38 235.52"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <polygon
                                    points="821.54 226.29 830.68 226.29 830.68 235.43 821.54 235.43 821.54 226.29 821.54 226.29 821.54 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M905.66,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="821.54 223.8 825.96 223.8 825.96 228.27 821.54 228.27 821.54 223.8 821.54 223.8 821.54 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M905.66,279.29h4.11v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="854.79 226.29 863.93 226.29 863.93 235.43 854.79 235.43 854.79 226.29 854.79 226.29 854.79 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M938.91,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31H938.6v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="854.79 223.8 859.21 223.8 859.21 228.27 854.79 228.27 854.79 223.8 854.79 223.8 854.79 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M938.91,279.29H943v-4.15h-4.11v4.15Zm4.42.31H938.6v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="832.57 226.29 841.71 226.29 841.71 235.43 832.57 235.43 832.57 226.29 832.57 226.29 832.57 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M916.69,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="832.57 223.8 836.99 223.8 836.99 228.27 832.57 228.27 832.57 223.8 832.57 223.8 832.57 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M916.69,279.29h4.11v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="843.76 226.29 852.9 226.29 852.9 235.43 843.76 235.43 843.76 226.29 843.76 226.29 843.76 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M927.88,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46H937v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="843.76 223.8 848.18 223.8 848.18 228.27 843.76 228.27 843.76 223.8 843.76 223.8 843.76 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M927.88,279.29H932v-4.15h-4.11v4.15Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="820.17 187.65 865.3 187.65 865.3 221.51 820.17 221.51 820.17 187.65 820.17 187.65 820.17 187.65"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <g clipPath="url(#clip-path-12)">
                                    <polygon
                                        points="1578.49 179.72 1636.79 179.72 1636.79 238.66 1578.49 238.66 1578.49 179.72 1578.49 179.72 1578.49 179.72"
                                        fill="#a6c7d5" />
                                    <path d="M1663,289.32h57.24V231.43H1663v57.89Zm58.3,1.05h-59.36v-60h59.36v60Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <polygon
                                    points="1580.91 182.43 1593.93 182.43 1593.93 185.71 1580.91 185.71 1580.91 182.43 1580.91 182.43 1580.91 182.43"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="1634.29 235.52 1580.98 235.52 1580.98 218.29 1634.29 218.29 1634.29 235.52 1634.29 235.52"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <polygon
                                    points="1586.44 226.29 1595.59 226.29 1595.59 235.43 1586.44 235.43 1586.44 226.29 1586.44 226.29 1586.44 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1670.56,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1586.44 223.8 1590.86 223.8 1590.86 228.27 1586.44 228.27 1586.44 223.8 1586.44 223.8 1586.44 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1670.56,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78H1675v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1619.69 226.29 1628.83 226.29 1628.83 235.43 1619.69 235.43 1619.69 226.29 1619.69 226.29 1619.69 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1703.81,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46H1713v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1619.69 223.8 1624.11 223.8 1624.11 228.27 1619.69 228.27 1619.69 223.8 1619.69 223.8 1619.69 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1703.81,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1597.47 226.29 1606.61 226.29 1606.61 235.43 1597.47 235.43 1597.47 226.29 1597.47 226.29 1597.47 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1681.59,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1597.47 223.8 1601.89 223.8 1601.89 228.27 1597.47 228.27 1597.47 223.8 1597.47 223.8 1597.47 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1681.59,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78H1686v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1608.66 226.29 1617.8 226.29 1617.8 235.43 1608.66 235.43 1608.66 226.29 1608.66 226.29 1608.66 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1692.78,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1608.66 223.8 1613.08 223.8 1613.08 228.27 1608.66 228.27 1608.66 223.8 1608.66 223.8 1608.66 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1692.78,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1585.07 187.65 1630.2 187.65 1630.2 221.5 1585.07 221.5 1585.07 187.65 1585.07 187.65 1585.07 187.65"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <g clipPath="url(#clip-path-13)">
                                    <polygon
                                        points="1426.29 179.72 1484.59 179.72 1484.59 238.66 1426.29 238.66 1426.29 179.72 1426.29 179.72 1426.29 179.72"
                                        fill="#a6c7d5" />
                                    <path d="M1510.78,289.32H1568V231.43h-57.24v57.89Zm58.3,1.05h-59.36v-60h59.36v60Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <polygon
                                    points="1428.71 182.43 1441.73 182.43 1441.73 185.71 1428.71 185.71 1428.71 182.43 1428.71 182.43 1428.71 182.43"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="1482.09 235.52 1428.78 235.52 1428.78 218.29 1482.09 218.29 1482.09 235.52 1482.09 235.52"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <polygon
                                    points="1434.24 226.29 1443.38 226.29 1443.38 235.43 1434.24 235.43 1434.24 226.29 1434.24 226.29 1434.24 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1518.36,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1434.24 223.8 1438.66 223.8 1438.66 228.27 1434.24 228.27 1434.24 223.8 1434.24 223.8 1434.24 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1518.36,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1467.49 226.29 1476.63 226.29 1476.63 235.43 1467.49 235.43 1467.49 226.29 1467.49 226.29 1467.49 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1551.61,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1467.49 223.8 1471.91 223.8 1471.91 228.27 1467.49 228.27 1467.49 223.8 1467.49 223.8 1467.49 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1551.61,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78H1556v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1445.27 226.29 1454.41 226.29 1454.41 235.43 1445.27 235.43 1445.27 226.29 1445.27 226.29 1445.27 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1529.39,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1445.27 223.8 1449.69 223.8 1449.69 228.27 1445.27 228.27 1445.27 223.8 1445.27 223.8 1445.27 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1529.39,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78h4.73v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1456.46 226.29 1465.6 226.29 1465.6 235.43 1456.46 235.43 1456.46 226.29 1456.46 226.29 1456.46 226.29"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1540.58,286.46h8.83v-8.84h-8.83v8.84Zm9.14.31h-9.45v-9.46h9.45v9.46Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1456.46 223.8 1460.88 223.8 1460.88 228.27 1456.46 228.27 1456.46 223.8 1456.46 223.8 1456.46 223.8"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1540.58,279.29h4.11v-4.16h-4.11v4.16Zm4.42.31h-4.73v-4.78H1545v4.78Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1432.87 187.65 1478 187.65 1478 221.5 1432.87 221.5 1432.87 187.65 1432.87 187.65 1432.87 187.65"
                                    fill="#e5f3f8" fillRule="evenodd" />
                            </g>
                            <g id="HMI">
                                <path
                                    d="M850.23,347.42a.92.92,0,0,1-.92.92H687.49a.92.92,0,0,1-.92-.92V231.48a.92.92,0,0,1,.92-.92H849.31a.92.92,0,0,1,.92.92V347.42Z"
                                    transform="translate(-83.96 -51.18)" fill="#d9e7ed" />
                                <path
                                    d="M687.49,230.74a.74.74,0,0,0-.73.74V347.42a.73.73,0,0,0,.73.73H849.31a.73.73,0,0,0,.73-.73V231.48a.74.74,0,0,0-.73-.74ZM849.31,348.52H687.49a1.1,1.1,0,0,1-1.1-1.1V231.48a1.11,1.11,0,0,1,1.1-1.11H849.31a1.11,1.11,0,0,1,1.1,1.11V347.42a1.1,1.1,0,0,1-1.1,1.1Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="755.42 286.12 613.27 286.12 613.27 179.54 755.42 179.54 755.42 286.12 755.42 286.12"
                                    fill="#a6c7d5" />
                                <polygon points="755.6 286.12 613.27 286.12 613.27 281.17 755.6 281.17 755.6 286.12 755.6 286.12"
                                    fill="#055f87" />
                                <polygon points="618.75 183.84 618.75 186.13 627.35 186.13 627.35 183.84 618.75 183.84 618.75 183.84"
                                    fill="#055f87" />
                                <path
                                    d="M833.24,325.65a.39.39,0,0,1-.41.37H704a.39.39,0,0,1-.41-.37V253.24a.39.39,0,0,1,.41-.37H832.83a.39.39,0,0,1,.41.37v72.41Z"
                                    transform="translate(-83.96 -51.18)" fill="#e5f3f8" fillRule="evenodd" />
                                <path
                                    d="M687.49,230.74a.74.74,0,0,0-.73.74V347.42a.73.73,0,0,0,.73.73H849.31a.73.73,0,0,0,.73-.73V231.48a.74.74,0,0,0-.73-.74ZM849.31,348.52H687.49a1.1,1.1,0,0,1-1.1-1.1V231.48a1.11,1.11,0,0,1,1.1-1.11H849.31a1.11,1.11,0,0,1,1.1,1.11V347.42a1.1,1.1,0,0,1-1.1,1.1Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="615.95 285.29 614.23 285.29 614.23 282 615.92 282 615.92 282.36 614.64 282.36 614.64 283.42 615.83 283.42 615.83 283.79 614.64 283.79 614.64 284.93 615.95 284.93 615.95 285.29 615.95 285.29"
                                    fill="#d9e7ed" />
                                <polygon
                                    points="617.79 283.59 618.77 285.29 618.26 285.29 617.5 283.88 616.77 285.29 616.32 285.29 617.27 283.59 616.37 282 616.85 282 617.53 283.27 618.21 282 618.67 282 617.79 283.59 617.79 283.59"
                                    fill="#d9e7ed" />
                            </g>
                            <g id="Etykiety"><text transform="translate(380.27 400.68)" fontSize="22" fill="#055f87"
                                fontFamily="ArialMT, Arial">S2P3.1</text><text transform="translate(517.27 400.68)" fontSize="22"
                                    fill="#055f87" fontFamily="ArialMT, Arial">S2P1.1</text><text transform="translate(697.27 400.68)"
                                        fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S0P0.1</text><text
                                            transform="translate(833.87 400.68)" fontSize="22" fill="#055f87"
                                            fontFamily="ArialMT, Arial">S1P1.1</text><text transform="translate(106.27 158.07)" fontSize="22"
                                                fill="#055f87" fontFamily="ArialMT, Arial">S2P2.1</text><text transform="translate(106.27 237.78)"
                                                    fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S2P2.2</text><text
                                                        transform="translate(106.27 319.81)" fontSize="22" fill="#055f87"
                                                        fontFamily="ArialMT, Arial">S2P2.3</text><text transform="translate(106.27 400.68)" fontSize="22"
                                                            fill="#055f87" fontFamily="ArialMT, Arial">S2P2.4</text><text transform="translate(106.27 481.55)"
                                                                fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S2P2.5</text><text
                                                                    transform="translate(94.03 885.08)" fontSize="22" fill="#055f87"
                                                                    fontFamily="ArialMT, Arial">S2P2.10</text><text transform="translate(1288.27 400.68)" fontSize="22"
                                                                        fill="#055f87" fontFamily="ArialMT, Arial">S1P3.1</text><text transform="translate(1468.27 562.42)"
                                                                            fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S1P4.3</text><text
                                                                                transform="translate(1468.27 643.29)" fontSize="22" fill="#055f87"
                                                                                fontFamily="ArialMT, Arial">S1P4.4</text><text transform="translate(1013.87 158.07)" fontSize="22"
                                                                                    fill="#055f87" fontFamily="ArialMT, Arial">S1P2.1</text><text transform="translate(1014.27 238.44)"
                                                                                        fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S1P2.2</text><text
                                                                                            transform="translate(1014.27 319.81)" fontSize="22" fill="#055f87"
                                                                                            fontFamily="ArialMT, Arial">S1P2.3</text><text transform="translate(1014.27 400.68)" fontSize="22"
                                                                                                fill="#055f87" fontFamily="ArialMT, Arial">S1P2.4</text><text transform="translate(1014.27 481.55)"
                                                                                                    fontSize="22" fill="#055f87" fontFamily="ArialMT, Arial">S1P2.5</text><text
                                                                                                        transform="translate(1014.27 562.42)" fontSize="22" fill="#055f87"
                                                                                                        fontFamily="ArialMT, Arial">S1P2.6</text><text transform="translate(1002.03 885.9)" fontSize="22"
                                                                                                            fill="#055f87" fontFamily="ArialMT, Arial">S1P2.10</text><text transform="translate(54.3 990.43)"
                                                                                                                fontSize="32" fill="#055f87" fontFamily="ArialMT, Arial">S2P2</text><text
                                                                                                                    transform="translate(349.8 990.43)" fontSize="32" fill="#055f87"
                                                                                                                    fontFamily="ArialMT, Arial">S2P3</text><text transform="translate(486.8 990.43)" fontSize="32"
                                                                                                                        fill="#055f87" fontFamily="ArialMT, Arial">S2P1</text><text transform="translate(645.1 990.43)"
                                                                                                                            fontSize="32" fill="#055f87" fontFamily="ArialMT, Arial">S0P0</text><text
                                                                                                                                transform="translate(803.8 990.43)" fontSize="32" fill="#055f87"
                                                                                                                                fontFamily="ArialMT, Arial">S1P1</text><text transform="translate(962.1 990.43)" fontSize="32"
                                                                                                                                    fill="#055f87" fontFamily="ArialMT, Arial">S1P2</text><text transform="translate(1257.8 987.03)"
                                                                                                                                        fontSize="32" fill="#055f87" fontFamily="ArialMT, Arial">S1P3</text><text
                                                                                                                                            transform="translate(1416.3 987.03)" fontSize="32" fill="#055f87"
                                                                                                                                            fontFamily="ArialMT, Arial">S1P4</text><text transform="translate(644.74 836.48)" fontSize="40"
                                                                                                                                                fill="#055f87" fontFamily="ArialMT, Arial">SZR</text></g>
                            <g id="S1P4.3_rotary">
                                <path d="M1504.8,599.24h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1460.76,649.05h49.52V599.52h-49.52v49.53Zm50.09.57h-50.66V599h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1425.3 596.85 1425.3 549.36 1377.81 549.36 1377.81 596.85 1379.91 596.85 1425.3 596.85 1425.3 596.85"
                                    fill="#a6c7d5" />
                                <path d="M1461.85,648h47.33V600.62h-47.33V648Zm47.49.15H1461.7V600.46h47.64V648.1Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1480.9,617.11v26.75h9.23V617.11Zm-.15,27.32-.42,0V616.53h10.37v27.86l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1480.9,643.85h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7Zm9.8.58h-10.37V637.2l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1396.93 565.64 1396.36 565.64 1396.36 560.48 1396.93 560.48 1396.93 565.64 1396.93 565.64"
                                    fill="#055f87" />
                                <polygon points="1406.74 565.64 1406.17 565.64 1406.17 560.48 1406.74 560.48 1406.74 565.64 1406.74 565.64"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P4.3_rotary_status" className={this.manageSwitchesClassName('cb_3F1')}><text transform="translate(1433.04 598.59)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_3F1')}</text></g>
                            <g id="S1P4.4_rotary">
                                <path d="M1504.8,680.11h5.77V730.2h-50.1V680.11h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1460.76,729.92h49.52V680.39h-49.52v49.53Zm50.09.57h-50.66V679.82h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1425.3 677.72 1425.3 630.23 1377.81 630.23 1377.81 677.72 1379.91 677.72 1425.3 677.72 1425.3 677.72"
                                    fill="#a6c7d5" />
                                <path d="M1461.85,728.82h47.33V681.49h-47.33v47.33Zm47.49.15H1461.7V681.33h47.64V729Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1480.9,698v26.75h9.23V698Zm-.15,27.32-.42,0V697.4h10.37v27.86l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1480.9,724.72h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7Zm9.8.58h-10.37v-7.23l-.4-.17a13.87,13.87,0,0,1-.09-25.36,13.39,13.39,0,0,1,1.39-.54,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1396.93 646.51 1396.36 646.51 1396.36 641.35 1396.93 641.35 1396.93 646.51 1396.93 646.51"
                                    fill="#055f87" />
                                <polygon points="1406.74 646.51 1406.17 646.51 1406.17 641.35 1406.74 641.35 1406.74 646.51 1406.74 646.51"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P4.4_rotary_status" className={this.manageSwitchesClassName('cb_3F2')}><text transform="translate(1433.04 680.39)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_3F2')}</text></g>
                            <g id="S2P2.1_rotary">
                                <path d="M144.41,195.15h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,245h49.52V195.43H100.37V245Zm50.1.57H99.8V194.86h50.67v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 192.76 64.91 145.27 17.43 145.27 17.43 192.76 19.52 192.76 64.91 192.76 64.91 192.76"
                                    fill="#a6c7d5" />
                                <path d="M101.47,243.86H148.8V196.53H101.47v47.33ZM149,244H101.32V196.38H149V244Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,213v26.75h9.24V213Zm-.15,27.32-.42,0V212.45h10.38V240.3l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,239.77h9.24v-7.05l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7.05Zm9.81.57H119.94v-7.23l-.39-.17a13.86,13.86,0,0,1-.1-25.35,12.18,12.18,0,0,1,1.39-.55,14.12,14.12,0,0,1,8.58,0,12.72,12.72,0,0,1,1.33.52,13.87,13.87,0,0,1,0,25.38h0l-.39.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 161.55 35.98 161.55 35.98 156.39 36.55 156.39 36.55 161.55 36.55 161.55"
                                    fill="#055f87" />
                                <polygon points="46.35 161.55 45.78 161.55 45.78 156.39 46.35 156.39 46.35 161.55 46.35 161.55"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P2.1_rotary_status" className={this.manageSwitchesClassName('cb_2F1')}><text transform="translate(71.04 194.46)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F1')}</text></g>
                            <g id="S2P2.2_rotary">
                                <path d="M144.41,275.76h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,325.57h49.52V276H100.37v49.53Zm50.1.57H99.8V275.47h50.67v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 273.37 64.91 225.88 17.43 225.88 17.43 273.37 19.52 273.37 64.91 273.37 64.91 273.37"
                                    fill="#a6c7d5" />
                                <path d="M101.47,324.47H148.8V277.14H101.47v47.33Zm47.48.15H101.32V277H149v47.63Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,293.63v26.75h9.24V293.63ZM120.36,321l-.42,0V293.06h10.38v27.85l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,320.38h9.24v-7.05l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7.05Zm9.81.57H119.94v-7.23l-.39-.17a13.86,13.86,0,0,1-.1-25.35,12.18,12.18,0,0,1,1.39-.55,14.12,14.12,0,0,1,8.58,0,12.72,12.72,0,0,1,1.33.52,13.87,13.87,0,0,1,0,25.38h0l-.39.17V321Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 242.16 35.98 242.16 35.98 237 36.55 237 36.55 242.16 36.55 242.16" fill="#055f87" />
                                <polygon points="46.35 242.16 45.78 242.16 45.78 237 46.35 237 46.35 242.16 46.35 242.16" fill="#055f87" />
                            </g>
                            <g id="S2P2.2_rotary_status" className={this.manageSwitchesClassName('cb_2F2')}><text transform="translate(71.04 275.18)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F2')}</text></g>
                            <g id="S2P2.3_rotary">
                                <path d="M144.41,356.68h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,406.49h49.52V357H100.37v49.52Zm50.1.58H99.8V356.39h50.67v50.68Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 354.29 64.91 306.81 17.43 306.81 17.43 354.29 19.52 354.29 64.91 354.29 64.91 354.29"
                                    fill="#a6c7d5" />
                                <path d="M101.47,405.39H148.8V358.06H101.47v47.33Zm47.48.16H101.32V357.91H149v47.64Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,374.55V401.3h9.24V374.55Zm-.15,27.32-.42,0V374h10.38v27.85l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,401.3h9.24v-7.05l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7.05Zm9.81.57H119.94v-7.23l-.39-.16a13.87,13.87,0,0,1-.1-25.36,12.14,12.14,0,0,1,1.39-.54,14,14,0,0,1,8.58,0,12.74,12.74,0,0,1,1.33.51,13.88,13.88,0,0,1,0,25.39h0l-.39.16v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 323.09 35.98 323.09 35.98 317.92 36.55 317.92 36.55 323.09 36.55 323.09"
                                    fill="#055f87" />
                                <polygon points="46.35 323.09 45.78 323.09 45.78 317.92 46.35 317.92 46.35 323.09 46.35 323.09"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P2.3_rotary_status" className={this.manageSwitchesClassName('cb_2F4')}><text transform="translate(71.04 356.04)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F4')}</text></g>
                            <g id="S2P2.4_rotary">
                                <path d="M144.41,437.55h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,487.36h49.52V437.84H100.37v49.52Zm50.1.58H99.8V437.26h50.67v50.68Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 435.16 64.91 387.68 17.43 387.68 17.43 435.16 19.52 435.16 64.91 435.16 64.91 435.16"
                                    fill="#a6c7d5" />
                                <path d="M101.47,486.26H148.8V438.93H101.47v47.33Zm47.48.16H101.32V438.78H149v47.64Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,455.42v26.75h9.24V455.42Zm-.15,27.32-.42,0V454.85h10.38V482.7l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,482.17h9.24v-7.05l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7.05Zm9.81.57H119.94v-7.23l-.39-.16a13.87,13.87,0,0,1-.1-25.36,10.54,10.54,0,0,1,1.39-.54,14,14,0,0,1,8.58,0,10.84,10.84,0,0,1,1.33.51,13.88,13.88,0,0,1,0,25.39h0l-.39.16v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 403.96 35.98 403.96 35.98 398.79 36.55 398.79 36.55 403.96 36.55 403.96"
                                    fill="#055f87" />
                                <polygon points="46.35 403.96 45.78 403.96 45.78 398.79 46.35 398.79 46.35 403.96 46.35 403.96"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P2.4_rotary_status" className={this.manageSwitchesClassName('cb_2F5')}><text transform="translate(71.04 436.91)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F5')}</text></g>
                            <g id="S2P2.5_rotary">
                                <path d="M144.41,518.42h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,568.23h49.52V518.71H100.37v49.52Zm50.1.58H99.8V518.13h50.67v50.68Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 516.03 64.91 468.55 17.43 468.55 17.43 516.03 19.52 516.03 64.91 516.03 64.91 516.03"
                                    fill="#a6c7d5" />
                                <path d="M101.47,567.13H148.8V519.8H101.47v47.33Zm47.48.16H101.32V519.65H149v47.64Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,536.29V563h9.24V536.29Zm-.15,27.32-.42,0V535.72h10.38v27.85l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,563h9.24v-7l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7Zm9.81.57H119.94v-7.23l-.39-.16a13.87,13.87,0,0,1-.1-25.36,10.54,10.54,0,0,1,1.39-.54,14,14,0,0,1,8.58,0,10.84,10.84,0,0,1,1.33.51,13.88,13.88,0,0,1,0,25.39h0l-.39.16v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 484.83 35.98 484.83 35.98 479.66 36.55 479.66 36.55 484.83 36.55 484.83"
                                    fill="#055f87" />
                                <polygon points="46.35 484.83 45.78 484.83 45.78 479.66 46.35 479.66 46.35 484.83 46.35 484.83"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P2.5_rotary_status" className={this.manageSwitchesClassName('cb_2F6')}><text transform="translate(71.04 517.78)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F6')}</text></g>
                            <g id="S2P2.10_rotary">
                                <path d="M144.41,922.77h5.77v50.1H100.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M100.37,972.58h49.52V923.06H100.37v49.52Zm50.1.57H99.8V922.48h50.67v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="64.91 920.38 64.91 872.89 17.43 872.89 17.43 920.38 19.52 920.38 64.91 920.38 64.91 920.38"
                                    fill="#a6c7d5" />
                                <path d="M101.47,971.48H148.8V924.15H101.47v47.33Zm47.48.15H101.32V924H149v47.63Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M120.51,940.64v26.75h9.24V940.64ZM120.36,968l-.42,0V940.07h10.38v27.85l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M120.51,967.39h9.24v-7l.18-.07.55-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.13,11.13,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.18.07v7Zm9.81.57H119.94v-7.23l-.39-.16a13.87,13.87,0,0,1-.1-25.36,10.54,10.54,0,0,1,1.39-.54,14,14,0,0,1,8.58,0,12.72,12.72,0,0,1,1.33.52,13.87,13.87,0,0,1,0,25.38h0l-.39.16V968Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="36.55 889.17 35.98 889.17 35.98 884.01 36.55 884.01 36.55 889.17 36.55 889.17"
                                    fill="#055f87" />
                                <polygon points="46.35 889.17 45.78 889.17 45.78 884.01 46.35 884.01 46.35 889.17 46.35 889.17"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P2.10_rotary_status" className='closed'><text transform="translate(71.04 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{t('elevationClosedLong')}</text></g>
                            <g id="S1P2.1_rotary">
                                <path d="M1051.1,195.15h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,245h49.52V195.43h-49.52V245Zm50.09.57h-50.66V194.86h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 192.76 971.6 145.27 924.11 145.27 924.11 192.76 926.21 192.76 971.6 192.76 971.6 192.76"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,243.86h47.33V196.53h-47.33v47.33Zm47.49.15H1008V196.38h47.64V244Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,213v26.75h9.23V213Zm-.15,27.32-.42,0V212.45H1037V240.3l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,239.77h9.23v-7.05l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7.05Zm9.8.57h-10.37v-7.23l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 161.55 942.66 161.55 942.66 156.39 943.24 156.39 943.24 161.55 943.24 161.55"
                                    fill="#055f87" />
                                <polygon points="953.04 161.55 952.47 161.55 952.47 156.39 953.04 156.39 953.04 161.55 953.04 161.55"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.1_rotary_status" className={this.manageSwitchesClassName('cb_1F2')}><text transform="translate(979.04 194.5)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F2')}</text></g>
                            <g id="S1P2.2_rotary">
                                <path d="M1051.1,275.31h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,325.12h49.52V275.6h-49.52v49.52Zm50.09.58h-50.66V275h50.66V325.7Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 272.92 971.6 225.44 924.11 225.44 924.11 272.92 926.21 272.92 971.6 272.92 971.6 272.92"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,324h47.33V276.69h-47.33V324Zm47.49.16H1008V276.54h47.64v47.64Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,293.18v26.75h9.23V293.18Zm-.15,27.32-.42,0V292.61H1037v27.85l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,319.93h9.23v-7.05l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7.05Zm9.8.57h-10.37v-7.23l-.4-.16a13.87,13.87,0,0,1-.09-25.36,11.46,11.46,0,0,1,1.39-.54,13.94,13.94,0,0,1,8.57,0,12.94,12.94,0,0,1,1.34.51,13.88,13.88,0,0,1,0,25.39h0l-.4.16v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 241.72 942.66 241.72 942.66 236.55 943.24 236.55 943.24 241.72 943.24 241.72"
                                    fill="#055f87" />
                                <polygon points="953.04 241.72 952.47 241.72 952.47 236.55 953.04 236.55 953.04 241.72 953.04 241.72"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.2_rotary_status" className={this.manageSwitchesClassName('cb_1F3')}><text transform="translate(979.04 275.33)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F3')}</text></g>
                            <g id="S1P2.3_rotary">
                                <path d="M1051.1,356.35h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,406.16h49.52V356.63h-49.52v49.53Zm50.09.57h-50.66V356.06h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 353.96 971.6 306.47 924.11 306.47 924.11 353.96 926.21 353.96 971.6 353.96 971.6 353.96"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,405.06h47.33V357.73h-47.33v47.33Zm47.49.15H1008V357.58h47.64v47.63Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,374.22V401h9.23V374.22Zm-.15,27.32-.42,0V373.65H1037V401.5l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,401h9.23v-7.05l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07V401Zm9.8.57h-10.37v-7.23l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 322.75 942.66 322.75 942.66 317.59 943.24 317.59 943.24 322.75 943.24 322.75"
                                    fill="#055f87" />
                                <polygon points="953.04 322.75 952.47 322.75 952.47 317.59 953.04 317.59 953.04 322.75 953.04 322.75"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.3_rotary_status" className={this.manageSwitchesClassName('cb_1F4')}><text transform="translate(979.04 356.2)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F4')}</text></g>
                            <g id="S1P2.4_rotary">
                                <path d="M1051.1,437.5h5.77v50.1h-50.1V437.5h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,487.31h49.52V437.78h-49.52v49.53Zm50.09.57h-50.66V437.21h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 435.11 971.6 387.62 924.11 387.62 924.11 435.11 926.21 435.11 971.6 435.11 971.6 435.11"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,486.21h47.33V438.88h-47.33v47.33Zm47.49.15H1008V438.73h47.64v47.63Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,455.37v26.75h9.23V455.37Zm-.15,27.32-.42,0V454.8H1037v27.85l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,482.11h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7Zm9.8.58h-10.37v-7.23l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 403.9 942.66 403.9 942.66 398.74 943.24 398.74 943.24 403.9 943.24 403.9"
                                    fill="#055f87" />
                                <polygon points="953.04 403.9 952.47 403.9 952.47 398.74 953.04 398.74 953.04 403.9 953.04 403.9"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.4_rotary_status" className={this.manageSwitchesClassName('cb_1F5')}><text transform="translate(979.04 437.06)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F5')}</text></g>
                            <g id="S1P2.5_rotary">
                                <path d="M1051.1,518.37h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,568.18h49.52V518.65h-49.52v49.53Zm50.09.57h-50.66V518.08h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 515.98 971.6 468.49 924.11 468.49 924.11 515.98 926.21 515.98 971.6 515.98 971.6 515.98"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,567.08h47.33V519.75h-47.33v47.33Zm47.49.15H1008V519.59h47.64v47.64Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,536.24V563h9.23V536.24Zm-.15,27.32-.42,0V535.67H1037v27.85l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,563h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7Zm9.8.58h-10.37v-7.23l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 484.77 942.66 484.77 942.66 479.61 943.24 479.61 943.24 484.77 943.24 484.77"
                                    fill="#055f87" />
                                <polygon points="953.04 484.77 952.47 484.77 952.47 479.61 953.04 479.61 953.04 484.77 953.04 484.77"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.5_rotary_status" className={this.manageSwitchesClassName('cb_1F6')}><text transform="translate(978.64 517.93)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F6')}</text></g>
                            <g id="S1P2.6_rotary">
                                <path d="M1051.1,599.24h5.77v50.1h-50.1v-50.1h44.33Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1007.06,649.05h49.52V599.52h-49.52v49.53Zm50.09.57h-50.66V599h50.66v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="971.6 596.85 971.6 549.36 924.11 549.36 924.11 596.85 926.21 596.85 971.6 596.85 971.6 596.85"
                                    fill="#a6c7d5" />
                                <path d="M1008.15,648h47.33V600.62h-47.33V648Zm47.49.15H1008V600.46h47.64V648.1Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1027.2,617.11v26.75h9.23V617.11Zm-.15,27.32-.42,0V616.53H1037v27.86l-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1027.2,643.85h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.46,12.46,0,0,0-1.27-.49,13.45,13.45,0,0,0-8.23,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.56.23.18.07v7Zm9.8.58h-10.37V637.2l-.4-.17a13.87,13.87,0,0,1-.09-25.35,11.49,11.49,0,0,1,1.39-.55,14.09,14.09,0,0,1,8.57,0,12.92,12.92,0,0,1,1.34.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17v7.23Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="943.24 565.64 942.66 565.64 942.66 560.48 943.24 560.48 943.24 565.64 943.24 565.64"
                                    fill="#055f87" />
                                <polygon points="953.04 565.64 952.47 565.64 952.47 560.48 953.04 560.48 953.04 565.64 953.04 565.64"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.6_rotary_status" className={this.manageSwitchesClassName('cb_1F7')}><text transform="translate(978.64 598.8)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F7')}</text></g>
                            <g id="S1P2.10_rotary">
                                <path d="M1049.76,922.77h5.77v50.1h-50.09v-50.1h44.32Z" transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path d="M1005.72,972.58h49.53V923.06h-49.53v49.52Zm50.1.57h-50.67V922.48h50.67v50.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="970.26 920.38 970.26 872.89 922.78 872.89 922.78 920.38 924.87 920.38 970.26 920.38 970.26 920.38"
                                    fill="#a6c7d5" />
                                <path d="M1006.82,971.48h47.33V924.15h-47.33v47.33Zm47.48.15h-47.63V924h47.63v47.63Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1025.87,940.64v26.75h9.23V940.64Zm-.15,27.32-.43,0V940.07h10.38v27.85l-.39,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1025.87,967.39h9.23v-7l.18-.07.56-.23a13.3,13.3,0,0,0,0-24.34,12.66,12.66,0,0,0-1.28-.49,13.42,13.42,0,0,0-8.22,0,11.83,11.83,0,0,0-1.33.52,13.3,13.3,0,0,0,.09,24.31l.55.23.19.07v7Zm9.8.57h-10.38v-7.23l-.39-.17a13.87,13.87,0,0,1-.1-25.35,13,13,0,0,1,1.39-.55,14.12,14.12,0,0,1,8.58,0,12.72,12.72,0,0,1,1.33.52,13.87,13.87,0,0,1,0,25.38h0l-.4.17V968Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="941.9 889.17 941.33 889.17 941.33 884.01 941.9 884.01 941.9 889.17 941.9 889.17"
                                    fill="#055f87" />
                                <polygon points="951.71 889.17 951.13 889.17 951.13 884.01 951.71 884.01 951.71 889.17 951.71 889.17"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P2.10_rotary_status" className='static'><text transform="translate(979.04 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{t('elevationClosedLong')}</text></g>
                            <g id="S2P3.1">
                                <path d="M476.63,620.16H513.7V595H476.63v25.16Zm37.41.34H476.29V594.66H514V620.5Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-14)">
                                    <polygon points="344.41 609.44 433.46 609.44 433.46 455.91 344.41 455.91 344.41 609.44 344.41 609.44"
                                        fill="#a6c7d5" />
                                    <path d="M429,660h87.78V507.72H429V660Zm89,1.27H427.74V506.45h90.32v154.8Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M502.58,527.42l-.59.05-.44.11-.42.17-.41.23-.46.37-.29.32-.33.51-.24.56-.11.44-.05.59,0,.46.1.46.23.6.25.41.4.46.35.3.4.26.59.25.46.1.46,0,.46,0,.47-.08.45-.16.43-.21.5-.38.42-.44.26-.4.21-.43.17-.61.05-.47,0-.58-.09-.45-.22-.57-.31-.52-.39-.45-.46-.37-.54-.28-.58-.19-.59-.08Zm.09,7-.51,0-.5-.09-.5-.17-.47-.24-.43-.3-.37-.34-.32-.4-.27-.45-.15-.32-.19-.67-.06-.51,0-.65.1-.49.16-.48.32-.59.41-.51.35-.33.55-.37.46-.21.49-.14.65-.09h.16l.65,0,.49.13.47.18.44.25.51.41.43.49.34.57.23.63.1.49,0,.65-.06.51-.18.67-.23.48-.4.56-.35.37-.41.31-.46.26-.49.2-.51.12-.51.05Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M443.21,527.42l-.59.05-.44.11-.43.17-.4.23-.57.48-.45.59-.31.7-.13.58,0,.45,0,.45.15.62.26.58.36.51.32.33.37.29.42.23.6.22.62.1h.3l.46,0,.47-.11.59-.25.52-.35.34-.31.29-.36.31-.55.17-.46.09-.46,0-.46-.05-.59-.16-.58-.19-.42-.34-.5-.29-.33-.47-.37-.53-.28-.59-.19-.59-.08Zm.08,7-.5,0-.51-.09-.49-.17-.48-.24-.42-.3-.37-.34-.33-.4-.18-.29-.29-.64-.16-.68,0-.5.06-.66.12-.48.18-.47.35-.57.31-.38.35-.33.56-.37.46-.21.48-.14.65-.09h.17l.65,0,.48.13.48.18.43.25.51.41.33.36.37.55.21.46.17.64.06.65-.06.68-.13.51-.2.48-.27.45-.33.4-.37.35-.43.3-.46.24-.5.17-.68.11Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="433.46 590.53 344.41 590.53 344.41 590.19 433.46 590.19 433.46 590.53 433.46 590.53"
                                    fill="#055f87" />
                                <polygon points="389.53 566.1 389.53 549.47 350.85 549.47 350.85 566.1 389.53 566.1 389.53 566.1" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <path d="M481,616.43h6.44V610H481v6.45Zm6.78.34h-7.12v-7.13h7.12v7.13Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M481,607.94h6.44V601.5H481v6.44Zm6.78.34h-7.12v-7.12h7.12v7.12Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M443.21,622.08l-.59.06-.44.11-.43.17-.4.23-.57.47-.45.6-.31.69-.13.59,0,.44,0,.46.15.62.26.58.26.39.42.45.37.28.42.24.6.22.62.1h.3l.46,0,.47-.11.59-.25.52-.35.34-.31.29-.37.31-.55.17-.45.09-.46,0-.46-.05-.59-.16-.58-.19-.42-.34-.51-.4-.42-.36-.27-.53-.29-.59-.19-.59-.07Zm.08,7-.5,0-.51-.1-.49-.16-.48-.24-.42-.3-.37-.34-.33-.4-.34-.61-.23-.66-.09-.68v-.17l.06-.65.12-.48.18-.48.35-.57.31-.37.36-.33.55-.37.46-.21.48-.15.65-.08h.17l.65.06.48.12.48.19.43.25.51.41.33.35.37.56.21.46.17.64.06.65-.06.67-.13.52-.2.48-.27.45-.33.4-.37.34-.43.3-.46.24-.5.17-.68.12Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M489.44,607.94h6.44V601.5h-6.44v6.44Zm6.78.34H489.1v-7.12h7.12v7.12Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="416.8 558 416.8 556.04 414.85 556.04 414.85 558 416.8 558 416.8 558" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="416.8 555.2 416.8 553.25 414.85 553.25 414.85 555.2 416.8 555.2 416.8 555.2" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="416.8 552.4 416.8 550.45 414.85 550.45 414.85 552.4 416.8 552.4 416.8 552.4" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="402.18 536.01 402.18 533.32 399.49 533.32 399.49 536.01 402.18 536.01 402.18 536.01"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M483.62,587H486v-2.35h-2.35V587Zm2.69.34h-3v-3h3v3Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M502.58,622.08l-.59.06-.44.11-.42.17-.41.23-.45.37-.3.32-.33.51-.24.56-.11.44-.05.58,0,.47.1.46.23.59.25.41.4.47.35.3.4.25.59.25.46.11.46,0,.46,0,.47-.09.45-.15.43-.22.5-.37.42-.45.26-.39.21-.43.17-.62.05-.46,0-.59-.09-.44-.22-.58-.31-.51-.39-.45-.46-.37-.54-.29-.58-.19-.59-.07Zm.09,7-.51,0-.5-.1-.5-.16-.47-.24-.43-.3-.37-.34-.32-.4-.27-.45-.15-.32-.19-.68-.06-.5,0-.66.1-.49.16-.47.32-.59.41-.51.36-.33.54-.37.46-.21.49-.15.65-.08h.16l.65.06.49.12.47.19.44.25.51.41.43.49.34.56.23.64.1.49,0,.64-.06.52-.18.66-.23.48-.4.57-.35.36-.41.32-.46.26-.49.19-.51.12-.51,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="433.47 535.4 404.88 535.4 404.88 495.22 433.47 495.22 433.47 495.56 405.22 495.56 405.22 535.06 433.47 535.06 433.47 535.4 433.47 535.4"
                                    fill="#055f87" />
                                <polygon
                                    points="372.99 535.4 344.4 535.4 344.4 535.06 372.65 535.06 372.65 495.56 344.4 495.56 344.4 495.22 372.99 495.22 372.99 535.4 372.99 535.4"
                                    fill="#055f87" />
                                <path d="M489.44,616.43h6.44V610h-6.44v6.45Zm6.78.34H489.1v-7.13h7.12v7.13Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="433.47 475.12 344.4 475.12 344.4 474.78 433.47 474.78 433.47 475.12 433.47 475.12"
                                    fill="#055f87" />
                                <polygon points="433.47 484.45 344.4 484.45 344.4 484.11 433.47 484.11 433.47 484.45 433.47 484.45"
                                    fill="#055f87" />
                                <polygon points="433.47 492.93 344.4 492.93 344.4 492.59 433.47 492.59 433.47 492.93 433.47 492.93"
                                    fill="#055f87" />
                                <path d="M463.65,586.94h18.49V546H463.65v40.91Zm18.83.34H463.31V545.7h19.17v41.58Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="433.47 537.86 344.4 537.86 344.4 537.52 433.47 537.52 433.47 537.86 433.47 537.86"
                                    fill="#055f87" />
                                <polygon points="433.47 543.82 344.4 543.82 344.4 543.48 433.47 543.48 433.47 543.82 433.47 543.82"
                                    fill="#055f87" />
                                <polygon points="433.3 569.32 344.57 569.32 344.57 568.98 433.3 568.98 433.3 569.32 433.3 569.32"
                                    fill="#055f87" />
                                <polygon points="377.95 515.78 399.92 515.78 399.92 509.81 377.95 509.81 377.95 515.78 377.95 515.78"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M462.09,566.79h21.62v-5.63H462.09v5.63Zm22,.34h-22.3v-6.31h22.3v6.31Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="346.95 484.28 369 484.28 369 490.21 346.95 490.21 346.95 484.28 346.95 484.28" fill="#055f87"
                                    fillRule="evenodd" />
                                <polygon points="399.88 514.18 377.85 514.18 377.85 511.4 399.88 511.4 399.88 514.18 399.88 514.18"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M462.09,566.79h21.62v-5.63H462.09v5.63Zm22,.34h-22.3v-6.31h22.3v6.31Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="399.88 511.57 377.85 511.57 377.85 511.23 399.88 511.23 399.88 511.57 399.88 511.57"
                                    fill="#055f87" />
                                <polygon points="399.88 514.35 377.85 514.35 377.85 514.01 399.88 514.01 399.88 514.35 399.88 514.35"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P3.1_status" className={this.manageSwitchesClassName('cb_2F3')}><text transform="translate(345.04 679.67)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2F3')}</text></g>
                            <g id="S2P1.1">
                                <g clipPath="url(#clip-path-15)">
                                    <polygon points="466.71 455.55 585.16 455.55 585.16 609.8 466.71 609.8 466.71 455.55 466.71 455.55"
                                        fill="#a6c7d5" />
                                    <path d="M551,660.7h117.9V507H551V660.7Zm118.45.55h-119V506.45h119v154.8Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path d="M556.23,647.44H663.57V510.66H556.23V647.44Zm107.9.55H555.67V510.11H664.13V648Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="579.89 577.64 471.99 577.64 471.99 577.09 579.89 577.09 579.89 577.64 579.89 577.64"
                                    fill="#055f87" />
                                <path d="M591,628.27h55.8v-32H591v32Zm56.36.55H590.46v-33.1h56.91v33.1Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="563.4 577.37 562.85 577.37 562.85 459.2 563.4 459.2 563.4 577.37 563.4 577.37"
                                    fill="#055f87" />
                                <polygon points="507.05 577.37 506.5 577.37 506.5 459.2 507.05 459.2 507.05 577.37 507.05 577.37"
                                    fill="#055f87" />
                                <path
                                    d="M603.12,517.43a7.28,7.28,0,1,0,7.28,7.28,7.29,7.29,0,0,0-7.28-7.28Zm0,14.71a7.43,7.43,0,1,1,7.43-7.43,7.43,7.43,0,0,1-7.43,7.43Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M624.86,520.79a4.75,4.75,0,1,0,4.76,4.75,4.75,4.75,0,0,0-4.76-4.75Zm0,9.65a4.9,4.9,0,1,1,4.9-4.9,4.91,4.91,0,0,1-4.9,4.9Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M647.36,547.84h13.91v-35H647.36v35Zm14.06.15H647.21v-35.3h14.21V548Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="544.4 466.69 552.33 466.69 552.33 463.76 544.4 463.76 544.4 466.69 544.4 466.69"
                                    fill="#d9e7ed" />
                                <polygon points="552.78 466.69 560.72 466.69 560.72 463.76 552.78 463.76 552.78 466.69 552.78 466.69"
                                    fill="#d9e7ed" />
                                <path
                                    d="M580,631.61A5.41,5.41,0,1,0,585.4,637a5.41,5.41,0,0,0-5.41-5.41Zm0,11a5.56,5.56,0,1,1,5.56-5.56,5.57,5.57,0,0,1-5.56,5.56Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="577.38 592.84 506.77 592.84 506.77 577.37 577.38 577.37 577.38 592.84 577.38 592.84"
                                    fill="#a6c7d5" />
                                <path d="M591,643.74h70.06V628.82H591v14.92Zm70.61.55H590.46v-16h71.16v16Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M594.3,593.32h35V546.6h-35v46.72Zm35.16.14h-35.3v-47h35.3v47Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M642.63,540.56v0a5.13,5.13,0,0,0-10.25,0,5.52,5.52,0,0,0,0,.71v84.31h10.26v-85Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path
                                    d="M632.71,625.28h9.7V540.84l0-.28a4.86,4.86,0,0,0-9.71,0,4.36,4.36,0,0,0,.06.67v84.07Zm10.26.55H632.16V541.25a4.34,4.34,0,0,1-.06-.71,5.41,5.41,0,0,1,10.8-.25h0l.06.27v85.27Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M642.63,545.35v0a5.13,5.13,0,1,0-10.2.67v79.56h10.26V545.35Z" transform="translate(-83.96 -51.18)"
                                    fill="#a6c7d5" />
                                <path
                                    d="M632.71,625.28h9.7V545.63l0-.28a4.87,4.87,0,0,0-9.71,0,3.8,3.8,0,0,0,.06.63v79.32Zm10.26.55H632.16V546a3.88,3.88,0,0,1-.06-.67,5.43,5.43,0,0,1,10.8-.25h0l.06.27v80.48Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <line x1="558.73" y1="552.3" x2="548.47" y2="552.3" fill="#a6c7d5" />
                                <polygon points="558.73 552.58 548.47 552.58 548.47 552.03 558.73 552.03 558.73 552.58 558.73 552.58"
                                    fill="#055f87" />
                                <polygon points="563.32 461.66 471.99 461.66 471.99 461.51 563.32 461.51 563.32 461.66 563.32 461.66"
                                    fill="#055f87" />
                                <path d="M594.3,617.27H599v-9.76H594.3v9.76Zm4.87.15h-5V607.36h5v10.06Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="525.35 539.98 512.63 539.98 512.63 536.35 525.35 536.35 525.35 539.98 525.35 539.98"
                                    fill="#055f87" />
                                <path
                                    d="M622,566.91a4.8,4.8,0,1,0,4.79,4.79,4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,4.94,4.94,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M601.41,566.91a4.8,4.8,0,1,0,4.79,4.79,4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,4.95,4.95,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="512.99 504.18 522.04 504.18 522.04 499.65 512.99 499.65 512.99 504.18 512.99 504.18"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M597,555.28h8.91V550.9H597v4.38Zm9.06.15h-9.2v-4.67h9.2v4.67Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="566.38 559.66 576.29 559.66 576.29 564.25 566.38 564.25 566.38 559.66 566.38 559.66"
                                    fill="#a6c7d5" />
                                <path d="M650.42,615.35h9.76v-4.43h-9.76v4.43Zm9.9.15H650.27v-4.73h10.05v4.73Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="506.77 573.97 471.99 573.97 471.99 477.26 506.77 477.26 506.77 573.97 506.77 573.97"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M556.23,624.88h34.23V528.72H556.23v96.16Zm34.78.55H555.67V528.17H591v97.26Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="494.97 549.06 498.07 549.06 498.07 546.54 494.97 546.54 494.97 549.06 494.97 549.06"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M579,600.17h3v-2.38h-3v2.38Zm3.1.15h-3.25v-2.67h3.25v2.67Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="483.11 483.81 484.57 483.81 484.57 482.36 483.11 482.36 483.11 483.81 483.11 483.81"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M567.15,534.91h1.31v-1.29h-1.31v1.29Zm1.46.15H567v-1.59h1.61v1.59Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="478.34 516.63 479.8 516.63 479.8 515.19 478.34 515.19 478.34 516.63 478.34 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="480.77 516.63 482.23 516.63 482.23 515.19 480.77 515.19 480.77 516.63 480.77 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="483.2 516.63 484.66 516.63 484.66 515.19 483.2 515.19 483.2 516.63 483.2 516.63" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="485.63 516.63 487.09 516.63 487.09 515.19 485.63 515.19 485.63 516.63 485.63 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="492.02 521.2 493.48 521.2 493.48 519.76 492.02 519.76 492.02 521.2 492.02 521.2" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="492.02 527.37 493.48 527.37 493.48 525.93 492.02 525.93 492.02 527.37 492.02 527.37"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="492.02 535.68 493.48 535.68 493.48 534.24 492.02 534.24 492.02 535.68 492.02 535.68"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="492.02 543.53 493.48 543.53 493.48 542.09 492.02 542.09 492.02 543.53 492.02 543.53"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M558.22,623.09h30.24V530.51H558.22v92.58Zm30.39.14H558.08V530.36h30.53v92.87Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M564.17,614.92a1.62,1.62,0,1,1-1.62-1.61,1.62,1.62,0,0,1,1.62,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M562.55,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M573.51,614.92a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M571.9,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.68-1.69,1.69,1.69,0,0,1-1.68,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M586.08,614.92a1.62,1.62,0,1,1-1.62-1.61,1.61,1.61,0,0,1,1.62,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M584.46,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M585.79,588.76a1.61,1.61,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M584.18,587.23a1.54,1.54,0,1,0,1.54,1.53,1.54,1.54,0,0,0-1.54-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M567.3,588.76a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M565.69,587.23a1.54,1.54,0,1,0,1.53,1.53,1.54,1.54,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M567.3,580.54a1.62,1.62,0,1,1-1.61-1.61,1.62,1.62,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M565.69,579a1.54,1.54,0,1,0,1.53,1.53,1.54,1.54,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="475.61 481.09 483.14 481.09 483.14 485 475.61 485 475.61 481.09 475.61 481.09" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M559.65,536.1H567v-3.76h-7.38v3.76Zm7.53.15H559.5v-4.06h7.68v4.06Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M584.54,531.85a2.52,2.52,0,1,0,2.52,2.52,2.52,2.52,0,0,0-2.52-2.52Zm0,5.18a2.67,2.67,0,1,1,2.67-2.66,2.66,2.66,0,0,1-2.67,2.66Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M584.3,535.35h.49v-2h-.49v2Zm.63.14h-.78v-2.25h.78v2.25Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="480.99 530.15 480.88 530.04 482.56 528.48 482.66 528.59 480.99 530.15 480.99 530.15"
                                    fill="#055f87" />
                                <polygon points="480.99 538.37 480.88 538.26 482.56 536.7 482.66 536.81 480.99 538.37 480.99 538.37"
                                    fill="#055f87" />
                                <polygon points="499.48 538.37 499.38 538.26 501.06 536.7 501.15 536.81 499.48 538.37 499.48 538.37"
                                    fill="#055f87" />
                                <polygon
                                    points="502.05 566.65 477.43 566.65 477.43 570.75 481.64 570.75 481.64 573.55 484.87 573.55 484.87 570.75 494.67 570.75 494.67 573.55 497.9 573.55 497.9 570.75 502.05 570.75 502.05 566.65 502.05 566.65"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M578.71,624.66h3.09v-2.24h4.14v-4.51H561.46v4.51h4.21v2.24h3.1v-2.24h9.94v2.24Zm3.23.15h-3.38v-2.24h-9.65v2.24h-3.38v-2.24h-4.21v-4.81h24.77v4.81h-4.15v2.24Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M558.22,559.81h30.24V538.32H558.22v21.49Zm30.39.14H558.08V538.17h30.53V560Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="476 503.63 502.75 503.63 502.75 491.87 476 491.87 476 503.63 476 503.63" fill="#e5f3f8" />
                                <polygon points="480.68 506.99 482.48 506.99 482.48 505.19 480.68 505.19 480.68 506.99 480.68 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="496.27 506.99 498.07 506.99 498.07 505.19 496.27 505.19 496.27 506.99 496.27 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                            </g>
                            <g id="S2P1.1_status" className={this.manageSwitchesClassName('cb_Q2')}><text transform="translate(482.04 679.67)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_Q2')}</text></g>
                            <g id="S1P3.1">
                                <path d="M1384.63,620.16h37.07V595h-37.07v25.16Zm37.41.34h-37.75V594.66H1422V620.5Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-16)">
                                    <polygon points="1252.41 609.44 1341.46 609.44 1341.46 455.91 1252.41 455.91 1252.41 609.44 1252.41 609.44"
                                        fill="#a6c7d5" />
                                    <path d="M1337,660h87.78V507.72H1337V660Zm89,1.27h-90.32V506.45h90.32v154.8Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M1410.58,527.42l-.59.05-.44.11-.42.17-.41.23-.46.37-.29.32-.33.51-.24.56-.11.44,0,.59,0,.46.1.46.23.6.25.41.4.46.35.3.4.26.59.25.46.1.46,0,.46,0,.47-.08.45-.16.43-.21.5-.38.42-.44.26-.4.21-.43.17-.61,0-.47,0-.58-.09-.45-.22-.57-.31-.52-.39-.45-.46-.37-.54-.29-.58-.18-.59-.08Zm.09,7-.51,0-.5-.09-.5-.17-.47-.24-.43-.3-.37-.34-.32-.4-.27-.45-.15-.32-.19-.67-.06-.51,0-.65.1-.49.16-.48.32-.59.41-.51.35-.33.55-.37.46-.21.49-.14.65-.09h.16l.65,0,.49.13.47.18.44.25.51.41.43.49.34.57.23.63.1.49,0,.65-.06.51-.18.67-.23.48-.4.56-.35.37-.41.31-.46.26-.49.2-.51.12-.51.05Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1351.21,527.42l-.59.05-.44.11-.43.17-.4.23-.57.48-.45.59-.31.7-.13.58,0,.44,0,.46.15.62.26.58.36.51.32.33.37.29.42.23.6.22.62.1h.3l.46,0,.47-.11.59-.25.52-.35.34-.31.29-.36.31-.55.17-.46.09-.46,0-.46,0-.59-.16-.58-.19-.42-.34-.5-.29-.33-.47-.37-.53-.29-.59-.18-.59-.08Zm.08,7-.5,0-.51-.09-.49-.17-.48-.24-.42-.3-.37-.34-.33-.4-.18-.29-.29-.64-.16-.68,0-.51.06-.65.12-.48.18-.47.35-.57.31-.38.35-.33.56-.37.46-.21.48-.14.65-.09h.17l.65,0,.48.13.48.18.43.25.51.41.33.36.37.55.21.46.17.64.06.65-.06.68-.13.51-.2.48-.27.45-.33.4-.37.35-.43.3-.46.24-.5.17-.68.11Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1341.46 590.53 1252.41 590.53 1252.41 590.19 1341.46 590.19 1341.46 590.53 1341.46 590.53"
                                    fill="#055f87" />
                                <polygon points="1297.53 566.1 1297.53 549.47 1258.85 549.47 1258.85 566.1 1297.53 566.1 1297.53 566.1"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M1389,616.43h6.44V610H1389v6.45Zm6.78.34h-7.12v-7.13h7.12v7.13Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M1389,607.94h6.44V601.5H1389v6.44Zm6.78.34h-7.12v-7.12h7.12v7.12Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M1351.21,622.08l-.59.06-.44.11-.43.17-.4.23-.57.47-.45.6-.31.69-.13.59,0,.44,0,.46.15.62.26.58.26.39.42.45.37.28.42.24.6.22.62.1h.3l.46,0,.47-.11.59-.25.52-.35.34-.31.29-.37.31-.55.17-.45.09-.46,0-.46,0-.59-.16-.58-.19-.42-.34-.51-.4-.42-.36-.27-.53-.29-.59-.19-.59-.07Zm.08,7-.5,0-.51-.1-.49-.16-.48-.24-.42-.3-.37-.34-.33-.4-.34-.61-.23-.66-.09-.69v-.16l.06-.65.12-.48.18-.48.35-.57.31-.37.36-.33.55-.37.46-.21.48-.15.65-.08h.17l.65.06.48.12.48.19.43.25.51.41.33.35.37.56.21.46.17.64.06.65-.06.67-.13.52-.2.48-.27.45-.33.4-.37.34-.43.3-.46.24-.5.17-.68.12Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1397.44,607.94h6.44V601.5h-6.44v6.44Zm6.78.34h-7.12v-7.12h7.12v7.12Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1324.8 558 1324.8 556.04 1322.85 556.04 1322.85 558 1324.8 558 1324.8 558" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="1324.8 555.2 1324.8 553.25 1322.85 553.25 1322.85 555.2 1324.8 555.2 1324.8 555.2"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1324.8 552.4 1324.8 550.45 1322.85 550.45 1322.85 552.4 1324.8 552.4 1324.8 552.4"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1310.18 536.01 1310.18 533.32 1307.48 533.32 1307.48 536.01 1310.18 536.01 1310.18 536.01"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1391.62,587H1394v-2.35h-2.35V587Zm2.69.34h-3v-3h3v3Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M1410.58,622.08l-.59.06-.44.11-.42.17-.41.23-.45.37-.3.32-.33.51-.24.56-.11.44,0,.58,0,.47.1.46.23.59.25.41.4.47.35.3.4.25.59.25.46.11.46,0,.46,0,.47-.09.45-.15.43-.22.5-.37.42-.45.26-.4.21-.42.17-.62,0-.46,0-.59-.09-.44-.22-.58-.31-.51-.39-.45-.46-.37-.54-.29-.58-.19-.59-.07Zm.09,7-.51,0-.5-.1-.5-.16-.47-.24-.43-.3-.37-.34-.32-.4-.27-.45-.15-.32-.19-.68-.06-.51,0-.65.1-.49.16-.47.32-.59.41-.51.36-.33.54-.37.46-.21.49-.15.65-.08h.16l.65.06.49.12.47.19.44.25.51.41.43.49.34.56.23.64.1.49,0,.64-.06.52-.18.66-.23.48-.4.57-.35.36-.41.32-.46.26-.49.19-.51.12-.51,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1341.47 535.4 1312.88 535.4 1312.88 495.22 1341.47 495.22 1341.47 495.56 1313.22 495.56 1313.22 535.06 1341.47 535.06 1341.47 535.4 1341.47 535.4"
                                    fill="#055f87" />
                                <polygon
                                    points="1280.99 535.4 1252.4 535.4 1252.4 535.06 1280.65 535.06 1280.65 495.56 1252.4 495.56 1252.4 495.22 1280.99 495.22 1280.99 535.4 1280.99 535.4"
                                    fill="#055f87" />
                                <path d="M1397.44,616.43h6.44V610h-6.44v6.45Zm6.78.34h-7.12v-7.13h7.12v7.13Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1341.47 475.12 1252.4 475.12 1252.4 474.78 1341.47 474.78 1341.47 475.12 1341.47 475.12"
                                    fill="#055f87" />
                                <polygon points="1341.47 484.45 1252.4 484.45 1252.4 484.11 1341.47 484.11 1341.47 484.45 1341.47 484.45"
                                    fill="#055f87" />
                                <polygon points="1341.47 492.93 1252.4 492.93 1252.4 492.59 1341.47 492.59 1341.47 492.93 1341.47 492.93"
                                    fill="#055f87" />
                                <path d="M1371.65,586.94h18.49V546h-18.49v40.91Zm18.83.34h-19.17V545.69h19.17v41.59Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1341.47 537.86 1252.4 537.86 1252.4 537.52 1341.47 537.52 1341.47 537.86 1341.47 537.86"
                                    fill="#055f87" />
                                <polygon points="1341.47 543.82 1252.4 543.82 1252.4 543.48 1341.47 543.48 1341.47 543.82 1341.47 543.82"
                                    fill="#055f87" />
                                <polygon points="1341.3 569.32 1252.57 569.32 1252.57 568.98 1341.3 568.98 1341.3 569.32 1341.3 569.32"
                                    fill="#055f87" />
                                <polygon points="1285.95 515.78 1307.92 515.78 1307.92 509.81 1285.95 509.81 1285.95 515.78 1285.95 515.78"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1370.09,566.79h21.62v-5.63h-21.62v5.63Zm22,.34h-22.3v-6.31h22.3v6.31Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1254.95 484.28 1277 484.28 1277 490.21 1254.95 490.21 1254.95 484.28 1254.95 484.28"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="1307.88 514.18 1285.85 514.18 1285.85 511.4 1307.88 511.4 1307.88 514.18 1307.88 514.18"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M1370.09,566.79h21.62v-5.63h-21.62v5.63Zm22,.34h-22.3v-6.31h22.3v6.31Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1307.88 511.57 1285.85 511.57 1285.85 511.23 1307.88 511.23 1307.88 511.57 1307.88 511.57"
                                    fill="#055f87" />
                                <polygon points="1307.88 514.35 1285.85 514.35 1285.85 514.01 1307.88 514.01 1307.88 514.35 1307.88 514.35"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P3.1_status" className={this.manageSwitchesClassName('cb_1F1')}><text transform="translate(1253.04 679.67)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1F1')}</text></g>
                            <g id="S1P4_3VA_1">
                                <path d="M1499,416.66h26.87V398.42H1499v18.24Zm27.11.24h-27.35V398.18h27.35V416.9Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-17)">
                                    <polygon points="1380.03 394.8 1444.58 394.8 1444.58 283.52 1380.03 283.52 1380.03 394.8 1380.03 394.8"
                                        fill="#a6c7d5" />
                                    <path d="M1464.46,445.52h63.62V335.16h-63.62V445.52Zm64.54.92h-65.47V334.24H1529v112.2Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M1517.78,349.44l-.43,0-.32.08-.3.12-.3.17-.33.26-.21.24-.25.37-.17.4-.08.32,0,.43,0,.33.07.34.17.43.18.29.29.34.25.22.29.18.43.18.33.08.34,0h.33l.34-.07.33-.11.31-.15.36-.27.3-.33.2-.29.15-.31.12-.44,0-.34,0-.42-.06-.33-.16-.41-.23-.38-.28-.32-.33-.27-.39-.21-.42-.14-.44-.05Zm.06,5.1-.36,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.23-.28-.2-.33-.11-.23-.13-.49-.05-.37,0-.47.07-.36.12-.34.23-.43.3-.37.26-.24.4-.26.33-.16.35-.1.47-.07h.12l.47,0,.36.09.33.14.32.18.37.29.31.36.25.41.17.46.07.35,0,.47,0,.37-.13.49-.17.34-.29.42-.25.26-.3.23-.33.19-.35.14-.37.08-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1474.75,349.44l-.43,0-.32.08-.31.12-.29.17-.41.34-.33.43-.23.51-.09.42,0,.32,0,.33.11.45.19.42.26.37.23.24.27.21.3.17.44.16.45.07h.21l.34,0,.34-.08.43-.18.37-.25.25-.23.21-.26.22-.4.13-.33.06-.33,0-.34,0-.42L1477,351l-.14-.3-.24-.37-.21-.23-.34-.27-.39-.21-.42-.13-.43-.06Zm.06,5.1-.37,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.23-.29-.13-.21-.21-.46-.12-.49,0-.37,0-.47.08-.35.14-.34.25-.42.22-.27.26-.24.4-.26.34-.16.35-.1.47-.07h.12l.47,0,.35.09.34.14.31.18.38.29.23.26.27.4.15.34.13.46,0,.47,0,.49-.1.37-.14.35-.2.33-.23.29-.27.25-.31.22-.34.17-.36.12-.49.09Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1444.58 381.1 1380.03 381.1 1380.03 380.85 1444.58 380.85 1444.58 381.1 1444.58 381.1"
                                    fill="#055f87" />
                                <polygon points="1412.73 363.39 1412.73 351.34 1384.7 351.34 1384.7 363.39 1412.73 363.39 1412.73 363.39"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M1502.11,414h4.67v-4.67h-4.67V414Zm4.91.25h-5.16V409H1507v5.17Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M1502.11,407.8h4.67v-4.67h-4.67v4.67Zm4.91.25h-5.16v-5.16H1507v5.16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1474.75,418.05l-.43,0-.32.08-.31.13-.29.16-.41.35-.33.43-.23.5-.09.43,0,.32,0,.33.11.45.19.42.19.28.3.33.27.2.3.17.44.16.45.08h.21l.34,0,.34-.08.43-.18.37-.26.25-.22.21-.27.22-.4.13-.32.06-.34,0-.33,0-.43-.12-.42-.14-.3-.24-.37-.29-.31-.26-.19-.39-.21-.42-.14-.43-.06Zm.06,5.11-.37,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.23-.29-.25-.44-.16-.48-.07-.49v-.12l0-.47.08-.35.14-.35.25-.41.22-.27.26-.24.4-.27.34-.15.35-.11.47-.06h.12l.47,0,.35.09.34.13.31.18.38.3.23.26.27.4.15.33.13.47,0,.47,0,.49-.1.37-.14.35-.2.32-.23.29-.27.25-.31.22-.34.17-.36.13-.49.08Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1508.25,407.8h4.67v-4.67h-4.67v4.67Zm4.92.25H1508v-5.16h5.16v5.16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1432.5 357.52 1432.5 356.1 1431.08 356.1 1431.08 357.52 1432.5 357.52 1432.5 357.52"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1432.5 355.49 1432.5 354.07 1431.08 354.07 1431.08 355.49 1432.5 355.49 1432.5 355.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1432.5 353.46 1432.5 352.05 1431.08 352.05 1431.08 353.46 1432.5 353.46 1432.5 353.46"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1421.9 341.58 1421.9 339.63 1419.95 339.63 1419.95 341.58 1421.9 341.58 1421.9 341.58"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1504,392.64h1.7v-1.7H1504v1.7Zm2,.25h-2.2v-2.2h2.2v2.2Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M1517.78,418.05l-.43,0-.32.08-.3.13-.3.16-.33.27-.21.23-.25.37-.17.41-.08.32,0,.42,0,.34.07.33.17.43.18.3.29.34.25.21.29.19.43.18.33.08.34,0,.33,0,.34-.06.33-.11.31-.16.36-.27.3-.32.2-.29.15-.31.12-.45,0-.33,0-.43-.06-.32-.16-.42-.23-.37-.28-.32-.33-.27-.39-.21-.42-.14-.44-.06Zm.06,5.11-.36,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.23-.29-.2-.33-.11-.23-.13-.49-.05-.36,0-.48.07-.35.12-.35.23-.42.3-.38.26-.23.4-.27.33-.15.35-.11.47-.06h.12l.47,0,.36.09.33.13.32.18.37.3.31.35.25.41.17.46.07.36,0,.47,0,.37-.13.48-.17.35-.29.41-.25.26-.3.23-.33.19-.35.14-.37.09-.38,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1444.58 341.14 1423.86 341.14 1423.86 312.02 1444.58 312.02 1444.58 312.26 1424.11 312.26 1424.11 340.89 1444.58 340.89 1444.58 341.14 1444.58 341.14"
                                    fill="#055f87" />
                                <polygon
                                    points="1400.74 341.14 1380.03 341.14 1380.03 340.89 1400.5 340.89 1400.5 312.26 1380.03 312.26 1380.03 312.02 1400.74 312.02 1400.74 341.14 1400.74 341.14"
                                    fill="#055f87" />
                                <path d="M1508.25,414h4.67v-4.67h-4.67V414Zm4.92.25H1508V409h5.16v5.17Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="1444.58 297.45 1380.03 297.45 1380.03 297.2 1444.58 297.2 1444.58 297.45 1444.58 297.45"
                                    fill="#055f87" />
                                <polygon points="1444.58 304.21 1380.03 304.21 1380.03 303.96 1444.58 303.96 1444.58 304.21 1444.58 304.21"
                                    fill="#055f87" />
                                <polygon points="1444.58 310.35 1380.03 310.35 1380.03 310.11 1444.58 310.11 1444.58 310.35 1444.58 310.35"
                                    fill="#055f87" />
                                <path d="M1489.56,392.58H1503V362.93h-13.41v29.65Zm13.65.25h-13.89V362.69h13.89v30.14Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1444.58 342.92 1380.03 342.92 1380.03 342.68 1444.58 342.68 1444.58 342.92 1444.58 342.92"
                                    fill="#055f87" />
                                <polygon points="1444.58 347.24 1380.03 347.24 1380.03 347 1444.58 347 1444.58 347.24 1444.58 347.24"
                                    fill="#055f87" />
                                <polygon points="1444.46 365.72 1380.15 365.72 1380.15 365.48 1444.46 365.48 1444.46 365.72 1444.46 365.72"
                                    fill="#055f87" />
                                <polygon points="1404.34 326.92 1420.26 326.92 1420.26 322.59 1404.34 322.59 1404.34 326.92 1404.34 326.92"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1488.43,378h15.68v-4.08h-15.68V378Zm15.92.25h-16.17v-4.57h16.17v4.57Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1381.87 304.08 1397.86 304.08 1397.86 308.39 1381.87 308.39 1381.87 304.08 1381.87 304.08"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="1420.23 325.76 1404.26 325.76 1404.26 323.75 1420.23 323.75 1420.23 325.76 1420.23 325.76"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M1488.43,378h15.68v-4.08h-15.68V378Zm15.92.25h-16.17v-4.57h16.17v4.57Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1420.23 323.87 1404.26 323.87 1404.26 323.62 1420.23 323.62 1420.23 323.87 1420.23 323.87"
                                    fill="#055f87" />
                                <polygon points="1420.23 325.89 1404.26 325.89 1404.26 325.64 1420.23 325.64 1420.23 325.89 1420.23 325.89"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P4_3VA_2">
                                <path d="M1585.1,416.66H1612V398.42H1585.1v18.24Zm27.12.24h-27.36V398.18h27.36V416.9Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-18)">
                                    <polygon points="1466.16 394.8 1530.71 394.8 1530.71 283.52 1466.16 283.52 1466.16 394.8 1466.16 394.8"
                                        fill="#a6c7d5" />
                                    <path d="M1550.59,445.52h63.62V335.16h-63.62V445.52Zm64.54.92h-65.46V334.24h65.46v112.2Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M1603.91,349.44l-.42,0-.33.08-.3.12-.29.17-.34.26-.21.24-.24.37-.17.4-.08.32,0,.43,0,.33.07.34.17.43.18.29.29.34.26.22.29.18.43.18.33.08.33,0h.34l.33-.07.34-.11.3-.15.37-.27.3-.33.19-.29.15-.31.12-.44,0-.34,0-.42-.06-.33-.16-.41-.22-.38-.28-.32-.34-.27-.39-.21-.42-.14-.43-.05Zm.07,5.1-.37,0-.37-.07-.36-.12-.34-.17-.31-.22-.26-.25-.24-.28-.2-.33-.1-.23-.14-.49,0-.37,0-.47.07-.36.12-.34.23-.43.29-.37.26-.24.4-.26.33-.16.35-.1.48-.07h.11l.47,0,.36.09.34.14.32.18.37.29.31.36.24.41.18.46.07.35,0,.47,0,.37-.14.49-.16.34-.29.42-.26.26-.29.23-.34.19-.35.14-.37.08-.37,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1560.88,349.44l-.43,0-.32.08-.31.12-.29.17-.41.34-.32.43-.23.51-.09.42,0,.32,0,.33.1.45.19.42.26.37.23.24.28.21.29.17.44.16.45.07h.22l.33,0,.34-.08.43-.18.38-.25.24-.23.21-.26.23-.4.12-.33.07-.33,0-.34,0-.42-.11-.43-.14-.3-.25-.37-.21-.23-.34-.27-.38-.21-.43-.13-.43-.06Zm.06,5.1-.36,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.24-.29-.13-.21-.21-.46-.12-.49,0-.37,0-.47.08-.35.14-.34.25-.42.22-.27.26-.24.41-.26.33-.16.35-.1.47-.07h.12l.47,0,.35.09.34.14.32.18.37.29.24.26.26.4.16.34.12.46,0,.47,0,.49-.1.37-.14.35-.19.33-.24.29-.27.25-.31.22-.33.17-.37.12-.49.09Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1530.71 381.1 1466.16 381.1 1466.16 380.85 1530.71 380.85 1530.71 381.1 1530.71 381.1"
                                    fill="#055f87" />
                                <polygon points="1498.87 363.39 1498.87 351.34 1470.83 351.34 1470.83 363.39 1498.87 363.39 1498.87 363.39"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M1588.24,414h4.67v-4.67h-4.67V414Zm4.92.25H1588V409h5.17v5.17Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M1588.24,407.8h4.67v-4.67h-4.67v4.67Zm4.92.25H1588v-5.16h5.17v5.16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M1560.88,418.05l-.43,0-.32.08-.31.13-.29.16-.41.35-.32.43-.23.5-.09.43,0,.32,0,.33.1.45.19.42.19.28.3.33.28.2.29.17.44.16.45.08h.22l.33,0,.34-.08.43-.18.38-.26.24-.22.21-.27.23-.4.12-.32.07-.34,0-.33,0-.43-.11-.42-.14-.3-.25-.37-.29-.31-.26-.19-.38-.21-.43-.14-.43-.06Zm.06,5.11-.36,0-.37-.07-.36-.12-.34-.17-.31-.22-.27-.25-.24-.29-.25-.44-.16-.48-.07-.49v-.12l0-.47.08-.35.14-.35.25-.41.22-.27.26-.24.41-.27.33-.15.35-.11.47-.06h.12l.47,0,.35.09.34.13.32.18.37.3.24.26.26.4.16.33.12.47,0,.47,0,.49-.1.37-.14.35-.19.32-.24.29-.27.25-.31.22-.33.17-.37.13-.49.08Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M1594.39,407.8h4.67v-4.67h-4.67v4.67Zm4.91.25h-5.16v-5.16h5.16v5.16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1518.63 357.52 1518.63 356.1 1517.22 356.1 1517.22 357.52 1518.63 357.52 1518.63 357.52"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1518.63 355.49 1518.63 354.07 1517.22 354.07 1517.22 355.49 1518.63 355.49 1518.63 355.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1518.63 353.46 1518.63 352.05 1517.22 352.05 1517.22 353.46 1518.63 353.46 1518.63 353.46"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="1508.03 341.58 1508.03 339.63 1506.08 339.63 1506.08 341.58 1508.03 341.58 1508.03 341.58"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1590.17,392.64h1.7v-1.7h-1.7v1.7Zm1.95.25h-2.2v-2.2h2.2v2.2Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M1603.91,418.05l-.42,0-.33.08-.3.13-.29.16-.33.27-.22.23-.24.37-.17.41-.08.32,0,.42,0,.34.07.33.17.43.18.3.29.34.26.21.29.19.43.18.33.08.33,0,.34,0,.33-.06.34-.11.3-.16.37-.27.3-.32.19-.29.15-.31.12-.45,0-.33,0-.43-.06-.32-.16-.42-.22-.37-.28-.32-.34-.27-.39-.21-.42-.14-.43-.06Zm.07,5.11-.37,0-.37-.07-.36-.12-.34-.17-.31-.22-.26-.25-.24-.29-.2-.33-.1-.23-.14-.49,0-.36,0-.48.07-.35.12-.35.23-.42.29-.38.26-.23.4-.27.33-.15.35-.11.48-.06h.11l.47,0,.36.09.34.13.32.18.37.3.31.35.24.41.18.46.07.36,0,.47,0,.37-.14.48-.16.35-.29.41-.26.26-.29.23-.34.19-.35.14-.37.09-.37,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="1530.71 341.14 1509.99 341.14 1509.99 312.02 1530.71 312.02 1530.71 312.26 1510.24 312.26 1510.24 340.89 1530.71 340.89 1530.71 341.14 1530.71 341.14"
                                    fill="#055f87" />
                                <polygon
                                    points="1486.88 341.14 1466.16 341.14 1466.16 340.89 1486.63 340.89 1486.63 312.26 1466.16 312.26 1466.16 312.02 1486.88 312.02 1486.88 341.14 1486.88 341.14"
                                    fill="#055f87" />
                                <path d="M1594.39,414h4.67v-4.67h-4.67V414Zm4.91.25h-5.16V409h5.16v5.17Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="1530.71 297.45 1466.16 297.45 1466.16 297.2 1530.71 297.2 1530.71 297.45 1530.71 297.45"
                                    fill="#055f87" />
                                <polygon points="1530.71 304.21 1466.16 304.21 1466.16 303.96 1530.71 303.96 1530.71 304.21 1530.71 304.21"
                                    fill="#055f87" />
                                <polygon points="1530.71 310.35 1466.16 310.35 1466.16 310.11 1530.71 310.11 1530.71 310.35 1530.71 310.35"
                                    fill="#055f87" />
                                <path d="M1575.7,392.58h13.4V362.93h-13.4v29.65Zm13.64.25h-13.89V362.69h13.89v30.14Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1530.71 342.92 1466.16 342.92 1466.16 342.68 1530.71 342.68 1530.71 342.92 1530.71 342.92"
                                    fill="#055f87" />
                                <polygon points="1530.71 347.24 1466.16 347.24 1466.16 347 1530.71 347 1530.71 347.24 1530.71 347.24"
                                    fill="#055f87" />
                                <polygon points="1530.59 365.72 1466.28 365.72 1466.28 365.48 1530.59 365.48 1530.59 365.72 1530.59 365.72"
                                    fill="#055f87" />
                                <polygon points="1490.47 326.92 1506.4 326.92 1506.4 322.59 1490.47 322.59 1490.47 326.92 1490.47 326.92"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M1574.56,378h15.68v-4.08h-15.68V378Zm15.92.25h-16.16v-4.57h16.16v4.57Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1468 304.08 1483.99 304.08 1483.99 308.39 1468 308.39 1468 304.08 1468 304.08" fill="#055f87"
                                    fillRule="evenodd" />
                                <polygon points="1506.37 325.76 1490.4 325.76 1490.4 323.75 1506.37 323.75 1506.37 325.76 1506.37 325.76"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M1574.56,378h15.68v-4.08h-15.68V378Zm15.92.25h-16.16v-4.57h16.16v4.57Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="1506.37 323.87 1490.4 323.87 1490.4 323.62 1506.37 323.62 1506.37 323.87 1506.37 323.87"
                                    fill="#055f87" />
                                <polygon points="1506.37 325.89 1490.4 325.89 1490.4 325.64 1506.37 325.64 1506.37 325.89 1506.37 325.89"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P4_3VA_1_status" className='closed'><text transform="translate(1379.57 437.07)" fontSize="21"
                                fontFamily="ArialMT, Arial">{t('elevationClosedShort')}</text></g>
                            <g id="S1P4_3VA_2_status" className='closed'><text transform="translate(1465.7 437.07)" fontSize="21"
                                fontFamily="ArialMT, Arial">{t('elevationClosedShort')}</text></g>
                            <g id="S2P1_3VA_1">
                                <path d="M579.22,914.88h22.83V899.39H579.22v15.49Zm23,.21H579V899.18h23.24v15.91Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-19)">
                                    <polygon points="465.55 888.61 520.38 888.61 520.38 794.08 465.55 794.08 465.55 888.61 465.55 888.61"
                                        fill="#a6c7d5" />
                                    <path d="M549.9,939.4H604V845.65H549.9V939.4Zm54.83.78H549.12V844.86h55.61v95.32Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M595.2,857.77l-.36,0-.27.07-.26.1-.25.14-.29.23-.18.2-.2.31-.15.35-.07.27,0,.36,0,.28.06.29.15.36.15.25.24.29.22.19.25.15.36.16.28.06.29,0h.28l.29-.06.28-.09.26-.14.31-.23.26-.27.16-.25.13-.26.1-.38,0-.28,0-.36-.06-.28-.13-.35-.19-.32-.24-.27-.28-.23-.34-.18-.35-.12-.37,0Zm.06,4.34-.31,0-.32-.05-.3-.11-.3-.14-.26-.19-.22-.21-.2-.24-.17-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.2-.37.25-.31.22-.2.34-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.12.41-.14.3-.24.35-.22.22-.25.19-.28.17-.3.11-.32.08-.31,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M558.65,857.77l-.37,0-.27.07-.27.1-.24.14-.35.29-.28.37-.19.43-.08.36,0,.27,0,.28.09.38.16.36.23.31.19.21.23.17.26.15.37.13.38.07h.18l.29,0,.29-.07.36-.15.32-.21.21-.2.18-.22.19-.34.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.25-.21-.32-.18-.19-.28-.23-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.32-.05-.3-.11-.29-.14-.27-.19-.22-.21-.2-.25-.12-.17-.18-.4-.09-.42,0-.31,0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.34-.23.29-.13.29-.09.4,0h.11l.39,0,.3.08.29.11.27.15.32.25.2.22.22.35.13.28.11.39,0,.4,0,.42-.08.31-.13.3-.16.28-.2.24-.23.22-.26.18-.29.15-.31.1-.41.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="520.38 876.97 465.55 876.97 465.55 876.76 520.38 876.76 520.38 876.97 520.38 876.97"
                                    fill="#055f87" />
                                <polygon points="493.33 861.92 493.33 851.69 469.51 851.69 469.51 861.92 493.33 861.92 493.33 861.92"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M581.89,912.58h4v-4h-4v4Zm4.17.21h-4.38V908.4h4.38v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M581.89,907.36h4v-4h-4v4Zm4.17.21h-4.38v-4.39h4.38v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M558.65,916.06l-.37,0-.27.07-.27.1-.24.14-.35.29-.28.37-.19.43-.08.36,0,.27,0,.28.09.38.16.36.17.24.25.28.23.17.26.15.37.13.38.07h.18l.29,0,.29-.07.36-.15.32-.21.21-.2.18-.22.19-.34.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.26-.21-.31-.24-.25-.22-.17-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.32,0-.3-.11-.29-.14-.27-.19-.22-.21-.2-.25-.22-.37-.14-.41,0-.42v-.1l0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.34-.23.29-.13.29-.09.4,0h.11l.39,0,.3.08.29.11.27.15.32.25.2.22.22.35.13.28.11.39,0,.4,0,.42-.08.31-.13.3-.16.28-.2.24-.23.22-.26.18-.29.15-.31.1-.41.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M587.11,907.36h4v-4h-4v4Zm4.18.21H586.9v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="510.12 856.94 510.12 855.74 508.92 855.74 508.92 856.94 510.12 856.94 510.12 856.94"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="510.12 855.21 510.12 854.01 508.92 854.01 508.92 855.21 510.12 855.21 510.12 855.21"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="510.12 853.49 510.12 852.29 508.92 852.29 508.92 853.49 510.12 853.49 510.12 853.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="501.11 843.4 501.11 841.74 499.46 841.74 499.46 843.4 501.11 843.4 501.11 843.4" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M583.53,894.48H585V893h-1.44v1.45Zm1.65.2h-1.86v-1.86h1.86v1.86Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M595.2,916.06l-.36,0-.27.07-.26.1-.25.14-.28.23-.19.2-.2.31-.15.35-.07.27,0,.36,0,.28.06.29.15.36.15.25.24.29.22.19.25.15.36.16.28.06.29,0h.28l.29-.06L596,920l.26-.14.31-.23.26-.27.16-.25.13-.26.1-.38,0-.28,0-.36-.06-.28-.13-.35-.19-.32-.24-.28-.28-.22-.34-.18-.35-.12-.37,0Zm.06,4.34-.31,0-.32,0-.3-.11-.3-.14-.26-.19-.22-.21-.2-.24-.17-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.2-.37.25-.31.22-.2.34-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.12.41-.14.3-.24.35-.22.22-.25.19-.28.16-.3.12-.32.08-.31,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="520.38 843.02 502.78 843.02 502.78 818.28 520.38 818.28 520.38 818.49 502.99 818.49 502.99 842.81 520.38 842.81 520.38 843.02 520.38 843.02"
                                    fill="#055f87" />
                                <polygon
                                    points="483.14 843.02 465.54 843.02 465.54 842.81 482.93 842.81 482.93 818.49 465.54 818.49 465.54 818.28 483.14 818.28 483.14 843.02 483.14 843.02"
                                    fill="#055f87" />
                                <path d="M587.11,912.58h4v-4h-4v4Zm4.18.21H586.9V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="520.38 805.9 465.54 805.9 465.54 805.7 520.38 805.7 520.38 805.9 520.38 805.9"
                                    fill="#055f87" />
                                <polygon points="520.38 811.65 465.54 811.65 465.54 811.44 520.38 811.44 520.38 811.65 520.38 811.65"
                                    fill="#055f87" />
                                <polygon points="520.38 816.87 465.54 816.87 465.54 816.66 520.38 816.66 520.38 816.87 520.38 816.87"
                                    fill="#055f87" />
                                <path d="M571.23,894.43h11.39V869.24H571.23v25.19Zm11.6.21H571V869h11.81v25.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="520.38 844.54 465.54 844.54 465.54 844.33 520.38 844.33 520.38 844.54 520.38 844.54"
                                    fill="#055f87" />
                                <polygon points="520.38 848.21 465.54 848.21 465.54 848 520.38 848 520.38 848.21 520.38 848.21"
                                    fill="#055f87" />
                                <polygon points="520.28 863.91 465.65 863.91 465.65 863.7 520.28 863.7 520.28 863.91 520.28 863.91"
                                    fill="#055f87" />
                                <polygon points="486.2 830.94 499.73 830.94 499.73 827.27 486.2 827.27 486.2 830.94 486.2 830.94" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M570.27,882h13.32v-3.47H570.27V882Zm13.52.2H570.06v-3.88h13.73v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="467.11 811.54 480.69 811.54 480.69 815.2 467.11 815.2 467.11 811.54 467.11 811.54"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="499.7 829.96 486.13 829.96 486.13 828.25 499.7 828.25 499.7 829.96 499.7 829.96" fill="#d9e7ed"
                                    fillRule="evenodd" />
                                <path d="M570.27,882h13.32v-3.47H570.27V882Zm13.52.2H570.06v-3.88h13.73v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="499.7 828.35 486.13 828.35 486.13 828.14 499.7 828.14 499.7 828.35 499.7 828.35"
                                    fill="#055f87" />
                                <polygon points="499.7 830.06 486.13 830.06 486.13 829.86 499.7 829.86 499.7 830.06 499.7 830.06"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P1_3VA_1_status" className={this.manageSwitchesClassName('cb_2FP1')}><text transform="translate(465.15 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2FP1')}</text></g>
                            <g id="S2P1_3VA_2" onClick={() => this.openProperties('cb_2FP2','2FP2',`${t('slideUpDialogCircuitSection')} TR2`,'RPZOK')} 
                            className={this.manageSwitchesClassName('cb_2FP2')}>
                                <path d="M645.22,914.88h22.83V899.39H645.22v15.49Zm23,.21H645V899.18h23.24v15.91Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-20)">
                                    <polygon points="531.55 888.61 586.38 888.61 586.38 794.08 531.55 794.08 531.55 888.61 531.55 888.61"
                                        fill="#a6c7d5" />
                                    <path d="M615.9,939.4H670V845.65H615.9V939.4Zm54.83.78H615.12V844.86h55.61v95.32Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M661.2,857.77l-.36,0-.27.07-.26.1-.25.14-.29.23-.18.2-.2.31-.15.35-.07.27,0,.36,0,.28.06.29.15.36.15.25.24.29.22.19.25.15.36.16.28.06.29,0h.28l.29-.06.28-.09.26-.14.31-.23.26-.27.16-.25.13-.26.1-.38,0-.28,0-.36-.06-.28-.13-.35-.19-.32-.24-.27-.28-.23-.34-.18-.35-.12-.37,0Zm.06,4.34-.31,0-.32-.05-.3-.11-.3-.14-.26-.19-.22-.21-.2-.24-.17-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.2-.37.25-.31.22-.2.34-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.12.41-.14.3-.24.35-.22.22-.25.19-.28.17-.3.11-.32.08-.31,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M624.65,857.77l-.37,0-.27.07-.27.1-.24.14-.35.29-.28.37-.19.43-.08.36,0,.27,0,.28.09.38.16.36.23.31.19.21.23.17.26.15.37.13.38.07h.18l.29,0,.29-.07.36-.15.32-.21.21-.2.18-.22.19-.34.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.25-.21-.32-.18-.19-.28-.23-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.32-.05-.3-.11-.29-.14-.27-.19-.22-.21-.2-.25-.12-.17-.18-.4-.09-.42,0-.31,0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.34-.23.29-.13.29-.09.4,0h.11l.39,0,.3.08.29.11.27.15.32.25.2.22.22.35.13.28.11.39,0,.4,0,.42-.08.31-.13.3-.16.28-.2.24-.23.22-.26.18-.29.15-.31.1-.41.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="586.38 876.97 531.55 876.97 531.55 876.76 586.38 876.76 586.38 876.97 586.38 876.97"
                                    fill="#055f87" />
                                <polygon points="559.33 861.92 559.33 851.69 535.51 851.69 535.51 861.92 559.33 861.92 559.33 861.92"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M647.89,912.58h4v-4h-4v4Zm4.17.21h-4.38V908.4h4.38v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M647.89,907.36h4v-4h-4v4Zm4.17.21h-4.38v-4.39h4.38v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M624.65,916.06l-.37,0-.27.07-.27.1-.24.14-.35.29-.28.37-.19.43-.08.36,0,.27,0,.28.09.38.16.36.17.24.25.28.23.17.26.15.37.13.38.07h.18l.29,0,.29-.07.36-.15.32-.21.21-.2.18-.22.19-.34.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.26-.21-.31-.24-.25-.22-.17-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.32,0-.3-.11-.29-.14-.27-.19-.22-.21-.2-.25-.22-.37-.14-.41,0-.42v-.1l0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.34-.23.29-.13.29-.09.4,0h.11l.39,0,.3.08.29.11.27.15.32.25.2.22.22.35.13.28.11.39,0,.4,0,.42-.08.31-.13.3-.16.28-.2.24-.23.22-.26.18-.29.15-.31.1-.41.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M653.11,907.36h4v-4h-4v4Zm4.18.21H652.9v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="576.12 856.94 576.12 855.74 574.92 855.74 574.92 856.94 576.12 856.94 576.12 856.94"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="576.12 855.21 576.12 854.01 574.92 854.01 574.92 855.21 576.12 855.21 576.12 855.21"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="576.12 853.49 576.12 852.29 574.92 852.29 574.92 853.49 576.12 853.49 576.12 853.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="567.11 843.4 567.11 841.74 565.46 841.74 565.46 843.4 567.11 843.4 567.11 843.4" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M649.53,894.48H651V893h-1.44v1.45Zm1.65.2h-1.86v-1.86h1.86v1.86Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M661.2,916.06l-.36,0-.27.07-.26.1-.25.14-.28.23-.19.2-.2.31-.15.35-.07.27,0,.36,0,.28.06.29.15.36.15.25.24.29.22.19.25.15.36.16.28.06.29,0h.28l.29-.06L662,920l.26-.14.31-.23.26-.27.16-.25.13-.26.1-.38,0-.28,0-.36-.06-.28-.13-.35-.19-.32-.24-.28-.28-.22-.34-.18-.35-.12-.37,0Zm.06,4.34-.31,0-.32,0-.3-.11-.3-.14-.26-.19-.22-.21-.2-.24-.17-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.2-.37.25-.31.22-.2.34-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.12.41-.14.3-.24.35-.22.22-.25.19-.28.16-.3.12-.32.08-.31,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="586.38 843.02 568.78 843.02 568.78 818.28 586.38 818.28 586.38 818.49 568.99 818.49 568.99 842.81 586.38 842.81 586.38 843.02 586.38 843.02"
                                    fill="#055f87" />
                                <polygon
                                    points="549.14 843.02 531.54 843.02 531.54 842.81 548.93 842.81 548.93 818.49 531.54 818.49 531.54 818.28 549.14 818.28 549.14 843.02 549.14 843.02"
                                    fill="#055f87" />
                                <path d="M653.11,912.58h4v-4h-4v4Zm4.18.21H652.9V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="586.38 805.9 531.54 805.9 531.54 805.7 586.38 805.7 586.38 805.9 586.38 805.9"
                                    fill="#055f87" />
                                <polygon points="586.38 811.65 531.54 811.65 531.54 811.44 586.38 811.44 586.38 811.65 586.38 811.65"
                                    fill="#055f87" />
                                <polygon points="586.38 816.87 531.54 816.87 531.54 816.66 586.38 816.66 586.38 816.87 586.38 816.87"
                                    fill="#055f87" />
                                <path d="M637.23,894.43h11.39V869.24H637.23v25.19Zm11.6.21H637V869h11.81v25.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="586.38 844.54 531.54 844.54 531.54 844.33 586.38 844.33 586.38 844.54 586.38 844.54"
                                    fill="#055f87" />
                                <polygon points="586.38 848.21 531.54 848.21 531.54 848 586.38 848 586.38 848.21 586.38 848.21"
                                    fill="#055f87" />
                                <polygon points="586.28 863.91 531.65 863.91 531.65 863.7 586.28 863.7 586.28 863.91 586.28 863.91"
                                    fill="#055f87" />
                                <polygon points="552.2 830.94 565.73 830.94 565.73 827.27 552.2 827.27 552.2 830.94 552.2 830.94" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M636.27,882h13.32v-3.47H636.27V882Zm13.52.2H636.06v-3.88h13.73v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="533.11 811.54 546.69 811.54 546.69 815.2 533.11 815.2 533.11 811.54 533.11 811.54"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="565.7 829.96 552.13 829.96 552.13 828.25 565.7 828.25 565.7 829.96 565.7 829.96" fill="#d9e7ed"
                                    fillRule="evenodd" />
                                <path d="M636.27,882h13.32v-3.47H636.27V882Zm13.52.2H636.06v-3.88h13.73v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="565.7 828.35 552.13 828.35 552.13 828.14 565.7 828.14 565.7 828.35 565.7 828.35"
                                    fill="#055f87" />
                                <polygon points="565.7 830.06 552.13 830.06 552.13 829.86 565.7 829.86 565.7 830.06 565.7 830.06"
                                    fill="#055f87" />
                            </g>
                            <g id="S2P1_3VA_2_status" className={this.manageSwitchesClassName('cb_2FP2')}><text transform="translate(531.15 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_2FP2')}</text></g>
                            <g id="S1P1_3VA_1">
                                <path d="M896.79,914.88h22.82V899.39H896.79v15.49Zm23,.21H896.58V899.18h23.24v15.91Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-21)">
                                    <polygon points="783.11 888.61 837.94 888.61 837.94 794.08 783.11 794.08 783.11 888.61 783.11 888.61"
                                        fill="#a6c7d5" />
                                    <path d="M867.47,939.4h54V845.65h-54V939.4Zm54.83.78H866.68V844.86H922.3v95.32Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M912.77,857.77l-.37,0-.27.07-.26.1-.25.14-.28.23-.18.2-.21.31-.14.35-.07.27,0,.36,0,.28.06.29.14.36.15.25.25.29.22.19.24.15.37.16.28.06.28,0H913l.28-.06.29-.09.26-.14.3-.23.26-.27.17-.25.12-.26.11-.38,0-.28,0-.36,0-.28-.13-.35-.19-.32-.24-.27-.29-.23-.33-.18-.36-.12-.36,0Zm.05,4.34-.31,0-.31-.05-.31-.11-.29-.14-.26-.19-.23-.21-.2-.24-.16-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.19-.37.26-.31.22-.2.33-.23.29-.13.29-.09.41,0h.1l.4,0,.3.08.29.11.27.15.31.26.27.3.21.34.14.39.06.31,0,.39,0,.32-.11.41-.14.3-.25.35-.22.22-.24.19-.29.17-.3.11-.31.08-.32,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M876.21,857.77l-.36,0-.28.07-.26.1-.25.14-.34.29-.28.37-.2.43-.07.36,0,.27,0,.28.09.38.16.36.22.31.2.21.23.17.25.15.37.13.39.07h.18l.28,0,.29-.07.36-.15.33-.21.2-.2.18-.22.19-.34.11-.28,0-.28,0-.29,0-.36-.1-.36-.11-.25-.21-.32-.18-.19-.29-.23-.33-.18-.36-.12-.36,0Zm0,4.34-.31,0-.31-.05-.31-.11-.29-.14-.26-.19-.23-.21-.2-.25-.11-.17-.18-.4-.1-.42,0-.31,0-.4.08-.3.11-.29.21-.35.19-.23.22-.2.35-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.26.15.32.25.2.22.23.35.13.28.11.39,0,.4,0,.42-.09.31-.12.3-.17.28-.2.24-.22.22-.27.18-.28.15-.31.1-.42.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="837.94 876.97 783.11 876.97 783.11 876.76 837.94 876.76 837.94 876.97 837.94 876.97"
                                    fill="#055f87" />
                                <polygon points="810.89 861.92 810.89 851.69 787.08 851.69 787.08 861.92 810.89 861.92 810.89 861.92"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M899.45,912.58h4v-4h-4v4Zm4.18.21h-4.39V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M899.45,907.36h4v-4h-4v4Zm4.18.21h-4.39v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M876.21,916.06l-.36,0-.28.07-.26.1-.25.14-.34.29-.28.37-.2.43-.07.36,0,.27,0,.28.09.38.16.36.16.24.26.28.23.17.25.15.37.13.39.07h.18l.28,0,.29-.07.36-.15.33-.21.2-.2.18-.22.19-.34.11-.28,0-.28,0-.29,0-.36-.1-.36-.11-.26-.21-.31-.25-.25-.22-.17-.33-.18-.36-.12-.36,0Zm0,4.34-.31,0-.31,0-.31-.11-.29-.14-.26-.19-.23-.21-.2-.25-.21-.37-.14-.41-.06-.42v-.1l0-.4.08-.3.11-.29.21-.35.19-.23.22-.2.35-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.26.15.32.25.2.22.23.35.13.28.11.39,0,.4,0,.42-.09.31-.12.3-.17.28-.2.24-.22.22-.27.18-.28.15-.31.1-.42.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M904.67,907.36h4v-4h-4v4Zm4.18.21h-4.39v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="827.68 856.94 827.68 855.74 826.48 855.74 826.48 856.94 827.68 856.94 827.68 856.94"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="827.68 855.21 827.68 854.01 826.48 854.01 826.48 855.21 827.68 855.21 827.68 855.21"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="827.68 853.49 827.68 852.29 826.48 852.29 826.48 853.49 827.68 853.49 827.68 853.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="818.68 843.4 818.68 841.74 817.02 841.74 817.02 843.4 818.68 843.4 818.68 843.4" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M901.09,894.48h1.45V893h-1.45v1.45Zm1.66.2h-1.87v-1.86h1.87v1.86Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M912.77,916.06l-.37,0-.27.07-.26.1-.25.14-.28.23-.18.2-.21.31-.14.35-.07.27,0,.36,0,.28.06.29.14.36.15.25.25.29.22.19.24.15.37.16.28.06.28,0H913l.28-.06.29-.09.26-.14.3-.23.26-.27.17-.25.12-.26.11-.38,0-.28,0-.36,0-.28-.13-.35-.19-.32-.24-.28-.29-.22-.33-.18-.36-.12-.36,0Zm.05,4.34-.31,0-.31,0-.31-.11-.29-.14-.26-.19-.23-.21-.2-.24-.16-.28-.09-.2-.12-.41,0-.32,0-.4.06-.3.1-.29.19-.37.26-.31.22-.2.33-.23L912,916l.29-.09.41,0h.1l.4,0,.3.08.29.11.27.15.31.26.27.3.21.34.14.39.06.31,0,.39,0,.32-.11.41-.14.3-.25.35-.22.22L914,920l-.29.16-.3.12-.31.08-.32,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="837.95 843.02 820.35 843.02 820.35 818.28 837.95 818.28 837.95 818.49 820.55 818.49 820.55 842.81 837.95 842.81 837.95 843.02 837.95 843.02"
                                    fill="#055f87" />
                                <polygon
                                    points="800.71 843.02 783.11 843.02 783.11 842.81 800.5 842.81 800.5 818.49 783.11 818.49 783.11 818.28 800.71 818.28 800.71 843.02 800.71 843.02"
                                    fill="#055f87" />
                                <path d="M904.67,912.58h4v-4h-4v4Zm4.18.21h-4.39V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="837.95 805.9 783.11 805.9 783.11 805.7 837.95 805.7 837.95 805.9 837.95 805.9"
                                    fill="#055f87" />
                                <polygon points="837.95 811.65 783.11 811.65 783.11 811.44 837.95 811.44 837.95 811.65 837.95 811.65"
                                    fill="#055f87" />
                                <polygon points="837.95 816.87 783.11 816.87 783.11 816.66 837.95 816.66 837.95 816.87 837.95 816.87"
                                    fill="#055f87" />
                                <path d="M888.8,894.43h11.38V869.24H888.8v25.19Zm11.59.21h-11.8V869h11.8v25.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="837.95 844.54 783.11 844.54 783.11 844.33 837.95 844.33 837.95 844.54 837.95 844.54"
                                    fill="#055f87" />
                                <polygon points="837.95 848.21 783.11 848.21 783.11 848 837.95 848 837.95 848.21 837.95 848.21"
                                    fill="#055f87" />
                                <polygon points="837.84 863.91 783.21 863.91 783.21 863.7 837.84 863.7 837.84 863.91 837.84 863.91"
                                    fill="#055f87" />
                                <polygon points="803.76 830.94 817.29 830.94 817.29 827.27 803.76 827.27 803.76 830.94 803.76 830.94"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M887.83,882h13.32v-3.47H887.83V882Zm13.53.2H887.62v-3.88h13.74v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="784.67 811.54 798.25 811.54 798.25 815.2 784.67 815.2 784.67 811.54 784.67 811.54"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="817.26 829.96 803.7 829.96 803.7 828.25 817.26 828.25 817.26 829.96 817.26 829.96"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M887.83,882h13.32v-3.47H887.83V882Zm13.53.2H887.62v-3.88h13.74v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="817.26 828.35 803.7 828.35 803.7 828.14 817.26 828.14 817.26 828.35 817.26 828.35"
                                    fill="#055f87" />
                                <polygon points="817.26 830.06 803.7 830.06 803.7 829.86 817.26 829.86 817.26 830.06 817.26 830.06"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P1_3VA_1_status" className={this.manageSwitchesClassName('cb_1FP1')}><text transform="translate(782.72 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1FP2')}</text></g>
                            <g id="S1P1_3VA_2">
                                <path d="M960.69,914.88h22.82V899.39H960.69v15.49Zm23,.21H960.48V899.18h23.24v15.91Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <g clipPath="url(#clip-path-22)">
                                    <polygon points="847.01 888.61 901.84 888.61 901.84 794.08 847.01 794.08 847.01 888.61 847.01 888.61"
                                        fill="#a6c7d5" />
                                    <path d="M931.37,939.4h54V845.65h-54V939.4Zm54.83.78H930.58V844.86H986.2v95.32Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path
                                    d="M976.67,857.77l-.37,0-.27.07-.26.1-.25.14-.28.23-.18.2-.21.31-.15.35-.06.27,0,.36v.28l.07.29.14.36.15.25.25.29.21.19.25.15.37.16.28.06.28,0h.29l.28-.06.28-.09.27-.14.3-.23.26-.27.17-.25.12-.26.11-.38,0-.28,0-.36-.05-.28-.13-.35-.2-.32-.24-.27-.28-.23-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.31-.05-.31-.11-.29-.14-.26-.19-.23-.21-.2-.24-.17-.28-.09-.2-.11-.41,0-.32,0-.4.06-.3.1-.29.19-.37.26-.31.21-.2.34-.23.29-.13.29-.09.41,0h.1l.4,0,.3.08.28.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.11.41-.14.3-.25.35-.22.22-.25.19-.28.17-.3.11-.31.08-.32,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M940.11,857.77l-.37,0-.27.07-.26.1-.25.14-.35.29-.27.37-.2.43-.07.36,0,.27,0,.28.09.38.16.36.22.31.2.21.23.17.25.15.37.13.38.07h.19l.28,0,.29-.07.36-.15.32-.21.21-.2.18-.22.19-.34.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.25-.2-.32-.18-.19-.29-.23-.33-.18-.36-.12-.36,0Zm0,4.34-.31,0-.31-.05-.31-.11-.29-.14-.26-.19-.23-.21-.2-.25-.11-.17-.18-.4-.1-.42,0-.31,0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.35-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.26.15.32.25.2.22.23.35.13.28.11.39,0,.4,0,.42-.08.31-.12.3-.17.28-.2.24-.22.22-.27.18-.28.15-.31.1-.42.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="901.84 876.97 847.01 876.97 847.01 876.76 901.84 876.76 901.84 876.97 901.84 876.97"
                                    fill="#055f87" />
                                <polygon points="874.79 861.92 874.79 851.69 850.98 851.69 850.98 861.92 874.79 861.92 874.79 861.92"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M963.35,912.58h4v-4h-4v4Zm4.18.21h-4.39V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M963.35,907.36h4v-4h-4v4Zm4.18.21h-4.39v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M940.11,916.06l-.37,0-.27.07-.26.1-.25.14-.35.29-.27.37-.2.43-.07.36,0,.27,0,.28.09.38.16.36.16.24.26.28.23.17.25.15.37.13.38.07h.19l.28,0,.29-.07.36-.15.32-.21.21-.2.18-.22L942,919l.1-.28.06-.28,0-.29,0-.36-.1-.36-.12-.26-.2-.31-.25-.25-.22-.17-.33-.18-.36-.12-.36,0Zm0,4.34-.31,0-.31,0-.31-.11-.29-.14-.26-.19-.23-.21-.2-.25-.21-.37-.14-.41-.06-.42v-.1l0-.4.07-.3.12-.29.21-.35.19-.23.22-.2.35-.23.28-.13.3-.09.4,0h.1l.4,0,.3.08.29.11.26.15.32.25.2.22.23.35.13.28.11.39,0,.4,0,.42-.08.31-.12.3-.17.28-.2.24-.22.22-.27.18-.28.15-.31.1-.42.07Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M968.57,907.36h4v-4h-4v4Zm4.18.21h-4.39v-4.39h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="891.58 856.94 891.58 855.74 890.38 855.74 890.38 856.94 891.58 856.94 891.58 856.94"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="891.58 855.21 891.58 854.01 890.38 854.01 890.38 855.21 891.58 855.21 891.58 855.21"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="891.58 853.49 891.58 852.29 890.38 852.29 890.38 853.49 891.58 853.49 891.58 853.49"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="882.58 843.4 882.58 841.74 880.92 841.74 880.92 843.4 882.58 843.4 882.58 843.4" fill="#a6c7d5"
                                    fillRule="evenodd" />
                                <path d="M965,894.48h1.45V893H965v1.45Zm1.66.2h-1.87v-1.86h1.87v1.86Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M976.67,916.06l-.37,0-.27.07-.26.1-.25.14-.28.23-.18.2-.21.31-.15.35-.06.27,0,.36v.28l.07.29.14.36.15.25.25.29.21.19.25.15.37.16.28.06.28,0h.29l.28-.06.28-.09.27-.14.3-.23.26-.27.16-.25.13-.26.11-.38,0-.28,0-.36-.05-.28-.13-.35-.2-.32-.24-.28-.28-.22-.33-.18-.36-.12-.37,0Zm.05,4.34-.31,0-.31,0-.31-.11-.29-.14-.26-.19-.23-.21-.2-.24-.17-.28-.09-.2-.11-.41,0-.32,0-.4.06-.3.1-.29.19-.37.26-.31.22-.2.33-.23.29-.13.29-.09.41,0h.1l.4,0,.3.08.28.11.27.15.32.26.26.3.21.34.15.39.06.31,0,.39,0,.32-.11.41-.14.3-.25.35-.22.22-.25.19-.28.16-.3.12-.31.08-.32,0Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon
                                    points="901.84 843.02 884.24 843.02 884.24 818.28 901.84 818.28 901.84 818.49 884.45 818.49 884.45 842.81 901.84 842.81 901.84 843.02 901.84 843.02"
                                    fill="#055f87" />
                                <polygon
                                    points="864.61 843.02 847.01 843.02 847.01 842.81 864.4 842.81 864.4 818.49 847.01 818.49 847.01 818.28 864.61 818.28 864.61 843.02 864.61 843.02"
                                    fill="#055f87" />
                                <path d="M968.57,912.58h4v-4h-4v4Zm4.18.21h-4.39V908.4h4.39v4.39Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="901.84 805.9 847.01 805.9 847.01 805.7 901.84 805.7 901.84 805.9 901.84 805.9"
                                    fill="#055f87" />
                                <polygon points="901.84 811.65 847.01 811.65 847.01 811.44 901.84 811.44 901.84 811.65 901.84 811.65"
                                    fill="#055f87" />
                                <polygon points="901.84 816.87 847.01 816.87 847.01 816.66 901.84 816.66 901.84 816.87 901.84 816.87"
                                    fill="#055f87" />
                                <path d="M952.69,894.43h11.39V869.24H952.69v25.19Zm11.6.21h-11.8V869h11.8v25.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="901.84 844.54 847.01 844.54 847.01 844.33 901.84 844.33 901.84 844.54 901.84 844.54"
                                    fill="#055f87" />
                                <polygon points="901.84 848.21 847.01 848.21 847.01 848 901.84 848 901.84 848.21 901.84 848.21"
                                    fill="#055f87" />
                                <polygon points="901.74 863.91 847.11 863.91 847.11 863.7 901.74 863.7 901.74 863.91 901.74 863.91"
                                    fill="#055f87" />
                                <polygon points="867.66 830.94 881.19 830.94 881.19 827.27 867.66 827.27 867.66 830.94 867.66 830.94"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M951.73,882h13.32v-3.47H951.73V882Zm13.53.2H951.52v-3.88h13.74v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="848.57 811.54 862.15 811.54 862.15 815.2 848.57 815.2 848.57 811.54 848.57 811.54"
                                    fill="#055f87" fillRule="evenodd" />
                                <polygon points="881.16 829.96 867.6 829.96 867.6 828.25 881.16 828.25 881.16 829.96 881.16 829.96"
                                    fill="#d9e7ed" fillRule="evenodd" />
                                <path d="M951.73,882h13.32v-3.47H951.73V882Zm13.53.2H951.52v-3.88h13.74v3.88Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="881.16 828.35 867.6 828.35 867.6 828.14 881.16 828.14 881.16 828.35 881.16 828.35"
                                    fill="#055f87" />
                                <polygon points="881.16 830.06 867.6 830.06 867.6 829.86 881.16 829.86 881.16 830.06 881.16 830.06"
                                    fill="#055f87" />
                            </g>
                            <g id="S1P1_3VA_2_status" className={this.manageSwitchesClassName('cb_1FP2')}><text transform="translate(848.2 929.28)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_1FP2')}</text></g>
                            <g id="S0P0.1">
                                <g clipPath="url(#clip-path-23)">
                                    <polygon points="625.21 455.55 743.66 455.55 743.66 609.8 625.21 609.8 625.21 455.55 625.21 455.55"
                                        fill="#a6c7d5" />
                                    <path d="M709.45,660.7h117.9V507H709.45V660.7Zm118.45.55h-119V506.45h119v154.8Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path d="M714.73,647.44H822.07V510.66H714.73V647.44Zm107.9.55H714.17V510.1H822.63V648Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="738.39 577.64 630.49 577.64 630.49 577.09 738.39 577.09 738.39 577.64 738.39 577.64"
                                    fill="#055f87" />
                                <path d="M749.51,628.27h55.8v-32h-55.8v32Zm56.36.55H749v-33.1h56.91v33.1Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="721.9 577.37 721.35 577.37 721.35 459.2 721.9 459.2 721.9 577.37 721.9 577.37"
                                    fill="#055f87" />
                                <polygon points="665.55 577.37 665 577.37 665 459.2 665.55 459.2 665.55 577.37 665.55 577.37" fill="#055f87" />
                                <path
                                    d="M761.62,517.43a7.28,7.28,0,1,0,7.28,7.28,7.29,7.29,0,0,0-7.28-7.28Zm0,14.71a7.43,7.43,0,1,1,7.43-7.43,7.43,7.43,0,0,1-7.43,7.43Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M783.36,520.79a4.75,4.75,0,1,0,4.76,4.75,4.75,4.75,0,0,0-4.76-4.75Zm0,9.65a4.9,4.9,0,1,1,4.9-4.9,4.91,4.91,0,0,1-4.9,4.9Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M805.86,547.84h13.91v-35H805.86v35Zm14.06.15H805.71v-35.3h14.21V548Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="702.9 466.69 710.83 466.69 710.83 463.76 702.9 463.76 702.9 466.69 702.9 466.69"
                                    fill="#d9e7ed" />
                                <polygon points="711.28 466.69 719.22 466.69 719.22 463.76 711.28 463.76 711.28 466.69 711.28 466.69"
                                    fill="#d9e7ed" />
                                <path
                                    d="M738.49,631.61A5.41,5.41,0,1,0,743.9,637a5.41,5.41,0,0,0-5.41-5.41Zm0,11a5.56,5.56,0,1,1,5.56-5.56,5.57,5.57,0,0,1-5.56,5.56Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="735.88 592.84 665.27 592.84 665.27 577.37 735.88 577.37 735.88 592.84 735.88 592.84"
                                    fill="#a6c7d5" />
                                <path d="M749.51,643.74h70.06V628.82H749.51v14.92Zm70.61.55H749v-16h71.16v16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M752.8,593.31h35V546.6h-35v46.71Zm35.16.15h-35.3v-47H788v47Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M801.13,540.56v0a5.13,5.13,0,0,0-10.25,0,5.36,5.36,0,0,0,0,.7v84.32h10.26v-85Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path
                                    d="M791.21,625.28h9.7V540.84l0-.28a4.86,4.86,0,0,0-9.71,0,4.36,4.36,0,0,0,.06.67v84.07Zm10.26.55H790.66V541.24a4.23,4.23,0,0,1-.06-.7,5.41,5.41,0,0,1,10.8-.25h0l.06.27v85.27Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M801.13,545.35v0a5.13,5.13,0,1,0-10.2.67v79.56h10.26V545.35Z" transform="translate(-83.96 -51.18)"
                                    fill="#a6c7d5" />
                                <path
                                    d="M791.21,625.28h9.7V545.63l0-.28a4.87,4.87,0,0,0-9.71,0,3.8,3.8,0,0,0,.06.63v79.32Zm10.26.55H790.66V546a3.88,3.88,0,0,1-.06-.67,5.43,5.43,0,0,1,10.8-.25h0l.06.27v80.48Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <line x1="717.23" y1="552.3" x2="706.97" y2="552.3" fill="#a6c7d5" />
                                <polygon points="717.23 552.58 706.97 552.58 706.97 552.03 717.23 552.03 717.23 552.58 717.23 552.58"
                                    fill="#055f87" />
                                <polygon points="721.82 461.65 630.49 461.65 630.49 461.51 721.82 461.51 721.82 461.65 721.82 461.65"
                                    fill="#055f87" />
                                <path d="M752.8,617.27h4.72v-9.76H752.8v9.76Zm4.87.15h-5V607.36h5v10.06Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="683.85 539.98 671.13 539.98 671.13 536.35 683.85 536.35 683.85 539.98 683.85 539.98"
                                    fill="#055f87" />
                                <path
                                    d="M780.46,566.91a4.8,4.8,0,1,0,4.79,4.79,4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,4.94,4.94,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M759.91,566.91a4.8,4.8,0,1,0,4.79,4.79,4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,5,5,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="671.49 504.18 680.54 504.18 680.54 499.65 671.49 499.65 671.49 504.18 671.49 504.18"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M755.52,555.28h8.91V550.9h-8.91v4.38Zm9.06.15h-9.2v-4.67h9.2v4.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="724.88 559.66 734.79 559.66 734.79 564.25 724.88 564.25 724.88 559.66 724.88 559.66"
                                    fill="#a6c7d5" />
                                <path d="M808.92,615.35h9.76v-4.44h-9.76v4.44Zm9.9.15H808.77v-4.73h10.05v4.73Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="665.27 573.97 630.49 573.97 630.49 477.26 665.27 477.26 665.27 573.97 665.27 573.97"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M714.73,624.88H749V528.72H714.73v96.16Zm34.78.55H714.17V528.17h35.34v97.26Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="653.47 549.06 656.57 549.06 656.57 546.54 653.47 546.54 653.47 549.06 653.47 549.06"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M737.51,600.17h3v-2.38h-3v2.38Zm3.1.15h-3.25v-2.67h3.25v2.67Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="641.61 483.81 643.07 483.81 643.07 482.36 641.61 482.36 641.61 483.81 641.61 483.81"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M725.65,534.91H727v-1.29h-1.31v1.29Zm1.46.15H725.5v-1.59h1.61v1.59Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="636.84 516.63 638.3 516.63 638.3 515.19 636.84 515.19 636.84 516.63 636.84 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="639.27 516.63 640.73 516.63 640.73 515.19 639.27 515.19 639.27 516.63 639.27 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="641.7 516.63 643.16 516.63 643.16 515.19 641.7 515.19 641.7 516.63 641.7 516.63" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="644.13 516.63 645.59 516.63 645.59 515.19 644.13 515.19 644.13 516.63 644.13 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="650.52 521.2 651.98 521.2 651.98 519.76 650.52 519.76 650.52 521.2 650.52 521.2" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="650.52 527.37 651.98 527.37 651.98 525.93 650.52 525.93 650.52 527.37 650.52 527.37"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="650.52 535.68 651.98 535.68 651.98 534.24 650.52 534.24 650.52 535.68 650.52 535.68"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="650.52 543.53 651.98 543.53 651.98 542.09 650.52 542.09 650.52 543.53 650.52 543.53"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M716.72,623.09H747V530.51H716.72v92.58Zm30.39.14H716.58V530.36h30.53v92.87Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M722.67,614.92a1.62,1.62,0,1,1-1.62-1.61,1.62,1.62,0,0,1,1.62,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M721.05,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M732,614.92a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z" transform="translate(-83.96 -51.18)"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M730.4,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.68-1.69,1.69,1.69,0,0,1-1.68,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M744.58,614.92a1.62,1.62,0,1,1-1.62-1.61,1.61,1.61,0,0,1,1.62,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M743,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M744.29,588.76a1.61,1.61,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M742.68,587.23a1.54,1.54,0,1,0,1.54,1.53,1.54,1.54,0,0,0-1.54-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M725.8,588.76a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M724.19,587.23a1.54,1.54,0,1,0,1.53,1.53,1.54,1.54,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M725.8,580.54a1.62,1.62,0,1,1-1.61-1.61,1.62,1.62,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M724.19,579a1.54,1.54,0,1,0,1.53,1.53,1.53,1.53,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="634.11 481.09 641.64 481.09 641.64 484.99 634.11 484.99 634.11 481.09 634.11 481.09"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M718.15,536.1h7.38v-3.76h-7.38v3.76Zm7.53.15H718v-4.06h7.68v4.06Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path
                                    d="M743,531.85a2.52,2.52,0,1,0,2.52,2.52,2.52,2.52,0,0,0-2.52-2.52Zm0,5.18a2.67,2.67,0,1,1,2.67-2.66A2.66,2.66,0,0,1,743,537Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M742.8,535.35h.49v-2h-.49v2Zm.63.14h-.78v-2.25h.78v2.25Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="639.49 530.15 639.38 530.04 641.06 528.48 641.16 528.59 639.49 530.15 639.49 530.15"
                                    fill="#055f87" />
                                <polygon points="639.49 538.37 639.38 538.26 641.06 536.7 641.16 536.81 639.49 538.37 639.49 538.37"
                                    fill="#055f87" />
                                <polygon points="657.98 538.37 657.88 538.26 659.55 536.7 659.65 536.81 657.98 538.37 657.98 538.37"
                                    fill="#055f87" />
                                <polygon
                                    points="660.55 566.65 635.93 566.65 635.93 570.75 640.14 570.75 640.14 573.55 643.37 573.55 643.37 570.75 653.17 570.75 653.17 573.55 656.4 573.55 656.4 570.75 660.55 570.75 660.55 566.65 660.55 566.65"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M737.21,624.66h3.09v-2.24h4.14v-4.51H720v4.51h4.21v2.24h3.1v-2.24h9.94v2.24Zm3.23.15h-3.38v-2.24h-9.65v2.24H724v-2.24h-4.21v-4.81h24.77v4.81h-4.15v2.24Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M716.72,559.81H747V538.32H716.72v21.49Zm30.39.14H716.58V538.17h30.53V560Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="634.5 503.63 661.25 503.63 661.25 491.87 634.5 491.87 634.5 503.63 634.5 503.63"
                                    fill="#e5f3f8" />
                                <polygon points="639.18 506.99 640.98 506.99 640.98 505.19 639.18 505.19 639.18 506.99 639.18 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="654.77 506.99 656.57 506.99 656.57 505.19 654.77 505.19 654.77 506.99 654.77 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                            </g>
                            <g id="S0P0.1_status" className={this.manageSwitchesClassName('cb_Q4')}><text transform="translate(662.04 679.67)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_Q4')}</text></g>
                            <g id="S1P1.1">
                                <g clipPath="url(#clip-path-24)">
                                    <polygon points="783.51 455.55 901.96 455.55 901.96 609.8 783.51 609.8 783.51 455.55 783.51 455.55"
                                        fill="#a6c7d5" />
                                    <path d="M867.75,660.7h117.9V507H867.75V660.7Zm118.45.55h-119V506.45h119v154.8Z"
                                        transform="translate(-83.96 -51.18)" fill="#055f87" />
                                </g>
                                <path d="M873,647.44H980.37V510.66H873V647.44Zm107.9.55H872.47V510.1H980.93V648Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="896.69 577.64 788.78 577.64 788.78 577.09 896.69 577.09 896.69 577.64 896.69 577.64"
                                    fill="#055f87" />
                                <path d="M907.81,628.27h55.8v-32h-55.8v32Zm56.36.55H907.26v-33.1h56.91v33.1Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="880.2 577.37 879.65 577.37 879.65 459.2 880.2 459.2 880.2 577.37 880.2 577.37"
                                    fill="#055f87" />
                                <polygon points="823.85 577.37 823.3 577.37 823.3 459.2 823.85 459.2 823.85 577.37 823.85 577.37"
                                    fill="#055f87" />
                                <path
                                    d="M919.92,517.43a7.28,7.28,0,1,0,7.28,7.28,7.29,7.29,0,0,0-7.28-7.28Zm0,14.71a7.43,7.43,0,1,1,7.43-7.43,7.43,7.43,0,0,1-7.43,7.43Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M941.66,520.79a4.75,4.75,0,1,0,4.76,4.75,4.75,4.75,0,0,0-4.76-4.75Zm0,9.65a4.9,4.9,0,1,1,4.9-4.9,4.91,4.91,0,0,1-4.9,4.9Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M964.16,547.84h13.91v-35H964.16v35Zm14.06.15H964v-35.3h14.21V548Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="861.2 466.69 869.13 466.69 869.13 463.76 861.2 463.76 861.2 466.69 861.2 466.69"
                                    fill="#d9e7ed" />
                                <polygon points="869.58 466.69 877.51 466.69 877.51 463.76 869.58 463.76 869.58 466.69 869.58 466.69"
                                    fill="#d9e7ed" />
                                <path
                                    d="M896.79,631.61A5.41,5.41,0,1,0,902.2,637a5.41,5.41,0,0,0-5.41-5.41Zm0,11a5.56,5.56,0,1,1,5.56-5.56,5.57,5.57,0,0,1-5.56,5.56Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="894.18 592.84 823.57 592.84 823.57 577.37 894.18 577.37 894.18 592.84 894.18 592.84"
                                    fill="#a6c7d5" />
                                <path d="M907.81,643.74h70.06V628.82H907.81v14.92Zm70.61.55H907.26v-16h71.16v16Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M911.1,593.31h35V546.6h-35v46.71Zm35.16.15H911v-47h35.3v47Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <path d="M959.43,540.56v0a5.13,5.13,0,0,0-10.25,0,5.36,5.36,0,0,0,.05.7v84.32h10.26v-85Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" />
                                <path
                                    d="M949.51,625.28h9.7V540.84l-.05-.28a4.86,4.86,0,0,0-9.71,0,4.36,4.36,0,0,0,.06.67v84.07Zm10.26.55H949V541.24a4.23,4.23,0,0,1-.06-.7,5.41,5.41,0,0,1,10.8-.25h0l.06.27v85.27Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M959.43,545.35v0a5.13,5.13,0,1,0-10.2.67v79.56h10.26V545.35Z" transform="translate(-83.96 -51.18)"
                                    fill="#a6c7d5" />
                                <path
                                    d="M949.51,625.28h9.7V545.63l-.05-.28a4.87,4.87,0,0,0-9.71,0,3.8,3.8,0,0,0,.06.63v79.32Zm10.26.55H949V546a3.88,3.88,0,0,1-.06-.67,5.43,5.43,0,0,1,10.8-.25h0l.06.27v80.48Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <line x1="875.53" y1="552.3" x2="865.27" y2="552.3" fill="#a6c7d5" />
                                <polygon points="875.53 552.58 865.27 552.58 865.27 552.03 875.53 552.03 875.53 552.58 875.53 552.58"
                                    fill="#055f87" />
                                <polygon points="880.12 461.65 788.78 461.65 788.78 461.51 880.12 461.51 880.12 461.65 880.12 461.65"
                                    fill="#055f87" />
                                <path d="M911.1,617.27h4.72v-9.76H911.1v9.76Zm4.87.15h-5V607.36h5v10.06Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="842.15 539.98 829.43 539.98 829.43 536.35 842.15 536.35 842.15 539.98 842.15 539.98"
                                    fill="#055f87" />
                                <path
                                    d="M938.76,566.91a4.8,4.8,0,1,0,4.79,4.79,4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,4.94,4.94,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M918.21,566.91A4.8,4.8,0,1,0,923,571.7a4.8,4.8,0,0,0-4.79-4.79Zm0,9.73a4.94,4.94,0,1,1,4.94-4.94,5,5,0,0,1-4.94,4.94Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="829.78 504.18 838.84 504.18 838.84 499.65 829.78 499.65 829.78 504.18 829.78 504.18"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M913.82,555.28h8.91V550.9h-8.91v4.38Zm9.06.15h-9.2v-4.67h9.2v4.67Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="883.18 559.66 893.09 559.66 893.09 564.25 883.18 564.25 883.18 559.66 883.18 559.66"
                                    fill="#a6c7d5" />
                                <path d="M967.22,615.35H977v-4.44h-9.76v4.44Zm9.9.15h-10v-4.73h10v4.73Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="823.57 573.97 788.78 573.97 788.78 477.26 823.57 477.26 823.57 573.97 823.57 573.97"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M873,624.88h34.23V528.72H873v96.16Zm34.78.55H872.47V528.17h35.34v97.26Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="811.77 549.06 814.87 549.06 814.87 546.54 811.77 546.54 811.77 549.06 811.77 549.06"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M895.81,600.17h3v-2.38h-3v2.38Zm3.1.15h-3.25v-2.67h3.25v2.67Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="799.91 483.81 801.37 483.81 801.37 482.36 799.91 482.36 799.91 483.81 799.91 483.81"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M884,534.91h1.31v-1.29H884v1.29Zm1.46.15H883.8v-1.59h1.61v1.59Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="795.14 516.63 796.6 516.63 796.6 515.19 795.14 515.19 795.14 516.63 795.14 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="797.57 516.63 799.03 516.63 799.03 515.19 797.57 515.19 797.57 516.63 797.57 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="800 516.63 801.46 516.63 801.46 515.19 800 515.19 800 516.63 800 516.63" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="802.43 516.63 803.89 516.63 803.89 515.19 802.43 515.19 802.43 516.63 802.43 516.63"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="808.82 521.2 810.28 521.2 810.28 519.76 808.82 519.76 808.82 521.2 808.82 521.2" fill="#e5f3f8"
                                    fillRule="evenodd" />
                                <polygon points="808.82 527.37 810.28 527.37 810.28 525.93 808.82 525.93 808.82 527.37 808.82 527.37"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="808.82 535.68 810.28 535.68 810.28 534.24 808.82 534.24 808.82 535.68 808.82 535.68"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="808.82 543.53 810.28 543.53 810.28 542.09 808.82 542.09 808.82 543.53 808.82 543.53"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <path d="M875,623.09h30.24V530.51H875v92.58Zm30.39.14H874.88V530.36h30.53v92.87Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M881,614.92a1.62,1.62,0,1,1-1.62-1.61,1.62,1.62,0,0,1,1.62,1.61Z" transform="translate(-83.96 -51.18)"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M879.35,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M890.31,614.92a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M888.7,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.68-1.69,1.69,1.69,0,0,1-1.68,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M902.88,614.92a1.62,1.62,0,1,1-1.62-1.61,1.61,1.61,0,0,1,1.62,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M901.26,613.38a1.54,1.54,0,1,0,1.54,1.54,1.54,1.54,0,0,0-1.54-1.54Zm0,3.23a1.69,1.69,0,1,1,1.69-1.69,1.69,1.69,0,0,1-1.69,1.69Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M902.59,588.76a1.61,1.61,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M901,587.23a1.54,1.54,0,1,0,1.54,1.53,1.54,1.54,0,0,0-1.54-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M884.1,588.76a1.62,1.62,0,1,1-1.61-1.61,1.61,1.61,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M882.49,587.23a1.54,1.54,0,1,0,1.53,1.53,1.54,1.54,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M884.1,580.54a1.62,1.62,0,1,1-1.61-1.61,1.62,1.62,0,0,1,1.61,1.61Z"
                                    transform="translate(-83.96 -51.18)" fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M882.49,579a1.54,1.54,0,1,0,1.53,1.53,1.53,1.53,0,0,0-1.53-1.53Zm0,3.22a1.69,1.69,0,1,1,0-3.37,1.69,1.69,0,0,1,0,3.37Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="792.41 481.09 799.94 481.09 799.94 484.99 792.41 484.99 792.41 481.09 792.41 481.09"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path d="M876.45,536.1h7.38v-3.76h-7.38v3.76Zm7.53.15H876.3v-4.06H884v4.06Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path
                                    d="M901.34,531.85a2.52,2.52,0,1,0,2.52,2.52,2.52,2.52,0,0,0-2.52-2.52Zm0,5.18a2.67,2.67,0,1,1,2.67-2.66,2.66,2.66,0,0,1-2.67,2.66Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M901.1,535.35h.49v-2h-.49v2Zm.63.14H901v-2.25h.78v2.25Z" transform="translate(-83.96 -51.18)"
                                    fill="#055f87" />
                                <polygon points="797.78 530.15 797.68 530.04 799.36 528.48 799.46 528.59 797.78 530.15 797.78 530.15"
                                    fill="#055f87" />
                                <polygon points="797.78 538.37 797.68 538.26 799.36 536.7 799.46 536.81 797.78 538.37 797.78 538.37"
                                    fill="#055f87" />
                                <polygon points="816.28 538.37 816.18 538.26 817.86 536.7 817.96 536.81 816.28 538.37 816.28 538.37"
                                    fill="#055f87" />
                                <polygon
                                    points="818.85 566.65 794.23 566.65 794.23 570.75 798.44 570.75 798.44 573.55 801.67 573.55 801.67 570.75 811.47 570.75 811.47 573.55 814.71 573.55 814.71 570.75 818.85 570.75 818.85 566.65 818.85 566.65"
                                    fill="#a6c7d5" fillRule="evenodd" />
                                <path
                                    d="M895.51,624.66h3.09v-2.24h4.14v-4.51H878.26v4.51h4.21v2.24h3.1v-2.24h9.94v2.24Zm3.23.15h-3.38v-2.24h-9.65v2.24h-3.38v-2.24h-4.21v-4.81h24.77v4.81h-4.15v2.24Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <path d="M875,559.81h30.24V538.32H875v21.49Zm30.39.14H874.88V538.17h30.53V560Z"
                                    transform="translate(-83.96 -51.18)" fill="#055f87" />
                                <polygon points="792.8 503.63 819.55 503.63 819.55 491.87 792.8 491.87 792.8 503.63 792.8 503.63"
                                    fill="#e5f3f8" />
                                <polygon points="797.48 506.99 799.28 506.99 799.28 505.19 797.48 505.19 797.48 506.99 797.48 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                                <polygon points="813.07 506.99 814.87 506.99 814.87 505.19 813.07 505.19 813.07 506.99 813.07 506.99"
                                    fill="#e5f3f8" fillRule="evenodd" />
                            </g>
                            <g id="S1P1.1_status" className={this.manageSwitchesClassName('cb_Q1')}><text transform="translate(798.64 679.67)" fontSize="21"
                                fontFamily="ArialMT, Arial">{this.manageSwitchesState('cb_Q1')}</text></g>
                            <g id="S2P2.1_overlay" className={this.manageSwitchesClassName('cb_2F1')} 
                            onClick={() => this.openProperties('cb_2F1','2F1',`${t('slideUpDialogCircuitSection')} TR2`,'Budynek 1B - P2')}>
                                <rect x="3.44" y="128.32" width="180" height="80.87" />
                            </g>
                            <g id="S2P2.2_overlay" className={this.manageSwitchesClassName('cb_2F2')}
                            onClick={() => this.openProperties('cb_2F2','2F2',`${t('slideUpDialogCircuitSection')} TR2`,'Budynek 2 - RG')}>
                                <rect x="3.44" y="209.19" width="180" height="80.87" />
                            </g>
                            <g id="S2P2.3_overlay" className={this.manageSwitchesClassName('cb_2F4')}
                            onClick={() => this.openProperties('cb_2F4','2F4',`${t('slideUpDialogCircuitSection')} TR2`,'Budynek 2 - R1')}>
                                <rect x="3.44" y="290.12" width="180" height="80.87" />
                            </g>
                            <g id="S2P2.4_overlay" className={this.manageSwitchesClassName('cb_2F5')}
                            onClick={() => this.openProperties('cb_2F5','2F5',`${t('slideUpDialogCircuitSection')} TR2`,'Budynek 1A')}>
                                <rect x="3.44" y="370.99" width="180" height="80.87" />
                            </g>
                            <g id="S2P2.5_overlay" className={this.manageSwitchesClassName('cb_2F6')}
                            onClick={() => this.openProperties('cb_2F6','2F6',`${t('slideUpDialogCircuitSection')} TR2`,'Parking')}>
                                <rect x="3.44" y="451.86" width="180" height="80.87" />
                            </g>
                            <g id="S2P2.10_overlay" className='static'>
                                <rect x="3.44" y="856.15" width="180" height="88.01" />
                            </g>
                            <g id="S2P3.1_overlay" className={this.manageSwitchesClassName('cb_2F3')}
                            onClick={() => this.openProperties('cb_2F3','2F3',`${t('slideUpDialogCircuitSection')} TR2`,'Budynek 01 - MSB2')}>
                                <rect x="320.44" y="370.93" width="137" height="323.48" />
                            </g>
                            <g id="S2P1.1_overlay" className={this.manageSwitchesClassName('cb_Q2')}
                            onClick={() => this.openProperties('TR2','Q2',`${t('slideUpDialogCircuitTransformer')} TR2`,`${t('slideUpDialogCircuitSection')} TR2`)}>
                                <rect x="457.44" y="370.77" width="137" height="323.48" />
                            </g>
                            <g id="S0P0.1_overlay" className="static">
                                <rect x="594.44" y="370.93" width="180" height="323.48" />
                            </g>
                            <g id="S1P1.1_overlay" className={this.manageSwitchesClassName('cb_Q1')}
                            onClick={() => this.openProperties('TR1','Q1',`${t('slideUpDialogCircuitTransformer')} TR1`,`${t('slideUpDialogCircuitSection')} TR1`)}>
                                <rect x="774.44" y="370.77" width="136.6" height="323.48" />
                            </g>
                            <g id="S1P2.1_overlay" className={this.manageSwitchesClassName('cb_1F2')}
                            onClick={() => this.openProperties('cb_1F2','1F2',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 3 - komp.')}>
                                <rect x="911.04" y="128.32" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.2_overlay" className={this.manageSwitchesClassName('cb_1F3')}
                            onClick={() => this.openProperties('cb_1F3','1F3',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 1A - komp.')}>
                                <rect x="911.04" y="209.18" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.3_overlay" className={this.manageSwitchesClassName('cb_1F4')}
                            onClick={() => this.openProperties('cb_1F4','1F4',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 1A - klim.')}>
                                <rect x="911.04" y="289.84" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.4_overlay" className={this.manageSwitchesClassName('cb_1F5')}
                            onClick={() => this.openProperties('cb_1F5','1F5',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 3 - RG')}>
                                <rect x="911.04" y="370.79" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.5_overlay" className={this.manageSwitchesClassName('cb_1F6')}
                            onClick={() => this.openProperties('cb_1F6','1F6',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 2 - RG')}>
                                <rect x="911.04" y="451.86" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.6_overlay" className={this.manageSwitchesClassName('cb_1F7')}
                            onClick={() => this.openProperties('cb_1F7','1F7',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 2 - RG')}>
                                <rect x="911.04" y="532.67" width="180" height="80.87" />
                            </g>
                            <g id="S1P2.10_overlay" className='static'>
                                <rect x="911.04" y="856.2" width="180" height="87.82" />
                            </g>
                            <g id="S1P3.1_overlay" className={this.manageSwitchesClassName('cb_1F1')}
                            onClick={() => this.openProperties('cb_1F1','1F1',`${t('slideUpDialogCircuitSection')} TR1`,'Budynek 01 - MSB1')}>
                                <rect x="1228.44" y="370.93" width="136.6" height="323.48" />
                            </g>
                            <g id="S1P4.3_overlay" className={this.manageSwitchesClassName('cb_3F1')}
                            onClick={() => this.openProperties('cb_3F1','3F1','Sekcja GEN','Budynek 2 - serwer.')}>
                                <rect x="1365.24" y="532.73" width="180" height="80.87" />
                            </g>
                            <g id="S1P4.4_overlay" className={this.manageSwitchesClassName('cb_3F2')}
                            onClick={() => this.openProperties('cb_3F2','3F2','Sekcja GEN','Budynek 01 - MSG')}>
                                <rect x="1365.44" y="613.6" width="180" height="80.87" />
                            </g>
                            <g id="S1P4_3VA_1_overlay" className="closed">
                                <rect x="1365.44" y="85.62" width="90" height="366.18" />
                            </g>
                            <g id="S1P4_3VA_2_overlay" className="closed">
                                <rect x="1455.44" y="85.62" width="90" height="366.18" />
                            </g>
                            <g id="S2P1_3VA_1_overlay" className={this.manageSwitchesClassName('cb_2FP1')}
                            onClick={() => this.openProperties('cb_2FP1','2FP1','TR2','Budynek 01 - MSF')}>
                                <rect x="457.64" y="694.41" width="68.3" height="249.61" />
                            </g>
                            <g id="S2P1_3VA_2_overlay" className={this.manageSwitchesClassName('cb_2FP2')}
                            onClick={() => this.openProperties('cb_2FP2','2FP2','TR2','RPZOK')}>
                                <rect x="525.94" y="694.41" width="68.3" height="249.61" />
                            </g>
                            <g id="S1P1_3VA_1_overlay" className={this.manageSwitchesClassName('cb_1FP1')}
                            onClick={() => this.openProperties('cb_1FP1','1FP1','TR1','Budynek 01 - MSF')}>
                                <rect x="774.64" y="694.41" width="68.3" height="249.61" />
                            </g>
                            <g id="S1P1_3VA_2_overlay" className={this.manageSwitchesClassName('cb_1FP2')}
                            onClick={() => this.openProperties('cb_1FP2','1FP2','TR1','RPZOK')}>
                                <rect x="842.94" y="694.41" width="68.3" height="249.61" />
                            </g>
                            <g id="Roof">
                                <polygon points="1669.84 33.62 3.44 33.62 53.44 1.82 1719.44 1.82 1669.84 33.62" fill="#a6c7d5" stroke="#055f87"
                                    strokeMiterlimit="10" strokeWidth="2" />
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
        params: state.switchesStateReducer,
        dialogOpen: state.dialogReducer.openDialog
    };
}

const mapDispatchToProps = {
    manageDialogOpen
  };

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Elevation))