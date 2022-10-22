import React from 'react'
import {useLocation} from "react-router-dom";


function NotFound404() {
    let pageLocation = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{pageLocation.pathname}' не найдена</h1>
        </div>
    )
}


export default NotFound404
