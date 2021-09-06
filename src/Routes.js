import React,{lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";


const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(()=>import('./components/auth/Register'));

const Routes = () =>{
    return(
        <BrowserRouter>
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
            </Switch>
          
        </Suspense>
            
        </BrowserRouter>
    );
}

export default Routes;

