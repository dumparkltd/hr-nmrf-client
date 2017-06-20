/*
 *
 * IndicatorView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { loadEntitiesIfNeeded, updatePath } from 'containers/App/actions';

import { CONTENT_SINGLE } from 'containers/App/constants';

import Loading from 'components/Loading';
import Content from 'components/Content';
import ContentHeader from 'components/ContentHeader';
import EntityView from 'components/EntityView';

import {
  getEntity,
  getEntities,
  isReady,
  isUserContributor,
} from 'containers/App/selectors';

import appMessages from 'containers/App/messages';
import messages from './messages';

export class IndicatorView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadEntitiesIfNeeded();
  }
  componentWillReceiveProps(nextProps) {
    // reload entities if invalidated
    if (!nextProps.dataReady) {
      this.props.loadEntitiesIfNeeded();
    }
  }

  getHeaderMainFields = (entity, isManager) => ([ // fieldGroups
    { // fieldGroup
      fields: [
        {
          type: 'titleText',
          value: entity.attributes.title,
          isManager,
        },
      ],
    },
  ]);

  getHeaderAsideFields = (entity, isContributor) => {
    if (isContributor) {
      return [
        {
          fields: [
            {
              type: 'referenceStatus',
              fields: [
                {
                  type: 'reference',
                  value: entity.attributes.reference || entity.id,
                  label: this.context.intl.formatMessage(appMessages.attributes.idOrRef),
                },
                {
                  type: 'status',
                  value: entity.attributes.draft,
                },
              ],
            },
            {
              type: 'meta',
              fields: [
                {
                  label: this.context.intl.formatMessage(appMessages.attributes.meta.updated_at),
                  value: this.context.intl.formatDate(new Date(entity.attributes.updated_at)),
                },
                {
                  label: this.context.intl.formatMessage(appMessages.attributes.meta.updated_by),
                  value: entity.user && entity.user.attributes.name,
                },
              ],
            },
          ],
        },
      ];
    }
    return [
      {
        fields: [
          {
            type: 'referenceStatus',
            fields: [
              {
                type: 'reference',
                large: true,
                value: entity.attributes.reference || entity.id,
                label: this.context.intl.formatMessage(appMessages.attributes.idOrRef),
              },
            ],
          },
        ],
      },
    ];
  }

  getBodyMainFields = (entity, actions, reports, sdgtargets, actionTaxonomies, sdgtargetTaxonomies, isContributor) => ([
    {
      fields: [
        {
          type: 'description',
          value: entity.attributes.description,
        },
        {
          type: 'reports',
          label: this.context.intl.formatMessage(appMessages.entities.progress_reports.plural),
          values: this.mapReports(reports),
          showEmpty: this.context.intl.formatMessage(appMessages.entities.progress_reports.empty),
          button: isContributor
            ? {
              type: 'add',
              title: this.context.intl.formatMessage(messages.addReport),
              onClick: this.props.handleNewReport,
            }
            : null,
        },
      ],
    },
    {
      label: 'Connections',
      icon: 'connections',
      fields: [
        {
          type: 'connections',
          label: `${Object.values(actions).length} ${this.context.intl.formatMessage(Object.values(actions).length === 1 ? appMessages.entities.measures.single : appMessages.entities.measures.plural)}`,
          entityType: 'actions',
          values: Object.values(actions),
          icon: 'actions',
          entityPath: '/actions/',
          taxonomies: actionTaxonomies,
          showEmpty: this.context.intl.formatMessage(appMessages.entities.measures.empty),
          connectionOptions: [{
            label: this.context.intl.formatMessage(appMessages.entities.recommendations.plural),
            path: 'recommendations',
          },
          {
            label: this.context.intl.formatMessage(appMessages.entities.indicators.plural),
            path: 'indicators',
          }],
        },
        {
          type: 'connections',
          label: `${Object.values(sdgtargets).length} ${this.context.intl.formatMessage(Object.values(sdgtargets).length === 1 ? appMessages.entities.sdgtargets.single : appMessages.entities.sdgtargets.plural)}`,
          entityType: 'sdgtargets',
          values: Object.values(sdgtargets),
          icon: 'sdgtargets',
          entityPath: '/sdgtargets/',
          taxonomies: sdgtargetTaxonomies,
          showEmpty: this.context.intl.formatMessage(appMessages.entities.sdgtargets.empty),
          connectionOptions: [{
            label: this.context.intl.formatMessage(appMessages.entities.indicators.plural),
            path: 'indicators',
          }],
        },
      ],
    },
  ]);

  getBodyAsideFields = (entity, dates) => ([ // fieldGroups
    { // fieldGroup
      label: this.context.intl.formatMessage(appMessages.entities.due_dates.schedule),
      type: 'dark',
      icon: 'reminder',
      fields: [
        {
          label: this.context.intl.formatMessage(appMessages.entities.due_dates.plural),
          type: 'schedule',
          values: this.mapDates(dates),
          showEmpty: this.context.intl.formatMessage(appMessages.entities.due_dates.empty),
        },
        {
          label: this.context.intl.formatMessage(appMessages.attributes.manager_id.indicators),
          type: 'manager',
          value: entity.manager && entity.manager.attributes.name,
          showEmpty: this.context.intl.formatMessage(appMessages.attributes.manager_id.indicatorsEmpty),
        },
      ],
    },
  ]);

  getFields = (entity, isContributor, actions, sdgtargets, reports, dates, actionTaxonomies, sdgtargetTaxonomies) => ({
    header: {
      main: this.getHeaderMainFields(entity, isContributor),
      aside: this.getHeaderAsideFields(entity, isContributor),
    },
    body: {
      main: this.getBodyMainFields(entity, actions, reports, sdgtargets, actionTaxonomies, sdgtargetTaxonomies, isContributor),
      aside: isContributor ? this.getBodyAsideFields(entity, dates) : null,
    },
  });

  mapReports = (reports) =>
    Object.values(reports).map((report) => ({
      label: report.attributes.title,
      dueDate: report.due_date ? this.context.intl.formatDate(new Date(report.due_date.attributes.due_date)) : null,
      linkTo: `/reports/${report.id}`,
    }))
  mapDates = (dates) =>
    Object.values(dates).map((date) => ({
      label: this.context.intl.formatDate(new Date(date.attributes.due_date)),
      due: date.attributes.due,
      overdue: date.attributes.overdue,
    }))

  render() {
    const { indicator, dataReady, isContributor, actions, sdgtargets, reports, dates, actionTaxonomies, sdgtargetTaxonomies } = this.props;

    const buttons = isContributor
    ? [
      {
        type: 'text',
        title: this.context.intl.formatMessage(messages.addReport),
        onClick: this.props.handleNewReport,
      },
      {
        type: 'edit',
        onClick: this.props.handleEdit,
      },
      {
        type: 'close',
        onClick: this.props.handleClose,
      },
    ]
    : [{
      type: 'close',
      onClick: this.props.handleClose,
    }];

    return (
      <div>
        <Helmet
          title={`${this.context.intl.formatMessage(messages.pageTitle)}: ${this.props.params.id}`}
          meta={[
            { name: 'description', content: this.context.intl.formatMessage(messages.metaDescription) },
          ]}
        />
        <Content>
          <ContentHeader
            title={this.context.intl.formatMessage(messages.pageTitle)}
            type={CONTENT_SINGLE}
            icon="indicators"
            buttons={buttons}
          />
          { !indicator && !dataReady &&
            <Loading />
          }
          { !indicator && dataReady &&
            <div>
              <FormattedMessage {...messages.notFound} />
            </div>
          }
          { indicator && dataReady &&
            <EntityView
              fields={this.getFields(indicator, isContributor, actions, sdgtargets, reports, dates, actionTaxonomies, sdgtargetTaxonomies)}
            />
          }
        </Content>
      </div>
    );
  }
}

IndicatorView.propTypes = {
  loadEntitiesIfNeeded: PropTypes.func,
  handleEdit: PropTypes.func,
  handleClose: PropTypes.func,
  handleNewReport: PropTypes.func,
  indicator: PropTypes.object,
  dataReady: PropTypes.bool,
  isContributor: PropTypes.bool,
  actions: PropTypes.object,
  sdgtargets: PropTypes.object,
  reports: PropTypes.object,
  actionTaxonomies: PropTypes.object,
  sdgtargetTaxonomies: PropTypes.object,
  dates: PropTypes.object,
  params: PropTypes.object,
};

IndicatorView.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};


const mapStateToProps = (state, props) => ({
  isContributor: isUserContributor(state),
  dataReady: isReady(state, { path: [
    'measures',
    'sdgtargets',
    'users',
    'indicators',
    'measure_indicators',
    'sdgtarget_indicators',
    'progress_reports',
    'due_dates',
    'taxonomies',
    'categories',
    'recommendations',
    'recommendation_measures',
    'measure_categories',
  ] }),
  indicator: getEntity(
    state,
    {
      id: props.params.id,
      path: 'indicators',
      out: 'js',
      extend: [
        {
          type: 'single',
          path: 'users',
          key: 'last_modified_user_id',
          as: 'user',
        },
        {
          type: 'single',
          path: 'users',
          key: 'manager_id',
          as: 'manager',
        },
      ],
    },
  ),
  actionTaxonomies: getEntities(
    state, {
      out: 'js',
      path: 'taxonomies',
      where: {
        tags_measures: true,
      },
      extend: {
        path: 'categories',
        key: 'taxonomy_id',
        reverse: true,
      },
    },
  ),
  sdgtargetTaxonomies: getEntities(
    state, {
      out: 'js',
      path: 'taxonomies',
      where: {
        tags_sdgtargets: true,
      },
      extend: {
        path: 'categories',
        key: 'taxonomy_id',
        reverse: true,
      },
    },
  ),
  // all connected actions
  actions: getEntities(
    state, {
      path: 'measures',
      out: 'js',
      connected: {
        path: 'measure_indicators',
        key: 'measure_id',
        where: {
          indicator_id: props.params.id,
        },
      },
      extend: [
        {
          path: 'measure_categories',
          key: 'measure_id',
          reverse: true,
          as: 'taxonomies',
        },
        {
          path: 'recommendation_measures',
          key: 'measure_id',
          reverse: true,
          as: 'recommendations',
          connected: {
            path: 'recommendations',
            key: 'recommendation_id',
            forward: true,
          },
        },
        {
          path: 'measure_indicators',
          key: 'measure_id',
          reverse: true,
          as: 'indicators',
          connected: {
            path: 'indicators',
            key: 'indicator_id',
            forward: true,
          },
        },
      ],
    },
  ),
  sdgtargets: getEntities(
    state, {
      path: 'sdgtargets',
      out: 'js',
      connected: {
        path: 'sdgtarget_indicators',
        key: 'sdgtarget_id',
        where: {
          indicator_id: props.params.id,
        },
      },
      extend: [
        {
          path: 'sdgtarget_categories',
          key: 'sdgtarget_id',
          reverse: true,
          as: 'taxonomies',
        },
        {
          path: 'sdgtarget_indicators',
          key: 'sdgtarget_id',
          reverse: true,
          as: 'indicators',
          connected: {
            path: 'indicators',
            key: 'indicator_id',
            forward: true,
          },
        },
      ],
    },
  ),
  // all connected reports
  reports: getEntities(
    state, {
      path: 'progress_reports',
      out: 'js',
      where: {
        indicator_id: props.params.id,
      },
      extend: {
        path: 'due_dates',
        key: 'due_date_id',
        type: 'single',
        as: 'due_date',
      },
    },
  ),
  // all connected due_dates
  dates: getEntities(
    state, {
      path: 'due_dates',
      out: 'js',
      where: {
        indicator_id: props.params.id,
      },
      without: {
        path: 'progress_reports',
        key: 'due_date_id',
      },
    },
  ),
});

function mapDispatchToProps(dispatch, props) {
  return {
    loadEntitiesIfNeeded: () => {
      dispatch(loadEntitiesIfNeeded('indicators'));
      dispatch(loadEntitiesIfNeeded('users'));
      dispatch(loadEntitiesIfNeeded('progress_reports'));
      dispatch(loadEntitiesIfNeeded('due_dates'));
      dispatch(loadEntitiesIfNeeded('measures'));
      dispatch(loadEntitiesIfNeeded('measure_indicators'));
      dispatch(loadEntitiesIfNeeded('measure_categories'));
      dispatch(loadEntitiesIfNeeded('sdgtargets'));
      dispatch(loadEntitiesIfNeeded('sdgtarget_indicators'));
      dispatch(loadEntitiesIfNeeded('sdgtarget_categories'));
      dispatch(loadEntitiesIfNeeded('recommendations'));
      dispatch(loadEntitiesIfNeeded('recommendation_measures'));
      dispatch(loadEntitiesIfNeeded('taxonomies'));
      dispatch(loadEntitiesIfNeeded('categories'));
      dispatch(loadEntitiesIfNeeded('user_roles'));
    },
    handleEdit: () => {
      dispatch(updatePath(`/indicators/edit/${props.params.id}`));
    },
    handleNewReport: () => {
      dispatch(updatePath(`/reports/new/${props.params.id}`));
    },
    handleClose: () => {
      dispatch(updatePath('/indicators'));
      // TODO should be "go back" if history present or to indicators list when not
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorView);
