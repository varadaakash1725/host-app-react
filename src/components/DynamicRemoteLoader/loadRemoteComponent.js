import { loadScript } from './loadScript';
import { unloadRemote } from './unloadRemote';

const remoteCache = new Map();

export const loadRemoteComponent = async ({
  remoteUrl,
  scope,
  module,
  isUnmountMfeRequired = false,
}) => {
  const cacheKey = `${scope}:${module}`;

  if (
    !isUnmountMfeRequired &&
    remoteCache.has(cacheKey)
  ) {
    return remoteCache.get(cacheKey);
  }

  if (isUnmountMfeRequired) {
    unloadRemote(scope);
  }

  await loadScript(
    isUnmountMfeRequired
      ? `${remoteUrl}?t=${Date.now()}`
      : remoteUrl,
    scope,
    isUnmountMfeRequired
  );

  const container = window[scope];

  if (!container) {
    throw new Error(`Container "${scope}" not found`);
  }

  const factory = await container.get(module);

  const Module = factory();

  const Component = Module.default || Module;

  if (!isUnmountMfeRequired) {
    remoteCache.set(cacheKey, Component);
  }

  return Component;
};