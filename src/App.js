import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
// import appearFormStyles from './transitionsStyles/appearFormStyles.module.css';
import fadeStyles from './transitionsStyles/fade.module.css';
import searchFadeStyles from './transitionsStyles/searchFadeStyles.module.css';
import s from './App.module.css';
import Container from './components/Container';
import Title from './components/Title';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const App = ({ contacts }) => {
  return (
    <Container>
      <div className={s.Wrapper}>
        <Title title="Phonebook" level={1} />
        {/* <CSSTransition in={true} appear={true} timeout={500} classNames={appearFormStyles} unmountOnExit> */}
          <ContactForm  />
        {/* </CSSTransition> */}
        <Title title="Contacts" level={2} />
        <CSSTransition in={contacts.length > 1 } classNames={searchFadeStyles} timeout={250} unmountOnExit>
          <Filter  />
        </CSSTransition>
        <CSSTransition in={contacts.length !== 0} classNames={fadeStyles} timeout={250} unmountOnExit>
          <ContactList  />
        </CSSTransition>
      </div>
    </Container>
  );
};

const mapStateToProps = state =>({
  contacts: state.contacts.items,
});

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};

export default connect(mapStateToProps, null)(App)

// onSubmit={this.addContact}
// contacts={visibleContacts} onDeleteContact={this.deleteContact}
// value={filter} onChange={this.changeFilter}