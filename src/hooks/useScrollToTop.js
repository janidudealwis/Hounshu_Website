import { useEffect } from "react";

const useScrollToTop = (deps = []) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useScrollToTop;
