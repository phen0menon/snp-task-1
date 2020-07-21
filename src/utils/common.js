export const triggerEscAction = (e, action) => {
  if (e.keyCode === 27) action();
};
