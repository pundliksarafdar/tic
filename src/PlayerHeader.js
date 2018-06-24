import React, { Component } from 'react';
 
class PlayerHeader extends Component {

    constructor(props){
        super(props);  
        this.getNextPlayer = this.getNextPlayer.bind(this);      
      }

      componentDidMount(){
        
      }

      getNextPlayer(){
        return !this.props.played?"P2":this.props.played;
      }

render() {
    return (
        <nav class="navbar navbar-light bg-light">
            <div className={"player1 " + this.getNextPlayer()}>{this.props.player1Name}, your turn</div>
            <div className={"player2 " + this.getNextPlayer()}>{this.props.player2Name}, your turn</div>
        </nav>
      
    );
  }
}

export default PlayerHeader;
