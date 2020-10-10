import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { DefaultAnimationClasses } from '../constants';

/**
 * Create a wrapping component, that adds a div around
 * passed component and gives it animation class so it
 * can animate itself in.
 * 1. Initialize the didMount state variable to false.
 * 2. Set the didMount to true inside the useEffect hook.
 *    This way the component knows it has rendered.
 * 3. Build the animation classes.
 * 4. Return the wrapped component.
 * @param {Component} WrappedComponent
 * @returns {Component}
 */
export function withAnimation(
  WrappedComponent,
  { preMountClass, postMountClass } = DefaultAnimationClasses
) {
  return props => {
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
      setDidMount(true);
    }, [didMount]);

    let animateClasses = classnames({
      [preMountClass]: !didMount,
      [postMountClass]: didMount,
    });

    return (
      <div className={animateClasses}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
