export const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECTED_DRIVER':
        return {selected: action.data };
    case 'DESELECT_DRIVER':
        return {selected: null };
    default:
        return state;
  }
};