import React from "react";


const MenuItem = ({item}) => {
    return (
        <li><a href='#' class='menu-but'>{item.name}</a></li>
    )
}

const MenuList = ({items}) => {
    return (
        <nav>
            <ul>
                {items.map((item) => <MenuItem item={item}/>)}
            </ul>
        </nav>
    )
}

export default MenuList