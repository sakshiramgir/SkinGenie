import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const RoutinePage = () => {
  // Access data passed from the WelcomePage via the state object
  const location = useLocation();
  const { state } = location;
  const { name = "Guest", morning = {}, evening = {} } = state || {};

  console.log("State in RoutinePage:", state); // Debugging log

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
  
    doc.setFontSize(18);
    doc.text("Your Personalized Skincare Routine", 10, y);
    y += 10;
  
    doc.setFontSize(14);
    doc.text("Morning Routine:", 10, y);
    y += 10;
  
    Object.keys(morning).forEach((step) => {
      doc.text(`${step}:`, 10, y); // Corrected syntax
      y += 10;
      morning[step].forEach((product) => {
        doc.text(`- ${product}`, 10, y); // Corrected syntax
        y += 10;
      });
    });
  
    y += 10;
    doc.text("Evening Routine:", 10, y);
    y += 10;
  
    Object.keys(evening).forEach((step) => {
      doc.text(`${step}:`, 10, y); // Corrected syntax
      y += 10;
      evening[step].forEach((product) => {
        doc.text(`- ${product}`, 10, y); // Corrected syntax
        y += 10;
      });
    });
  
    doc.save("Skincare_Routine.pdf"); // Save the PDF
  };
  
  return (
    <div className="bg-pink-50 min-h-screen font-sans flex items-center justify-center px-4 py-10">
      {/* Routine Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Personalized Routine</h1>
          <p className="text-gray-600 mt-2">
            Based on your inputs, we’ve curated a personalized routine for you, {name}.
          </p>
        </header>

        {/* Morning and Evening Routines Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Morning Routine */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Morning Routine</h2>
            <div className="space-y-4">
              {Object.keys(morning).length > 0 ? (
                Object.keys(morning).map((step) => (
                  <div key={step}>
                    <h3 className="text-xl font-bold text-gray-800">{step}</h3>
                    {morning[step].length > 0 ? (
                      morning[step].map((product, index) => (
                        <p key={index} className="text-gray-600">
                          - {product}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500">No product available for this step.</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No morning routine available.</p>
              )}
            </div>
          </section>

          {/* Evening Routine */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evening Routine</h2>
            <div className="space-y-4">
              {Object.keys(evening).length > 0 ? (
                Object.keys(evening).map((step) => (
                  <div key={step}>
                    <h3 className="text-xl font-bold text-gray-800">{step}</h3>
                    {evening[step].length > 0 ? (
                      evening[step].map((product, index) => (
                        <p key={index} className="text-gray-600">
                          - {product}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500">No product available for this step.</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No evening routine available.</p>
              )}
            </div>
          </section>
        </div>
        {/* Download Button */}
<div className="mt-12 text-center">
  <button
    onClick={generatePDF} // Use the correct function name here
    className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
  >
    Download Routine
  </button>
</div>

      </div>
    </div>
  );
};

export default RoutinePage;