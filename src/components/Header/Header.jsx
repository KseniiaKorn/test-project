import s from "./Header.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutModal from "../LogoutModal/LogoutModal";
import { logoutThunk } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

const Header = () => {
  const dispatch = useDispatch();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutThunk()).unwrap();
      setIsLogoutOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const user = useSelector(selectUser);

  return (
    <div className={s.container}>
      <div className={s.headerWrapper}>
        <div className={s.logoWrapper}>
          <svg className={s.icon} width="30.9" height="30.9">
            <use href="/icons.svg#icon-wallet" />
          </svg>
          <p className={s.logoText}>Spendy</p>
        </div>
        <div className={s.infoWrapper}>
          <div className={s.nameText}>{user.name || "Name"}</div>
          <div className={s.verticalLine}></div>
          <button
            className={s.logoutWrapper}
            onClick={() => setIsLogoutOpen(true)}
          >
            <svg
              className={s.iconExit}
              width="18"
              height="18"
              viewBox="0 0 32 32"
            >
              <use href="/icons.svg#icon-Exit" />
            </svg>
            <span className={s.exitText}>
              {isLoading ? "Logging out..." : "Exit"}
            </span>
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutOpen}
        onRequestClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};
export default Header;