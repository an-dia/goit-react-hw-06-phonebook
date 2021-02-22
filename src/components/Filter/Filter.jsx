import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import shortid from 'shortid';

const Filter = ({ name, onChange }) => {
  let inputFilterId = shortid.generate();
  return (
    <div className={s.filterWrapper}>
      <label className={s.label} htmlFor={inputFilterId}>
        {' '}
        Find contacts by name{' '}
      </label>
      <input className={s.input} type="text" id={inputFilterId} value={name} onChange={onChange} />
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
