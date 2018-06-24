import React, { Component } from 'react';
import Winner from './img/winner.jpg';
class WhoWon extends Component {

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
        <img class="card-img-top" src={Winner} alt="Card image cap"/>
        <div className="card-body">
        <h5 class="card-title">Tic tac toe</h5>
        <h6 class="card-subtitle mb-2 text-muted">Congrats,{this.props.winner}</h6>   
        <a href="javascript:location.reload()">Replay</a>         
        </div>        
        </div>    
    );
  }
}

export default WhoWon;
