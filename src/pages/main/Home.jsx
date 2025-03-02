import Pages from "../../constants/Pages";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 px-md-5 py-md-4 mb-4 rounded">
      <div className="p-4 p-md-4 mb-3 rounded text-body-emphasis bg-body-secondary">
        <div className="col-lg-6 px-0">
          <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
          <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
        </div>
      </div>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1>Track &amp; Manage Your Stocks</h1>
            <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
            <a className="btn btn-outline-light" type="button" href={Pages.FORECAST}>Predict Stocks</a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary bord ёr rounded-3">
            <h2>Add borders</h2>
            <p>L&apos;orem, ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus. Dolor quam veritatis enim laboriosam autem dolorum ipsum quisquam provident sunt. Nihil impedit voluptas culpa iste repudiandae aperiam fugiat magni.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
