import React, { Component } from 'react';

// let status = {
//     commandLabel: '',
//     commandName: '',
//     commandAdrress: ''
// }

class Command extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.commandNumber,
            commandLabel: '',
            commandName: '',
            commandAdress: '',
        }
        this.submit = this.submit.bind(this)
        // this.updateCommandLabel = this.updateCommandLabel.bind(this)
        // this.updateCommandName = this.updateCommandName.bind(this)
        // this.updateCommandAdress = this.updateCommandAdress.bind(this)

    }

    submit(e) {
        //console.log(this.state);
        this.props.addingStatesFunc(this.state)
        e.target.disabled=true
    }

    updateCommandLabel(e) {
        this.setState({
            commandLabel: e.target.value
        })
        // status.commandLabel = e.target.value
        //this.props.status[this.props.commandNumber].commandLabel = e.target.value
    }

    updateCommandName(e) {
        this.setState({
            commandName: e.target.value
        })
        //status.commandName = e.target.value
        //this.props.status[this.props.commandNumber].commandName = e.target.value
    }

    updateCommandAdress(e) {
        this.setState({
            commandAdress: e.target.value
        })
        //status.commandAdress = e.target.value
        //this.props.status[this.props.commandNumber].commandAdress = e.target.value
    }




    render() {
        return (
            <div>
                <p>Komenda nr {this.props.commandNumber+1}</p>
                <label>
                    Etykieta
                    <input
                        value={this.state.commandLabel}
                        onChange={e => this.updateCommandLabel(e)}
                        className="label">
                    </input>
                </label>
                <label>
                    Komenda
                    <input
                        value={this.state.commandName}
                        onChange={e => this.updateCommandName(e)}
                        className="command_name">
                    </input>
                </label>
                <label>
                    Adres
                    <input
                        value={this.state.commandAdress}
                        onChange={e => this.updateCommandAdress(e)}
                        className="adress">
                    </input>
                </label>
                <button onClick={e => this.submit(e)}>Print</button>
            </div>
        )
    }
}

export default Command