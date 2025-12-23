import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function usePreviousUrl() {
  const location = useLocation();
  const prevLocation = useRef(null);

  useEffect(() => {
    prevLocation.current = location.pathname;
  }, [location]);

  return prevLocation.current;
}

export default usePreviousUrl;