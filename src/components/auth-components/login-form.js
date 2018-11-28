import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../../validators';
import {Link} from 'react-router-dom';
import loginForm from '../../css/loginForm.css'
export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
      // console.log(this.props);
        let error;
        if (this.props.error) {
        //   console.log('error:',this.props.error);
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    // component='input'
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty]}
                />

                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    // component='input'
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                <button className="button login-btn" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
          
                <p>OR! </p>
               <Link className="button register-btn" to="/register">Register</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
