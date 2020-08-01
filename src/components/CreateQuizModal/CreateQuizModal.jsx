import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import QuizInput from '../QuizInput/QuizInput';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';
import { quizzesActions } from 'models/tests/quizzes/slice';
import { getQuizCreatingStatus } from '../../models/tests/quizzes/selectors';

const CreateQuizModal = modalSettings => {
  const [quizTitle, setQuizTitle] = useState('');
  const quizCreatingStatus = useSelector(getQuizCreatingStatus);
  const onQuizCreate = useAction(quizzesActions.createQuiz);
  const onChange = React.useCallback(e => setQuizTitle(e.target.value), [
    setQuizTitle,
  ]);
  const onProceed = React.useCallback(() => {
    onQuizCreate({ title: quizTitle });
  }, [onQuizCreate, quizTitle]);

  const isModalBusy = quizCreatingStatus === 'pending';
  const isModalSucceed = quizCreatingStatus === 'success';

  React.useEffect(() => {
    if (isModalSucceed) {
      modalSettings.close();
    }
  }, [isModalSucceed, modalSettings]);

  return (
    <Modal {...modalSettings}>
      <Modal.Header>Create new quiz</Modal.Header>
      <Modal.Body>
        <QuizInput
          value={quizTitle}
          onChange={onChange}
          placeholder="Enter quiz title"
          disabled={isModalBusy}
        />
      </Modal.Body>
      <Modal.Footer proceedHandler={onProceed} disabled={isModalBusy} />
    </Modal>
  );
};

CreateQuizModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default CreateQuizModal;
