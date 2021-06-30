import React, { useEffect } from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Chat from './Component/chat';
import Login from './Component/login';
function App(props) {
  const url = 'http://localhost:4000';
  // useEffect(()=>{

  //    socket = io(url);
      
  //    socket.on('send message' , (data) =>{
  //         console.log(data);
  //    });

  //    return ()=> {
  //      socket.emit('disconnecting');
  //      socket.off();
  //    }
  // }, [])

  
  return (
      <Router>
          <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/chat/:slug" component={Chat}></Route>
          </Switch>
      </Router>
  )
}

export default App;