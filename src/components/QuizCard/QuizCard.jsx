import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { isUserAdminSelector } from 'models/session/selectors';
import styles from './QuizCard.scss';
import Button from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../utils/common';

const QuizCard = ({ id, title, created_at }) => {
  const isUserAdmin = useSelector(isUserAdminSelector);
  const history = useHistory();

  const redirectToEdit = useCallback(() => {
    history.push(`/quiz/${id}/edit`);
  }, [history, id]);

  const redirectToQuiz = useCallback(() => {
    history.push(`/quiz/${id}`);
  }, [history, id]);

  const displayedDate = useMemo(() => formatDate(new Date(created_at)), [
    created_at,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{displayedDate}</div>
        </div>
        <div className={styles.actions}>
          {/* Maybe rewrite this into permission module in the future? */}
          {isUserAdmin && (
            <div>
              <Button onClick={redirectToEdit}>Edit</Button>
            </div>
          )}

          <div>
            <Button onClick={redirectToQuiz}>&gt;</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default React.memo(QuizCard);
