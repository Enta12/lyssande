const Nav = () => {
    return (
        <nav className="">

            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/calender">Calendrier</NavLink>
            <NavLink href="/pj">Mes PJ</NavLink>
            <NavLink href="/map">Carte</NavLink>
            <NavLink href="/fight">Combat</NavLink>
        </nav>
    )
}

const NavLink = (props : {children: string, href: string}) => {
    const { href, children } = props
    return (
        <a href={href} className="text-gray-300 mx-2.5 font-semibold text-2xl">{children}</a>
    )
}

export default Nav
