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
    genresList: [],
    changeRatedMovies: () => {},
    setRating: () => {},
    deleteRating: () => {},
    getRatedMovies: () => {}
  };

  static propTypes = {
    moviesList: PropTypes.instanceOf(Array),
    shortText: PropTypes.func,
    genresList: PropTypes.instanceOf(Array),
    changeRatedMovies: PropTypes.func,
    setRating: PropTypes.func,
    deleteRating: PropTypes.func,
    getRatedMovies: PropTypes.func
  };

  render() {
    const { moviesList, shortText, genresList, changeRatedMovies, setRating, deleteRating, getRatedMovies } = this.props;
    const elements = moviesList.map((item) =>
      <Item key={item.id}
            item={item}
            shortText={shortText}
            genresList={genresList}
            changeRatedMovies={changeRatedMovies}
            setRating={setRating}
            deleteRating={deleteRating}
            getRatedMovies={getRatedMovies} />);

    return <Content>{elements}</Content>;
  }
}
