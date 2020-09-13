import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Form, Button, Image, Card } from 'react-bootstrap';
import { postItem, putItem } from '../../../../api';
import { ItemsContext } from '../../../../context/ItemsProvider/ItemsProvider';
import createBEM from '../../../../utils/createBEM';
import { getToken } from '../../../../utils/tokenManager';
import './ItemsForm.scss';

const ItemsForm = ({ id, title, description, src, loading, editing, setEditing }) => {
  const BEM = createBEM('ItemsForm');

  const { register, handleSubmit, getValues } = useForm();
  const [srcPreview, setSrcPreview] = useState();
  const { loadItems } = useContext(ItemsContext);

  const submit = async (values) => {
    const auth = getToken();
    const func = () => {
      if (editing) return putItem(values, id, auth);
      return postItem(values, auth);
    };
    try {
      await func();
      await loadItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSrcPreview(src);
  }, [src]);
  return (
    <Card className={BEM()}>
      <Card.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              disabled={loading}
              defaultValue={title}
              name="title"
              ref={register}
              type="text"
              placeholder="Please enter a title..."
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled={loading}
              defaultValue={description}
              name="description"
              ref={register}
              as="textarea"
              type="text"
              placeholder="Please enter a description..."
            />
          </Form.Group>

          {srcPreview && (
            <Image
              style={{
                margin: 'auto',
                height: '171px',
                width: '180px',
              }}
              src={srcPreview}
              roundedCircle
              fluid
            />
          )}
          <Form.Group controlId="formImageSrc">
            <Form.Label>Image</Form.Label>
            <Form.Control
              disabled={loading}
              defaultValue={src}
              onChange={() => setSrcPreview(getValues().src)}
              name="src"
              ref={register}
              type="text"
              placeholder="Please enter an image URL..."
            />
          </Form.Group>

          <Button disabled={loading} variant="primary" type="submit">
            Submit
          </Button>
          {editing && (
            <Button
              onClick={() => setEditing(false)}
              disabled={loading}
              variant="danger"
              type="button"
            >
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

ItemsForm.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  description: propTypes.string,
  src: propTypes.string,
  loading: propTypes.bool.isRequired,
  editing: propTypes.bool,
  setEditing: propTypes.func,
};

ItemsForm.defaultProps = {
  id: null,
  title: null,
  description: null,
  src: null,
  editing: false,
  setEditing: () => null,
};
export default ItemsForm;
