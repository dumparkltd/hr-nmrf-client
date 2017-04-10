/**
 * The global state selectors
 *
 * Use `createCachedSelector` when you want to make a selector that takes arguments
 * https://github.com/reactjs/reselect/issues/184 ( problem )
 * https://github.com/toomuchdesign/re-reselect ( solution )
 *
 * use the makeSelector () => createSelector pattern when you want a selector that
 * doesn't take arguments, but can have its own cache between components
 *
 * otherwise use straight createSelector
 * https://github.com/react-boilerplate/react-boilerplate/pull/1205#issuecomment-274319934
 *
 */

import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { reduce } from 'lodash/collection';

// high level state selects
const getRoute = (state) => state.get('route');
const getGlobal = (state) => state.get('global');
const getGlobalEntities = (state) => state.getIn(['global', 'entities']);
const getGlobalRequested = (state) => state.getIn(['global', 'requested']);

const makeSelectLoading = () => createSelector(
  getGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  getGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectAuth = () => createSelector(
  getGlobal,
  (globalState) => globalState.get('auth').toJS()
);

const makeSelectSignedIn = () => isSignedIn;
const makeSelectSessionUserId = () => getSessionUserId;

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectPathnameOnAuthChange = () => createSelector(
  getRoute,
  (routeState) => {
    try {
      return routeState.getIn(['locationBeforeTransitions', 'pathnameOnAuthChange']);
    } catch (error) {
      return null;
    }
  }
);

const makeSelectPreviousPathname = () => createSelector(
  getRoute,
  (routeState) => {
    try {
      return routeState.getIn(['locationBeforeTransitions', 'pathnamePrevious']);
    } catch (error) {
      return null;
    }
  }
);


const getRequestedAt = createSelector(
  getGlobalRequested,
  (state, { path }) => path,
  (requested, path) => requested.get(path)
);

const isReady = (state, { path }) =>
  reduce(Array.isArray(path) ? path : [path],
    (areReady, readyPath) => areReady && !!state.getIn(['global', 'ready', readyPath]),
    true
  );

const getEntitiesPure = createSelector(
  getGlobalEntities,
  (state, { path }) => path,
  (entities, path) => entities.get(path)
);

// filter entities by attribute or id, also allows multiple conditions
// eg where: {draft: false} or where: {id: 1, draft: false}
const getEntitiesWhere = createCachedSelector(
  getEntitiesPure,
  (state, { where }) => where ? JSON.stringify(where) : null, // enable caching
  (entities, whereString) => {
    if (whereString) {
      const where = JSON.parse(whereString);
      return entities.filter((entity) =>
        reduce(where, (passing, value, key) => {
          // TODO if !passing return false, no point going further
          if (key === 'id') {
            return passing && entity.get('id') === value.toString();
          }
          const testValue = entity.getIn(['attributes', key]);
          if (typeof testValue === 'undefined' || testValue === null) {
            return (value === 'null') ? passing : false;
          }
          return passing && testValue.toString() === value.toString();
        }, true)
      );
    }
    return entities;
  }
)((state, { path, where }) => `${path}:${JSON.stringify(where)}`);

// filter entities by absence of connection to other entity/category via associative table
// for taxonomies, eg: `without: { taxonomyId: 5, path: "measure_category", key: "measure_id" }`
// for other entities, eg: `without: { path: "recommendation_measures", whereKey: "measure_id" }`
const getEntitiesWithout = createSelector(
  (state) => state,
  getEntitiesWhere,
  (state, { without }) => without,
  (state, entities, without) => without
    ? entities.filter((entity) =>
      reduce(Array.isArray(without) ? without : [without], (passing, condition) => {
        // check for taxonomies
        if (condition.taxonomyId) {
          // get all associations for entity and store category count for given taxonomy
          const associations = getEntities(state, {
            path: condition.path, // measure_categories
            where: {
              [condition.key]: entity.get('id'),
            }, // {measure_id : 3}
            extend: {
              path: 'categories',
              as: 'count',
              key: 'category_id',
              type: 'count',
              where: {
                taxonomy_id: condition.taxonomyId,
              },
            },
          });
          // check if not any category present (count > 0)
          return passing && !associations.reduce((hasCategories, association) =>
            hasCategories || association.get('count') > 0, false
          );
        }
        // other entities
        const associations = getEntitiesWhere(state, {
          path: condition.path, // recommendation_measures
          where: {
            [condition.key]: entity.get('id'),
          },
        });
        return passing && !(associations && associations.size); // !not associated
      }, true)
    )
    : entities
);

// check if entities have connections with other entities via associative table
const getEntitiesIfConnected = createSelector(
  (state) => state,
  getEntitiesWithout,
  (state, { connected }) => connected,
  (state, entities, connected) => connected
    ? entities.filter((entity) => reduce(
      Array.isArray(connected) ? connected : [connected], // allows multiple connections
      (passing, argsConnected) => {
        if (argsConnected.connected || argsConnected.where) {
          const where = argsConnected.where || {};
          return passing && reduce(
            Array.isArray(where) ? where : [where],
            (passingWhere, whereArgs) => { // and multiple wheres
              // TODO if passingWhere is false we don't need to do any more work
              const connections = getEntitiesIfConnected(state, {
                path: argsConnected.path, // path of associative table
                where: {
                  ...whereArgs,
                  [argsConnected.key]: argsConnected.attribute
                    ? entity.getIn(['attributes', argsConnected.attribute])
                    : entity.get('id'),
                },
                connected: argsConnected.connected || null,
              });
              return passingWhere && connections && connections.size; // association present
            },
            true
          );
        }
        return passing;
      },
      true
    )) // reduce connected conditions // filter entities
  : entities  // !connected
);


const getEntities = createSelector(
  (state) => state,
  getEntitiesIfConnected,
  (state, { out }) => out,
  (state, { extend }) => extend,
  (state, entities, out, extend) => {
    // not to worry about caching here as "inexpensive"
    let result;
    if (extend) {
      result = entities.map((entity) =>
        extendEntity(state, entity, extend)
      );
    } else {
      result = entities;
    }
    return out === 'js' ? result.toJS() : result;
  }
);

// helper: allows to extend entity by joining it with related entities,
//   calls getEntities recursively
const extendEntity = (state, entity, extendArgs) => {
  const argsArray = Array.isArray(extendArgs) ? extendArgs : [extendArgs];
  let result = entity;
  argsArray.forEach((args) => {
    const extend = {
      path: args.path, // the table to look up, required
      key: args.key, // the foreign key
      type: args.type || 'list', // one of: list, count, single
      as: args.as || args.path, // the attribute to store
      reverse: args.reverse || false, // reverse relation
      where: args.where || {}, // conditions for join
      extend: args.extend || null,
      connected: args.connected || null,
    };
    if (extend.reverse) {
      // reverse: other entity pointing to entity
      extend.where[extend.key] = entity.get('id');
    } else {
      // entity pointing to other entity
      const key = entity.getIn(['attributes', extend.key]);
      extend.where.id = !!key && key.toString();
    }
    let extended;
    if (extend.type === 'single') {
      extend.id = extend.where.id; // getEntityPure selector requires id
      extended = getEntity(state, extend);
    } else {
      extended = getEntities(state, extend);
      if (extended && extend.type === 'count') {
        extended = extended.size;
      }
    }
    result = result.set(extend.as, extended && extended.size === 0 ? null : extended);
  });
  return result;
};


const getEntityPure = createSelector(
  getEntitiesPure,
  (state, { id }) => id && id.toString(),
  (entities, id) => entities.get(id)
);

const hasEntity = createSelector(
  getEntitiesPure,
  (state, { id }) => id,
  (entities, id) => entities.has(id)
);

const getEntity = createSelector(
  (state) => state,
  getEntityPure,
  (state, { out }) => out,
  (state, { extend }) => extend,
  (state, entity, out, extend) => {
    // console.log('entitySelect: ' + JSON.stringify(args))
    let result;
    if (entity && extend) {
      result = extendEntity(state, entity, extend);
    } else {
      result = entity;
    }
    return result && out === 'js' ? result.toJS() : result;
  }
);


const getSessionUser = createSelector(
  getGlobal,
  (state) => state.get('user')
);

const getSessionUserId = createSelector(
  getSessionUser,
  (sessionUser) =>
    sessionUser.get('attributes')
    && sessionUser.get('attributes').id.toString()
);

const isSignedIn = createSelector(
  getSessionUser,
  (sessionUser) => sessionUser.get('isSignedIn')
);

const getUserEntities = createSelector(
  getGlobalEntities,
  (entities) => entities.get('users')
);

const getUserEntity = createSelector(
  getUserEntities,
  (state, { id }) => id && id.toString(),
  (users, id) => users.get(id)
);

const getUser = createSelector(
  (state) => state,
  getUserEntity,
  (state, { out }) => out,
  (state, { extend }) => extend,
  (state, user, out, extend) => {
    let result = user;
    if (result && extend) {
      result = extendEntity(state, result, extend);
    }
    return result && out === 'js' ? result.toJS() : result;
  }
);


export {
  getGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocationState,
  makeSelectSignedIn,
  makeSelectAuth,
  makeSelectPathnameOnAuthChange,
  makeSelectPreviousPathname,
  getRequestedAt,
  isReady,
  getEntitiesWhere,
  getEntities,
  hasEntity,
  getEntity,
  getUser,
  getSessionUser,
  isSignedIn,
  makeSelectSessionUserId,
  getSessionUserId,
};
