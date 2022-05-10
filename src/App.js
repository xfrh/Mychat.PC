import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './App.css';
import Lobby from 'Components/Lobby';
import 'bootstrap/dist/css/bootstrap.min.css';

const App =() => {
  const[connection, setConnection] = useState();
  const[messages, setMessages] = useState([]);
  const[users,setUsers] =useState([]);
  const joinRoom = async (user,room) =>{
    try {
      const _cnn = new HubConnectionBuilder()
                  .withUrl("http://localhost:5000/chat")
                  .configureLogging(LogLevel.Information)
                  .build();
          _cnn.on("ReceiveMessage",(user,message) =>{
            setMessages(messages =>[...messages,{user,message}]);
          });
          _cnn.on("UsersInRoom",(users)=>{
            setUsers(users);
          });
          _cnn.onclose(e=>{
            setConnection();
            setUsers([]);
            setMessages([]);
          });
         await _cnn.start();
         await _cnn.invoke("JoinRoom",{user,room});
         setConnection(_cnn);
        
    } catch (error) {
      console.log(error);
    }
     

  };
  return (
    <div className="app">
        <h2>MyChat</h2>
       <hr className='line' />
       <Lobby joinRoom={joinRoom} />
    </div>
  );
}

export default App;
