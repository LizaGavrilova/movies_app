import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Input } from 'antd';

import './Search.scss';

const { Header } = Layout;

export default class Search extends Component {
  static defaultProps = {
    onInputChange: () => {},
  };

  static propTypes = {
    onInputChange: PropTypes.func,
  };

  render() {
    const { onInputChange } = this.props;
    return (
      <Header>
        <Input placeholder="Type to search..." onChange={onInputChange} />
      </Header>
    );
  }
}
