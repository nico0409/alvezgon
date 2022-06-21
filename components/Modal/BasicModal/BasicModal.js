import { Modal, Icon, Button } from "semantic-ui-react";

const BasicModal = (props) => {
  const { show, setShow, title, children, ...rest } = props;

  return (
    <Modal
      className="basic-modal"
      open={show}
      onClose={() => setshow(false)}
      {...rest}
    >
      <Modal.Header>
        <span>{title}</span>
        <Icon name="close" onClick={() => setShow(false)} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default BasicModal;
