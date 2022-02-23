import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Content } from 'antd/lib/layout/layout';

import { Item } from '../Item';

import './ItemList.scss';

export default class ItemList extends Component {
  static defaultProps = {
    moviesList: [],
    shortText: () => {},
    genresList: [],
    changeRatedMovies: () => {},
    setRating: () => {},
    deleteRating: () => {},
    getRatedMovies: () => {},
  };

  static propTypes = {
    moviesList: PropTypes.instanceOf(Array),
    shortText: PropTypes.func,
    genresList: PropTypes.instanceOf(Array),
    changeRatedMovies: PropTypes.func,
    setRating: PropTypes.func,
    deleteRating: PropTypes.func,
    getRatedMovies: PropTypes.func,
  };

  render() {
    const { moviesList, shortText, genresList, changeRatedMovies, setRating, deleteRating, getRatedMovies } =
      this.props;
    return (
      <Content>
        {moviesList.map((item) => (
          <Item
            key={item.id}
            item={item}
            shortText={shortText}
            genresList={genresList}
            changeRatedMovies={changeRatedMovies}
            setRating={setRating}
            deleteRating={deleteRating}
            getRatedMovies={getRatedMovies}
          />
        ))}
      </Content>
    );
  }
}
