import block from '../../assets/img/Picsart_24-10-22_10-51-09-888.png';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <img className='header-img' src={block} alt="NaFretta" width="130px" height="120px" />
      <h1 className="header-slogan">Самая лучшая еда в городе Урус-Мартан</h1>
    </header>
  );
};

export default Header;
