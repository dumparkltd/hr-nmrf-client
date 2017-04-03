/*
 *
 * UserView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import { loadEntitiesIfNeeded } from 'containers/App/actions';

import Page from 'components/Page';
import EntityView from 'components/views/EntityView';

import {
  getUser,
  isReady,
} from 'containers/App/selectors';

import messages from './messages';

export class UserView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadEntitiesIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    // reload entities if not ready or no longer ready (eg invalidated)
    if (!nextProps.dataReady) {
      this.props.loadEntitiesIfNeeded();
    }
  }

  // only show the highest rated role (lower role ids means higher)
  getUserRole = (roles) => {
    const highestRole = Object.values(roles).reduce((currentHighestRole, role) =>
      !currentHighestRole || role.role.id < currentHighestRole.id
      ? role.role
      : currentHighestRole
    , null);
    return highestRole.attributes.friendly_name;
  }

  handleEdit = () => {
    browserHistory.push(`/users/edit/${this.props.user.id || this.props.user.attributes.id}`);
  }

  handleEditPassword = () => {
    browserHistory.push(`/users/password/${this.props.user.id || this.props.user.attributes.id}`);
  }

  handleClose = () => {
    browserHistory.push('/');
    // TODO should be "go back" if history present or to categories list when not
  }

  render() {
    const { user, dataReady } = this.props;
    const reference = user && user.id;

    return (
      <div>
        <Helmet
          title={this.context.intl.formatMessage(messages.pageTitle)}
          meta={[
            { name: 'description', content: this.context.intl.formatMessage(messages.metaDescription) },
          ]}
        />
        { !user && !dataReady &&
          <div>
            <FormattedMessage {...messages.loading} />
          </div>
        }
        { !user && dataReady &&
          <div>
            <FormattedMessage {...messages.notFound} />
          </div>
        }
        { user && dataReady &&
          <Page
            title={this.context.intl.formatMessage(messages.pageTitle)}
            actions={[
              {
                type: 'simple',
                title: 'Edit',
                onClick: this.handleEdit,
              },
              {
                type: 'simple',
                title: 'Change password',
                onClick: this.handleEditPassword,
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
                      id: 'name',
                      heading: 'Name',
                      value: user.attributes.name,
                    },
                  ],
                  aside: [
                    {
                      id: 'number',
                      heading: 'Number',
                      value: reference,
                    },
                    {
                      id: 'updated',
                      heading: 'Updated At',
                      value: user.attributes.updated_at,
                    },
                    {
                      id: 'updated_by',
                      heading: 'Updated By',
                      value: user.user && user.user.attributes.name,
                    },
                  ],
                },
                body: {
                  main: [
                    {
                      id: 'email',
                      heading: 'Email',
                      value: user.attributes.email,
                    },
                  ],
                  aside: [
                    {
                      id: 'role',
                      heading: 'Role',
                      value: user.roles ? this.getUserRole(user.roles) : 'User',
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

UserView.propTypes = {
  loadEntitiesIfNeeded: PropTypes.func,
  user: PropTypes.object,
  dataReady: PropTypes.bool,
};

UserView.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  dataReady: isReady(state, { path: [
    'users',
    'user_roles',
    'roles',
    // 'categories',
    // 'taxonomies',
    // 'indicators',
  ] }),
  user: getUser(
    state,
    {
      id: props.params.id,
      out: 'js',
      extend: [
        {
          type: 'single',
          path: 'users',
          key: 'last_modified_user_id',
          as: 'user',
        },
        {
          path: 'user_roles',
          key: 'user_id',
          as: 'roles',
          reverse: true,
          extend: {
            type: 'single',
            path: 'roles',
            key: 'role_id',
            as: 'role',
          },
        },
      ],
    },
  ),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEntitiesIfNeeded: () => {
      // dispatch(loadEntitiesIfNeeded('taxonomies'));
      // dispatch(loadEntitiesIfNeeded('categories'));
      dispatch(loadEntitiesIfNeeded('users'));
      dispatch(loadEntitiesIfNeeded('user_roles'));
      dispatch(loadEntitiesIfNeeded('roles'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);