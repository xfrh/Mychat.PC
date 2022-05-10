const ConnectedUsers =({users}) => 
   {
    return <div className="user-list">
       <h4>User List</h4>
       {users.map((m,indx)=><h6 key={indx}>{m}</h6>)}
      </div>
   }
  


export default ConnectedUsers;
