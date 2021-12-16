import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface CameraProps {
  country: string;
  author: string;
}

export const Camera: React.FC<CameraProps> = ({ country, author }) => {
  const [show, setShow] = useState(false);

  /**
   * Hides photo details.
   */
  const hideDetails = () => setShow(false);

  /**
   * Shows photo details.
   */
  const showDetails = () => setShow(true);

  /**
   * After some time, hide photo details.
   */
  useEffect(() => {
    if (show) {
      setTimeout(hideDetails, 2000);
    }
  }, [show]);

  const cameraDetailsClasses = classNames({
    'camera-details': true,
    'camera-details-hidden': !show,
    'camera-details-visible': show,
  });

  return (
    <div className="camera">
      <div className={cameraDetailsClasses}>
        {country} by {author}
      </div>
      <svg className="icon camera-icon" onPointerUp={showDetails}>
        <use
          xlinkHref={`./assets/icons/icons.svg#icon-camera${show ? '' : '-outlined'}`}
        />
      </svg>
    </div>
  );
};
