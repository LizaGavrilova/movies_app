import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CardList.scss';

import { Content } from 'antd/lib/layout/layout';

import Item from '../Item';

// eslint-disable-next-line react/prefer-stateless-function
export default class CardList extends Component {
  static defaultProps = {
    moviesList: [],
    shortText: () => {},
    ratedList: [],
    genresList: [],
    changeRatedMovies: () => {}
  };

  static propTypes = {
    moviesList: PropTypes.instanceOf(Array),
    shortText: PropTypes.func,
    ratedList: PropTypes.instanceOf(Array),
    genresList: PropTypes.instanceOf(Array),
    changeRatedMovies: PropTypes.func
  };

  render() {
    const { moviesList, shortText, ratedList, genresList, changeRatedMovies } = this.props;
    const elements = moviesList.map((item) =>
      <Item key={item.id}
            item={item}
            shortText={shortText}
            ratedList={ratedList}
            genresList={genresList}
            changeRatedMovies={changeRatedMovies} />);

    return <Content>{elements}</Content>;
  }
}
