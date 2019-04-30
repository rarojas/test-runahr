import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import {
  FormControl,
  FormText
  //@ts-ignore
} from 'styled-bootstrap-components';
import styled from 'styled-components';

const FeedBack = styled.div`
  color: red;
  font-size: 0.8em;
`;

export const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}: WrappedFieldProps & { type: string; label: string }) => {
  return (
    <>
      <FormText htmlFor={input.name}>{label}</FormText>
      <FormControl
        {...input}
        placeholder={label}
        type={type}
        invalid={touched && error}
      />
      {touched && (error && <FeedBack>{error}</FeedBack>)}
    </>
  );
};
