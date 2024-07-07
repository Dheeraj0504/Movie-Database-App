import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  // console.log(props)
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <li className="movie-card-container">
        <img className="movie-card-image" alt={title} src={posterPath} />
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">{`Rating: ${voteAverage}/10`}</p>
        <button className="view-details-button" type="button">
          View Details
        </button>
      </li>
    </Link>
  )
}
export default MovieCard
