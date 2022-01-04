import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Footer from '../../../components/Client/Footer/Footer'
import ScrollTop from '../../../components/Common/ScrollTop/ScrollTop'
import Banner from './components/Banner/Banner'
import FilterBox from './components/FilterBox/FilterBox'
import MovieList from './components/MovieList/MovieList'
import Pagination from './components/Pagination/Pagination'
import { getMovieListAsync, selectMovieList } from './module/movieListSlice'

function Home() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 16,
  });
  const dispatch = useDispatch();
  const movieList = useSelector(selectMovieList);
  // const movie = movieList.reverse();
  // console.log("movieList",movieList);
  // console.log("movieList2",movie);
  useEffect(() => {
    //cal api get moevie list from fisrt page 
    dispatch(getMovieListAsync(pagination.page));
    return () => {
      console.log('Clean useEffect');
    };
  }, [pagination]);



  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage
    });
  }

  return (
    <>
      <>
        <Banner />
        <FilterBox movieList={movieList.items} />
        <MovieList movieList={movieList.items} />
        <Pagination pagination={pagination} totalPages={movieList.totalPages} onPageChange={handlePageChange} />
        <ScrollTop />
      </>
      <Footer />
    </>
  )
}

export default Home
