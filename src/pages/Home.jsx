import { useUsers } from '../hooks/useUsers';
import { useSelectedUsersStore } from '../store/selectedUsersStore';
import './Home.css';

export default function Home() {
  const usersData = useUsers();

  console.log('======> users Hook tanstack query Data', usersData);

  const { data: users = [], isLoading, isError, error } = usersData;

  const { selectedUsers, addUser, removeUser } = useSelectedUsersStore();

  const handleCheckbox = (user) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);

    if (isSelected) {
      removeUser(user.id);
    } else {
      addUser(user);
    }
  };

  const handleSubmit = () => {
    console.log('Selected Users From Zustand Store', selectedUsers);

    alert(`${selectedUsers.length} users selected. Check console.`);
  };

  if (isLoading) {
    return <div className="loading-container">Loading Users...</div>;
  }

  if (isError) {
    return <div className="loading-container">Error: {error?.message}</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Users Dashboard</h2>
        <p>Select users and manage them using Zustand + TanStack Query</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <h4>Total Users</h4>
          <span>{users.length}</span>
        </div>

        <div className="stat-card">
          <h4>Selected Users</h4>
          <span>{selectedUsers.length}</span>
        </div>
      </div>

      <div className="users-grid">
        {users.map((user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id);

          return (
            <div
              key={user.id}
              className={`user-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCheckbox(user)}
            >
              <div className="user-header">
                <input type="checkbox" checked={isSelected} readOnly />

                <span>{user.name}</span>
              </div>

              <div className="user-email">{user.email}</div>

              <div className="user-company">{user.company?.name}</div>
            </div>
          );
        })}
      </div>

      <div className="actions">
        <button
          className="mfe-button-loader"
          onClick={handleSubmit}
          disabled={!selectedUsers.length}
        >
          Submit Selected Users
        </button>
      </div>

      <div className="selected-section">
        <h3>Selected Users ({selectedUsers.length})</h3>

        {selectedUsers.length === 0 ? (
          <p>No users selected</p>
        ) : (
          <ul>
            {selectedUsers.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
