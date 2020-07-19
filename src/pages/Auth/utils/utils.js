import { useState, useCallback } from 'react';

export const useFormData = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState(fields);

  const handleChange = useCallback(
    event => {
      const {
        value,
        dataset: { inputName },
        type,
      } = event.target;

      if (!inputName) {
        throw new Error('inputName should be defined as dataset attr');
      }

      setFormData({
        ...formData,
        [inputName]: type === 'checkbox' ? event.target.checked : value,
      });
    },
    [formData, setFormData]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      onSubmit(formData);
    },
    [onSubmit, formData]
  );

  return { formData, handleChange, handleSubmit };
};
