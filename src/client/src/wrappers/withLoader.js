import React, { Component } from 'react';
import classnames from 'classnames';

const withLoader = WrappedComponent => {
  return class extends Component {
    state = { didMount: false };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ didMount: true });
      }, 10);
    }

    render() {
      let { didMount } = this.state;
      let loadingClasses = classnames({
        'fade-in': true,
        visible: didMount
      });
      return (
        <div className={loadingClasses}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withLoader;
