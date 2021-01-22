import { createSelector } from 'reselect';

import { USER_ROLES } from 'themes/config';

import {
  selectEntity,
  selectEntities,
  selectMeasuresCategorised,
  selectRecommendationsCategorised,
  selectFWTaxonomiesSorted,
  selectFrameworks,
} from 'containers/App/selectors';

import {
  entitiesSetAssociated,
  entitySetUser,
  usersByRole,
  prepareTaxonomiesMultiple,
} from 'utils/entities';

import { qe } from 'utils/quasi-equals';

/**
 * Direct selector to the indicatorEdit state domain
 */
export const selectDomain = createSelector(
  (state) => state.get('indicatorEdit'),
  (substate) => substate
);

export const selectViewEntity = createSelector(
  (state, id) => selectEntity(state, { path: 'indicators', id }),
  (state) => selectEntities(state, 'users'),
  (entity, users) => entitySetUser(entity, users)
);

export const selectMeasures = createSelector(
  (state, id) => id,
  (state) => selectMeasuresCategorised(state),
  (state) => selectEntities(state, 'measure_indicators'),
  (id, entities, associations) => entitiesSetAssociated(
    entities,
    'measure_id',
    associations,
    'indicator_id',
    id,
  )
);


export const selectConnectedTaxonomies = createSelector(
  (state) => selectFWTaxonomiesSorted(state),
  (state) => selectEntities(state, 'categories'),
  (taxonomies, categories) => prepareTaxonomiesMultiple(
    taxonomies,
    categories,
    ['tags_measures'],
  )
);

export const selectRecommendationsByFw = createSelector(
  (state, id) => id,
  (state) => selectRecommendationsCategorised(state),
  (state) => selectEntities(state, 'recommendation_indicators'),
  (state) => selectFrameworks(state),
  (id, recs, associations, frameworks) => {
    const filtered = recs.filter(
      (r) => {
        const framework = frameworks.find(
          (fw) => qe(
            fw.get('id'),
            r.getIn(['attributes', 'framework_id']),
          )
        );
        return framework.getIn(['attributes', 'has_indicators']);
      }
    );
    return entitiesSetAssociated(
      filtered,
      'recommendation_id',
      associations,
      'indicator_id',
      id,
    ).groupBy(
      (r) => r.getIn(['attributes', 'framework_id']).toString()
    );
  }
);

export const selectUsers = createSelector(
  (state) => selectEntities(state, 'users'),
  (state) => selectEntities(state, 'user_roles'),
  (entities, associations) => usersByRole(
    entities,
    associations,
    USER_ROLES.CONTRIBUTOR.value,
  )
);
