import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import appearFormStyles from './transitionsStyles/appearFormStyles.module.css';
import fadeStyles from './transitionsStyles/fade.module.css';
import searchFadeStyles from './transitionsStyles/searchFadeStyles.module.css';
import shortid from 'shortid';
import Container from './components/Container';
import Title from './components/Title';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Alert from './components/Alert';
import alertStyle from './transitionsStyles/fadeAlertStyle.module.css';

export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    error: false,
    textAlert: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (this.state.contacts.some(contact => contact.name === name)) {
      this.showAlert(`${name} is already in contacts`);
    } else if (contact.name === '') {
      this.showAlert('Please enter your contact name!');
    } else if (contact.number === '') {
      this.showAlert('Please enter the contact phone number!');
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  showAlert = (text) => {
    this.setState({ error: true, textAlert: text });
    setTimeout(() => this.setState({ error: false}), 2000);
 
}

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, error, textAlert } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <CSSTransition in={error} classNames={alertStyle} timeout={250} unmountOnExit>
          <Alert text={textAlert}/>
        </CSSTransition>
        <Title title="Phonebook" level={1} />
        <CSSTransition in={true} appear={true} timeout={500} classNames={appearFormStyles} unmountOnExit>
          <ContactForm onSubmit={this.addContact} />
        </CSSTransition>
        <Title title="Contacts" level={2} />
        <CSSTransition in={visibleContacts.length !== 0} classNames={searchFadeStyles} timeout={500} unmountOnExit>
          <Filter value={filter} onChange={this.changeFilter} />
        </CSSTransition>
        <CSSTransition in={visibleContacts.length !== 0} classNames={fadeStyles} timeout={250} unmountOnExit>
          <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
        </CSSTransition>
      </Container>
    );
  }
}
