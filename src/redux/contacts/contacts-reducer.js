import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

// console.log(actions.addContact.type);

const items = createReducer([], {
  //actions.addContact.type вычисляемые свойства объекта(приведётся к строке и подставится свойство type )
  [actions.addContact]: (state, {payload}) => [...state, payload],
  [actions.deleteContact]: (state, {payload}) => state.filter(({id}) => id !== payload),
});

const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
})