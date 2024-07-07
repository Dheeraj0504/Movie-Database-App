import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

class PopularMovies extends Component {
  state = {
    popularMovies: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesData = async (page = 1) => {
    const API_KEY = 'b319e862a6d817c031c5b82638087686'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      const updatedData = this.getUpdatedData(data)
      this.setState({
        popularMovies: updatedData,
        isLoading: false,
      })
    }
  }

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    const {results} = popularMovies
    // console.log(results)

    return (
      <div className="movies-container">
        <h1 className="heading">Popular Movies</h1>
        <ul className="movies-list-container">
          {results.map(each => (
            <MovieCard key={each.id} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  render() {
    const {isLoading, popularMovies} = this.state
    // console.log(popularMovies)
    return (
      <>
        <NavBar />
        <div className="popular-movies-container">
          {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
        </div>
        <Pagination
          totalPages={popularMovies.totalPages}
          apiCallback={this.getPopularMoviesData}
        />
      </>
    )
  }
}
export default PopularMovies
