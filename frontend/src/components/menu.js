import React from "react";
import {Link} from "react-router-dom";


const MenuItem = ({item}) => {
    return (
        <li>
            <Link to={item.href} className={'menu-but'}>{item.name}</Link>
        </li>
    )
}

const MenuList = ({items, auth, logout}) => {
    return (
        <nav>
            <ul>
                {items.map((item) => <MenuItem item={item}/>)}
                {auth.isLogin ? 
                <li><span className={'menu-but'}>{auth.username}</span> <button className={'menu-but'} onClick={logout}>Logout</button></li>
                :
                <li><Link to='/login' className={'menu-but'}>Login</Link></li>}
            </ul>
        </nav>
    )
}

export default MenuList