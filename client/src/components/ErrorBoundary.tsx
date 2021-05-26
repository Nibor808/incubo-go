import React, { ErrorInfo, ReactNode } from 'react';

type EBProps = {
  children: ReactNode;
};

type EBState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends React.Component<EBProps, EBState> {
  public state: EBState = { error: null, errorInfo: null };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.errorInfo) {
      return (
        <React.Fragment>
          <p className='error'>Oops! We broke it. Please try again later.</p>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
