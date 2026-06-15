import { useState } from 'react';
import './Contacts.css';
import DynamicRemoteLoader from '../components/DynamicRemoteLoader';

const Contacts = () => {
  const [showRemote, setShowRemote] = useState(false);

  return (
    <div className="content">
      <h2>Contacts Page</h2>
      <p>Contact information.</p>

      <button
        className="mfe-button-loader"
        onClick={() => setShowRemote((prev) => !prev)}
      >
        {showRemote ? 'Unload Dashboard MFE' : 'Load Dashboard MFE'}
      </button>

      {showRemote && (
        <div className="mfe-container">
          <DynamicRemoteLoader
            remoteUrl="http://localhost:3001/remoteEntry.js"
            scope="dashboard_mfe"
            module="./App"
            isUnmountMfeRequired={true}
          />
        </div>
      )}
    </div>
  );
};

export default Contacts;
