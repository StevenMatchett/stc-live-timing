export const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECTED_DRIVER':
        return {...state, selected: action.data };
    case 'DESELECT_DRIVER':
        return {...state, selected: null };
    case 'UPDATE_DROPDOWN':
        return {...state, dropdown: action.data }
    case 'RUNS_AND_CONES':
        return {...state, conesHit: action.data.conesHit, runCount: action.data.runCount}
    default:
        return state;
  }
};