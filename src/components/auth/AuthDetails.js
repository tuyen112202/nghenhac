import React, { useEffect, useState } from 'react';
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import * as actions from "~/store/actions";
const AuthDetails = () => {
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useState(null)


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen();
        }
    }, []) 
    useEffect(() => {
        dispatch(actions.setUser(authUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);
    
    return <></>;
};

export default AuthDetails;
