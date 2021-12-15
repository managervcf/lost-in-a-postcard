import { UserInfo } from './UserInfo';
import { Authenticated } from '../common';
import { Logo } from './Logo';

export const Header = () => (
  <div className="header">
    <Logo />
    <Authenticated>
      <UserInfo />
    </Authenticated>
  </div>
);
