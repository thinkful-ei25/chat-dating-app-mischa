import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from './input';
import DemoBtn from './DemoBtn';
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
} from '../../validators';
import Loader from '../loader';
import './registration-form.css';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    const { loading } = this.props;
    return (
      <form
        className="registration input-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <label htmlFor="firstName">First name</label>
        <Field
          className="input-form"
          component={Input}
          type="text"
          name="firstName"
        />
        <label htmlFor="lastName">Last name</label>
        <Field
          className="input-form"
          component={Input}
          type="text"
          name="lastName"
        />
        <label htmlFor="username">Username</label>
        <Field
          className="input-form"
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          className="input-form"
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          className="input-form"
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <button
              className="button register-btn"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Register
            </button>
            <DemoBtn demo={1} />
            <DemoBtn demo={2} />
          </Fragment>
        )}
      </form>
    );
  }
}
const mapStateToProps = state => {
  const { loading } = state.auth;
  return {
    loading,
  };
};
RegistrationForm = connect(mapStateToProps)(RegistrationForm);
export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0])),
})(RegistrationForm);
