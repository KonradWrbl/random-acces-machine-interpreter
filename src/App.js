import React, { Component } from 'react';
import Command from './Command'

class App extends Component {
  constructor() {
    super()
    this.state = {
      commandList: [],
      status: [],
      sol: [],
      var: ''
    }
    this.addNewCommand = this.addNewCommand.bind(this)
    this.getSolution = this.getSolution.bind(this)
    this.addingStatesFunc = this.addingStatesFunc.bind(this)
    this.solution = this.solution.bind(this)
    this.updateVar = this.updateVar.bind(this)

  }


  solution() {
    let rejestr = []
    for(let i=0; i<this.state.status.length; i++) {
      if(this.state.status[i].commandName[this.state.status.length].upperCase !== "HALT") {
        alert("Jako ostaatania msui być podana okmenda HALT!")
        return 0
      }
      if(this.state.status[i].commandName.upperCase === "LOAD") {
        rejestr[0] = parseInt(this.state.var)
        continue
      }
      if(this.state.status[i].commandName.upperCase === "STORE") {
        if(this.state.status[i].commandAdress[0] === '*') {
          rejestr[this.state.status[i].commandAdress] = rejestr[rejestr[0]]
        } else {
          rejestr[this.state.status[i].commandAdress] = rejestr[0]
        }
        continue
      }
      if(this.state.status[i].commandName.upperCase === "ADD") {
        rejestr[0] += parseInt(this.state.var)
      }
      if(this.state.status[i].commandName.upperCase === "SUB") {
        rejestr[0] -= parseInt(this.state.var)
      }
      if(this.state.status[i].commandName.upperCase === "MULT") {
        rejestr[0] *= parseInt(this.state.var)
      }
      if(this.state.status[i].commandName.upperCase === "DIV") {
        rejestr[0] = Math.floor(rejestr[0] / parseInt(this.state.var))
      }
      if(this.state.status[i].commandName.upperCase === "READ") {
        alert("Komenda READ nie jest obsługiwana w tej wersji programu")
      }
      if(this.state.status[i].commandName.upperCase === "WRITE") {
        if(this.status.var === 0) {
          return 0
        }
        continue
      }
      if(this.state.status[i].commandName.upperCase === "JUMP") {
        for(let j=0; j<this.state.status.length; j++) {
          if(this.state.status[j].commandLabel === this.state.status[i].commandAdress) i = j - 1
        }
        continue
      }
      if(this.state.status[i].commandName.upperCase === "JGTZ") {
        if(rejestr[0] > 0 ) {
          for(let j=0; j<this.state.status.length; j++) {
            if(this.state.status[j].commandLabel === this.state.status[i].commandAdress) i = j - 1
          }
        }
        continue
      }
      if(this.state.status[i].commandName.upperCase === "JZERO") {
        if(rejestr[0] === 0 ) {
          for(let j=0; j<this.state.status.length; j++) {
            if(this.state.status[j].commandLabel === this.state.status[i].commandAdress) i = j - 1
          }
        }
        continue
      }
      if(this.state.status[i].commandName.upperCase === "HALT") {
        return rejestr[0]
      }
    }
  }

  updateVar(e) {
    this.setState({
      var: e.target.value
    })
  }

  addingStatesFunc(data) {
    this.state.status.push(data)
  }

  getSolution() {
    console.log(this.state);
  }

  addNewCommand(e) {
    const commandList = this.state.commandList;
    this.setState({
      commandList: commandList.concat(<Command addingStatesFunc={this.addingStatesFunc} commandNumber={commandList.length} key={commandList.length} />)
    })
  }

  render() {
    return (
      <div>
        <label>
            Podaj Liczbę a:
            <input
                value={this.state.commandAdress}
                onChange={e => this.updateVar(e)}
                className="adress">
            </input>
        </label>
        {this.state.commandList.map((input, index) => {return input})}
        <button onClick={this.addNewCommand}>Dodaj komendę</button>
        <button onClick={this.getSolution}>Podaj wynik</button>
        <p>Wynik: {this.state.sol}</p>
      </div>
    );
  }
}

export default App;
