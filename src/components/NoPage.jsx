import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

const NoPage = () => {
    return (
        <>
            <h1>404</h1>
            <p>You traveled abit to far my friend. I wish you well in your journey and remember,</p>
            <p className="quotething"> “If one dream should fall and break into a thousand pieces, never be afraid to pick one of those pieces up and begin again.” -<i>Flavia Weedn</i></p><br />
            <div align="center">
                <Link to="/"><input type="button" className="" value="Go Back!!!" /></Link>
            </div>
        </>
    )
}

export default NoPage