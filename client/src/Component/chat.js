import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router";
import io from "socket.io-client";
import './chat.css'
let socket
function Chat(props) {
  
  const list = JSON.parse(localStorage.getItem('list'))
  const [text , setText] =  useState({
    text : ''
  })
  const match = useRouteMatch();
  const name = match.params.slug;
  useEffect(()=>{
      localStorage.setItem('list' , JSON.stringify([]));

      socket=io('http://localhost:4000');
      
      socket.emit('join' , { name , userroom : 1 });
        
      socket.on('server message' , data =>{
        let listItem = JSON.parse(localStorage.getItem('list'));
        listItem.push(data);

        let listItemTemp = [...listItem];
        localStorage.setItem('list' , JSON.stringify(listItemTemp));
        setText({
          text : ''
        })
        
      })
      return ()=>{

        socket.off();
        localStorage.removeItem('list');
      }
  } , [name])
  useEffect(()=>{
    
  }, [localStorage.getItem('list')])
  const onChange = (e) =>{
    setText({
      [e.target.name] : e.target.value
    })
  }
  const onKey = (e) =>{
      if(e.charCode === 13){
        e.preventDefault();
        if(text.text !== ''){

            socket.emit('client message' ,  text);
            
        }
        
      }
  }
  const onClick = (e) =>{
    if(text.text !== ''){

      socket.emit('client message' ,  text);
     }
  }

  let map = null;
  if(list !== null)
  {
     map = list.map((value , index) =>{
            if(value.name === name){
              return (
                <div className="chat__message me" key={index}>
                    <div className="chat__avtar"></div>
                    <div className="chat__body_message">
                        <label className="chat__label">{value.name}</label>
                        <p className="chat__text">{value.text}</p>
                        <p className="time__chat">{value.time}</p>
                    </div>
                </div>
              )
            }
            else{
              return (
                <div className="chat__message you" key={index}>
                    <div className="chat__avtar"></div>
                    <div className="chat__body_message">
                        <label className="chat__label">{value.name}</label>
                        <p className="chat__text">{value.text}</p>
                        <p className="time__chat">{value.time}</p>
                    </div>
                </div>
              )
            }
      })
  }
  return (
        <div className="chat"> 
            <div className="chat__header">
                  <p className="text__header">Chat Box</p>
            </div>
            <div className="chat__body">
                  {map}
            </div>
            <div className="chat__form">
                  <textarea className="text_input" value={text.text} placeholder="Nhập cái gì đó ....." name="text" onChange={onChange} onKeyPress={(e) => onKey(e)}></textarea> 
                  <button className="btn__send" onClick={onClick} >Gửi</button>
            </div>
        </div>
  );
}

export default Chat;
