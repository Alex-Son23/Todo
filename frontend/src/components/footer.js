import React from "react";


const FooterItem = ({item}) => {
    return (
        <li><a href='#' class='footer-but'>{item.name}</a></li>
    )
}

const FooterList = ({items}) => {
    return (
        <footer>
            <ul>
                {items.map((item) => <FooterItem item={item}/>)}
            </ul>

        </footer>
    )
}

export default FooterList