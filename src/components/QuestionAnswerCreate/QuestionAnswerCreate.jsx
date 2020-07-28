import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import AnswerInput from 'components/AnswerInput/AnswerInput';
import { createdAnswerSuccessSelector } from 'models/tests/answers/selectors';

const QuestionAnswerCreate = ({ text, setText, onSubmit }) => {
  const createdAnswerSuccess = useSelector(createdAnswerSuccessSelector);

  const onNewAnswerChange = React.useCallback(
    event => {
      setText(event.target.value);
    },
    [setText]
  );

  const onNewAnswerEnterInput = React.useCallback(
    evt => {
      const isEnter = evt.keyCode === 13 || evt.which === 13;
      if (isEnter && !!text) {
        onSubmit();
      }
    },
    [onSubmit, text]
  );

  React.useEffect(() => {
    if (createdAnswerSuccess) {
      setText('');
    }
  }, [createdAnswerSuccess, setText]);

  return (
    <AnswerInput
      value={text}
      onChange={onNewAnswerChange}
      onKeyDown={onNewAnswerEnterInput}
      placeholder="Enter new answer"
    />
  );
};

QuestionAnswerCreate.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(QuestionAnswerCreate);
