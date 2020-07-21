import { useMemo, useCallback, useEffect } from 'react';
import { toCapitalCase } from 'utils/common';

/**
 * Sets an array of errors to formik form via formik's setError
 *
 * @param errors
 * @param setErrors - a function that passes an object of errors
 * @param map - map error keys to the appropriate fields
 */
export default (errors, setErrors, map = {}) => {
  const getValueOrElement = useCallback(
    value => (Array.isArray(value) ? value[0] : value),
    []
  );

  const mappedErrors = useMemo(
    () =>
      Object.keys(errors).reduce((result, current) => {
        const passedKey = map[current] || current;
        return {
          ...result,
          [passedKey]: `${toCapitalCase(current)} ${getValueOrElement(
            errors[current]
          )}`,
        };
      }, {}),
    [errors, map, getValueOrElement]
  );

  useEffect(() => {
    if (Object.keys(mappedErrors).length) setErrors(mappedErrors);
  }, [mappedErrors, setErrors]);
};
