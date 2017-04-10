/*
 *
 * ReportView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import { find } from 'lodash/collection';

import { loadEntitiesIfNeeded } from 'containers/App/actions';

import { PUBLISH_STATUSES } from 'containers/App/constants';

import Page from 'components/Page';
import EntityView from 'components/views/EntityView';

import {
  getEntity,
  isReady,
} from 'containers/App/selectors';

import messages from './messages';

export class ReportView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadEntitiesIfNeeded();
  }

  handleEdit = () => {
    browserHistory.push(`/reports/edit/${this.props.params.id}`);
  }

  handleClose = () => {
    browserHistory.push(`/indicators/${this.props.report.indicator.id}`);
    // TODO should be "go back" if history present or to reports list when not
  }

  render() {
    const { report, dataReady } = this.props;
    const reference = this.props.params.id;
    const status = report && find(PUBLISH_STATUSES, { value: report.attributes.draft });
    const statusDoc = report && find(PUBLISH_STATUSES, { value: report.attributes.document_public });

    let pageTitle = this.context.intl.formatMessage(messages.pageTitle);

    if (report) {
      pageTitle = `${pageTitle} (Indicator: ${report.attributes.indicator_id})`;
    }

    return (
      <div>
        <Helmet
          title={`${this.context.intl.formatMessage(messages.pageTitle)}: ${reference}`}
          meta={[
            { name: 'description', content: this.context.intl.formatMessage(messages.metaDescription) },
          ]}
        />
        { !report && !dataReady &&
          <div>
            <FormattedMessage {...messages.loading} />
          </div>
        }
        { !report && dataReady &&
          <div>
            <FormattedMessage {...messages.notFound} />
          </div>
        }
        { report &&
          <Page
            title={pageTitle}
            actions={[
              {
                type: 'simple',
                title: 'Edit',
                onClick: this.handleEdit,
              },
              {
                type: 'primary',
                title: 'Close',
                onClick: this.handleClose,
              },
            ]}
          >
            <EntityView
              fields={{
                header: {
                  main: [
                    {
                      id: 'title',
                      value: report.attributes.title,
                    },
                  ],
                  aside: [
                    {
                      id: 'number',
                      heading: 'Number',
                      value: reference,
                    },
                    {
                      id: 'status',
                      heading: 'Status',
                      value: status && status.label,
                    },
                    {
                      id: 'updated',
                      heading: 'Updated At',
                      value: report.attributes.updated_at,
                    },
                    {
                      id: 'updated_by',
                      heading: 'Updated By',
                      value: report.user && report.user.attributes.name,
                    },
                  ],
                },
                body: {
                  main: [
                    {
                      id: 'description',
                      heading: 'Description',
                      value: report.attributes.description,
                    },
                    {
                      id: 'document_url',
                      heading: 'Document URL',
                      value: report.attributes.document_url,
                    },
                    {
                      id: 'document_public',
                      heading: 'Document public',
                      value: statusDoc && statusDoc.label,
                    },
                  ],
                },
              }}
            />
          </Page>
        }
      </div>
    );
  }
}

ReportView.propTypes = {
  loadEntitiesIfNeeded: PropTypes.func,
  report: PropTypes.object,
  dataReady: PropTypes.bool,
  params: PropTypes.object,
};

ReportView.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  dataReady: isReady(state, { path: [
    'progress_reports',
    'users',
    'indicators',
  ] }),
  report: getEntity(
    state,
    {
      id: props.params.id,
      path: 'progress_reports',
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
          path: 'indicators',
          key: 'indicator_id',
          as: 'indicator',
        },
      ],
    },
  ),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEntitiesIfNeeded: () => {
      dispatch(loadEntitiesIfNeeded('indicators'));
      dispatch(loadEntitiesIfNeeded('progress_reports'));
      dispatch(loadEntitiesIfNeeded('users'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportView);
