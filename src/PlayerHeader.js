import React, { Component } from 'react';
 
class PlayerHeader extends Component {

    constructor(props){
        super(props);  
        this.getNextPlayer = this.getNextPlayer.bind(this); 
        this.onThemeChange = this.onThemeChange.bind(this);     
      }

      componentDidMount(){
        
      }

      getNextPlayer(){
        return !this.props.played?"P2":this.props.played;
      }

      onThemeChange(event){
          this.props.onThemeChange(event.target.value);
      }

render() {
    return (
        <nav className={"navbar "+(this.props.theme == "light"?"navbar-light bg-light":"navbar-dark bg-dark")}>
            <div className={"player1 " + this.getNextPlayer()}>{this.props.player1Name}, your turn</div>
            <div className={"player2 " + this.getNextPlayer()}>{this.props.player2Name}, your turn</div>

            <select className="btn btn-success" onChange={this.onThemeChange} value={this.props.theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>    
        </nav>
      
    );
  }
}

export default PlayerHeader;
