import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const RiderRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const {role, isLoading} = useUserRole()



    if(loading || isLoading){
        return <span className='leading loading-spinner loading-xl'></span>
    }

    if(!user || role !== 'rider'){
        return <Navigate state={{from: location.pathname}} to='/forbidden'></Navigate>
    }

    return children
};

export default RiderRoutes;