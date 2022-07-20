// Actions
const GET_CATEGORIES = "categories/GET_CATEGORIES";
const GET_EVENT_CATEGORIES = "categories/GET_EVENT_CATEGORIES";

// Action Creators
const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
};

// Thunks
export const getCategoriesThunk = () => async (dispatch) => {
  const res = await fetch("/api/categories");

  if (res.ok) {
    const categories = await res.json();
    dispatch(getCategories(categories));
  }
};

// Reducer
const initialState = {};

export default function categoriesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_CATEGORIES:
      newState = {};
      action.payload.forEach((category) => {
        newState[category.id] = category;
      });
      return newState;
    default:
      return state;
  }
}
