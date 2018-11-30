import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>
            <h2 className="title">Login to Flamingle!</h2>
            <div>
                Demoing instructions: be sure to open the app in two browsers OR using incognito/private
                <div>
                    username: demo password: 1234567890<br/>
                    username: demo2 password: 1234567890<br/> <br/> 
                </div>
            </div>
            <LoginForm />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
