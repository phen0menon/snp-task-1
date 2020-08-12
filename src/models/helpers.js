/* eslint-disable no-param-reassign */

export const putNormalizedModifications = (state, id, props) => {
  ['byId', 'modifiedById'].forEach(requiredProp => {
    if (!Object.getOwnPropertyDescriptor(state, requiredProp)) {
      throw new Error(
        `putNormalizedModifications: Missing prop in state: ${requiredProp}`
      );
    }
  });
  // If there's no modified item with specified id, put it to modified
  if (!Object.getOwnPropertyDescriptor(state.modifiedById, id)) {
    state.modifiedById[id] = { ...state.byId[id] };
  }

  Object.keys(props).forEach(prop => {
    if (Object.getOwnPropertyDescriptor(state.byId[id], prop)) {
      state.byId[id][prop] = props[prop];
    }
  });
};

export const removeFromArray = (arr, element) => {
  const index = arr.findIndex(
    el => el === element || el === element.toString()
  );
  if (index <= -1) {
    throw new Error(`removeFromArray: there's no ${element} element in array`);
  }
  arr.splice(index, 1);
  return arr;
};

export const removeFromNormalized = (state, id) => {
  removeFromArray(state.allIds, id);
  delete state.byId[id];
};
