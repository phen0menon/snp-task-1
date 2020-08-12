import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import QuestionAnswerEdit from 'components/QuestionAnswerEdit';
import useAction from 'hooks/useAction';
import { answersActions } from 'models/tests/answers/slice';
import { reorderArray } from 'utils/common';

const DraggableAnswerList = ({ answers, questionId }) => {
  const [items, setItems] = useState(answers);

  const onAnswerMove = useAction(answersActions.moveAnswer);

  useEffect(() => {
    setItems(answers);
  }, [answers, setItems]);

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) return;

      const answer = items[result.source.index];
      const positionTo = result.destination.index;
      const positionFrom = result.source.index;

      onAnswerMove({
        id: answer.id,
        answer,
        questionId,
        positionTo,
        positionFrom,
      });

      setItems(reorderArray(items, positionFrom, positionTo));
    },
    [items, setItems, onAnswerMove, questionId]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableAnswers">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <QuestionAnswerEdit
                key={item.id}
                questionId={questionId}
                answer={item}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DraggableAnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default DraggableAnswerList;