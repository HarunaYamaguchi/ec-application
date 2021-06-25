import React from "react";
import Router from './Router';
import {Header} from './components/index'

const App = () =>  {
  return (
    <>
      <Header/>
        <div>
          <Router />
        </div>
    </>
  );
}

export default App;
