import React, { Fragment } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from "./Routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App (){
  <div>
    <Router>
      <Routes>
       {routes.map((route) =>{
        const Page = route.page
        const Layout =  DefaultComponent 
        return (
          <Route key={route.path} path={route.path} element={
          <Layout><Page/></Layout>
          }/>
            
          
        )
       })}
      </Routes>
    </Router>
  </div>
}

export default App