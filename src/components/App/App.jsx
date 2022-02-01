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

  state = {
    moviesList: [],
    searchQuery: 'return',
    pageNumber: 1
  };

  createItem = (item) => {
    return {
      id: item.id,
      title: item.title,
      overview: item.overview,
      popularity: item.popularity      
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

  render() {
    const {moviesList} = this.state;
    this.searchMovies();

    return (
      <div className="container">
        <Layout>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <Search />
                <CardList
                  moviesList={moviesList} />
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