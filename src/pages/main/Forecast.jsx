const Forecast = () => {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center p-8">
        <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1>Track &amp; Manage Your Stocks</h1>
            <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
            <button className="btn btn-outline-light" type="button">Example button</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Add borders</h2>
            <p>L&apos;orem, ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus. Dolor quam veritatis enim laboriosam autem dolorum ipsum quisquam provident sunt. Nihil impedit voluptas culpa iste repudiandae aperiam fugiat magni.</p>
            <button className="btn btn-outline-secondary" type="button">Example button</button>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Forecast;
  