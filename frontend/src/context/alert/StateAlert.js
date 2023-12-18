import React, { useState } from 'react'
import alertContext from './alertContext'

const StateAlert = (props) => {
    const [alertmsg,setalert] = useState({message:"",type:"failure"})
    const display=(data)=>{
      console.log(data)
      setalert({
         message:data.message,
         type:data.type 
      })
     setTimeout(()=>{
      setalert({message:"",type:""})
     },1500)
    }
  
    
  return (
     <alertContext.Provider value={{display,alertmsg}}>
      {props.children}
     </alertContext.Provider>
  )
}
export default StateAlert
