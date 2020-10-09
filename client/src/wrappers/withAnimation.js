import React, { Component } from 'react';
import classnames from 'classnames';

/**
 * Create a wrapping component, that adds a div around
 * passed component and gives it animation class so it
 * can animate itself in.
 * @param {Component} WrappedComponent
 * @returns {Component}
 */
const withAnimation = WrappedComponent => {
  return class extends Component {
    // Define a constructor so we can use didMount state to false.
    constructor(props) {
      super(props);
      this.state = { didMount: false };
    }

    // When component mounts, set didMount to true instantly.
    componentDidMount() {
      this.setState({ didMount: true });
    }

    render() {
      // Construct wrapper animation classes.
      let animateClasses = classnames({
        'fade-out': !this.state.didMount,
        'fade-in': this.state.didMount,
      });

      return (
        <div className={animateClasses}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withAnimation;
