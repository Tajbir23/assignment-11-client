

const About = () => {
  return (
    <section className="py-12 h-[calc(100vh-75px)] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold ">
            About BookNook
          </h2>
          <p className="mt-4 text-lg sm:text-xl ">
            Welcome to BookNook, your online borrowed library! We're dedicated to providing a vast collection of books for readers of all ages.
          </p>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center md:flex-row md:justify-between">
          <div className="max-w-xs md:w-1/2 mx-auto md:mx-0">
            <img className="h-auto w-full rounded-lg" src="https://i.ibb.co/gvGYmn9/fantasy.jpg" alt="About Us" />
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 text-left max-w-md md:w-1/2">
            <h3 className="text-lg sm:text-xl font-medium ">Our Mission</h3>
            <p className="mt-2 text-base sm:text-lg ">
              At BookNook, we believe in fostering a love for reading by making books accessible to everyone. Our mission is to connect readers with their next great read, whether it's a classic novel or the latest bestseller.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
