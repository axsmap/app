import { createRef } from "react";
import { validateLogin } from "../AuthModal/handleAuthModal";

export interface createReview {
  name: string;
  placeId: string;
}

export const createReviewRef = createRef<createReviewHandler>();

export interface createReviewHandler {
  show: (e: createReview) => void;
  hide: () => void;
}

export const showCreateReview = (e: createReview) => {
    validateLogin(() => {
        createReviewRef?.current?.show(e);
    })();
};

export const hideCreateReview = () => {
  createReviewRef?.current?.hide();
};
