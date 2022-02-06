import React from 'react';

const initialState = {
  checked: true,
  userChecked: false,
  userOverride: false,
  autoChecked: true,
};

function checkboxReducer(
  state: typeof initialState,
  action: { type: 'user' | 'auto' | 'reset'; checked: boolean }
): typeof initialState {
  const newState = { ...state };
  switch (action.type) {
    case 'user':
      newState.userChecked = action.checked;
      newState.userOverride = true;
      break;
    case 'auto':
      newState.autoChecked = action.checked;
      break;
    case 'reset':
      return { ...initialState };
    default:
      return state;
  }
  newState.checked = newState.userOverride ? newState.userChecked : newState.autoChecked;
  return newState;
}

export const useSmartCheckbox = () => React.useReducer(checkboxReducer, initialState);
