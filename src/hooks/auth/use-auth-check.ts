import { logout } from '@/api/auth/auth-slice';
import { useReadEmployeeByUserIdQuery } from '@/api/employee/employee-api';
import { useReadUserByIdQuery } from '@/api/users/users-api';
import { RootState } from '@/app/store';
import { decodeToken } from '@/utils/decode-token';
import { getTokens } from '@/utils/get-tokens';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const {
    isLoggedIn,
    refreshToken: storedRefToken,
    accessToken: storedAccToken,
  } = useSelector((state: RootState) => state.auth);

  const { accessToken, refreshToken } = getTokens(
    storedAccToken,
    storedRefToken,
  );

  let decodedUser;
  try {
    decodedUser = decodeToken(accessToken || '');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    decodedUser = null;
    dispatch(logout());
    setIsAuthChecking(false);
  }

  const userId = decodedUser?.id || '';
  const isAuthenticate = Boolean(isLoggedIn && accessToken && refreshToken);

  const { isLoading: userIsLoading } = useReadUserByIdQuery(
    { id: userId, populate: ['role'] },
    { skip: !userId, refetchOnMountOrArgChange: true },
  );
  const { isLoading: employeeIsLoading } = useReadEmployeeByUserIdQuery(
    { id: userId },
    { skip: !userId, refetchOnMountOrArgChange: true },
  );

  // Manage login and loading state based on query results
  useEffect(() => {
    const isLoading = !userIsLoading && !employeeIsLoading;
    if (isLoading) setIsAuthChecking(false);
  }, [employeeIsLoading, userIsLoading]);

  return {
    isAuthChecking,
    isAuthenticate,
  };
};

export default useAuthCheck;
