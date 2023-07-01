import React, { ErrorInfo } from 'react';

function logErrorToMyService(error: Error, errorInfo: React.ErrorInfo) {
  console.log(error, errorInfo);
}

export class ErrorBoundary extends React.Component<{ children?: JSX.Element }, { hasError: boolean }> {
  constructor(props: Readonly<{ children?: JSX.Element }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
