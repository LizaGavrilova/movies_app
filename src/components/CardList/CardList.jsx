import React, { Component } from "react";

import './CardList.scss';

import Item from '../Item';

export default class CardList extends Component {
  render() {
    const {moviesList} = this.props;
    const elements = moviesList.map((item) => {
      return (
        <Item
          key={item.id}
          id={item.id}
          title={item.title} />
      );
    });

    return (
      <div className="cardList">
        {elements}
      </div>
    );
  };
};