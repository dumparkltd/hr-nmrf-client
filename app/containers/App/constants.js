/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const LOAD_ENTITIES_IF_NEEDED = 'nmrf/App/LOAD_ENTITIES_IF_NEEDED';
export const LOADING_ENTITIES = 'nmrf/App/LOADING_ENTITIES';
export const LOAD_ENTITIES_SUCCESS = 'nmrf/App/LOAD_ENTITIES_SUCCESS';
export const LOAD_ENTITIES_ERROR = 'nmrf/App/LOAD_ENTITIES_ERROR';
export const ENTITIES_REQUESTED = 'nmrf/App/ENTITIES_REQUESTED';

export const ACTION_ENTITIES_READY = 'nmrf/App/ENTITIES_READY';
export const RECOMENDATION_ENTITIES_READY = 'nmrf/App/RECOMENDATION_ENTITIES_READY';
export const RECOMENDATION_ACTIONS_ENTITIES_READY = 'nmrf/App/RECOMENDATION_ACTIONS_ENTITIES_READY';
// TODO revisit this
export const UNKNOWN_ENTITIES_READY = 'nmrf/App/UNKNOWN_ENTITIES_READY';

export const AUTHENTICATE_SENDING = 'nmrf/App/AUTHENTICATE_SENDING';
export const AUTHENTICATE = 'nmrf/App/AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'nmrf/App/AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = 'nmrf/App/AUTHENTICATE_ERROR';
export const SET_AUTHENTICATION_STATE = 'nmrf/App/SET_AUTHENTICATION_STATE';
export const LOGOUT = 'nmrf/App/LOGOUT';
export const LOGOUT_SUCCESS = 'nmrf/App/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'nmrf/App/LOGOUT_ERROR';
export const VALIDATE_TOKEN = 'nmrf/App/VALIDATE_TOKEN';

export const ADD_ENTITY = 'nmrf/App/ADD_ENTITY';
export const UPDATE_ENTITY = 'nmrf/App/UPDATE_ENTITY';

export const PUBLISH_STATUSES = [
  { value: true, label: 'Draft' },
  { value: false, label: 'Public' },
];

export const ENTITIES_READY = {
  actions: ACTION_ENTITIES_READY,
  recommendations: RECOMENDATION_ENTITIES_READY,
  recommendation_actions: RECOMENDATION_ACTIONS_ENTITIES_READY,
};

// TODO need to pull from an env file
export const API_ENDPOINT = 'https://undp-sadata-staging.herokuapp.com';
