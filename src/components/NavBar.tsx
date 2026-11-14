import { NavLink } from 'react-router-dom'

// NavLink adds the "active" class to the link of the page that's open
function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" end>
        Characters
      </NavLink>{' '}
      <NavLink to="/stats">Stats</NavLink>{' '}
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  )
}

export default NavBar
