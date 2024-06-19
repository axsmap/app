import { Suspense } from "react";
import Spinner from "../Spinner";

export default function SpinnerLoader(Component) {
  return function (props) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
