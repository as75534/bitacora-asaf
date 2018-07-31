import React, { Component } from 'react';
import { Fragment } from "react";
import XNavbar from './components/XNavbar';
import { Container } from "reactstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreatePost } from "./components/CreatePost";
import { Register } from './components/Register';
import { Login } from './components/Login';
import { User } from "models/User";
import firebase from "firebase/app";
import { Publications } from "./components/Publications";
import "firebase/auth";
import "firebase/database";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      leftNavBarItems: [
        { show: 0, link: "/", title:"Publicaciones", component: <Publications />},
        { show: 1, link: "/createPost", title:"Hacer post", component: <CreatePost />},
      ],
      rightNavBarItems: [
        { show: -1, link: "/register", title:"Registrarme", component: <Register />},
        { show: -1, link: "/login", title:"Iniciar Sesión", component: <Login /> },
        { show: 1, link: "/", title:"Cerrar Sesión", component:<Fragment />, onClick:this.signOut, redirect:true },  
      ],
      isAuthenticated: false,
      databaseReferences : {
        posts: firebase.database().ref().child("posts"),
      }
    }

    this.observeUserLogin();
    this.signOut.bind(this);
  }

  observeUserLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState((prevState, props) => {
          const modifiedRightNavBarItems = [...prevState.rightNavBarItems];
          const before = modifiedRightNavBarItems[modifiedRightNavBarItems.length - 1];
          const item = { show: 1, title: user.email };

          modifiedRightNavBarItems[modifiedRightNavBarItems.length-1] = item;
          modifiedRightNavBarItems.push(before);

          return {
            isAuthenticated: true,
            user: new User(user.email),
            rightNavBarItems: modifiedRightNavBarItems
          }
        }); 
      }
    });
  }

  signOut = () => {
    console.log("[App.signOut()]");
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: '¿Estás seguro de salir?',
      text: "Si quieres, tu se sesión va a ser cerrada",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Cerrar sesión'
    }).then(result => {
      if (result.value) {
        firebase.auth()
              .signOut()
              .then(() => {
                this.setState((prevState, props) => {
                  const modifiedRightNavBarItems = [...prevState.rightNavBarItems];
                  const index = modifiedRightNavBarItems.findIndex(i => i.title === this.state.user.email);
                  modifiedRightNavBarItems.splice(index,1);

                  return {
                    user: null,
                    isAuthenticated: false,
                    rightNavBarItems: modifiedRightNavBarItems
                  }
                })

                MySwal.fire("Tu sesión ha sido cerrada", "", "info");
              })
              .catch(error => {
                console.log(error);
              });
      }
    })
  }

  evaluate = (i) => {
    if(i.title === "Registrarme") {
      return (
        <Route 
          key={i.title} 
          path={i.link}
          exact={true} 
          render={({ history }) => <Register history={history}/>} />
      )
    } else if (i.title === "Iniciar Sesión") {
      return (
        <Route 
          key={i.title} 
          path={i.link}
          exact={true} 
          render={({ history }) => <Login history={history}/>} />
      )
    } else if (i.title === "Hacer post") {
      console.log(this.state.databaseReferences.posts);
      return (
        <Route 
          key={i.title} 
          path={i.link}
          exact={true} 
          render={({ history }) => <CreatePost history={history} postsRef={this.state.databaseReferences.posts}/>} />
      )
    } else if (i.title === "Publicaciones") {
      return (
        <Route 
          key={i.title} 
          path={i.link}
          exact={true} 
          render={() => <Publications postsRef={this.state.databaseReferences.posts}/>} />
      )
    }
     else {                  
      return (
        <Route 
          key={i.title} 
          path={i.link}
          exact={true} 
          render={() => i.component} />
      )
    }
  }

  render() {
    const navBarItems = this.state.leftNavBarItems.concat(this.state.rightNavBarItems);

    return (
      <BrowserRouter>
        <Fragment>
          
          <XNavbar 
            title="Bitácora"
            leftItems={this.state.leftNavBarItems} 
            rightItems={this.state.rightNavBarItems} 
            isAuthenticated={this.state.isAuthenticated}/>

          <Container style={{ paddingTop: "2em" }}>
            <Switch>
            { navBarItems ? navBarItems.map(i => {
                if (i.show === 0) {
                  return this.evaluate(i);
                }
                else if (this.state.isAuthenticated) {
                  if (i.show === 1) {
                    return this.evaluate(i);
                  } else { return null }
                } else {
                  if (i.show === -1) {
                    return this.evaluate(i);
                  } else { return null }
                }
              }) : null }
            </Switch>
          </Container>

        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App

