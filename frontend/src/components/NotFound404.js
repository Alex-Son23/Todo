import React from 'react'
import {useLocation} from "react-router-dom";


// const NotFound404 = ({ location }) => {
//     console.log(location)
//     return (
//         <div>
//             <h1>Страница по адресу '{location.pathname}' не найдена</h1>
//         </div>
//     )
// }
function NotFound404() {
    let pageLocation = useLocation()
    // console.log(pageLocation)
    return (
        <div>
            <h1>Страница по адресу '{pageLocation.pathname}' не найдена</h1>
        </div>
    )
}


export default NotFound404
