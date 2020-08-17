import React, { useMemo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';

import AnswerBlock from '../AnswerBlock/AnswerBlock';

import { getAnswersByIdsSelector } from 'models/tests/answers/selectors';
import { PassQuizAnswerContext } from '../Content/Content';

import styles from './ChoiceAnswerKind.scss';

const ChoiceAnswerKind = ({ answers, isSingle }) => {
  const { userAnswer, setUserAnswer } = useContext(PassQuizAnswerContext);
  const answersEntities = useSelector(getAnswersByIdsSelector, answers);

  const toggleAnswerActive = useCallback(
    id =>
      userAnswer.includes(id)
        ? setUserAnswer(userAnswer.filter(_id => _id !== id))
        : setUserAnswer([...userAnswer, id]),
    [userAnswer, setUserAnswer]
  );

  const renderedAnswers = useMemo(
    () =>
      answersEntities.map(answer => {
        const active = userAnswer.includes(answer.id);
        const disabled = isSingle && !!userAnswer.length && !active;
        return (
          <AnswerBlock
            key={answer.id}
            onToggle={toggleAnswerActive}
            active={active}
            disabled={disabled}
            {...answer}
          />
        );
      }),
    [answersEntities, userAnswer, isSingle, toggleAnswerActive]
  );

  return <div className={styles.root}>{renderedAnswers}</div>;
};

ChoiceAnswerKind.propTypes = {
  answers: PropTypes.array.isRequired,
  isSingle: PropTypes.bool.isRequired,
};

export default ChoiceAnswerKind;
