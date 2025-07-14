import { createRef } from "react";

export const filterRef = createRef<handler>();

export interface handler {
  show: () => void;
  hide: () => void;
}

export const showFilterModal = () => {
  filterRef.current && filterRef.current.show();
};

export const hideFilterModal = () => {
  filterRef.current && filterRef.current.hide();
};
