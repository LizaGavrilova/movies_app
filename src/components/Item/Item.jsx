import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Item.scss';
import 'antd/dist/antd.min.css';

import { Card , Rate } from 'antd';
import { format } from 'date-fns';
import noPoster from '../../img/no_poster.png';

export default class Item extends Component {
  static defaultProps = {
    shortText: () => {},
    item: {}
  };

  static propTypes = {
    shortText: PropTypes.func,
    item: PropTypes.instanceOf(Object)
  };

  showPoster = (path) => {
    if (path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    } 
    return noPoster;    
  };

  render() {
    const { shortText, item } = this.props;
    const { title, release_date: releaseDate, poster_path: posterPath, overview } = item;

    const poster = this.showPoster(posterPath);
    const name = shortText(title, 35);

    let date;
    if (releaseDate) {
      date = format(new Date(releaseDate), "MMM d',' yyyy");
    };

    const text = shortText(overview, 170);

    return (
      <Card className="ant-card" cover={<img alt="poster" src={poster} />}>
        <div className="ant-card-body_rating" />
        <div className="ant-card-body_title">{name}</div>
        <div className="ant-card-body_date">{date}</div>
        <div className="ant-card-body_genres">Fantasy</div>
        <div className="ant-card-body_text">{text}</div>

        <div className="ant-card-body_stars">
          <Rate count={10} />
        </div>
      </Card>
    );
  }
}
