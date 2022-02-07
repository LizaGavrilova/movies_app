import React, { Component } from 'react';

import './App.scss';
import 'antd/dist/antd.min.css';

import { Alert, Spin, Layout, Tabs, Pagination } from 'antd';
import { debounce } from 'lodash';
import { Offline, Online } from "react-detect-offline";

import noConnection from '../../img/no_connection.png';

import Search from '../Search';
import CardList from '../CardList';
import RatedList from '../RatedList';
import ApiService from '../../services/ApiService';

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    moviesList: [],
    searchQuery: '',
    pageNumber: 1,
    totalPages: 0,
    loading: false,
    error: false,
    notFound: false,
  };

  // Получить список фильмов с API
  // eslint-disable-next-line react/sort-comp
  searchMovies = () => {
    const { searchQuery, pageNumber } = this.state;
    const apiService = new ApiService();
    apiService
      .getAllMovies(searchQuery, pageNumber)
      .then((body) => {
        this.setState({
          moviesList: [...body.results],
          totalPages: body.total_pages,
          loading: false,
          error: false,
          notFound: false,
        });
      })
      .then(() => {
        const { moviesList } = this.state;
        if (moviesList.length === 0) {
          this.setState({
            notFound: true,
          });
        }
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      notFound: false,
      error: true,
    });
  };

  shortText = (text, length) => {
    if (text.length > length) {
      const lastIndex = text.slice(0, length).lastIndexOf(' ');
      const newText = `${text.slice(0, lastIndex)}...`;
      return newText;
    }
    return text;
  };

  // Задержка получения списка фильмов
  debounceSearchMovies = debounce(this.searchMovies, 300);

  onInputChange = (evt) => {
    this.setState({
      searchQuery: evt.target.value,
      loading: true,
      pageNumber: 1,
    });
  };

  // Обновление
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;

    if (searchQuery !== prevState.searchQuery || pageNumber !== prevState.pageNumber) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loading: true,
        error: false,
        notFound: false,
      });
      this.debounceSearchMovies(searchQuery, pageNumber);
    }
  }

  // Пагинация
  onPageChange = (page) => {
    this.setState({
      pageNumber: page,
    });
  };

  render() {
    const { moviesList, searchQuery, pageNumber, totalPages, error, loading, notFound } = this.state;

    const errorMessage =
      error && searchQuery !== '' ? (
        <Alert message="Error" description="Something went wrong!" type="error" showIcon />
      ) : null;

    const onNotFound =
      !loading && !error && notFound ? <Alert message="Nothing found for your request" type="info" showIcon /> : null;

    const spin = loading && !error ? <Spin size="large" /> : null;

    const cardList = !loading && !error ? <CardList moviesList={moviesList} shortText={this.shortText} /> : null;

    const onPagination =
      moviesList.length !== 0 && searchQuery !== '' && !loading && !error ? (
        <Pagination current={pageNumber} total={totalPages * 10} onChange={this.onPageChange} size="small" />
      ) : null;

    return (
      <div className="container">
        <Online>
          <Layout>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <Search onInputChange={this.onInputChange} />
                <>
                  {errorMessage}
                  {onNotFound}
                  {spin}
                  {cardList}
                  {onPagination}
                </>
              </TabPane>
              <TabPane tab="Rated" key="2">
                <RatedList />
              </TabPane>
            </Tabs>
          </Layout> 
          <img className='hidden connection_img' src={noConnection} alt='No connection' />         
        </Online>        

        <Offline>
          <img className='connection_img' src={noConnection} alt='No connection' style={{margin: '50px'}} />
          <h1 className='connection_text' style={{textAlign: 'center'}}>No internet connection</h1>
        </Offline>
        
      </div>
    );
  }
}
