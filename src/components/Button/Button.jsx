import s from "./Button.module.css";

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick} className={s.button}>
      {name}
    </button>
  );
};
export default Button;