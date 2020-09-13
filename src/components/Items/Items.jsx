import React, { useState, useEffect, useCallback } from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getItems } from '../../api';
import List from './elements/List/List';
import ItemsForm from './elements/ItemsForm';
import ItemsProvider from '../../context/ItemsProvider/ItemsProvider';
import { getToken, removeToken } from '../../utils/tokenManager';
import Toast from '../Toast/Toast';
import createBEM from '../../utils/createBEM';
import './Items.scss';

const Items = () => {
  const [storedItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState();
  const [error, setError] = useState(null);
  const BEM = createBEM('Items');
  const history = useHistory();

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const auth = getToken();
      const { items, msg } = await getItems(auth);
      if (items) {
        setItems(items);
        setLoading(false);
      } else {
        throw msg || new Error('An Error occured');
      }
    } catch (e) {
      if (e === 'Token has expired') {
        removeToken();
        history.push('/auth');
      }
      setError(e);
      setLoading(false);
    }
  }, [setItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <ItemsProvider
      loadItems={loadItems}
      loading={loading}
      editing={editing}
      setEditing={setEditing}
    >
      <Container>
        <Row>
          <Col>
            <ItemsForm loading={loading} />
          </Col>
        </Row>
        <Row>
          <Col>
            {(loading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )) || <List items={storedItems} />}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">{error && <Toast error={error} />}</Col>
        </Row>
      </Container>
    </ItemsProvider>
  );
};

export default Items;
