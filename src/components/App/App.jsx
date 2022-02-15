import React, { Component } from 'react';

import 'antd/dist/antd.min.css';

import { Alert, Spin, Layout, Tabs, Pagination } from 'antd';
import { debounce } from 'lodash';
import { Offline, Online } from "react-detect-offline";

import noConnection from '../../img/no_connection.png';

import { GenresProvider } from '../../Context/Context';
import {Search} from '../Search';
import {CardList} from '../CardList';
import {RatedList} from '../RatedList';
import ApiService from '../../services/ApiService';

import './App.scss';

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
    ratedList: [],
    genresList: []
  };

  componentDidMount() {
    this.getGenresList();

    if (!JSON.parse(localStorage.getItem('guestToken'))) {
      this.createGuestSession();
    } else {
      this.changeRatedMovies(); 
    };
  };

  // Обновление
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;

    if (searchQuery !== prevState.searchQuery || pageNumber !== prevState.pageNumber) {
      this.setState({
        loading: true,
        error: false,
        notFound: false,
      });
      this.debounceSearchMovies(searchQuery, pageNumber);
    };
  };

  // Гостевая сессия
  createGuestSession = () => {
    const apiService = new ApiService();
    apiService
      .createGuestSession()
      .then((res) => {
        localStorage.setItem('guestToken', JSON.stringify(res));
      })
      .catch(this.onError);
  };

  // Изменение строки ввода
  onInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
      loading: true,
      pageNumber: 1,
    });
  };

  // Получить список фильмов с API
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

  // Задержка получения списка фильмов
  debounceSearchMovies = debounce(this.searchMovies, 300);

  // Пагинация
  onPageChange = (page) => {
    this.setState({
      pageNumber: page,
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

  getGenresList = () => {
    const apiService = new ApiService();
    apiService
      .getGenres()
      .then((res) => {
        this.setState({
          genresList: [...res]          
        })
      })
      .catch(this.onError);
  };


  // Добавить оценку в localStorage
  setRating = (id, rating) => {
    const {ratedList, moviesList} =this.state;
    let newArr= [];
    
    const film = moviesList.find((el) => el.id === id);
    film.rating = rating;

    let idx;
    if (ratedList) {
      idx = ratedList.findIndex((el) => el.id === id);
    }

    if(idx !== -1) {
      newArr = [...ratedList.slice(0, idx), film, ...ratedList.slice(idx + 1)];
    } else {
      newArr = [...ratedList, film];
    }

    this.setState({
      ratedList: newArr
    });
    
    localStorage.setItem('arrRatedMovies', JSON.stringify(newArr));
  };

  // Удалить оценку из localStorage
  deleteRating = (id) => {
    const {ratedList} =this.state;
    let idx;
    if (ratedList) {
      idx = ratedList.findIndex((el) => el.id === id);
    }
    let newArr;
    if (idx !== -1) {
      newArr = [...ratedList.slice(0, idx), ...ratedList.slice(idx + 1)];
    }    

    this.setState({
      ratedList: newArr
    });

    localStorage.setItem('arrRatedMovies', JSON.stringify(newArr));     
  };

  // Получить список оцененных филмов из localStorage
  getRatedMovies = () => {
    const arrRatedMovies = JSON.parse(localStorage.getItem('arrRatedMovies'));
    return arrRatedMovies;
  };

  changeRatedMovies = () => {
    const arrRated = this.getRatedMovies();
    this.setState({
      ratedList: (arrRated !== null) ? [...arrRated] : []
    })
  };

  render() {
    const { moviesList, searchQuery, pageNumber, totalPages, error, loading, notFound, ratedList, genresList } = this.state;

    const errorMessage =
      error && searchQuery !== '' ? (
        <Alert message="Error" description="Something went wrong!" type="error" showIcon />
      ) : null;

    const onNotFound =
      !loading && !error && notFound ? <Alert message="Nothing found for your request" type="info" showIcon /> : null;

    const spin = loading && !error ? <Spin size="large" /> : null;

    const cardList = !loading && !error ? <CardList
                                            moviesList={moviesList}
                                            shortText={this.shortText}
                                            genresList={genresList}
                                            changeRatedMovies={this.changeRatedMovies}
                                            setRating={this.setRating}
                                            deleteRating={this.deleteRating}
                                            getRatedMovies={this.getRatedMovies}
                                          /> : null;

    const onPagination =
      moviesList.length !== 0 && searchQuery !== '' && !loading && !error ? (
        <Pagination current={pageNumber} total={totalPages * 10} onChange={this.onPageChange} size="small" />
      ) : null;

    return (
      <GenresProvider value={genresList}>
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
                  <RatedList ratedList={ratedList}
                            genresList={genresList}
                            shortText={this.shortText}
                            setRating={this.setRating}
                            deleteRating={this.deleteRating}
                            changeRatedMovies={this.changeRatedMovies}
                            getRatedMovies={this.getRatedMovies}
                  />
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
      </GenresProvider>
    );
  }
}
