import { Link } from 'react-router-dom'

const Navbar = ({ handleLogout, user, authenticated }) => {
  return user && authenticated ? (
    <nav className="navbar bg-dark border-bottom border-secondary nav-container">
      <div className="btn-group">
        {/* <Link className="btn btn-outline-primary px-2 nav-item" to="/">
          <h3>Home</h3>
        </Link> */}
        <Link className="btn btn-outline-primary px-2 nav-item" to="/dashboard">
          <h3>Dashboard</h3>
        </Link>
        {/* <Link className="btn btn-outline-primary px-2 nav-item" to="/about">
          <h3>About</h3>
        </Link>

        <Link className="btn btn-outline-primary px-2 nav-item" to="/profile">
          <h3>Profile</h3>
        </Link> */}
        <Link
          className="btn btn-outline-primary px-2 nav-item"
          onClick={() => {
            handleLogout()
          }}
          to="/"
        >
          <h3>Sign Out</h3>
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="align-items-right navbar navbar-expand-lg bg-dark  navbar-dark border-bottom border-secondary nav-container">
      <div className="btn-group">
        <Link className="btn btn-outline-primary px-2 nav-item" to="/">
          <h3>Sign In</h3>
        </Link>
        {/* <Link className="btn btn-outline-primary px-2 nav-item" to="/dashboard">
          <h3>Dashboard</h3>
        </Link> */}
      </div>
    </nav>
  )
}

export default Navbar
