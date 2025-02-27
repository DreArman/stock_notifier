const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
        </svg>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><a href="/home" className="nav-link active" aria-current="page">Main</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Stocks</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Predict</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Alerts</a></li>
      </ul>
      
      <ul className="nav nav-pills">
        <a href="#" className="nav-link text">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi d-block mx-auto mb-1" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
      </a>
      </ul>
      
    </header>
  );
};

export default Header;