import React from "react";
import ReactDOM from "react-dom";
import { Route, NavLink, Switch } from 'react-router-dom'
// import { url } from "inspector";

// header --------------------------------------------------------
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header>

                <NavLink to="/" className="gameButton">Game</NavLink>
                <NavLink to="/ranking" className="rankingButton">Ranking</NavLink>

                {/* 我們將 App 元件當做每個元件都會載入的母模版，因此可以透過 children 載入對應 URL 的子元件 */}
                {this.props.children}
            </header>
        )
    }
}

// section --------------------------------------------------------
class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        let puzzleArray = this.props.puzzleList.map((item,index)=>(
            <PuzzleItem 
                key={index} 
                position={index} 
                number={item?item:""}
                onClick={this.props.onClick}
                enable={this.props.enable}
            />
        ));
        // console.log(puzzleArray)
        // for(let i=0;i<this.props.puzzleList.length;i++){

        // }
        return (
            <section>
                <input 
                    placeholder="Enter Name" 
                    value={this.props.name} 
                    disabled={this.props.enable} 
                    onChange={this.props.inputName}
                    />
                <button
                    disabled={this.props.enable || !this.props.name}
                    onClick={() => this.props.start && this.props.start()}
                    >Start Game</button>
                <div>Step Count:{this.props.step}</div>
                <div className="puzzle">
                    {puzzleArray}
                </div>
            </section>
        );
    }
}

// puzzleItem ------------------------------------------------------
class PuzzleItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div 
                key={this.props.position} 
                className="puzzleItem" 
                id={"p"+this.props.number}
                style={{
                    left: this.props.position%3+"00px",
                    top: Math.floor(this.props.position/3)+"00px",
                    opacity: this.props.enable?1:0.3
                }} 
                onClick={() => this.props.enable && this.props.onClick(this.props.position,this.props.number)}
            >{this.props.number}</div>
        );
    }
}


// ranking ------------------------------------------------------
class Ranking extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <section>     Ranking       </section>
        );
    }
}


// application -------------------------------------------------
class PuzzleGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enable:false,
            step:0,
            name:"",
            puzzleList:[1,2,3,4,5,6,7,8,0],
            playerList:[
                {
                    index:0,
                    name: "GG",
                    step: 2
                },
                {
                    index:1,
                    name: "JJ",
                    step: 5
                }
            ]
        }
    }
    inputName(e){
        console.log(e.target.value);
        this.setState({name:e.target.value});
    }
    findHole(list){
        // console.log(list.indexOf(0));
        this.state.hole = list.indexOf(0);
    }

    handleClick(position){
        // console.log(position,number);
        let hx = (this.state.puzzleList.indexOf(0))%3;
        let hy = Math.floor(this.state.puzzleList.indexOf(0)/3);
        let x = position%3;
        let y = Math.floor(position/3);
        // console.log(hx,hy);
        // console.log(x,y);
        if(Math.abs(hx-x)+Math.abs(hy-y)==1){
            this.change(position,this.state.puzzleList.indexOf(0));
        }
    }
    change(i,j){
        let newList = this.state.puzzleList;
        let t = newList[i];
        newList[i] = newList[j];
        newList[j] = t;
        this.setState({puzzleList:newList,step:(this.state.step+1)});
        console.log(newList.toString());
        if(newList.toString() == "1,2,3,4,5,6,7,8,0"){
            this.endGame();
        }
    }
    endGame(){
        console.log("KO");
        this.setState({enable:false});
    }
    startGame(){
        // let startList = [1,2,3,4,5,6,7,8,0];
        // for(let i=0;i<100;i++){
        //     let randomP = Math.floor(Math.random()*9);
        //     let hole = startList.indexOf(0);
        //     let hx = (hole)%3;
        //     let hy = Math.floor(hole/3);
        //     let x = randomP%3;
        //     let y = Math.floor(randomP/3);

        //     if(Math.abs(hx-x)+Math.abs(hy-y)==1){
        //         let t = startList[hole];
        //         startList[hole] = startList[randomP];
        //         startList[randomP] = t;
        //     }
        // }
        // this.setState({enable:true,step:0,puzzleList:startList});
        this.setState({enable:true,step:0,puzzleList:[1,2,3,4,5,6,7,0,8]});
    }
    render(){
        return(
            <section>
                <Header />
                <Switch>
                    <Route 
                        exact path="/" 
                        render={props => 
                            <Game 
                                puzzleList={this.state.puzzleList} 
                                step={this.state.step} 
                                onClick={this.handleClick.bind(this)}
                                start={this.startGame.bind(this)}
                                enable={this.state.enable}
                                name={this.state.name}
                                inputName={this.inputName.bind(this)}
                            />
                        }
                    />
                        
                    <Route path="/ranking" component={Ranking} />
                </Switch>
            </section>
        )
    }
}

export default PuzzleGame;

// ReactDOM.render((
//     <Stylish children={routes}  history={browserHistory}/>
// ), document.getElementById("cont"));