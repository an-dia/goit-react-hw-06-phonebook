import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import s from './ContactList.module.css';
import fadeStyles from '../../transitionsStyles/fade.module.css';
import ContactItem from '../ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <TransitionGroup component="ul" className={s.contactList}>
      {contacts.map(({ name, number, id }) => (
        <CSSTransition key={id} timeout={250} classNames={fadeStyles}>
          <ContactItem name={name} number={number} key={id} onDeleteContact={() => onDeleteContact(id)} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

 const getVisibleContacts = (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return allContacts.filter(({name}) => name.toLowerCase().includes(normalizedFilter));
  };

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

// const mapStateToProps = state => {
//   const { items, filter } = state.contacts;
//   const visibleContacts = getVisibleContacts(items, filter);

//   return {
//     contacts: visibleContacts,
//   }
// };

const mapStateToProps = ({contacts: {items, filter}}) => ({
  contacts: getVisibleContacts(items,  filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: (id) => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
