import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { isUserAdminSelector } from 'models/session/selectors';
import styles from './QuizCard.scss';
import Button from 'components/Button/Button';
import { formatDate } from '../../utils/common';

const QuizCard = ({ id, title, created_at }) => {
  const isUserAdmin = useSelector(isUserAdminSelector);

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
              <Button to={`/quiz/${id}/edit`}>Edit</Button>
            </div>
          )}

          <div>
            <Button to={`/quiz/${id}`}>&gt;</Button>
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
