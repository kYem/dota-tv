import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type QueryErrorType = SerializedError | FetchBaseQueryError;

interface Props {
  isError?: boolean,
  error: QueryErrorType
}

export const QueryError = ({ isError, error }: Props) => {
  if (!isError || !error) {
    return null;
  }

  const render = (msg: string) => <div><h1>{msg}</h1></div>

  if ('message' in error && error.message) {
    return render(error.message)
  }

  if ('error' in error && error.error) {
    return render(error.error)
  }

  const defaultMsg = 'There was a problem completing your request';
  if ('data' in error && error.data && typeof error.data === 'string') {
    return render(error.data || defaultMsg)
  }

  return render(defaultMsg)
}
