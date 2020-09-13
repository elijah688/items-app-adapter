import React, { useEffect, useState } from 'react';
import { Toast as BsToast, Image } from 'react-bootstrap';
import propTypes from 'prop-types';
import createBEM from '../../utils/createBEM';
import { error as err } from '../../data/avatar.json';
import './Toast.scss';

const Toast = ({ error, resetError }) => {
  const BEM = createBEM('Toast');

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (error) {
      setShow(true);
    }
    return () => {};
  }, [error]);
  return (
    <BsToast
      onClose={() => {
        setShow(false);
        resetError(null);
      }}
      show={show}
      delay={3000}
      autohide
    >
      <BsToast.Header>
        <Image src={err} roundedCircle className={BEM('avatar')} alt="alt" />
        <strong className="mr-auto">Error</strong>
        <small>{new Date().toDateString()}</small>
      </BsToast.Header>
      <BsToast.Body>{error.message || error}</BsToast.Body>
    </BsToast>
  );
};

Toast.propTypes = {
  error: propTypes.string.isRequired,
  resetError: propTypes.func,
};
Toast.defaultProps = {
  resetError: () => null,
};
export default Toast;
