const Loading = ({ text = "" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex align-items-center gap-2">
        <div className="spinner-border text-primary" role="status"></div>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Loading;
