import React, { Component } from "react";

import './Item.scss';
import 'antd/dist/antd.min.css';

import { Card } from "antd";
import { Rate } from "antd";
import { format } from 'date-fns';

export default class Item extends Component {
  render() {
    const {shortText} = this.props;
    const {title, release_date, poster_path, overview} = this.props.item;
    
    const poster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const name = shortText(title, 35);
    let date;
    try {
      date = format(new Date(release_date), "MMM d',' yyyy");
    } 
    catch (e) {
    }
    const text = shortText(overview, 170);

    return (
      <Card className="ant-card"
            cover={<img alt="poster" src={poster} />}>
        <div className="ant-card-body_rating"></div>
        <div className="ant-card-body_title">{name}</div>
        <div className="ant-card-body_date">{date}</div>
        <div className="ant-card-body_genres">{'Fantasy'}</div>
        <div className="ant-card-body_text">{text}</div>

        <div className="ant-card-body_stars">
          <Rate />
        </div>
      </Card>
    );
  };
};