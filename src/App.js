import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import EventIcon from '@material-ui/icons/Event';
import LanguageIcon from '@material-ui/icons/Language';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Overview from './components/Overview';
import Elevation from './components/Elevation';
import Events from './components/Events';
import SlideupDialog from './components/SlideupDialog';
import { connect } from 'react-redux';
import { manageLanguageDialog } from './actions/languageDialog';
import { manageDrawerOpen } from './actions/index';
import LanguageDialog from './components/LanguageSelectionDialog';
import { getIntervalData1Min, getIntervalData15Min } from './actions/mindsphereDataUpdateInterval';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'block',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top: '44px',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    top: "44px",
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 4px',

  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(7) + 1,
    padding: theme.spacing(3),
  },
});

class App extends React.Component {

  handleDrawerOpen = (open) => {
    this.props.manageDrawerOpen(open)
  }

  interval15sec = null;
  interval15min = null;

  componentDidMount() {
    this.props.getIntervalData1Min()
    this.props.getIntervalData15Min()

    this.interval15sec = setInterval(()=>{
      this.props.getIntervalData1Min()
    },15000)
    this.interval15min = setInterval(()=>{
      this.props.getIntervalData15Min()
    },900000)
  }

  componentWillUnmount() {
    clearInterval(this.interval15sec)
    clearInterval(this.interval15min)
  }

  render() {
    const { classes, t } = this.props;
    let open = this.props.drawerOpen;
    return (
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}

            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            open={open}
          >
            <div className={classes.toolbar} >
              <IconButton onClick={open === false ? () => this.handleDrawerOpen(true) : () => this.handleDrawerOpen(false)}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </div>
            <Divider />
            <List onClick={open ? () => this.handleDrawerOpen(false) : null} onBlur={open ? () => this.handleDrawerOpen(false) : null}>
              <ListItem button component={Link} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={t('overview')} />
              </ListItem>
              <ListItem button component={Link} to="/elewacja">
                <ListItemIcon><ViewArrayIcon /></ListItemIcon>
                <ListItemText primary={t('elevation')} />
              </ListItem>
              <ListItem button component={Link} to="/zdarzenia">
                <ListItemIcon><EventIcon /></ListItemIcon>
                <ListItemText primary={t('events')} />
              </ListItem>
              <Divider />
              <ListItem button onClick={()=>this.props.manageLanguageDialog(true)}>
                <ListItemIcon><LanguageIcon /></ListItemIcon>
                <ListItemText primary={t('language')} />
              </ListItem>
            </List>
            
          </Drawer>
          <main className={classes.content} >
            <div className={classes.toolbar} />
            <Route exact path="/" component={Overview} />
            <Route path="/elewacja" component={Elevation} />
            <Route path="/zdarzenia" component={Events} />
          </main>
          <SlideupDialog/>
          <LanguageDialog/>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.drawerReducer.drawerOpen,
    languageDialogOpen: state.languageDialogReducer.openDialog,
    applicationLanguage: state.languageDialogReducer.language,
    checkStates: state.switchesStateReducer
  };
}

const mapDispatchToProps = {
  manageLanguageDialog,
  manageDrawerOpen,
  getIntervalData1Min,
  getIntervalData15Min
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(App)))
