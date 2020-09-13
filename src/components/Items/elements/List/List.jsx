import React from 'react';
import propTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Single from '../Single/Single';

const List = ({ items }) => {
  const styles = [
    'p-0',
    'ml-auto',
    'mr-auto',
    'mt-5',
    'd-flex',
    'flex-column',
    'align-items-center',
    'justify-content-center',
  ].join(' ');

  return (
    <Container className={styles}>
      {items &&
        items.map(({ id, title, description, src }) => (
          <Single key={id} id={id} title={title} description={description} src={src} />
        ))}
    </Container>
  );
};

List.propTypes = {
  items: propTypes.array.isRequired,
};

export default List;
