import { SubmissionError } from 'redux-form';

export const submit = (onSubmit: Function) => async (values: any) => {
  try {
    await new Promise((resolve, reject) =>
      onSubmit(values, { resolve, reject })
    );
  } catch (err) {
    throw new SubmissionError(err);
  }
};