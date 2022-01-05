import { Button } from '../../common';

export const ScrollUp = () => (
  <Button
    id="scroll-up-button"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    primary
  >
    &uarr;
  </Button>
);
