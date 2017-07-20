import { Map, List } from 'immutable';
import { forEach } from 'lodash/collection';
import { lowerCase as loCase } from 'lodash/string';
import { lowerCase } from 'utils/string';
import {
  getConnectedCategories,
  testEntityCategoryAssociation,
} from 'utils/entities';
import isNumber from 'utils/is-number';

export const groupEntities = (
  entities,
  taxonomies,
  connectedTaxonomies,
  config,
  groupSelectValue,
  subgroupSelectValue
) => subgroupSelectValue
  ? makeEntityGroups(entities, taxonomies, connectedTaxonomies, config, groupSelectValue)
    .map((group) => group.set(
      'entityGroups',
      makeEntityGroups(group.get('entities'), taxonomies, connectedTaxonomies, config, subgroupSelectValue)
    ))
  : makeEntityGroups(entities, taxonomies, connectedTaxonomies, config, groupSelectValue);

const makeEntityGroups = (
  entities,
  taxonomies,
  connectedTaxonomies,
  config,
  groupSelectValue
) => {
  if (groupSelectValue) {
    if (isNumber(groupSelectValue)) {
      const taxonomy = taxonomies.get(groupSelectValue);
      return makeTaxonomyGroups(entities, taxonomy);
    }
    const locationQueryGroupSplit = groupSelectValue.split(':');
    if (locationQueryGroupSplit.length > 1) {
      const taxonomy = connectedTaxonomies.get(locationQueryGroupSplit[1]);
      if (taxonomy) {
        return makeConnectedTaxonomyGroups(entities, taxonomy, config);
      }
    }
    return List().push(Map({ entities }));
  }
  return List().push(Map({ entities }));
};

export const makeTaxonomyGroups = (entities, taxonomy) => {
  let groups = Map();
  entities.forEach((entity) => {
    let hasTaxCategory = false;
    // if entity has taxonomies
    if (entity.get('categories')) {
      // add categories from entities if not present otherwise increase count
      taxonomy.get('categories').forEach((cat, catId) => {
        // if entity has category of active taxonomy
        if (testEntityCategoryAssociation(entity, catId)) {
          hasTaxCategory = true;
          // if category already added
          if (groups.get(catId)) {
            groups = groups.setIn([catId, 'entities'], groups.getIn([catId, 'entities']).push(entity));
          } else {
            const label = cat.getIn(['attributes', 'title']) || cat.getIn(['attributes', 'name']);
            groups = groups.set(catId, Map({
              label,
              entities: List().push(entity),
              order: loCase(label),
              id: catId,
            }));
          }
        }
      });
    }
    if (!hasTaxCategory) {
      if (groups.get('without')) {
        groups = groups.setIn(['without', 'entities'], groups.getIn(['without', 'entities']).push(entity));
      } else {
        groups = groups.set('without', Map({
          label: `Without ${lowerCase(taxonomy.getIn(['attributes', 'title']))}`, // `${messages.without} ${lowerCase(taxonomy.attributes.title)}`,
          entities: List().push(entity),
          order: 'zzzzzzzz',
          id: 'without',
        }));
      }
    }
  });  // for each entities
  return groups.sortBy((group) => group.get('order')).toList();
};

export const makeConnectedTaxonomyGroups = (entities, taxonomy, config) => {
  let groups = Map();
  entities.forEach((entity) => {
    let hasTaxCategory = false;
    forEach(config.connectedTaxonomies.connections, (connection) => {
      // if entity has taxonomies
      if (entity.get(connection.path)) { // measure.recommendations stores recommendation_measures
        // add categories from entities if not present otherwise increase count
        const categories = getConnectedCategories(
          entity.get(connection.path),
          taxonomy.get('categories'),
          connection.path,
        );
        hasTaxCategory = hasTaxCategory || categories.size > 0;
        categories.forEach((cat, catId) => {
          // if category already added
          if (groups.get(catId)) {
            groups = groups.setIn([catId, 'entities'], groups.getIn([catId, 'entities']).push(entity));
          } else {
            const label = cat.getIn(['attributes', 'title']) || cat.getIn(['attributes', 'name']);
            groups = groups.set(catId, Map({
              label,
              entities: List().push(entity),
              order: loCase(label),
              id: catId,
            }));
          }
        });
      }
    });  // for each connection
    if (!hasTaxCategory) {
      if (groups.get('without')) {
        groups = groups.setIn(['without', 'entities'], groups.getIn(['without', 'entities']).push(entity));
      } else {
        groups = groups.set('without', Map({
          label: `Without ${lowerCase(taxonomy.getIn(['attributes', 'title']))}`, // `${messages.without} ${lowerCase(taxonomy.attributes.title)}`,
          entities: List().push(entity),
          order: 'zzzzzzzzz',
          id: 'without',
        }));
      }
    }
  });  // for each entities
  return groups.sortBy((group) => group.get('order')).toList();
};

// export const getGroupedEntitiesForPage = (pageItems, entitiesGrouped) =>
//   pageItems.reduce((groups, item) => {
//     // figure out 1st level group and existing targetGroup
//     const group = entitiesGrouped[item.group];
//     const targetGroup = find(groups, { id: group.id });
//     const entity = item.entity;
//     // if subgroup
//     if (group.entitiesGrouped) {
//       const subgroup = group.entitiesGrouped[item.subgroup];
//       // create 1st level targetGroup if not exists
//       if (!targetGroup) {
//         // also create 2nd level targetGroup if required
//         groups.push({
//           entitiesGrouped: [{
//             entities: [entity],
//             label: subgroup.label,
//             order: subgroup.order,
//             id: subgroup.id,
//           }],
//           label: group.label,
//           order: group.order,
//           id: group.id,
//         });
//       } else {
//         // 1st level targetGroup already exists
//         const targetSubgroup = find(targetGroup.entitiesGrouped, { id: subgroup.id });
//         // create 2nd level targetGroup if not exists
//         if (!targetSubgroup) {
//           // create subgroup
//           targetGroup.entitiesGrouped.push({
//             entities: [entity],
//             label: subgroup.label,
//             order: subgroup.order,
//             id: subgroup.id,
//           });
//         } else {
//           // add to existing subgroup
//           targetSubgroup.entities.push(entity);
//         }
//       }
//     // no subgroups
//     } else if (!targetGroup) {
//       // create without 2nd level targetGroup
//       groups.push({
//         entities: [entity],
//         label: group.label,
//         order: group.order,
//         id: group.id,
//       });
//     } else {
//       // add to group
//       targetGroup.entities.push(entity);
//     }
//     return groups;
//   }, []);