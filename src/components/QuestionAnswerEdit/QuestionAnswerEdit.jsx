import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'components/Checkbox';

import styles from './QuestionAnswerEdit.scss';
import globalStyles from 'styles/global.scss';

const QuestionAnswerEdit = ({
  answer,
  onAnswerChange,
  onDelete,
  onDrag,
  temprary,
  ...restInputProps
}) => {
  const { id } = answer;

  const onInputChange = React.useCallback(
    event => {
      onAnswerChange({ id: answer.id, text: event.target.value });
    },
    [id, onAnswerChange]
  );

  const toggleCheckbox = React.useCallback(
    event => {
      onAnswerChange({ id: answer.id, is_right: !event.target.checked });
    },
    [id, onAnswerChange]
  );

  return (
    <div className={styles.answer}>
      {!temprary && (
        <div className={styles.answerCheckbox}>
          <Checkbox
            name="isRight"
            id="isRight"
            value={answer.is_right}
            onChange={toggleCheckbox}
          />
        </div>
      )}
      <div
        className={classNames(styles.answerContent, {
          [styles.answerContentGutter]: !temprary,
        })}
      >
        <input
          type="text"
          className={classNames([
            globalStyles.formTextarea,
            globalStyles.formTextareaSmall,
          ])}
          value={answer.text}
          placeholder="Answer text"
          onChange={onInputChange}
          {...restInputProps}
        />
      </div>
    </div>
  );
};

QuestionAnswerEdit.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onKeyPress: PropTypes.func,
  onDrag: PropTypes.func,
  temprary: PropTypes.bool,
};

QuestionAnswerEdit.defaultProps = {
  onDrag: null,
  onKeyPress: null,
  onDelete: null,
  temprary: false,
};

export default React.memo(QuestionAnswerEdit);
