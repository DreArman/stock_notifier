const Headers = () => {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <svg
            className="bi"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <a href="/home" className="nav-link px-2 link-secondary">
            Main
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            My Stocks
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Predict
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Alerts
          </a>
        </li>
      </ul>

      <div className="col-md-3 text-end">
        <a href="#" className="nav-link text-white">
          <svg className="bi d-block mx-auto mb-1" width="24" height="24">
            <use xlinkHref="#people-circle"></use>
          </svg>
          Customers
        </a>
      </div>
    </header>
  );
};

export default Headers;