from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation import recommend_routines  # Your recommendation logic
from pdf_generator import generate_pdf  # Optional: PDF generation

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://skin-genie-kappa.vercel.app/"}})  # Enable CORS for all routes

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get data from the request
        data = request.json
        skin_type = data.get("skintype")
        concerns = data.get("notable_effects")

        # Validate inputs
        if not skin_type or not concerns:
            return jsonify({"error": "Missing required fields"}), 400

        # Generate morning and evening routines
        routines = recommend_routines(skin_type, concerns)

        # Optional: Generate PDF
        try:
            pdf_path = generate_pdf(routines)  # Generate PDF
            print(f"PDF generated at {pdf_path}")
        except Exception as e:
            print(f"PDF Generation Error: {e}")

        # Return routines in JSON
        return jsonify({
            "message": "Recommendations generated successfully!",
            "routines": routines
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing your request"}), 500


if __name__ == '__main__':
    app.run()
