import React from 'react'
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { get_UserDetails } from '../Redux/UserSlice';

function IsAuthenticated() {

	const dispatch = useDispatch()
  	const AccessToken = localStorage.getItem('AccessToken')
	if(!AccessToken){	
		return <Navigate to="/"/>
	}
	let currentTime = Date.now() / 1000;
	const DecodedAccess = jwtDecode(AccessToken)

	if (DecodedAccess.exp > currentTime) {

		const user_cred = DecodedAccess.user_cred;
		const user_id = DecodedAccess.user_id;

		dispatch(
			get_UserDetails({
				user_cred,
          			user_id,
			})
		)
		return true
	}
	else{
		localStorage.removeItem('AccessToken')
		localStorage.removeItem('RefreshToken')
		return false
	}
	
}

export default IsAuthenticated
