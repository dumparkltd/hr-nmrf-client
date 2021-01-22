import { createSelector } from 'reselect';

import {
  selectEntity,
  selectEntities,
  selectMeasuresCategorised,
  selectTaxonomiesSorted,
  selectFWIndicators,
} from 'containers/App/selectors';

import {
  entitiesSetAssociated,
  entitySetUser,
  prepareTaxonomiesAssociated,
  prepareTaxonomiesMultiple,
} from 'utils/entities';

export const selectDomain = createSelector(
  (state) => state.get('recommendationEdit'),
  (substate) => substate
);

export const selectViewEntity = createSelector(
  (state, id) => selectEntity(state, { path: 'recommendations', id }),
  (state) => selectEntities(state, 'users'),
  (entity, users) => entitySetUser(entity, users)
);

export const selectTaxonomies = createSelector(
  (state, id) => id,
  (state) => selectTaxonomiesSorted(state),
  (state) => selectEntities(state, 'categories'),
  (state) => selectEntities(state, 'recommendation_categories'),
  (id, taxonomies, categories, associations) => prepareTaxonomiesAssociated(
    taxonomies,
    categories,
    associations,
    'tags_recommendations',
    'recommendation_id',
    id,
    false, //  do not include parent taxonomies
  )
);

export const selectConnectedTaxonomies = createSelector(
  (state) => selectTaxonomiesSorted(state),
  (state) => selectEntities(state, 'categories'),
  (taxonomies, categories) => prepareTaxonomiesMultiple(
    taxonomies,
    categories,
    ['tags_measures'],
    false,
  )
);

export const selectMeasures = createSelector(
  (state, id) => id,
  (state) => selectMeasuresCategorised(state),
  (state) => selectEntities(state, 'recommendation_measures'),
  (id, entities, associations) => entitiesSetAssociated(
    entities,
    'measure_id',
    associations,
    'recommendation_id',
    id,
  )
);
export const selectIndicators = createSelector(
  (state, id) => id,
  selectFWIndicators,
  (state) => selectEntities(state, 'recommendation_indicators'),
  (id, entities, associations) => entitiesSetAssociated(
    entities,
    'indicator_id',
    associations,
    'recommendation_id',
    id,
  )
);
