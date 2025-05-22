import Modal from "react-modal";
import s from "./LogoutModal.module.css";
import Button from "../Button/Button";

Modal.setAppElement("#root");

const LogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel="Logout Confirmation"
    >
      <div className={s.content}>
        <svg className={s.icon} width="182" height="94" viewBox="0 0 62 32">
          <use href="/icons.svg#icon-logo" />
        </svg>
        <p className={s.message}>Are you sure you want to log out?</p>
        <Button onClick={onConfirm} name={"Logout"} />
        <Button onClick={onRequestClose} name={"Cancel"} />
      </div>
    </Modal>
  );
};

export default LogoutModal;