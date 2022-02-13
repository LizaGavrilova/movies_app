import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card , Rate } from 'antd';
import { format } from 'date-fns';
import noPoster from '../../img/no_poster.png';

import './Item.scss';

export default class Item extends Component {
  static defaultProps = {
    id: 0,
    item: {},
    genresList: [],
    shortText: () => {}, 
    changeRatedMovies: () => {},
    setRating: () => {},
    deleteRating: () => {},
    getRatedMovies: () => {}
  };

  static propTypes = {
    id: PropTypes.number,
    item: PropTypes.instanceOf(Object),
    genresList: PropTypes.instanceOf(Array),
    shortText: PropTypes.func,
    changeRatedMovies: PropTypes.func,
    setRating: PropTypes.func,
    deleteRating: PropTypes.func,
    getRatedMovies: PropTypes.func
  };

  showPoster = (path) => {
    if (path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    } 
    return noPoster;    
  };

  genresMovie = (genresNumbers) => {
    const {genresList} = this.props;
    const genres = genresNumbers.map((el) => genresList.find((item) => item.id === el).name)
    return genres;
  };

  ratingСhanges = (grade) => {
    const {item, setRating, deleteRating, changeRatedMovies} = this.props;
    const {id} = item;

    if (grade === 0) {
      deleteRating(id);
    } else {
      setRating(id, grade);
    }
    changeRatedMovies();
  };

  ratingColor = (number) => {
    let color;

    if (number <= 3) {
      color = '#E90000';
    } else if (number <= 5) {
      color = '#E97E00';
    } else if (number <= 7) {
      color = '#E9D100';
    } else if (number > 7) {
      color = '#66E900';
    }

    return {
      borderColor: color
    }
  };

  render() {
    const { shortText, item, getRatedMovies } = this.props;
    const { id, title, release_date: releaseDate, poster_path: posterPath, overview, genre_ids: genreIds, vote_average: voteAverage} = item;

    const poster = this.showPoster(posterPath);
    const name = shortText(title, 35);

    let date;
    if (releaseDate) {
      date = format(new Date(releaseDate), "MMM d',' yyyy");
    };

    const text = shortText(overview, 135);

    let onRating;
    if (getRatedMovies() !== null) {
      onRating = (getRatedMovies().findIndex((el) => el.id === id) !== -1) ? (getRatedMovies().find((el) => el.id === id).rating) : 0;
    } else onRating = 0;

    const colorFilm = this.ratingColor(voteAverage);

    const genresFilm = this.genresMovie(genreIds);

    const genresCards = (
      <>
        {genresFilm.map((genre) => (
            <span className='ant-card-body_genre-item' key={genre}>
              {genre}
            </span>
          ))}
      </>
    )

    return (
      <Card className="ant-card" cover={<img alt="poster" src={poster} />}>
        <div className="ant-card-body_rating" style={colorFilm}>{voteAverage}</div>
        <div className="ant-card-body_title">{name}</div>
        <div className="ant-card-body_date">{date}</div>
        <div className="ant-card-body_genres">{genresCards}</div>
        <div className="ant-card-body_text">{text}</div>

        <div className="ant-card-body_stars">
          <Rate count={10} value={onRating} onChange={this.ratingСhanges} />
        </div>
      </Card>
    );
  }
}
