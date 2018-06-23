import React, { Component } from 'react';
import logo from './logo.svg';
import Square from './square';
import { withRouter } from 'react-router-dom';
import Players from './players';
import PlayerHeader from './PlayerHeader';
import background from './img/background.png';
import WhoWon from './WhoWon';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.ARR_WDT = 3;
    this.ARR_HGT = 3;
    this.onClickCell = this.onClickCell.bind(this);  
    this.player1 = "P1";
    this.player2 = "P2";
    this.state.playStatus = new Array(this.ARR_HGT);
    this.getGrid = this.getGrid.bind(this);
    this.loadPlayState = this.loadPlayState.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.whoComplete = this.whoComplete.bind(this);
    this.onStartGame = this.onStartGame.bind(this);

    this.playSquence = [];
    this.cTime = new Date().getTime();
  }

  componentWillMount(){
    this.loadPlayState();
  }

  componentDidMount() {
    this.props.history.go(1); 
    window.onpopstate = this.onBackButtonEvent
  }

  loadPlayState(){
    if(sessionStorage.userData){
      this.state.gameStarted = JSON.parse(sessionStorage.userData).gameStarted;
      this.state.player1Name = JSON.parse(sessionStorage.userData).player1Name;
      this.state.player2Name = JSON.parse(sessionStorage.userData).player2Name;
    }
    if(sessionStorage.playStatus){
      this.state.playStatus = JSON.parse(sessionStorage.playStatus);
    }else{
      for(var i =0;i<this.ARR_HGT;i++){
        this.state.playStatus[i] = new Array(this.ARR_WDT);      
      }
    }
  }

  onClickCell(row,col){
    this.state.played = (this.state.played == this.player1)?this.player2:this.player1;
    this.state.playStatus[row][col] = this.state.played;
    this.setState({playStatus:this.state.playStatus});
    this.playSquence.push({row,col});
    sessionStorage.playStatus = JSON.stringify(this.state.playStatus);
    sessionStorage.playSquence = JSON.stringify(this.playSquence);
    let whoWon = this.whoComplete();
    if(whoWon){
      this.setState({whoWon});
      sessionStorage.clear();
    }
  }

  //Undefined means no body comleted
  whoComplete(){
    if(this.state.playStatus[0][0] && this.state.playStatus[0][0]==this.state.playStatus[0][1] && this.state.playStatus[0][1]==this.state.playStatus[0][2]){
      return this.state.playStatus[0][0];
    }else if(this.state.playStatus[1][0] && this.state.playStatus[1][0]==this.state.playStatus[1][1] && this.state.playStatus[1][1]==this.state.playStatus[1][2]){
      return this.state.playStatus[1][0];
    }else if(this.state.playStatus[2][0] && this.state.playStatus[2][0]==this.state.playStatus[2][1] && this.state.playStatus[2][1]==this.state.playStatus[2][2]){
      return this.state.playStatus[2][0];
    }else if(this.state.playStatus[0][0] && this.state.playStatus[0][0]==this.state.playStatus[1][0] && this.state.playStatus[1][0]==this.state.playStatus[2][0]){
      return this.state.playStatus[0][0];
    }else if(this.state.playStatus[0][1] && this.state.playStatus[0][1]==this.state.playStatus[1][1] && this.state.playStatus[1][1]==this.state.playStatus[2][1]){
      return this.state.playStatus[0][1];
    }else if(this.state.playStatus[0][2] && this.state.playStatus[0][2]==this.state.playStatus[1][2] && this.state.playStatus[1][2]==this.state.playStatus[2][2]){
      return this.state.playStatus[0][2];
    }else if(this.state.playStatus[0][0] && this.state.playStatus[0][0]==this.state.playStatus[1][1] && this.state.playStatus[1][1]==this.state.playStatus[2][2]){
      return this.state.playStatus[0][0];
    }else if(this.state.playStatus[0][2] && this.state.playStatus[0][2]==this.state.playStatus[1][1] && this.state.playStatus[1][1]==this.state.playStatus[2][0]){
      return this.state.playStatus[0][2];
    }
  }

  onBackButtonEvent(e){
    if((new Date().getTime() - this.cTime)<100) {
      return ;
    }
    this.cTime = new Date().getTime();
    this.props.history.go(1);
    let seq = this.playSquence.pop();
    console.log({seq});
    this.state.playStatus[seq.row][seq.col] = null;
    sessionStorage.playSquence = JSON.stringify(this.playSquence);
    return false;
  }
  getGrid(){
    var grid = [];
    for(var i=0;i<this.ARR_HGT;i++){
      var row = [];
      for(var j=0;j<this.ARR_WDT;j++){
        row.push(<Square sqRow={i} sqCol={j} played={this.state.playStatus[i][j]} onClick={this.onClickCell}/>);
      } 
      grid.push(<div style={{display:"block"}}>{row}</div>);
    }

    return grid;
  }

  onStartGame(player1Name,player2Name){
    let userData = {gameStarted : true,player1Name,player2Name};
    sessionStorage.userData = JSON.stringify(userData);
    this.setState(userData);
  }

  render() {
    return (
      <div className="boards">
        {!this.state.whoWon?
          (!this.state.gameStarted)? 
            <Players onStartGame={this.onStartGame}/>:
            <div><PlayerHeader played={this.state.played} player1Name={this.state.player1Name} player2Name={this.state.player2Name}/>
            {this.getGrid()}            
          </div>:<WhoWon winner={this.state.whoWon=="P1"?this.state.player1Name:this.state.player2Name}/>}
      </div>
    );
  }
}

export default withRouter(Board);
