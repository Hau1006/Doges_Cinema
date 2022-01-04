import React, { useState } from 'react';
import MovieItem from './components/MovieItem/MovieItem';
import styles from './MovieList.module.css';
import { Select } from 'antd';

function MovieList(props) {
  const { movieList } = props;
  const { Option } = Select;
  const renderMovieList = movieList?.map((movie) => {
    return (
      <MovieItem
        key={movie.maPhim}
        movieName={movie.tenPhim}
        movieID={movie.maPhim}
        trailer={movie.trailer}
        movieImg={movie.hinhAnh}
        movieRate={movie.danhGia}
        secretMovieName={movie.biDanh}
      />
    );
  })

  return (
    <div style={{ backgroundColor: '#001232', padding: '5px 0' }}>
      <div className={`${styles.Container_Lg} ${styles.P_Lg_0}`}>
        <div className={styles.Content}>
          <div className={styles.Filter}>
            <div className={styles.SortBy}>
              <span className={styles.Type}>
                Sort By: &nbsp;
              </span>
              <Select name="sortBy" defaultValue={'All'} style={{ width: '120px' }}>
                <Option value="1">All</Option>
                <Option value="2">Now showing</Option>
                <Option value="3">Coming</Option>
              </Select>
            </div>
          </div>
          <div className={styles.MovieList}>
            <div className={styles.Row}>
              {renderMovieList}
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default MovieList
