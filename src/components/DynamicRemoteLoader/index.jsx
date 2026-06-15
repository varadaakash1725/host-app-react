import { useEffect, useState } from 'react';
import { loadRemoteComponent } from './loadRemoteComponent';
import { unloadRemote } from './unloadRemote';

export default function DynamicRemoteLoader({
  remoteUrl,
  scope,
  module,
  fallback = <div>Loading...</div>,
  isUnmountMfeRequired = false,
}) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const RemoteComponent =
          await loadRemoteComponent({
            remoteUrl,
            scope,
            module,
            isUnmountMfeRequired,
          });

        if (mounted) {
          setComponent(() => RemoteComponent);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(err);
        }
      }
    };

    load();

    return () => {
      mounted = false;

      if (isUnmountMfeRequired) {
        unloadRemote(scope);
      }
    };
  }, [
    remoteUrl,
    scope,
    module,
    isUnmountMfeRequired,
  ]);

  if (error) {
    return <div>Failed to load remote component.</div>;
  }

  if (!Component) {
    return fallback;
  }

  return <Component />;
}