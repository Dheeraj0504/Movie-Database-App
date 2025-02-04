import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    // console.log(this.props)
    const {pageNo} = this.state
    const {totalPages} = this.props
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="control-button"
          onClick={this.onPrevPage}
        >
          Prev
        </button>
        <p className="page-number">
          {pageNo} of {totalPages}
        </p>
        <button
          type="button"
          className="control-button"
          onClick={this.onNextPage}
        >
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
