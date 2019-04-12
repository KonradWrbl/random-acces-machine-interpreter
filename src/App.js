import React, { Component } from 'react';
import Command from './Command'

let rejestr = []

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

    //alert("LOAD")
    const stats = this.state.status
    let i
    for(i=0; i<stats.length; i++) {
      let name = stats[i].commandName.toUpperCase()
      // if(name[this.state.status.length-1].toUpperCase() !== "HALT") {
      //   alert("Jako ostatania msui być podana komenda HALT!")
      //   return 0
      // }
      if(name === "LOAD") {
        rejestr[0] = rejestr[stats[i].commandAdress]
        alert("LOAD")
        continue
      }
      if(name === "STORE") {
        if(stats[i].commandAdress[0] === '*') {
          rejestr[this.state.status[i].commandAdress] = rejestr[rejestr[0]]
        } else {
          rejestr[this.state.status[i].commandAdress] = rejestr[0]
        }
        continue
      }
      if(name === "ADD") {
        rejestr[0] += parseInt(this.state.var)
        continue
      }
      if(name === "SUB") {
        rejestr[0] -= parseInt(this.state.var)
        continue
      }
      if(name === "MULT") {
        rejestr[0] *= parseInt(this.state.var)
        continue
      }
      if(name === "DIV") {
        rejestr[0] = Math.floor(rejestr[0] / parseInt(this.state.var))
        continue
      }
      if(name === "READ") {
        rejestr[this.state.status[i].commandAdress] = this.state.var
        alert("Komenda READ nie jest obsługiwana w tej wersji programu")
        continue
      }
      if(name === "WRITE") {
        if(this.status.var === 0) {
          return 0
        }
        continue
      }
       if(name === "JUMP") {
        for(let j=0; j<stats.length; j++) {
          if(stats[j].commandLabel === stats[i].commandAdress) i = j - 1
        }
        continue
      }
      if(name === "JGTZ") {
        if(rejestr[0] > 0 ) {
          for(let j=0; j<stats.length; j++) {
            if(stats[j].commandLabel === stats[i].commandAdress) i = j - 1
          }
        }
          continue
      }
      if(name === "JZERO") {
        if(rejestr[0] === 0 ) {
          for(let j=0; j<stats.length; j++) {
            if(stats[j].commandLabel === stats[i].commandAdress) i = j - 1
          }
        }
        continue
      }
      if(name === "HALT") {
        this.setState({
          sol: rejestr[0]
        })
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
    console.log(this.state.status);
  }

  getSolution() {
    //console.log(this.state);
    this.setState({
      sol: this.solution()
    })

  }

  addNewCommand(e) {
    const commandList = this.state.commandList;
    this.setState({
      commandList: commandList.concat(
        <Command
          addingStatesFunc={this.addingStatesFunc}
          commandNumber={commandList.length}
          key={commandList.length}
        />
      )
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
        <button onClick={this.solution}>Podaj wynik</button>
        <p>Wynik: {this.state.sol}</p>
        <p>{rejestr.map((input, index) => {return `rejestr numer ${index}: ${input}.`})}</p>

      </div>
    );
  }
}

export default App;
