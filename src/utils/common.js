export const triggerEscAction = (e, action) => {
  if (e.keyCode === 27) action();
};

export const toCapitalCase = str => {
  if (!str) {
    console.error('toCapitalCase: passed string is empty');
    return undefined;
  }
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};
