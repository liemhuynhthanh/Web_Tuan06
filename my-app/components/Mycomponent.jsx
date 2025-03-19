import React, { Component } from 'react';
import AddUserInfor from './AddnewUserInfor.jsx';
import DisplayInfor from './DisplayInfor.jsx';

export default class Mycomponent extends Component {
    state = {
        listUser: [
            { id: 1, Name: "Dung", Age: 49 },
            { id: 2, Name: "Liem", Age: 20 },
            { id: 3, Name: "Hao", Age: 30 }
        ]
    };

    handleAddnewUser = (userObject) => {
        this.setState({
            listUser: [userObject, ...this.state.listUser]
        });
    };

    handleDeleteUser = (userID) => {
        let listUserClone = this.state.listUser.filter(item => item.id !== userID);
        this.setState({
            listUser: listUserClone
        });
    };

    render() {
        return (
            <div>
                <AddUserInfor handleAddnewUser={this.handleAddnewUser} />
                <hr />
                <DisplayInfor listUser={this.state.listUser} handleDeleteUser={this.handleDeleteUser} />
            </div>
        );
    }
}
