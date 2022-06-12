const Nav = () => {
    return (
        <nav className="">

            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/calendar">Calendrier</NavLink>
            <NavLink href="/pj">PJ</NavLink>
            <NavLink href="/map">Carte</NavLink>
            <NavLink href="/player">Joeurs</NavLink>
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
