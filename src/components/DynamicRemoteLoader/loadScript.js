const scriptCache = new Map();

export const loadScript = (
  remoteUrl,
  scope,
  isUnmountMfeRequired = false
) => {
  if (!isUnmountMfeRequired && scriptCache.has(remoteUrl)) {
    return scriptCache.get(remoteUrl);
  }

  const promise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[data-scope="${scope}"]`
    );

    if (existingScript && !isUnmountMfeRequired) {
      resolve();
      return;
    }

    const script = document.createElement('script');

    script.src = remoteUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.scope = scope;

    script.onload = () => resolve();

    script.onerror = () =>
      reject(
        new Error(`Failed to load remote script: ${remoteUrl}`)
      );

    document.body.appendChild(script);
  });

  if (!isUnmountMfeRequired) {
    scriptCache.set(remoteUrl, promise);
  }

  return promise;
};