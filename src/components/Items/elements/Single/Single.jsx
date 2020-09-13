import React, { useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import ItemsForm from '../ItemsForm/ItemsForm';
import { deleteItem } from '../../../../api';
import { ItemsContext } from '../../../../context/ItemsProvider/ItemsProvider';
import { getToken } from '../../../../utils/tokenManager';

const Single = ({ id, title, description, src }) => {
  const { loadItems, loading } = useContext(ItemsContext);
  const [editing, setEditing] = useState(false);
  const deleteHandler = async () => {
    const auth = getToken();
    await deleteItem(id, auth);
    await loadItems();
  };
  const styles = ['p-0', 'ml-auto', 'mr-auto', 'mt-3', 'w-25'].join(' ');
  return (
    <Card className={styles}>
      {editing && (
        <Card.Body>
          <ItemsForm
            id={id}
            title={title}
            description={description}
            src={src}
            loading={loading}
            editing={editing}
            setEditing={setEditing}
          />
        </Card.Body>
      )}
      {!editing && (
        <>
          <Card.Img variant="top" src={src} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <div className={['d-flex', 'justify-content-center'].join(' ')}>
              <Button className="mr-3" variant="success" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteHandler()}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

Single.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  src: propTypes.string.isRequired,
};

export default Single;
