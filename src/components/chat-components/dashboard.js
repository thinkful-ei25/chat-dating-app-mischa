import React,{Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ActiveRooms from '../dashboard-components/active-rooms'
import NewChatRoom from './newChatRoomBtn';
import { logOutOnClose } from '../../utils';
import { Redirect } from 'react-router-dom';
// import {Link, Redirect} from 'react-router-dom';


export class Dashboard extends Component {
  componentDidMount(){
    //logout automatically if user closes window (don't remove authkey)
    window.onbeforeunload = function () {
      logOutOnClose(this._wasPageCleanedUp);   
   };
  };
  
  render(){
    // if (!this.props.loggedIn) {
    //   return <Redirect to="/" />;
    // }
    return (
      <Fragment>
        <ActiveRooms />
        <h2>Do you want to start a chat?</h2>
        <NewChatRoom />
      </Fragment>
    )

  }
  }
      

const mapStateToProps = state => {
    return ({
      loggedIn: state.auth.username
    })
  };
  
  export default connect(mapStateToProps)(Dashboard);
  