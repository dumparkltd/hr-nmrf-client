import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import Label from 'components/styled/Label';

import messages from './messages';

const Status = styled(Label)`
  float: ${({ float }) => float || 'right'};
  padding-left: ${({ float }) => float === 'left' ? 0 : '1em'};;
  padding-right: ${({ float }) => float === 'left' ? '1em' : 0};
  font-weight: bold;
  font-size: ${(props) => props.theme.sizes && props.theme.sizes.text.listItemTop};
  margin-top: ${({ top }) => top ? '-7px' : 0};
  color: ${palette('dark', 4)};
`;

class ItemStatus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { draft, top, float } = this.props;
    return draft
      ? (<Status top={top} float={float}>
        {this.context.intl && this.context.intl.formatMessage(messages.draft)}
      </Status>)
      : null
    ;
  }
}

ItemStatus.propTypes = {
  draft: PropTypes.bool,
  top: PropTypes.bool,
  float: PropTypes.string,
};

ItemStatus.contextTypes = {
  intl: PropTypes.object,
};

export default ItemStatus;
