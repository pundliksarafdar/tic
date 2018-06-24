import React, { Component } from 'react';
import x from './img/x.png'; 
import o from './img/o.png'; 
import x_white from './img/x_white.png'; 
import o_white from './img/o_white.png'; 
import blank_black from './img/blank_black.jpg'; 
import blank from './img/blank.jpg';
class Square extends Component {

    constructor(props){
        super(props);
        this.onclick = this.onclick.bind(this); 
        this.getClickedClass = this.getClickedClass.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.state = ({clicked:false});
        this.myImg =  React.createRef();
      }

    componentDidMount(){
        let height = this.myImg.current.offsetWidth;
        this.setState({height});
    }  

    onclick(){
        this.setState({clicked : true});
        this.props.onClick(this.props.sqRow,this.props.sqCol);        
    };

    getClickedClass(){
        return this.props.played?"square clicked":"square noClicked";
    }

    getImgPath(){
        if(this.props.theme == "light"){
            return this.props.played?(this.props.played==="P1"?x:o):blank;
        }else{
            return this.props.played?(this.props.played==="P1"?x_white:o_white):blank_black;
        }
    }

    getHeight(){
        console.log(this.myImg.offsetWidth);
        return this.myImg.offsetWidth;
    }

render() {
    return (
      <div className={this.props.played+" square "+this.getClickedClass()} onClick={this.onclick}>
        <img ref={this.myImg} src={this.getImgPath()} width="30%" height={this.state.height}/>
      </div>
    );
  }
}

export default Square;
