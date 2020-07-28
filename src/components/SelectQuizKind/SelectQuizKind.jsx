import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { QUIZ_KINDS } from 'pages/Quiz/constants';

import styles from './SelectQuizKind.scss';

const quizKinds = Object.keys(QUIZ_KINDS);

const SelectQuiz = ({ activeKind, onChange, style }) => {
  return (
    <div className={styles.root} style={style}>
      {quizKinds.map(kind => (
        <div
          key={kind}
          className={classNames(styles.kind, {
            [styles.kindActive]: !!activeKind && activeKind === kind,
          })}
          onClick={onChange}
        >
          {QUIZ_KINDS[kind].label}
        </div>
      ))}
    </div>
  );
};

SelectQuiz.propTypes = {
  activeKind: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

SelectQuiz.defaultProps = {
  style: {},
};

export default React.memo(SelectQuiz);
