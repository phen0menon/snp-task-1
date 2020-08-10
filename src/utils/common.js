export const triggerEscAction = (e, action) => {
  if (e.keyCode === 27) action();
};

export const isEnter = event => event.keyCode === 13 || event.which === 13;

export const toCapitalCase = str => {
  if (!str) {
    console.error('toCapitalCase: passed string is empty');
    return undefined;
  }
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

export const formatDate = date => {
  if (!date.getMonth) {
    console.error('formatDate: Date is invalid');
    return date;
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const reorderArray = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
