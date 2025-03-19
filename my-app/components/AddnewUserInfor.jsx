import React, { Component } from 'react'

export default class AddnewUserInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Age: ''
        };
    }
    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.handleAddnewUser({
            id: Math.floor((Math.random() * 100) + 1) + "user",
            Name: this.state.Name,
            Age: this.state.Age
        })
    }
    handleOnchangeAge= (e)=>{
        this.setState({Age: e.target.value})
    }
    handleOnchangeInput= (e)=>{
        this.setState({Name: e.target.value})
    }
    render() {
        return (
            <div>
                <form action="" onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label htmlFor="">Your name:</label>
                    <input type="text" value={this.state.Name}
                        onChange={(event) => this.handleOnchangeInput(event)} />
                    <br />
                    <label htmlFor="">Your Age:</label>
                    <input type="text"
                        onChange={(event) => this.handleOnchangeAge(event)}
                        value={this.state.Age} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
