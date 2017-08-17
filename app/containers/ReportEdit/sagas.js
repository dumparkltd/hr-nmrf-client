import { takeLatest, take, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  saveEntity,
  dueDateAssigned,
  dueDateUnassigned,
  invalidateEntities,
} from 'containers/App/actions';

import { SAVE } from './constants';


export function* save({ data, dueDateIdUnchecked }) {
  yield put(saveEntity({
    path: 'progress_reports',
    entity: data,
    redirect: `/reports/${data.id}`,
  }));
  if (data.attributes.due_date_id) {
    yield put(dueDateAssigned(data.attributes.due_date_id));
  }
  if (dueDateIdUnchecked) {
    // force due_date reload to get newly generated due_dates
    yield put(dueDateUnassigned(dueDateIdUnchecked));
    yield put(invalidateEntities('due_dates'));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const saveWatcher = yield takeLatest(SAVE, save);

  yield take(LOCATION_CHANGE);
  yield cancel(saveWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
