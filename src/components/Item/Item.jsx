import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Item.scss';
import 'antd/dist/antd.min.css';

import { Card , Rate } from 'antd';
import { format } from 'date-fns';
import noPoster from '../../img/no_poster.png';

export default class Item extends Component {
  static defaultProps = {
    id: 0,
    shortText: () => {},
    item: {},
    ratedList: [],
    genresList: [],
    changeRatedMovies: () => {},
    setRating: () => {},
    deleteRating: () => {},
    getRatedMovies: () => {}
  };

  static propTypes = {
    id: PropTypes.number,
    shortText: PropTypes.func,
    item: PropTypes.instanceOf(Object),
    ratedList: PropTypes.instanceOf(Array),
    genresList: PropTypes.instanceOf(Array),
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
    const genres = genresNumbers.map((el) => {
      const genre = genresList.find((item) => item.id === el);
      return genre.name;
    })
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
  
  // eslint-disable-next-line react/no-unused-class-component-methods
  checkMovieInRated = (id, arr, isRating) => {   
    let rating = 0;

    if (isRating) {
      rating = isRating; 
    } else {
      arr.forEach((el) => {
        if (el.id === id) {
          rating = el.rating;
        };
      });
    }
    return rating;
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  RRR = (id) => {
    let rating;
    const {getRatedMovies} = this.props;
    if (getRatedMovies().findIndex((el) => el.id === id) !== -1) {
      rating = getRatedMovies().find((el) => el.id === id).rating;
    } else {
      rating = 0;
    }
    return rating;  
  }


  render() {
    // eslint-disable-next-line no-unused-vars
    const { shortText, item, ratedList, getRatedMovies } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { id, title, release_date: releaseDate, poster_path: posterPath, overview, genre_ids: genreIds, vote_average: voteAverage, rating } = item;

    const poster = this.showPoster(posterPath);
    const name = shortText(title, 35);

    let date;
    if (releaseDate) {
      date = format(new Date(releaseDate), "MMM d',' yyyy");
    };

    const text = shortText(overview, 170);

    // const onRating = this.checkMovieInRated(id, getRatedMovies(), rating);
    const onRating = (getRatedMovies().findIndex((el) => el.id === id) !== -1) ? (getRatedMovies().find((el) => el.id === id).rating) : 0;

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
