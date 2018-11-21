import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import NewChatRoom from './newChatRoomBtn';
import {Link, Redirect} from 'react-router-dom';


export function Dashboard() {


    return (
      <Fragment>
        <h2>Do you want to start a chat?</h2>
        <NewChatRoom />
      </Fragment>
      
      //start chat button
    )
  
}

const mapStateToProps = state => {
    console.log(state.auth);
    return ({
      loggedIn: state.auth.username
    })
  };
  
  export default connect(mapStateToProps)(Dashboard);
  