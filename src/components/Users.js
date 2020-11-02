import React from 'react'
import UserItem from './Useritem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const Users = ({users, loading}) => { 
    if(loading) {
    return <Spinner></Spinner>
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

Users.propTypes = {
    user: PropTypes.array.isRequired,
    loading: PropTypes.bool.isrequired,
}

const userStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'}

export default Users
