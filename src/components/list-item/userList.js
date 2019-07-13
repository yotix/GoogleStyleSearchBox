import React from 'react';
import { User } from '../../models/user';
import './item.css';
import {findItems} from '../../utils/utils';

const UserList = props =>{
    const user = new User(props.user.id,props.user.name,props.user.pincode,props.user.address,props.user.items);
    let total=findItems(props.highlight,user.items);

    return(
            <div className="user-list">
            <b>{user.id}</b>
            <p>
            <i className="name">{user.name}</i>
            </p>
            {total?
                <p className="items">
                    
                {props.highlight} "found in items"
                </p>:""
            }
            <p className="address">
            {user.address}
            </p>
        </div>
    )
}

export default UserList;