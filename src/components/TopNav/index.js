import { Link } from "react-router-dom"
import letter from '@assets/img/letter.a6d96d31aad6d4b972f8.png'
import logo from '@assets/img/logo.png'
// import '@assets/css/';

const TopNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary top-nav">
      <div className="container">
        <a role="button" className="envelope logoTopNav" style={{
          backgroundImage: `url(${logo})`,
          width: '180px',
          height: '110px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        </a>
        <a role="button" className="envelope text-light text-decoration-none" style={{ backgroundImage: `url(${letter})` }}>
        </a>
      </div>
    </nav>
  );
};

export default TopNav