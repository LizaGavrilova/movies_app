import React, { Component } from "react";

import './CardList.scss';

import Item from '../Item';
import { Content } from "antd/lib/layout/layout";

export default class CardList extends Component {

  render() {
    const {moviesList, shortText} = this.props;
    const elements = moviesList.map((item) => {
      return (
        <Item
          key={item.id}
          item={item}
          shortText={shortText} />
      );
    });

    return (
      <Content>
        {elements}
      </Content>
    );
  };
};