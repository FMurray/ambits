/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Login from './login/login.jsx';
import * as loginCtrl from './login/loginCtrl';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router';
import BottomNav from './home/components/bottomNav/bottomNav.jsx';
import Avatar from 'material-ui/Avatar';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

var custom_darkBaseTheme = darkBaseTheme;
custom_darkBaseTheme.palette.primary1Color = '#9f0026';
custom_darkBaseTheme.palette.primary2Color = '#9f0026';
custom_darkBaseTheme.palette.accent1Color = '#827d7d';
custom_darkBaseTheme.palette.textColor = '#ffffff';
custom_darkBaseTheme.palette.secondaryTextColor = '#ffffff';
custom_darkBaseTheme.palette.alternateTextColor = '#ffffff';
var muiTheme = getMuiTheme(custom_darkBaseTheme);


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!loginCtrl.getJwt(),
      drawerOpen: false,
      user: ''
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDrawer(e) {
    console.log('toggled nav menu!');
    e.preventDefault();
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleLogout() {
    loginCtrl.logout();
    this.setState({
      isLoggedIn: false
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({drawerOpen: false});
  }

  getChildContext() {
    return {user: this.state.user};
  }

  render() {
    window.Username = this.state.user;
    const logOutButton = this.state.isLoggedIn ?
      (<FlatButton label="Logout"
        onTouchTap={this.handleLogout.bind(this)}
       />
      ) :
      null;
    const LoginModal = !this.state.isLoggedIn ?
      (<Login main={this} />) :
      null;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer
            width={250}
            open={this.state.drawerOpen}
            docked={false}
            onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
            >
            <MenuItem onTouchTap={this.handleClose}>Home</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Profile</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Friends</MenuItem>
          </Drawer>
          <AppBar
            title='Ambet'
            iconElementRight={logOutButton}
            showMenuIconButton={false}
            children={<div><Avatar />{this.state.user}</div>}
          />
          {LoginModal}
          {this.props.children}
          <BottomNav />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.childContextTypes = {
  user: React.PropTypes.string
};
// onLeftIconButtonTouchTap={this.toggleDrawer}
export default Main;
