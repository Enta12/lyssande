import React from "react"
import Header from "./header"
import Notif from "./notif"
import Footer from "./footer"

const Layout = (props : {children: JSX.Element, notifMessage?: string}) => {
    const {children, notifMessage} = props
    return (
        <div className="h-full flex justify-between flex-col bg-amber-100">
            <div>
                <Header />
                {notifMessage && <Notif>{notifMessage}</Notif>}
            </div>
            
            <section className="flex align-center justify-center py-6 bg-amber-100">{children}</section>
            <Footer />
        </div>
    )
}

export default Layout