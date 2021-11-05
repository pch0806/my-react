import React, { useEffect, useCallback, useRef } from 'react';

const ClickOutside = props => {
  const containerRef = useRef(null);

  const handleClick = useCallback(
    event => {
      const container = containerRef.current;
      const { target } = event;
      const { onClickOutside } = props;

      if (
        (container && container === target) ||
        (container && !container.contains(target))
      ) {
        onClickOutside(event);
      }
    },
    [props],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  return <div className={props.className} ref={containerRef}>{props.children}</div>;
};

export default ClickOutside;
