import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './App.css';
import Lobby from 'Components/Lobby';
import Chat  from 'Components/Chat';
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
            console.log(users);
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

  const sendMessage = async(message) =>{
    try {
      await connection.invoke("SendMessage",message);
    } catch (error) {
      console.log(error);
    }
   
  };

  const leaveRoom = async() =>{
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app">
        <h2>MyChat</h2>
       <hr className='line' />
       {!connection ?
       <Lobby joinRoom={joinRoom} />
       :
       <Chat users={users} messages={messages} sendMessage={sendMessage} leaveRoom={leaveRoom} />
       }
    </div>
  );
}

export default App;
