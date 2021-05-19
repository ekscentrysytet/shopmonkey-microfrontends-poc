import { combineReducers } from "redux";

const initialState = {
  data: {
    1: {
      firstName: "Nazar",
      lastName: "Ilkiv",
      email: "ekscentrysytet@gmail.com",
    },
    2: {
      firstName: "Yuri",
      lastName: "Khmelevskii",
      email: "y@uniwart.com",
    },
  },
};

const UPDATE_CUSTOMER_BY_ID = "UPDATE_CUSTOMER_BY_ID";

export const updateCustomerById = (customerId, data) => ({
  type: UPDATE_CUSTOMER_BY_ID,
  payload: { customerId, data },
});

function data(state = initialState.data, action) {
  switch (action.type) {
    case UPDATE_CUSTOMER_BY_ID:
      return {
        ...state,
        [action.payload.customerId]: {
          ...state[action.payload.customerId],
          ...action.payload.data,
        },
      };
    default:
      return state;
  }
}

export default combineReducers({ data });
