import { Button } from "react-bootstrap";
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat =({users,messages,sendMessage,leaveRoom})=>{
  return <div>
     <div className="leave-room"><Button variant="warning" onClick={leaveRoom}>Leave</Button></div>
     <ConnectedUsers users={users} />
     <div className="chat">
     <MessageContainer messages={messages} />
     <SendMessageForm  sendMessage={sendMessage}/>
     </div>
  </div>
}

export default Chat;