import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import './login-form.css';
import { connect } from 'react-redux';
import Loader from '../loader';
export class LoginForm extends Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    const { error: err, loading } = this.props;
    let error;
    if (err) {
      error = (
        <div className="form-error" aria-live="polite">
          {err}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}
        <label htmlFor="username">Username</label>
        <Field
          className="input-form"
          component={Input}
          // component='input'
          type="text"
          name="username"
          id="username"
          validate={[required, nonEmpty]}
        />

        <label htmlFor="password">Password</label>
        <Field
          className="input-form"
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        {loading ? (
          <Loader />
        ) : (
          <button
            className="button input-form login-btn"
            disabled={this.props.pristine || this.props.submitting}
          >
            Log in
          </button>
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
LoginForm = connect(mapStateToProps)(LoginForm);
export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
