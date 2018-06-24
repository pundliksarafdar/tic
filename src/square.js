import React, { Component } from 'react';
import x from './img/x.png'; 
import o from './img/o.png'; 
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
        return this.props.played?(this.props.played==="P1"?x:o):blank;
    }

    getHeight(){
        console.log(this.myImg.offsetWidth);
        return this.myImg.offsetWidth;
    }

render() {
    return (
      <div className={this.props.played+" "+this.getClickedClass()} onClick={this.onclick} style={{border:"solid 2px"}}>
        <img ref={this.myImg} src={this.getImgPath()} width="30%" height={this.state.height}/>
      </div>
    );
  }
}

export default Square;
