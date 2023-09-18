import React from 'react'
import { Link } from 'react-router-dom'

export const PostItem = ({ id, title }) => {
  return (
    <div className="postItem">
      <div className="container">
        <Link to={`task/${id}`} className="taskLink">
          <p>
            {id}. {title.length > 75 ? title.substring(0, 75) + '...' : title}
          </p>
        </Link>
      </div>
    </div>
  )
}
