import Pages from "../constants/Pages";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 px-md-5 py-md-4 mb-4 rounded">
      <div className="p-4 p-md-4 mb-3 rounded text-body-emphasis border bg-body-secondary">
        <div className="col-lg-6 px-0">
          <h1 className="display-4 fst-italic">Welcome to DDDream&apos;s Stock Notifier</h1>
          <p className="lead my-3">
            Take control of your investments with AI forecasts and Telegram alerts. 
            Get updates on your stock performance, monitor profits, and receive smart predictions — all in one place.
          </p>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1>Track Your Portfolio</h1>
            <p>
              Keep an eye on your personal stock collection. 
              Our platform helps you track performance, view daily price data, and calculate profits. 
              Everything is synced with your profile so you stay informed at every step.
            </p>
            <a className="btn btn-outline-light" type="button" href={Pages.STOCKS}>
              My Stocks
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Get Telegram Alerts</h2>
            <p>
              Receive personalized stock notifications directly in <strong>Telegram</strong>. 
              Set alerts for price changes, profits, or forecast updates. 
              Once your account is linked, our system will notify you automatically — no extra steps needed.
            </p>
            <a className="btn btn-outline-light" type="button" href={Pages.STOCK_ALERTS}>
              Manage Alerts
            </a>
          </div>
        </div>

        <div className="col-md-12 mt-4">
          <div className="h-100 p-5 bg-body-secondary border rounded-3">
            <h2>AI Forecasting</h2>
            <p>
              Use our integrated GPT model to forecast stock prices for the next week, month, or year. 
              Each prediction includes estimated values and a confidence level, helping you make data-driven decisions for future investments.
            </p>
            <a className="btn btn-outline-light" type="button" href={Pages.FORECAST}>
              View Forecasts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
