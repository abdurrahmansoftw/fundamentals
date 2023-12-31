import useUsers from './hooks/useUsers';
import UserService, { User } from './services/user-service';

const App = () => {
  const { users, errer, isLoading, setError, setUsers } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    UserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: Math.random(), name: 'akaid' };
    setUsers([newUser, ...users]);

    UserService.create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + '! akaid' };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    UserService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div className='container'>
      <h1>UserList</h1>
      {errer && <p className='text-danger'>{errer}</p>}
      {isLoading && <p className='text-primary'>Loading...</p>}

      <button type='button' className='btn btn-sm btn-primary' onClick={addUser}>
        Create User
      </button>

      <ol className='list-group'>
        {users.map((user) => (
          <li key={user.id} className='list-group-item d-flex justify-content-between'>
            {user.name}

            <div>
              <button className='btn btn-sm btn-outline-secondary mx-1' onClick={() => updateUser(user)}>
                Update
              </button>
              <button className='btn btn-sm btn-outline-danger' onClick={() => deleteUser(user)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
