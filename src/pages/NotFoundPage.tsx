import { Link } from 'react-router-dom'

// For addresses that match no route. A wrong character id is handled by the details page itself.
function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        There's nothing at this address. <Link to="/">Back to the characters</Link>
      </p>
    </>
  )
}

export default NotFoundPage
