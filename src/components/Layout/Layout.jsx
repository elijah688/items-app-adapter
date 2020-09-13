import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import propTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './Layout.scss';
import createBEM from '../../utils/createBEM';

const BEM = createBEM('Layout');
const sidesideNavStyles = {
  visible: () => BEM('side-nav', ['visible']),
  hidden: () => BEM('side-nav', ['hidden']),
};
const backdropStylesOptions = {
  visible: () => BEM('backdrop', ['visible']),
  hidden: () => BEM('backdrop', ['hidden']),
};

const Layout = ({ children, links }) => {
  const [sideNavStyles, setsideNavStyles] = useState([]);
  const [backdropStyles, setBackdropStyles] = useState([]);
  const [showSideNav, setShowSideNav] = useState(false);
  const history = useHistory();

  const renderLinks = () => {
    const currentPath = history.location.pathname;
    return links
      .filter(({ route }) => route !== currentPath)
      .map(({ route }, index) => (
        <Link key={index} to={route}>
          {route}
        </Link>
      ));
  };

  const renderBurger = () => (
    <Button variant="" className={BEM('nav-burger')} onClick={() => setShowSideNav(true)}>
      <div className={BEM('nav-burger-bar')} />
      <div className={BEM('nav-burger-bar')} />
      <div className={BEM('nav-burger-bar')} />
    </Button>
  );

  useEffect(() => {
    const backdropStyle = showSideNav
      ? backdropStylesOptions.visible()
      : backdropStylesOptions.hidden();
    setBackdropStyles([backdropStyle]);
    const sideNavStyle = showSideNav ? sidesideNavStyles.visible() : sidesideNavStyles.hidden();
    setsideNavStyles([sideNavStyle]);
    return () => {};
  }, [showSideNav]);

  return (
    <Container fluid>
      <div
        role="presentation"
        className={backdropStyles.join(' ')}
        onClick={() => setShowSideNav(false)}
      />
      <Row>
        <Col className="ml-auto mr-auto p-0">
          <nav className={BEM('nav')}>
            {renderBurger()}
            {renderLinks()}
          </nav>
          <div className={sideNavStyles.join(' ')}>{renderLinks()}</div>
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

Layout.propTypes = {
  links: propTypes.array,
};
Layout.defaultProps = { links: [{ route: '/items' }, { route: '/auth' }] };

export default Layout;
