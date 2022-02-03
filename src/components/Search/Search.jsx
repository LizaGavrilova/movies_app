import React, { Component } from "react";

import './Search.scss';
import 'antd/dist/antd.min.css';

import { Layout, Input } from "antd";
const { Header } = Layout;

export default class Search extends Component {
  render() {
    const {onInputChange} = this.props;
    return (
      <Header>
        <Input placeholder="Type to search..." onChange={onInputChange} />
      </Header>
    );
  };
};