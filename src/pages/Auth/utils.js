import { useState, useCallback } from 'react';

export const useFormData = fields => {
  const initialState = Array.isArray(fields)
    ? fields.reduce((result, current) => ({ ...result, [current]: '' }), {})
    : fields;

  const [formData, setFormData] = useState(initialState);

  const onFormDataChange = useCallback(
    event => {
      const { value, dataset, type } = event.target;
      const { inputName } = dataset;

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

  return { formData, setFormData, onFormDataChange };
};
