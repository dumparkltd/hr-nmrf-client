/*
 *
 * EntityListPrintKey
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Map, List } from 'immutable';
import { sortEntities } from 'utils/sort';
import { PATHS } from 'containers/App/constants';

import ButtonTagCategory from 'components/buttons/ButtonTagCategory';

import appMessages from 'containers/App/messages';

import { makeCategoriesForTaxonomy } from './categoryFactory';

import messages from './messages';

const Styled = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.sizes.print.largest};
  margin-bottom: 20px;
`;

const Taxonomy = styled.div`
  width: 100%;
  padding: 0.75em 0;
  text-align: left;
  color: ${(props) => props.active ? palette('asideListItem', 1) : palette('asideListItem', 0)};
  background-color: ${(props) => props.active ? palette('asideListItem', 3) : palette('asideListItem', 2)};
  border-bottom: 1px solid ${palette('asideListItem', 4)};
  &:last-child {
    border-bottom: 0;
  }
`;
const TaxLabel = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.sizes.print.small};
  margin-bottom: 5px;
`;
const TagWrapper = styled.span`
  display: inline-block;
  min-width: 80px;
`;
const CatLabel = styled.span`
  font-size: ${(props) => props.theme.sizes.print.small};
  color: ${palette('text', 0)};
`;

export class EntityListPrintKey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      config,
      entities,
      taxonomies,
      locationQuery,
    } = this.props;
    // only show taxonomy & associated categories if some list items have such category
    return (
      <Styled>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        {config.taxonomies && taxonomies && sortEntities(taxonomies, 'asc', 'priority').map(
          (tax) => {
            const categories = makeCategoriesForTaxonomy(
              tax,
              config,
              entities,
              taxonomies,
              locationQuery,
            );
            // const nested = tax.getIn(['attributes', 'parent_id']);
            if (categories && categories.items && categories.items.length > 0) {
              return (
                <Taxonomy key={tax.get('id')}>
                  <TaxLabel>
                    <FormattedMessage {...appMessages.entities.taxonomies[tax.get('id')].plural} />
                  </TaxLabel>
                  <div>
                    {categories.items.map((cat) => (
                      <div key={cat.id}>
                        <TagWrapper>
                          <ButtonTagCategory
                            as="span"
                            taxId={parseInt(tax.get('id'), 10)}
                          >
                            {cat.short}
                          </ButtonTagCategory>
                        </TagWrapper>
                        <a href={`${PATHS.CATEGORIES}/${cat.id}`}>
                          <CatLabel>
                            {cat.label}
                          </CatLabel>
                        </a>
                      </div>
                    ))}
                  </div>
                </Taxonomy>
              );
            }
            return null;
          }
        )}
      </Styled>
    );
  }
}
EntityListPrintKey.propTypes = {
  entities: PropTypes.instanceOf(List),
  taxonomies: PropTypes.instanceOf(Map),
  locationQuery: PropTypes.instanceOf(Map),
  config: PropTypes.object,
};

EntityListPrintKey.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default EntityListPrintKey;
