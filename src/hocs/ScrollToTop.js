import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

export const ScrollToTop = withRouter(({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return <Fragment>{children}</Fragment>;
});
// Change the name of this guy to withScrollToTop? What will I call it? A component wrapper?
// export const  withRouter(ScrollToTop);
