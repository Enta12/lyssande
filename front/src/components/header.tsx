import Nav from './nav'
import logo from '../assets/logo.svg' 

const Header = () => {
    return (
        <header className="h-28 px-16 bg-swamp flex items-center justify-between">
            <img className="h-14" src={logo} alt="logo"></img>
            <Nav />
        </header>
    )
}

export default Header