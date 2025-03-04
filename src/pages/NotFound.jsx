const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
