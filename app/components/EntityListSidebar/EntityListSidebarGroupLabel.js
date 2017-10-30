/*
 *
 * EntityListSidebarGroupLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { palette } from 'styled-theme';

import Icon from 'components/Icon';

const Styled = styled.a`
  display: block;
  color: ${palette('dark', 2)};
  background-color: ${palette('light', 1)};
  padding: 0.5em 2em;
`;
const Right = styled.div`
  color: ${palette('dark', 4)};
  float:right;
  position: relative;
  right: -5px;
`;

export default class EntityListSidebarGroupLabel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onToggle: PropTypes.func,
  };

  render() {
    const { label, icon, onToggle } = this.props;

    return (
      <Styled onClick={onToggle} href="#toggleFilter" title="Show filter options">
        {label}
        <Right><Icon name={icon} text /></Right>
      </Styled>
    );
  }
}
