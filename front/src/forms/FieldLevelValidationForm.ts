export const required = (value: any) =>
  value || typeof value === 'number' ? undefined : 'Required';
export const maxLength = (max: any) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = (min: any) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minValue = (min: any) => (value: any) =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
