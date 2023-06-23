import React from 'react'
import "../App.css"

function Loader() {
    return (
        <>
            <div className='loader'>
                <div className="spinner-border text-light" role="status" style={{ width: '60px', height: '60px' }}>
                </div>
            </div>
        </>
    )
}

export default Loader