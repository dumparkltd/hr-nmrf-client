import { createSelector } from 'reselect';
import { Map } from 'immutable';

import {
  selectEntities,
  selectMeasuresSearchQuery,
  selectWithoutQuery,
  selectConnectionQuery,
  selectCategoryQuery,
  selectConnectedCategoryQuery,
  selectSortByQuery,
  selectSortOrderQuery,
  // selectExpandQuery,
  selectFWTaxonomiesSorted,
  selectFWRecommendations,
  selectFWIndicators,
  selectFrameworks,
  selectReady,
  selectRecommendationCategoriesByRecommendation,
  selectMeasureCategoriesByMeasure,
  selectMeasureIndicatorsByMeasure,
  selectRecommendationMeasuresByMeasure,
} from 'containers/App/selectors';

import {
  filterEntitiesByConnection,
  filterEntitiesByCategories,
  filterEntitiesByConnectedCategories,
  filterEntitiesWithoutAssociation,
  // testEntityEntityAssociation,
  entitiesSetCategoryIds,
  // entitiesSetSingle,
  filterTaxonomies,
  getTaxonomyCategories,
} from 'utils/entities';
import { qe } from 'utils/quasi-equals';
import { sortEntities, getSortOption } from 'utils/sort';

import { CONFIG, DEPENDENCIES } from './constants';

const selectConnectionsIndicators = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  selectFWIndicators,
  (ready, indicators) => !ready ? Map() : Map().set('indicators', indicators)
);

export const selectConnections = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  selectConnectionsIndicators,
  selectFWRecommendations,
  selectRecommendationCategoriesByRecommendation,
  (ready, connections, recommendations, associationsGrouped) => {
    if (ready) {
      return connections.set(
        'recommendations',
        entitiesSetCategoryIds(
          recommendations,
          associationsGrouped,
        )
      );
    }
    return connections;
  }
);

export const selectConnectedTaxonomies = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  (state) => selectConnections(state),
  (state) => selectFWTaxonomiesSorted(state),
  (state) => selectEntities(state, 'categories'),
  (state) => selectEntities(state, 'recommendation_categories'),
  (state) => selectFrameworks(state),
  (state) => selectEntities(state, 'framework_taxonomies'),
  (
    ready,
    connections,
    taxonomies,
    categories,
    categoryRecommendations,
    frameworks,
    fwTaxonomies,
  ) => {
    if (!ready) return Map();
    const relationship = {
      tags: 'tags_recommendations',
      path: 'recommendations',
      key: 'recommendation_id',
      associations: categoryRecommendations,
    };
    const measureFrameworks = frameworks.filter(
      (fw) => fw.getIn(['attributes', 'has_measures'])
    );
    // for all connections
    const connectedTaxonomies = filterTaxonomies(
      taxonomies,
      relationship.tags,
      true,
    ).filter(
      (taxonomy) => fwTaxonomies.some(
        (fwt) => measureFrameworks.some(
          (fw) => qe(
            fw.get('id'),
            fwt.getIn(['attributes', 'framework_id']),
          ),
        ) && qe(
          taxonomy.get('id'),
          fwt.getIn(['attributes', 'taxonomy_id']),
        )
      )
    );
    if (!connections.get(relationship.path)) {
      return connectedTaxonomies;
    }
    const groupedAssociations = relationship.associations.filter(
      (association) => association.getIn(['attributes', relationship.key])
        && connections.getIn([
          relationship.path,
          association.getIn(['attributes', relationship.key]).toString(),
        ])
    ).groupBy(
      (association) => association.getIn(['attributes', 'category_id'])
    );
    return connectedTaxonomies.map(
      (taxonomy) => taxonomy.set(
        'categories',
        getTaxonomyCategories(
          taxonomy,
          categories,
          relationship,
          groupedAssociations,
        )
      )
    );
  }
);

const selectMeasuresNestedQ = createSelector(
  (state, locationQuery) => selectMeasuresSearchQuery(state, {
    searchAttributes: CONFIG.search || ['title'],
    locationQuery,
  }),
  (entities) => entities
);

// nest category ids
const selectMeasuresNestedWithCategories = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  selectMeasuresNestedQ,
  selectMeasureCategoriesByMeasure,
  (state) => selectEntities(state, 'categories'),
  (ready, entities, associationsGrouped, categories) => {
    if (ready) {
      return entitiesSetCategoryIds(
        entities,
        associationsGrouped,
        categories,
      );
    }
    return entities;
  }
);

// nest connected recommendation ids
// nest connected recommendation ids byfw
const selectMeasuresNestedWithRecs = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  selectMeasuresNestedWithCategories,
  (state) => selectConnections(state),
  selectRecommendationMeasuresByMeasure,
  (ready, entities, connections, associationsGrouped) => {
    if (ready && connections.get('recommendations')) {
      return entities.map(
        (entity) => {
          const entityRecs = associationsGrouped.get(parseInt(entity.get('id'), 10));
          const entityRecsByFw = entityRecs && entityRecs.filter(
            (recId) => connections.getIn([
              'recommendations',
              recId.toString(),
            ])
          ).groupBy(
            (recId) => connections.getIn([
              'recommendations',
              recId.toString(),
              'attributes',
              'framework_id',
            ])
          );
          // console.log(entityRecsByFw && entityRecsByFw.toJS());
          // currently requires both for filtering & display
          return entity.set(
            'recommendations',
            entityRecs,
          ).set(
            'recommendationsByFw',
            entityRecsByFw,
          );
        }
      );
    }
    return entities;
  }
);

// nest connected indicator ids
const selectMeasuresNested = createSelector(
  (state) => selectReady(state, { path: DEPENDENCIES }),
  selectMeasuresNestedWithRecs,
  (state) => selectConnections(state),
  selectMeasureIndicatorsByMeasure,
  (ready, entities, connections, associationsGrouped) => {
    if (ready && connections.get('indicators')) {
      return entities.map(
        (entity) => entity.set(
          'indicators',
          associationsGrouped.get(parseInt(entity.get('id'), 10)),
        )
      );
    }
    return entities;
  }
);

const selectMeasuresWithout = createSelector(
  selectMeasuresNested,
  (state) => selectEntities(state, 'categories'),
  selectWithoutQuery,
  (entities, categories, query) => query
    ? filterEntitiesWithoutAssociation(entities, categories, query)
    : entities
);
const selectMeasuresByConnections = createSelector(
  selectMeasuresWithout,
  selectConnectionQuery,
  (entities, query) => query
    ? filterEntitiesByConnection(entities, query)
    : entities
);
const selectMeasuresByCategories = createSelector(
  selectMeasuresByConnections,
  selectCategoryQuery,
  (entities, query) => query
    ? filterEntitiesByCategories(entities, query)
    : entities
);
const selectMeasuresByConnectedCategories = createSelector(
  selectMeasuresByCategories,
  selectConnections,
  selectConnectedCategoryQuery,
  (entities, connections, query) => query
    ? filterEntitiesByConnectedCategories(entities, connections, query)
    : entities
);
//
// const countDueDates = (dates, attr) => dates.filter(
//   (date) => date.getIn(['attributes', attr])
// ).size;
//
// const selectMeasuresExpandables = createSelector(
//   (state) => selectReady(state, { path: DEPENDENCIES }),
//   selectMeasuresByConnectedCategories,
//   (ready, entities) => entities
// );

// kicks off series of cascading selectors
// 1. selectEntitiesWhere filters by attribute
// 2. selectEntitiesSearchQuery filters by keyword
// 3. selectMeasuresNested will nest related entities
// 4. selectMeasuresWithout will filter by absence of taxonomy or connection
// 5. selectMeasuresByConnections will filter by specific connection
// 6. selectMeasuresByCategories will filter by specific categories
// 7. selectMeasuresByCOnnectedCategories will filter by specific categories connected via connection
export const selectMeasures = createSelector(
  selectMeasuresByConnectedCategories,
  selectSortByQuery,
  selectSortOrderQuery,
  (entities, sort, order) => {
    const sortOption = getSortOption(CONFIG.sorting, sort);
    return sortEntities(
      entities,
      order || (sortOption ? sortOption.order : 'desc'),
      sort || (sortOption ? sortOption.attribute : 'id'),
      sortOption ? sortOption.type : 'string'
    );
  }
);
