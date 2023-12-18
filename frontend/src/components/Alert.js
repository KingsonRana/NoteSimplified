 import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext'
 
 export const Alert = () => {
  const sad = useContext(alertContext)
  const {display,alertmsg} = sad
  
   return (
     <div className={`alert alert-${alertmsg.type}`} role="alert" style={{display:alertmsg.message.length>0?"block":"none",zIndex:"1000",position:"absolute",width:"99%"}}>
       {alertmsg.message}
     </div>
   )
 }
 