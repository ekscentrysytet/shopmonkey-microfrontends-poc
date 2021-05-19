import { useDispatch } from "react-redux";

import { updateCustomerById as update } from "../reducers/customers";

export const useUpdateCustomerById = () => (customerId, data) => {
  const dispatch = useDispatch();
  return dispatch(update(customerId, data));
};
