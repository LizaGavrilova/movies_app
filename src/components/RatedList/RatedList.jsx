import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Content } from 'antd/lib/layout/layout';

import { Item } from '../Item';

import './RatedList.scss';

export default class RatedList extends Component {
  static defaultProps = {
    ratedList: [],
    genresList: [],
    shortText: () => {},
    changeRatedMovies: () => {},
    setRating: () => {},
    deleteRating: () => {},
    getRatedMovies: () => {},
  };

  static propTypes = {
    ratedList: PropTypes.instanceOf(Array),
    genresList: PropTypes.instanceOf(Array),
    shortText: PropTypes.func,
    changeRatedMovies: PropTypes.func,
    setRating: PropTypes.func,
    deleteRating: PropTypes.func,
    getRatedMovies: PropTypes.func,
  };

  render() {
    const { ratedList, genresList, shortText, changeRatedMovies, setRating, deleteRating, getRatedMovies } = this.props;
    const elements = ratedList.map((item) => (
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
    ));

    return <Content>{elements}</Content>;
  }
}
