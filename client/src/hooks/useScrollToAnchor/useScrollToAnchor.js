import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToAnchor() {
  const location = useLocation();
  useEffect(() => {
    
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]); 

  return null; 
}

export default useScrollToAnchor;