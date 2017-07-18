export const getIdField = (entity) => ({
  type: 'reference',
  value: entity.get('id'),
  large: true,
});
export const getReferenceField = (entity) =>
  !!entity.getIn(['attributes', 'reference']) &&
  (entity.getIn(['attributes', 'reference']).trim().length > 0) &&
  ({
    type: 'reference',
    value: entity.getIn(['attributes', 'reference']),
    large: true,
  });
const getLinkAnchor = (url) => {
  const urlNoProtocol = url.replace(/^https?:\/\//i, '');
  return urlNoProtocol.length > 40
    ? `${urlNoProtocol.substring(0, 40)}...`
    : urlNoProtocol;
};
export const getLinkField = (entity) => ({
  type: 'link',
  value: entity.getIn(['attributes', 'url']),
  anchor: getLinkAnchor(entity.getIn(['attributes', 'url'])),
});
export const getTitleField = (entity, isManager, attribute = 'title') => ({
  type: 'title',
  value: entity.getIn(['attributes', attribute]),
  isManager,
});
export const getStatusField = (entity, attribute = 'draft', options, label) => ({
  type: 'status',
  value: entity.getIn(['attributes', attribute]),
  options,
  label,
});

// only show the highest rated role (lower role ids means higher)
const getHighestUserRoleLabel = (roles) => {
  const highestRole = roles.reduce((currentHighestRole, role) =>
  (!currentHighestRole || role.get('id') < currentHighestRole.get('id'))
    ? role
    : currentHighestRole
  , null);
  return highestRole.getIn(['attributes', 'friendly_name']);
};

export const getRoleField = (entity) => ({
  type: 'role',
  value: entity.get('roles') && getHighestUserRoleLabel(entity.get('roles')),
});

export const getMetaField = (entity, appMessages) => ({
  type: 'meta',
  fields: [
    {
      label: appMessages.attributes.meta.updated_at,
      value: entity.getIn(['attributes', 'updated_at']),
      date: true,
    },
    {
      label: appMessages.attributes.meta.updated_by,
      value: entity.get('user') && entity.getIn(['user', 'attributes', 'name']),
    },
  ],
});

export const getMarkdownField = (entity, attribute, hasLabel, appMessages) =>
  !!entity.getIn(['attributes', attribute]) &&
  (entity.getIn(['attributes', attribute]).trim().length > 0) &&
  ({
    type: 'markdown',
    value: entity.getIn(['attributes', attribute]),
    label: hasLabel && appMessages.attributes[attribute],
  });

export const getDateField = (entity, attribute, appMessages, showEmpty, emptyMessage) =>
  (showEmpty || (
    !!entity.getIn(['attributes', attribute]) &&
    (entity.getIn(['attributes', attribute]).trim().length > 0)
  )) &&
  ({
    type: 'date',
    value: !!entity.getIn(['attributes', attribute]) && entity.getIn(['attributes', attribute]),
    label: appMessages.attributes[attribute],
    showEmpty: showEmpty && (emptyMessage || appMessages.attributes[`${attribute}_empty`]),
  });

export const getTextField = (entity, attribute, appMessages) =>
  !!entity.getIn(['attributes', attribute]) &&
  (entity.getIn(['attributes', attribute]).trim().length > 0) &&
  ({
    type: 'text',
    value: entity.getIn(['attributes', attribute]),
    label: appMessages.attributes[attribute],
  });

const mapCategoryOptions = (categories) => categories
  ? categories.map((cat) => ({
    label: cat.getIn(['attributes', 'title']),
    linkTo: `/category/${cat.get('id')}`,
  })).toArray()
  : [];

const mapReports = (reports) => reports
  ? reports.map((report) => ({
    label: report.getIn(['attributes', 'title']),
    dueDate: report.get('due_date') ? report.getIn(['due_date', 'attributes', 'due_date']) : null,
    linkTo: `/reports/${report.get('id')}`,
  })).toArray()
  : [];

export const getReportsField = (reports, appMessages, button) => ({
  type: 'reports',
  values: mapReports(reports),
  button: button || null,
});

const mapDates = (dates) => dates
  ? dates.map((date) => ({
    date: date.getIn(['attributes', 'due_date']),
    due: date.getIn(['attributes', 'due']),
    overdue: date.getIn(['attributes', 'overdue']),
  })).toArray()
  : [];

export const getScheduleField = (dates) => ({
  type: 'schedule',
  values: mapDates(dates),
});

export const getTaxonomyFields = (taxonomies, appMessages) =>
  taxonomies && taxonomies.map((taxonomy) => ({
    type: 'list',
    label: appMessages.entities.taxonomies[taxonomy.get('id')].plural,
    entityType: 'taxonomies',
    id: taxonomy.get('id'),
    values: mapCategoryOptions(taxonomy.get('categories')),
  })).toArray();

const getCategoryShortTitle = (category) => {
  const title = (
    category.getIn(['attributes', 'short_title'])
    && (category.getIn(['attributes', 'short_title']).trim().length > 0)
  )
    ? category.getIn(['attributes', 'short_title'])
    : category.getIn(['attributes', 'title']);
  return title.length > 10
    ? `${title.substring(0, 10)}...`
    : title;
};

export const getCategoryShortTitleField = (entity) => ({
  type: 'short_title',
  value: getCategoryShortTitle(entity),
  taxonomyId: entity.getIn(['attributes', 'taxonomy_id']),
});

const getConnectionField = ({
  entities,
  taxonomies,
  connectionOptions,
  entityType,
  icon,
  entityPath,
  appMessages,
  onEntityClick,
}) => ({
  type: 'connections',
  values: entities.toList(),
  taxonomies,
  entityType,
  icon: icon || entityType,
  entityPath: entityPath || entityType,
  onEntityClick,
  showEmpty: appMessages.entities[entityType].empty,
  connectionOptions: connectionOptions.map((option) => ({
    label: appMessages.entities[option].plural,
    path: option,
  })),
});

export const getIndicatorConnectionField = (entities, appMessages, onEntityClick) =>
  getConnectionField({
    entities,
    taxonomies: null,
    connectionOptions: ['measures', 'sdgtargets'],
    entityType: 'indicators',
    appMessages,
    onEntityClick,
  });

export const getRecommendationConnectionField = (entities, taxonomies, appMessages, onEntityClick) =>
  getConnectionField({
    entities,
    taxonomies,
    connectionOptions: ['measures'],
    entityType: 'recommendations',
    appMessages,
    onEntityClick,
  });

export const getSdgTargetConnectionField = (entities, taxonomies, appMessages, onEntityClick) =>
  getConnectionField({
    entities,
    taxonomies,
    connectionOptions: ['indicators', 'measures'],
    entityType: 'sdgtargets',
    appMessages,
    onEntityClick,
  });

export const getMeasureConnectionField = (entities, taxonomies, appMessages, onEntityClick) =>
  getConnectionField({
    entities,
    taxonomies,
    connectionOptions: ['indicators', 'recommendations', 'sdgtargets'],
    entityType: 'measures',
    entityPath: 'actions',
    appMessages,
    onEntityClick,
  });

export const getManagerField = (entity, messageLabel, messageEmpty) =>
  ({
    label: messageLabel,
    type: 'manager',
    value: entity.get('manager') && entity.getIn(['manager', 'attributes', 'name']),
    showEmpty: messageEmpty,
  });

export const getDownloadField = (entity, isManager, appMessages) => ({
  type: 'download',
  value: entity.getIn(['attributes', 'document_url']),
  isManager,
  public: entity.getIn(['attributes', 'public']),
  showEmpty: appMessages.attributes.documentEmpty,
});

export const getEmailField = (entity) => ({
  type: 'email',
  value: entity.getIn(['attributes', 'email']),
});
