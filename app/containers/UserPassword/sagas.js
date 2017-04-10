import { takeLatest, put, take, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { updatePasswordRequest } from 'utils/entities-update';

import {
  passwordSending,
  passwordSuccess,
  passwordError,
} from './actions';
import { SAVE } from './constants';


export function* save({ data }) {
  try {
    yield put(passwordSending());
    yield call(updatePasswordRequest, {
      id: data.id,
      current_password: data.attributes.password,
      password: data.attributes.passwordNew,
      password_confirmation: data.attributes.passwordConfirmation,
    });

    yield put(passwordSuccess());

    yield browserHistory.push(`users/${data.id}`);
  } catch (error) {
    error.response.json = yield error.response.json();
    yield put(passwordError(error));
  }
}

export function* defaultSaga() {
  const watcher = yield takeLatest(SAVE, save);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  defaultSaga,
];
