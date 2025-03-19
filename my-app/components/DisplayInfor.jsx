import React, { Component } from 'react'

export default class DisplayInfor extends Component {
    render() {
        const { listUser } = this.props;//truyền từ cha sang con
        return (
            <div>
                {listUser.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>My name is: {user.Name}</div>
                            <div>My Age: {user.Age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }

}
