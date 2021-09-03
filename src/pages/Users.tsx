import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
// import {fetchUsers} from "../store/action-creators/users";
import { useActions } from '../hooks/useActions';

const Users: React.FC = () => {
  const { users, loading, error } = useTypedSelector((state) => state.user);
  const { fetchUsers } = useActions();
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
    }, [])

  if (loading) {
    return <h2>Идет загрузка...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Users;
