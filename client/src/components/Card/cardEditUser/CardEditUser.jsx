import React, { useState } from 'react'

import "./cardEditUser.css";
import { fetchData } from '../../../helpers/axiosHelper';

export const CardEditUser = ({userData, token, users, setUsers}) => {

  //const [user,SetUser] =useState(userData)

  const disableUser = async() => {
    try {
      const res = await fetchData("/admin/disableUser","PUT", {user_id: userData?.user_id} , token);
      
     // SetUser({...user, is_disabled:res.data.is_disabled})
      setUsers(users.filter(elem=>elem.user_id !== userData.user_id ));

    } catch (error) {
      console.log(error);
    }
  }

  const enableUser = async() => {
    try {
      const res = await fetchData("/admin/enableUser","PUT", {user_id:userData?.user_id} , token);
      
      //SetUser({...user, is_disabled:res.data.is_disabled})
      setUsers(users.filter(elem=>elem.user_id !== userData.user_id ));

    } catch (error) {
      console.log(error);
    }
  }

  const confirmUser = async() => {
    try {
      const res = await fetchData("/admin/confirmUser","PUT", userData , token);
      
      setUsers(users.map(elem=>{
        if(elem.user_id===userData.user_id) {
          return {...elem, is_confirmed:1};
        } else {
          return elem;
        }
      }))

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card-edit-user'>
      <div>
        <p>
          { userData?.user_id } { userData?.user_id && "|"} { userData?.user_name } { userData?.user_last_name?userData.user_last_name:"" } { userData?.email && "|" } { userData?.email } { userData?.user_dni && "|"} { userData?.user_dni } { userData?.cif && "|"} { userData?.cif } { userData?.user_phone && "|"} {userData?.user_phone }
        </p>
      </div>
      <div>
        <div className='d-flex'>
          {userData?.is_confirmed === 0 &&
          <span
              onClick={confirmUser}
              className='check-confirm'
            ><i className="bi bi-bookmark-x"></i></span>
          }
          {userData?.is_confirmed === 1 &&
          <span><i class="bi bi-bookmark-check-fill"></i></span>
          }
          {userData?.is_disabled === 0 && <button
              onClick={disableUser}
              className='btn-2'
            >Deshabilitar</button>
          }
       
        {userData?.is_disabled === 1 && <button 
            onClick={enableUser}
            className='btn-1'
          >Habilitar</button>
        }
      </div>
       </div>
    </div>
  )
}
