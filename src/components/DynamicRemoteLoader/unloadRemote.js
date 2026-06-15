export const unloadRemote = (scope) => {
  try {
    delete window[scope];
  } catch (error) {
    console.error(
      `Failed to delete remote scope: ${scope}`,
      error
    );
  }

  const script = document.querySelector(
    `script[data-scope="${scope}"]`
  );

  if (script) {
    script.remove();
  }
};