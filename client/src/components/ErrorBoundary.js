import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
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
