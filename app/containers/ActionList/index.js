/*
 *
 * ActionList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import EntityList from 'containers/EntityList';
import { PUBLISH_STATUSES } from 'containers/App/constants';

import {
  loadEntitiesIfNeeded,
} from 'containers/App/actions';

import { isReady } from 'containers/App/selectors';

import messages from './messages';

export class ActionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadEntitiesIfNeeded();
  }

  mapToEntityList = ({ id, attributes }) => ({
    id,
    title: attributes.title,
    linkTo: `/actions/${id}`,
    reference: id,
    status: attributes.draft ? 'draft' : null,
  })

  render() {
    const { dataReady } = this.props;

    const extensions = [
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
      },
    ];

    const filters = {
      keyword: {
        attributes: [
          'id',
          'title',
          'description',
        ],
      },
      taxonomies: { // filter by each category
        label: 'By category',
        select: {
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
        query: 'cat',
        connected: {
          path: 'measure_categories',
          key: 'measure_id',
          whereKey: 'category_id',
        },
      },
      connections: [ // filter by associated entity
        {
          path: 'indicators', // filter by recommendation connection
          query: 'indicators',
          connected: {
            path: 'measure_indicators',
            key: 'measure_id',
            whereKey: 'indicator_id',
          },
        },
        {
          path: 'recommendations', // filter by recommendation connection
          query: 'recommendations',
          connected: {
            path: 'recommendation_measures',
            key: 'measure_id',
            whereKey: 'recommendation_id',
          },
        },
      ],
      connectedTaxonomies: { // filter by each category
        label: 'By associated categories',
        query: 'catx',
        connections: [
          {
            path: 'recommendations', // filter by recommendation connection
            title: 'Recommendations',
            key: 'recommendation_id',
            connected: {
              path: 'recommendation_measures',
              key: 'measure_id',
              connected: {
                path: 'recommendation_categories',
                key: 'recommendation_id',
                attribute: 'recommendation_id',
                whereKey: 'category_id',
              },
            },
            select: {
              out: 'js',
              path: 'taxonomies',
              where: {
                tags_recommendations: true,
              },
              extend: {
                path: 'categories',
                key: 'taxonomy_id',
                reverse: true,
                extend: {
                  path: 'recommendation_categories',
                  key: 'category_id',
                  reverse: true,
                  as: 'recommendations',
                },
              },
            },
          },
        ],
      },
      attributes: [ // filter by attribute value
        {
          label: 'Status',
          attribute: 'draft',
          options: PUBLISH_STATUSES,
        },
      ],
    };
    const headerOptions = {
      title: this.context.intl.formatMessage(messages.header),
      actions: [{
        type: 'primary',
        title: 'New action',
        onClick: () => browserHistory.push('/actions/new/'),
      }],
    };

    return (
      <div>
        <Helmet
          title={this.context.intl.formatMessage(messages.pageTitle)}
          meta={[
            { name: 'description', content: this.context.intl.formatMessage(messages.metaDescription) },
          ]}
        />
        { !dataReady &&
          <div>
            <FormattedMessage {...messages.loading} />
          </div>
        }
        { dataReady &&
          <EntityList
            location={this.props.location}
            mapToEntityList={this.mapToEntityList}
            path="measures"
            filters={filters}
            extensions={extensions}
            header={headerOptions}
          />
        }
      </div>
    );
  }
}

ActionList.propTypes = {
  loadEntitiesIfNeeded: PropTypes.func,
  location: PropTypes.object.isRequired,
  dataReady: PropTypes.bool,
};

ActionList.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dataReady: isReady(state, { path: [
    'measures',
    'measure_categories',
    'users',
    'taxonomies',
    'categories',
    'recommendations',
    'recommendation_measures',
    'recommendation_categories',
    'indicators',
    'measure_indicators',
  ] }),
});
function mapDispatchToProps(dispatch) {
  return {
    loadEntitiesIfNeeded: () => {
      dispatch(loadEntitiesIfNeeded('measures'));
      dispatch(loadEntitiesIfNeeded('measure_categories'));
      dispatch(loadEntitiesIfNeeded('users'));
      dispatch(loadEntitiesIfNeeded('taxonomies'));
      dispatch(loadEntitiesIfNeeded('categories'));
      dispatch(loadEntitiesIfNeeded('recommendations'));
      dispatch(loadEntitiesIfNeeded('recommendation_measures'));
      dispatch(loadEntitiesIfNeeded('recommendation_categories'));
      dispatch(loadEntitiesIfNeeded('indicators'));
      dispatch(loadEntitiesIfNeeded('measure_indicators'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionList);
