import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AnswerBlock.scss';
import Checkbox from 'components/Checkbox/Checkbox';

const AnswerBlock = ({ onToggle, active, disabled, ...answer }) => {
  const onClick = useCallback(() => {
    if (disabled) return;
    onToggle(answer.id);
  }, [onToggle, answer, disabled]);

  return (
    <div className={styles.root} onClick={onClick}>
      <div
        className={classNames(styles.answer, {
          [styles.answerActive]: active,
          [styles.answerDisabled]: disabled,
        })}
      >
        <div className={styles.title}>{answer.text}</div>
        {!disabled && (
          <div className={styles.action}>
            <Checkbox value={active} />
          </div>
        )}
      </div>
    </div>
  );
};

AnswerBlock.propTypes = {
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default AnswerBlock;
