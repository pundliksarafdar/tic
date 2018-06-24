import React, { Component } from 'react';
 
class Players extends Component {

    constructor(props){
        super(props);
        this.onStartGame = this.onStartGame.bind(this); 
        this.onInputChangeP1 = this.onInputChangeP1.bind(this);
        this.onInputChangeP2 = this.onInputChangeP2.bind(this);
        this.state = {player1:"",player2:""};
      }

    onStartGame(){
        this.props.onStartGame(this.state.player1,this.state.player2);
    };

    onInputChangeP1(event){
        this.setState({player1: event.target.value});
    }

    onInputChangeP2(event){
        this.setState({player2: event.target.value});
    }

render() {
    return (
        <div className="card" style={{"width": "18rem",margin:"auto",marginTop:"5px"}}>
        <div className="card-body">
        <h5 class="card-title">Tic tac toe</h5>
        <h6 class="card-subtitle mb-2 text-muted">Please enter players name and start game</h6>
            <div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Player 1</label>
                        <input type="text" className="form-control" name="player1" value={this.state.player1} onChange={this.onInputChangeP1}/>                
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Player 2</label>
                        <input type="text" className="form-control" name="player2" value={this.state.player2} onChange={this.onInputChangeP2}/>
                    </div>
                <input type="button" className="btn btn-primary" value="Start" onClick={this.onStartGame}/>
            </div>    
        </div>        
        </div>    
    );
  }
}

export default Players;
