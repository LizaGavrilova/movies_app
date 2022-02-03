import React, { Component } from "react";

import './App.scss';
import 'antd/dist/antd.min.css';

import Search from '../Search';
import CardList from '../CardList';
import RatedList from '../RatedList';
import ApiService from "../../services/ApiService";

import { Alert, Spin, Layout, Tabs } from 'antd';
import { debounce } from "lodash";
const { TabPane } = Tabs;

export default class App extends Component {

  state = {
    moviesList: [],
    searchQuery: '',
    pageNumber: 1,
    loading: false,
    error: false,
    notFound: false
  };

  searchMovies = () => {
    const {searchQuery, pageNumber} = this.state;
    const apiService = new ApiService();
    apiService
      .getAllMovies(searchQuery, pageNumber)
      .then((res) => {
        this.setState({
          moviesList: [...res],
          loading: false,
          error: false,
          notFound: false
        });
      })
      .then(() => {
        if (this.state.moviesList.length === 0) {
          this.setState({
            notFound: true
          });
        }
      })
      .catch(this.onError);      
  };

  onError = () => {
    this.setState({
      loading: false,
      notFound: false,
      error: true
    });
  };

  shortText = (text, length) => {
    if (text.length > length) {
      let lastIndex = text.slice(0, length).lastIndexOf(' ');
      let newText = text.slice(0, lastIndex) + "...";
      return newText;
    } else {
      return text;
    }
  };

  debounceSearchMovies = debounce(this.searchMovies, 300);

  onInputChange = (evt) => {
    this.setState({
      searchQuery: evt.target.value,
      loading: true
    },
    () => {
      this.debounceSearchMovies();
    }
    );
  };

  render() {
    const {moviesList, searchQuery, error, loading, notFound} = this.state;

    const errorMessage = (error && searchQuery !== '') ? (
      <Alert message='Error' description='Something went wrong!' type="error" showIcon />
    ) : null;

    const onNotFound = (!loading && !error && notFound) ? (
      <Alert message='Nothing found for your request' type="info" showIcon />
    ) : null;

    const spin = (loading && !error) ? <Spin size="large" /> : null;

    const cardList = (!loading && !error) ? (
      <CardList
        moviesList={moviesList}
        shortText={this.shortText} />
    ) : null;

    return (
      <div className="container">
        <Layout>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <Search onInputChange={this.onInputChange} />
                <React.Fragment>
                  {errorMessage}
                  {onNotFound}
                  {spin}
                  {cardList}                  
                </React.Fragment>                
              </TabPane>
              <TabPane tab="Rated" key="2">
                <RatedList />
              </TabPane>
            </Tabs>
        </Layout>
      </div>
    );
  };
};