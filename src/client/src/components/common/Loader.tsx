import { PropagateLoader } from 'react-spinners';
import { withAnimation } from '../../wrappers';

interface LoaderProps {
  loading: boolean;
  size?: number;
}

/**
 * Animated loading component.
 */
const _Loader: React.FC<LoaderProps> = ({ loading, size }) => (
  <div className="loader">
    <PropagateLoader
      css="transform: rotateZ(90deg);"
      size={size ?? 5}
      color={'#d9721e'}
      loading={loading}
    />
  </div>
);
export const Loader = withAnimation(_Loader);
