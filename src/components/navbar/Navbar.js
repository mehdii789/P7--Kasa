import './navbar.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const currentRoute = window.location.pathname;

    return (
        <nav className='nav'>
            <ul className='nav_list'>
             {/* Si currentRoute est égal à "/", alors il retourne "nav_list_item_active" 
            (ce qui signifie que cet élément de liste est actif), sinon il retourne "nav_list_item"
             (ce qui signifie qu'il n'est pas actif). */}
                <li className={currentRoute === '/' ? 'nav_list_item_active' : 'nav_list_item'}>
                    <Link  to='/'>
                        Accueil
                    </Link>
                </li>
                <li className={currentRoute === '/about' ? 'nav_list_item_active' : 'nav_list_item'}>
                    <Link  to='/about'>
                        A propos
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
