const { useState } = require("react")
const { Form, InputGroup, Button } = require("react-bootstrap")

const SendMessageForm =({sendMessage}) =>{
  const [message,setMessage] =useState('');
  return <Form 
   onSubmit={
     e=>{
       e.preventDefault();
       sendMessage(message);
       setMessage('');
     }
   }
  >
   <InputGroup>
       <Form.Control type="user" placeholder="input a message..." value={message} onChange={e=>setMessage(e.target.value)} />
       <InputGroup.Append>
         <Button variant="primary" type="submit" disabled={!message} >Send</Button>
       </InputGroup.Append>

    </InputGroup> 
  </Form>

}

export default SendMessageForm;