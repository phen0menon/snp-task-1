export const putNormalizedModifications = ({ state, id, props, temprary }) => {
  ['byId', 'modifiedById', ...(temprary ? ['tempraryItems'] : [])].forEach(
    requiredProp => {
      if (!Object.getOwnPropertyDescriptor(state, requiredProp)) {
        throw new Error(
          `putNormalizedModifications: Missing prop in state: ${requiredProp}`
        );
      }
    }
  );
  /* eslint-disable no-param-reassign */
  // If there's no modified item with specified id, put it to modified
  if (!Object.getOwnPropertyDescriptor(state.modifiedById, id)) {
    state.modifiedById[id] = { ...state.byId[id] };
  }

  Object.keys(props).forEach(prop => {
    if (Object.getOwnPropertyDescriptor(state.byId[id], prop)) {
      state.byId[id][prop] = props[prop];
    }
  });
  /* eslint-enable no-param-reassign */
};
