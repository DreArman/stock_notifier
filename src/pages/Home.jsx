import Pages from "../constants/Pages";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 px-md-5 py-md-4 mb-4 rounded">
      <div className="p-4 p-md-4 mb-3 rounded text-body-emphasis border bg-body-secondary">
        <div className="col-lg-6 px-0">
          <h1 className="display-4 fst-italic">Welcome to DDDream&apos;s Stock Notifier</h1>
          <p className="lead my-3">
            Stay in control of your investments with Telegram alerts.
            Get forecasts, price signals, powered by technical and fundamental analysis.
          </p>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1>Track &amp; Analyze Stocks</h1>
            <p>
              Monitor stock performance and trends with our advanced tools. 
              Our platform integrates both <strong>technical analysis</strong> (chart patterns, indicators, price momentum) 
              and <strong>fundamental analysis</strong> (financial reports, earnings, ratios) to give you a 360° market view. 
              Stay ahead of the curve by spotting opportunities before they surface.
            </p>
            <a className="btn btn-outline-light" type="button" href={Pages.FORECAST}>
              Forecast Stocks
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Get Alerts</h2>
            <p>
              Receive timely, personalized alerts about stock price changes, market news, and earnings updates — 
              directly in your <strong>Telegram</strong>. 
              Set your own thresholds, customize your watchlist, and let our smart notification engine work for you. 
              Whether you&apos;re a day trader or a long-term investor, you&apos;ll never miss a key event again.
            </p>
            <a className="btn btn-outline-light" type="button" href={Pages.STOCK_ALERTS}>
              Stock Alerts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
