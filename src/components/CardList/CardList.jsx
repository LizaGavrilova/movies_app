import React, { Component } from 'react';

import './CardList.scss';

import { Content } from 'antd/lib/layout/layout';
import Item from '../Item';

// eslint-disable-next-line react/prefer-stateless-function
export default class CardList extends Component {
  render() {
    const { moviesList, shortText } = this.props;
    const elements = moviesList.map((item) => <Item key={item.id} item={item} shortText={shortText} />);

    return <Content>{elements}</Content>;
  }
}
