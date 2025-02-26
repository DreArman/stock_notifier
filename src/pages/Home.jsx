const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8">
      <div className="md:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4">
          Track &amp; Manage Your Stocks
        </h1>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet et delectus accommodare his consul
          copiosae legendos at vix ad putent delectus delicata usu. Vidit
          dissentiet eos cu eum an brute copiosae hendrerit.
        </p>
        <button className="px-4 py-2 border border-gray-800 rounded">
          Get Started
        </button>
        <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
          <img
            alt="Placeholder image representing stock management"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/PvmR_GHo38yHo706v353t_6DboFYTg1eiIyzluupJBE.jpg"
            width="100"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
