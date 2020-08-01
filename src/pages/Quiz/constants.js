export const QUIZ_SINGLE_KIND = 'single';
export const QUIZ_MULTIPLE_KIND = 'multiple';
export const QUIZ_NUMBER_KIND = 'number';

export const QUIZ_KINDS = {
  [QUIZ_SINGLE_KIND]: {
    label: 'Single select',
  },
  [QUIZ_MULTIPLE_KIND]: {
    label: 'Multiple select',
  },
  [QUIZ_NUMBER_KIND]: {
    label: 'Numeric',
  },
};

export const ValidationStrings = {
  NOT_ENOUGH_ANSWERS: `There should be at least 2 questions`,
  TOO_MUCH_RIGHT_ANSWERS: 'There should not be more than one correct answer',
  QUESTION_TITLE_EMPTY: 'Question title should not be empty',
};
