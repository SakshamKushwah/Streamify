import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthUser } from '../lib/api';

const useAuthUser = () => {
  
  //tanstack query to fetch auth user data
const useAuthUser = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry: false
});

return { isLoading: authUser.isLoading, authUser: authUser.data?.user };

}

export default useAuthUser
