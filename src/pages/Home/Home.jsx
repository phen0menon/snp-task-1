import React from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import useAction from 'hooks/useAction';
import { sessionActions } from 'models/session/slice';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import Button from 'components/Button';

const TestModal = ({ ...restProps }) => {
  return (
    <Modal {...restProps}>
      <Modal.Header>qweq</Modal.Header>
      <Modal.Body>Body this kis !</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

const Home = () => {
  const onFetchLogout = useAction(sessionActions.fetchLogout);

  const { isOpen, closeModal, openModal } = useModal();

  return (
    <div>
      Home
      <Button onClick={onFetchLogout}>Logout</Button>
      <Button onClick={openModal}>Open modal...</Button>
      <TestModal isOpen={isOpen} close={closeModal} open={openModal} />
    </div>
  );
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
