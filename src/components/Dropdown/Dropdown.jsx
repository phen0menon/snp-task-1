import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import styles from './Dropdown.scss';

export const DropdownContext = React.createContext({
  close: null,
});

const Dropdown = ({
  placement,
  togglerClassName,
  togglerContent,
  offsetY,
  offsetX,
  children,
}) => {
  const [visible, setVisibility] = useState(false);
  const close = useCallback(() => setVisibility(false), [setVisibility]);
  const toggleVisibility = useCallback(
    event => {
      event.stopPropagation();
      setVisibility(!visible);
    },
    [visible, setVisibility]
  );

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'right', 'bottom', 'left'],
          },
        },
        {
          name: 'offset',
          enabled: !!offsetY || !!offsetX,
          options: { offset: [offsetX, offsetY] },
        },
      ],
    }
  );

  const handleOutsideClick = useCallback(
    event => {
      if (
        popperRef.current.contains(event.target) ||
        referenceRef.current.contains(event.target)
      ) {
        return;
      }
      setVisibility(false);
    },
    [popperRef, setVisibility]
  );

  useEffect(() => {
    const setListener = () => {
      document.addEventListener('mousedown', handleOutsideClick);
    };

    const removeListener = () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

    if (visible) {
      setListener();
    } else {
      removeListener();
    }

    return () => {
      removeListener();
    };
  }, [visible, handleOutsideClick]);

  const renderedTogglerContent = useMemo(() => {
    if (typeof togglerContent === 'function') {
      const Component = togglerContent;
      return <Component />;
    }
    return togglerContent;
  }, [togglerContent]);

  return (
    <>
      <button
        ref={referenceRef}
        onClick={toggleVisibility}
        className={togglerClassName}
      >
        {renderedTogglerContent}
      </button>
      <div
        ref={popperRef}
        style={popperStyles.popper}
        {...attributes.popper}
        className={styles.root}
      >
        <DropdownContext.Provider value={{ close }}>
          <div
            className={classNames(styles.container, {
              [styles.containerVisible]: visible,
            })}
            style={popperStyles.offset}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </DropdownContext.Provider>
      </div>
    </>
  );
};

Dropdown.propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  togglerClassName: PropTypes.string,
  togglerContent: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  children: PropTypes.node,
};

Dropdown.defaultProps = {
  placement: 'bottom',
  togglerClassName: '',
  togglerContent: 'click',
  offsetX: 0,
  offsetY: 0,
  children: '',
};

export default React.memo(Dropdown);
