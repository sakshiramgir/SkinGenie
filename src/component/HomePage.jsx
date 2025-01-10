import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useUser, UserButton } from "@clerk/clerk-react"; // Import UserButton
import BANNER from "../assets/BANNER.jpg";
import image1 from "../assets/cleanser.jpg";
import image2 from "../assets/cream.jpg";
import image3 from "../assets/eyecream.jpg";
import image4 from "../assets/lip.jpg";
import image5 from "../assets/scrub.jpg";
import image6 from "../assets/toner.jpg";
import image7 from "../assets/moisturizer.jpg";
import image8 from "../assets/serum.jpg";
import image9 from "../assets/sunscreen.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/welcome");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Title */}
        <div className="text-2xl font-semibold text-gray-800">SkinGenie</div>

        {/* Conditional Navbar for Signed-In Users */}
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <span className="text-gray-800 font-semibold">
                Welcome, {user?.firstName || "User"}!
              </span>
              <button
                onClick={() => navigate("/routine")}
                className="px-4 py-2 bg-gray-100 text-pink-500 font-semibold rounded-full hover:bg-gray-200"
              >
                My Routine
              </button>
              <UserButton
                afterSignOutUrl="/" // Redirect to homepage after sign out
              />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 bg-gray-100 text-pink-500 font-semibold rounded-full hover:bg-gray-200"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-200 flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BANNER})` }}
        ></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold">Healthy skin is the best foundation</h1>
          <p className="mt-4 text-lg">Your skin is unique. It deserves personalized care.</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </section>
      {/* Why SkinGenie Section */}
      <section className="py-12 px-6 text-center bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Why SkinGenie?</h2>
        <p className="mt-4 text-gray-600">
          We’re here to help you achieve your skin goals and make a positive impact on the world.
        </p>
      </section>

      {/* How it Works Section */}
      <section className="py-12 px-6 bg-pink-50">
        <h2 className="text-2xl font-bold text-center text-gray-800">How it works</h2>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          We’ll start with the basics: a cleanser, moisturizer, and SPF. Then, we’ll add in treatments
          like serums and masks to address specific concerns. As your skin changes, so will your
          formula.
        </p>

        {/* Carousel */}
        <div className="mt-8">
          <Slider {...settings}>
            <div className="px-2">
              <img src={image1} alt="Cleanser" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image2} alt="Cream" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image3} alt="Eye Cream" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image4} alt="Lip Balm" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image5} alt="Scrub" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image6} alt="Toner" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image7} alt="Mask" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image8} alt="Serum" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
            <div className="px-2">
              <img src={image9} alt="SPF" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>
          </Slider>
        </div>
      </section>

      {/* Get Started Button */}
      <div className="flex items-center justify-center bg-pink-50 py-8">
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
        >
          Get Started
        </button>
      </div>

      {/* Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {/* About Us Card */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg text-gray-600">About Us</h2>
            <p className="mt-4 text-gray-800 text-lg">
              We are Mohit, Sakshi, and Harsh — final-year students striving to make our mark in the
              tech world. Our expertise includes Android and cross-platform app development, Machine Leaning/Artificial Intelligence as well
              as MERN projects. We're passionate about building solutions that make a difference.
            </p>
          </div>

          {/* Contact Us Card */}
          <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <h2 className="text-lg text-gray-600">Contact Us</h2>
            <p className="mt-4 text-gray-800 text-lg">
              Have a question or a project in mind? Let's connect and collaborate.
            </p>
            <button
              onClick={() =>
                window.location.href = "mailto:candocoders@gmail.com?subject=Let's%20Collaborate"
              }
              className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Email Us →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;