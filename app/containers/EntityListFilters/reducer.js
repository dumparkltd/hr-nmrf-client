/*
*
* EntityListFilters reducer
*
*/

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { combineForms } from 'react-redux-form/immutable';
import {
  SHOW_FILTER_FORM,
} from './constants';

const initialState = fromJS({
  showFilterForm: false,
  formOptions: [],
});

const formData = fromJS({
  filterId: null,
  values: [],
});

function entityListFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FILTER_FORM:
      return state
      .set('showFilterForm', true)
      .set('formTitle', action.title)
      .set('formOptions', fromJS(action.options.map((option) => ({
        label: option.label,
        value: option,
      }))));
    default:
      return state;
  }
}

export default combineReducers({
  page: entityListFilterReducer,
  form: combineForms({
    data: formData,
  }, 'entityListFilters.form'),
});

// export default entityListFilterReducer;
