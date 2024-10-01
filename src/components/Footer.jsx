import "../style/Header.css";

const Header = () => {
  return (
    <header>
      <div class="left-items">
        <button>Izquierda 1</button>
        <button>Izquierda 2</button>
      </div>
      <div class="center-text">Este es el texto central del Header</div>
      <div class="right-items">
        <button>Derecha 1</button>
        <button>Derecha 2</button>
      </div>
    </header>
  );
};

export default Header;
