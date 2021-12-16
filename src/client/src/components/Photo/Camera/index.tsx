import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface CameraProps {
  country: string;
  author: string;
}

export const Camera: React.FC<CameraProps> = ({ country, author }) => {
  const [showDetails, setShowDetails] = useState(false);

  /**
   * Hides photo details.
   */
  const hideDetails = () => setShowDetails(false);

  /**
   * After some time, hide photo details.
   */
  useEffect(() => {
    if (showDetails) {
      setTimeout(hideDetails, 2000);
    }
  }, [showDetails]);

  const cameraDetailsClasses = classNames({
    'camera-details': true,
    'camera-details-hidden': !showDetails,
    'camera-details-visible': showDetails,
  });

  return (
    <div className="camera">
      <div className={cameraDetailsClasses}>
        {country} by {author}
      </div>
      <svg
        className="icon camera-icon"
        onPointerUp={() => setShowDetails(showDetails => !showDetails)}
      >
        <use
          xlinkHref={`./assets/icons/icons.svg#icon-camera${
            showDetails ? '' : '-outlined'
          }`}
        />
      </svg>
    </div>
  );
};
