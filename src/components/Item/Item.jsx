import React, { Component } from "react";

import './Item.scss';
import 'antd/dist/antd.min.css';

import { Card } from "antd";
import { Rate } from "antd";

export default class Item extends Component {
  render() {
    const {title} = this.props;
    return (
      <Card className="ant-card">
        <div className="ant-card-body_rating"></div>
        <div className="ant-card-body_title">{title}</div>
        <div className="ant-card-body_genres"></div>
        <div className="ant-card-body_text"></div>

        <div className="ant-card-body_stars">
          <Rate />
        </div>
      </Card>
    );
  };
};