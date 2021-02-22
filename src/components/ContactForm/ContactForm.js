import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import shortid from 'shortid';

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();

    this.props.onSubmit(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label} htmlFor={this.inputNameId}>
          {' '}
          Name{' '}
        </label>
        <input
          className={s.input}
          type="text"
          id={this.inputNameId}
          value={this.state.name}
          name="name"
          onChange={this.handlerChange}
        />
        <label className={s.label} htmlFor={this.inputNumberId}>
          {' '}
          Number{' '}
        </label>
        <input
          className={s.input}
          type="tel"
          id={this.inputNumberId}
          value={this.state.number}
          name="number"
          onChange={this.handlerChange}
        />
        <button className={s.button}>Add contact</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(contactsActions.addContact(name, number))
});

export default connect(null, mapDispatchToProps)(ContactForm);

