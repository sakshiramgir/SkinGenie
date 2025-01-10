import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";

const WelcomePage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    skinType: "",
    skinConcerns: [],
  });

  const navigate = useNavigate();

  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

  const steps = [
    {
      label: "Name",
      content: (
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
          required
        />
      ),
    },
    {
      label: "Age",
      content: (
        <input
          type="number"
          id="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
          required
        />
      ),
    },
    {
      label: "Gender",
      content: (
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      ),
    },
    {
      label: "Skin Type",
      content: (
        <select
          id="skinType"
          value={formData.skinType}
          onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
        >
          <option value="">Select Skin Type</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="combination">Combination</option>
          <option value="sensitive">Sensitive</option>
        </select>
      ),
    },
    {
      label: "Skin Concerns",
      content: (
        <div className="overflow-y-auto max-h-40 space-y-2">
          {[
            "Acne-Free",
            "Anti-Aging",
            "Balancing",
            "Black-Spot",
            "Brightening",
            "Hydrating",
            "Moisturizing",
            "No-Whitecast",
            "Oil-Control",
            "Pore-Care",
            "Refreshing",
            "Skin-Barrier",
            "Soothing",
            "UV-Protection",
          ].map((concern) => (
            <label key={concern} className="flex items-center">
              <input
                type="checkbox"
                value={concern}
                checked={formData.skinConcerns.includes(concern)}
                onChange={(e) => {
                  const concerns = formData.skinConcerns.includes(concern)
                    ? formData.skinConcerns.filter((item) => item !== concern)
                    : [...formData.skinConcerns, concern];
                  setFormData({ ...formData, skinConcerns: concerns });
                }}
                className="mr-2 accent-pink-500"
              />
              {concern}
            </label>
          ))}
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.age || !formData.gender || !formData.skinType) {
      alert("Please complete all required fields before proceeding!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skintype: formData.skinType,
          notable_effects: formData.skinConcerns,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result); // Debugging log

      if (response.ok) {
        navigate("/routine", {
          state: {
            name: formData.name,
            morning: result.routines.morning_routine,
            evening: result.routines.evening_routine,
          },
        });
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to fetch recommendations. Please try again later.");
    }
  };
  return (
    <div className={`bg-pink-50 min-h-screen relative font-sans ${formVisible ? "backdrop-blur-md" : ""}`}>
      <div
        className="absolute top-0 left-0 right-0 flex justify-center gap-4 p-4 bg-pink-100"
        style={{ height: "50vh" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-cover bg-center rounded-lg shadow-lg"
            style={{
              height: `${Math.floor(Math.random() * 150) + 150}px`,
              width: "12%",
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
      </div>

      {!formVisible && (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div
            className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md backdrop-blur-md bg-opacity-60"
            style={{ background: "rgba(255, 255, 255, 0.6)" }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to SkinGenie</h1>
            <p className="text-gray-600 mb-6">
              We are excited to help you discover your personalized skincare routine.
            </p>
            <button
              onClick={() => setFormVisible(true)}
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
            >
              Let’s Get to Know Your Skin
            </button>
          </div>
        </div>
      )}

      {formVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white shadow-lg rounded-lg px-8 py-16 max-w-2xl w-full relative h-[80vh] backdrop-blur-md bg-opacity-80">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentStep ? "bg-pink-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 text-3xl font-bold"
            >
              ←
            </button>

            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {steps[currentStep].label}
              </h2>
              <div className="mb-6 w-full max-w-sm">{steps[currentStep].content}</div>
            </div>

            <div className="absolute bottom-4 right-4">
              {currentStep < steps.length -        1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
                  }
                  className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
