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
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import OverviewTest from './components/OverviewTest';
import ElevationTest from './components/ElevationTest';
import SlideupDialog from './components/SlideupDialog';
import { connect } from 'react-redux';

import { manageDrawerOpen } from './actions/index';

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
    this.props.dispatch(manageDrawerOpen(open))
  }

  render() {
    const { classes } = this.props;
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
                <ListItemText primary="Przegląd" />
              </ListItem>
              <ListItem button component={Link} to="/elevation">
                <ListItemIcon><ViewArrayIcon /></ListItemIcon>
                <ListItemText primary="Elewacja" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content} >
            <div className={classes.toolbar} />
            <Route exact path="/" component={OverviewTest} />
            <Route path="/elevation" component={ElevationTest} />
          </main>
        </Router>
        <SlideupDialog/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.drawerOpen
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App))
