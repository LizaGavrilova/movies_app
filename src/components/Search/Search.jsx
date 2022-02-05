import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.scss';
import 'antd/dist/antd.min.css';

import { Layout, Input } from 'antd';

const { Header } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
export default class Search extends Component {
  static defaultProps = {
    onInputChange: () => {}
  };

  static propTypes = {
    onInputChange: PropTypes.func
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
