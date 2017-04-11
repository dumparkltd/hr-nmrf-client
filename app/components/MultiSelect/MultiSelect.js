import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { kebabCase } from 'lodash/string';
import IndeterminateCheckbox, { STATES as CHECKBOX_STATES } from 'components/IndeterminateCheckbox';

export const getChangedOptions = (options) =>
  options.filter((o) => o.get('hasChanged'));

export const getCheckedValuesFromOptions = (options, onlyChanged = false) => {
  const opts = onlyChanged ? getChangedOptions(options) : options;
  return opts.filter((o) => o.get('checked')).map((o) => o.get('value'));
};

export const getUncheckedValuesFromOptions = (options, onlyChanged = false) => {
  const opts = onlyChanged ? getChangedOptions(options) : options;
  return opts.filterNot((o) => o.get('checked')).map((o) => o.get('value'));
};

const sortValues = {
  [CHECKBOX_STATES.checked]: 1,
  [CHECKBOX_STATES.indeterminate]: 0,
  [CHECKBOX_STATES.unchecked]: -1,
};

export default class MultiSelect extends React.Component {

  static propTypes = {
    options: PropTypes.instanceOf(Immutable.List),
    values: PropTypes.instanceOf(Immutable.List),
    initialValues: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func.isRequired,
    valueCompare: PropTypes.func,
    threeState: PropTypes.bool,
  }

  static defaultProps = {
    values: new Immutable.List(),
    initialValues: new Immutable.List(),
    valueCompare: (a, b) => a.get('value') === b.get('value'),
    threeState: false,
  }

  onChange = (checked, theValue) => {
    const currentValues = this.props.options.reduce((values, option) => {
      const value = this.props.values.find((v) => this.props.valueCompare(option.get('value'), v));
      return values.push(value || option.get('value'));
    }, Immutable.List());

    const nextValues = currentValues.map((value) => {
      if (this.props.valueCompare(value, theValue)) {
        return value.set('checked', checked).set('hasChanged', this.getInitialValue(value) !== theValue);
      }
      return value;
    });

    this.props.onChange(nextValues);
  }

  getInitialValue = (value) => value ? this.props.initialValues.find((v) => this.props.valueCompare(value, v)) : null;

  setChecked = (option, value) => value ? option.setIn(['value', 'checked'], value.get('checked')) : option;

  renderCheckbox = (option, i) => {
    const value = option.get('value');
    const checked = value.get('checked');
    const label = option.get('label');
    const isThreeState = option.get('isThreeState');
    const id = `${checked}-${i}-${kebabCase(label)}`;
    return (
      <div key={id}>
        { isThreeState &&
          <IndeterminateCheckbox
            onChange={(status) => {
              this.onChange(status, value);
            }}
            value={value.get('label')}
            checked={checked}
            id={id}
          />
        }
        { !isThreeState &&
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(evt) => {
              if (evt && evt !== undefined) evt.stopPropagation();
              this.onChange(evt.target.checked, value);
            }}
          />
        }
        <label htmlFor={id} >
          {label}
        </label>
      </div>
    );
  }


  render() {
    const { options, values, valueCompare, threeState } = this.props;
    const checkboxes = options.map((option) => {
      const value = values.find((v) => valueCompare(option.get('value'), v));
      const initialValue = this.getInitialValue(value);
      const isThreeState = threeState && initialValue.get('checked') === CHECKBOX_STATES.indeterminate;
      return option.withMutations((o) => this.setChecked(o, value).set('initialValue', initialValue).set('isThreeState', isThreeState));
    })
    .sort((a, b) => {
      const aSort = sortValues[a.getIn(['initialValue', 'checked'])];
      const bSort = sortValues[b.getIn(['initialValue', 'checked'])];
      if (aSort > bSort) return -1;
      if (aSort < bSort) return 1;
      return 0;
    });

    return (
      <div>
        {checkboxes && checkboxes.map(this.renderCheckbox)}
      </div>
    );
  }
}
