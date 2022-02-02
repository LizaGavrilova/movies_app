import React, { Component } from "react";

import './App.scss';
import 'antd/dist/antd.min.css';

import Search from '../Search';
import CardList from '../CardList';
import RatedList from '../RatedList';
import ApiService from "../../services/ApiService";

import { Layout, Tabs } from 'antd';
const { TabPane } = Tabs;

export default class App extends Component {

  constructor() {
    super();
    this.searchMovies();
  }

  state = {
    moviesList: [],
    searchQuery: 'Harry Potter and',
    pageNumber: 1,
  };

  createItem = (item) => {
    return {
      id: item.id,
      title: item.title,
      overview: item.overview,
      popularity: item.popularity,
      poster_path: item.poster_path,
      release_date: item.release_date   
    };
  };

  addItem = (item) => {
    const newItem = this.createItem(item);
    this.setState(({ moviesList }) => {
      const newArr = [...moviesList, newItem];
      return {
        moviesList: newArr
      };
    });
  };

  searchMovies = () => {
    const {searchQuery, pageNumber} = this.state;
    const apiService = new ApiService();
    apiService
      .getAllMovies(searchQuery, pageNumber)
      .then((body) => {
        body.results.forEach((el) => {
          this.addItem(el);
        }) ;       
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

  render() {
    const {moviesList} = this.state;

    return (
      <div className="container">
        <Layout>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <Search />
                <CardList
                  moviesList={moviesList}
                  shortText={this.shortText} />
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