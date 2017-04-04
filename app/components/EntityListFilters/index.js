/*
 *
 * EntityListFilters
 *
 */

import React, { PropTypes } from 'react';
import Immutable, { Map } from 'immutable';

import FilterForm from 'components/FilterForm';
import Option from 'components/FilterForm/Option';

export default class EntityListFilters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    filterGroups: PropTypes.instanceOf(Immutable.Map),
    formOptions: PropTypes.object,
    onShowFilterForm: PropTypes.func.isRequired,
    onHideFilterForm: PropTypes.func.isRequired,
    formModel: PropTypes.string,
  };

  // static contextTypes = {
  //   intl: React.PropTypes.object.isRequired,
  // };

  getFormOptions(formOptions) {
    // Display the options
    return formOptions.toList().sortBy((option) => option.get('label')).map((option) => Map({
      value: option,
      label: <Option label={option.get('label')} count={option.get('count')} />,
    }));
  }

  renderFilterGroup = (group, groupId) => (
    <div key={groupId}>
      <strong>{group.get('label')}</strong>
      <div>
        { group.get('options') &&
          group.get('options').valueSeq().map((option) => (
            <div key={option.get('id')}>
              <button
                onClick={(evt) => {
                  if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                  // Here we are recording the path to the "filter options" that we want to display within this.props.filterOptions
                  this.props.onShowFilterForm({
                    group: group.get('id'),
                    optionId: option.get('id'),
                  });
                }}
              >
                {option.get('label')}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );

  render() {
    const { filterGroups, formOptions, onHideFilterForm, formModel } = this.props;
    return (
      <div>
        { filterGroups &&
          filterGroups.entrySeq().map(([groupId, group]) => this.renderFilterGroup(group, groupId))
        }
        { formOptions &&
          <FilterForm
            model={formModel}
            title={formOptions.get('title')}
            options={this.getFormOptions(formOptions.get('options'))}
            onClose={onHideFilterForm}
          />
        }
      </div>
    );
  }
}
