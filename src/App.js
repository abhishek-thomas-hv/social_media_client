import React,{useEffect,useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {useDispatch,useSelector} from 'react-redux'
import {getUserId} from './actions/auth'


import Home from './components/Home/Home';
import Wrapper from './components/Authentication/Wrapper';


function App() {

  const dispatch=useDispatch()
  const store = useSelector(state => state.auth)

  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {


    setisLoading(true)
    async function get()
    {
      
      if(!store.isAuthenticated)
      {
        const result = await getUserId()
        if(result.Token_Error)
        {
          setTimeout(() => {
            setisLoading(false)
          }, 1000);
        }

        else
        {
          setTimeout(() => {
            dispatch({type:"AUTHENTICATED",payload:result.data.user_id.id})
            setisLoading(false)
          }, 1000)
          
        }
       
      }
     else
     {
      setisLoading(false)
     }

    }

    get()

    return () => {
      
    }
  },[dispatch,store])

  
  if(isLoading)
  {
    return (
      <div className="App">
        
        <div className='row' style={{"margin-top":"50vh","margin-right":"100px","margin-left":"100px"}}>

        <div class="progress">
            <div class="indeterminate"></div>
        </div>

        </div>
  
      </div>
    );
  }

  else
  {
    return (
      <div className="App">
  
          {store.isAuthenticated?<Home/>:<Wrapper/>}
      
      </div>
    );
  }
}

export default App;
