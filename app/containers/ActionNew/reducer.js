/*
 *
 * ActionNew reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { combineForms } from 'react-redux-form/immutable';

import {
  SAVE_SENDING,
  SAVE_SUCCESS,
  SAVE_ERROR,
} from 'containers/App/constants';

const initialState = fromJS({
  saveSending: false,
  saveSuccess: false,
  saveError: false,
});

function actionNewReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SENDING:
      return state
        .set('saveSending', true)
        .set('saveSuccess', false)
        .set('saveError', false);
    case SAVE_SUCCESS:
      return state
        .set('saveSending', false)
        .set('saveSuccess', true);
    case SAVE_ERROR:
      return state
        .set('saveSending', false)
        .set('saveSuccess', false)
        .set('saveError', action.error);
    default:
      return state;
  }
}

const formData = fromJS({
  attributes: {
    title: '',
    description: '',
    draft: true,
  },
  associatedTaxonomies: {},
  associatedRecommendations: [],
});

export default combineReducers({
  page: actionNewReducer,
  form: combineForms({
    data: formData,
  }, 'actionNew.form'),
});
