

const Subscribe = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Subscribe and be a part of Book Nook and get exciting offers!</h1>
      <form className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
          type="email"
          placeholder="Enter your email"
        />
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
