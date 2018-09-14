import React from "react";
import ReactDOM from "react-dom";
import { Route, NavLink, Switch } from 'react-router-dom'
// import { url } from "inspector";

// import Home from "./components/Home";
// import About from "./components/About";
// import User from "./components/User";
// import Contacts from "./components/Contacts";

// header --------------------------------------------------------

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag:""
        }
    }
    render() {
        return (
            <div className="header">
                <NavLink to="/"><img src="../src/img/logo.png" alt="logo"/></NavLink>
                <div className="menu1">
                    <ul>
                        <li className="menuItem"><NavLink to="/">　女　裝　</NavLink></li>
                        <li>|</li>
                        <li className="menuItem"><NavLink to="/">　男　裝　</NavLink></li>
                        <li>|</li>
                        <li className="menuItem"><NavLink to="/">　配　件　</NavLink></li>
                    </ul>
                </div>
                <div className="menu2">
                    <div className="searchBar" id="searchBar">
                        <input className="search" 
                            id="search" 
                            placeholder="women, men..." 
                            onChange={() => this.handleChange(event)}/>
                        <input type="submit" className="searchIcon" value=""/>
                    </div>
                    <CartIcon cartValue={2}/>
                    <MemberIcon/>
                </div>
                <div className="headBlack"></div>
                {/* 我們將 App 元件當做每個元件都會載入的母模版，因此可以透過 children 載入對應 URL 的子元件 */}
                {this.props.children}
            </div>
        )
    }
    handleChange(e) {
        console.log(e);
        // if(e.keyCode == 13) {
        //     this.setState({tag:e.target.value});
        // }
    }
}

const CartIcon = (props) => (
    <NavLink to="/" className="cartDiv">
        {props.cartValue}
    </NavLink>
)

const MemberIcon = (props) => (
    <NavLink to="/" className="memberDiv">
        <img src="../src/img/member.png"/>
    </NavLink>
)

// section --------------------------------------------------------

const ProductDetail = (props) => (
    <div>product</div>
);

const Page2 = (props) => (
    <div>page2</div>
);

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:0,
            tag:"",
            productList:[]
        }
    }
    componentWillMount() {
        fetch("https://appworks-school-stylish.firebaseapp.com/exe/product/list",{
            method:"get"})
            .then(res => res.json())
            .then(res => this.setState({productList:res.list}));
    }
    render() {
        console.log(this.state.productList);
        return (
            <section>
                <KeyVisual />
                <ProductList productList={this.state.productList}/>
            </section>
        );
    }
}

class KeyVisual extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>KeyVisual</div>
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>ProductList</div>
    }
}

// footer ------------------------------------------------------

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer>
                <div className="item">關於 Stylish</div>
                <div className="mid"></div>
                <div className="item">服務條款</div>
                <div className="mid"></div>
                <div className="item">隱私政策</div>
                <div className="mid"></div>
                <div className="item">聯絡我們</div>
                <div className="mid"></div>
                <div className="item">FAQ</div>
                <li><img src="../src/img/facebook.svg" alt="Facebook"/></li>
                <li><img src="../src/img/twitter.svg" alt="Twitter"/></li>
                <li><img src="../src/img/youtube.svg" alt="YouTube"/></li>
                <div className="item">
                    © 2018. All rights reserved.
                </div>
            </footer>
        )
    }
}

// application -------------------------------------------------

const Stylish = () => (
    <section>
        <Header />
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/product">Product</NavLink></li>
            <li><NavLink to="/page2">page2</NavLink></li>
        </ul>

        <Switch>
            <Route exact path="/" component={Index}/>
            <Route path="/product" component={ProductDetail} />
            <Route path="/page2" component={Page2} />
        </Switch>
        <Footer />
    </section>
);

export default Stylish;

// ReactDOM.render((
//     <Stylish children={routes}  history={browserHistory}/>
// ), document.getElementById("cont"));