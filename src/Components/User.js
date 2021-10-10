import React from 'react';

class User extends React.Component {


    render() {
const { id, firstName, lastName, email, phone } = this.props.user;
const state = this.props.user.adress.state;
        return (

            <tr onClick = {() => this.props.changeSelectedProfile(this.props.index)} 
            className = {this.props.index === this.props.selectedProfileKey ? " users-table__row current" :"users-table__row"}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{state}</td>
            </tr>
        )
    }
}


export default User;