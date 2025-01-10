from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation import recommend_routines
from pdf_generator import generate_pdf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://skin-genie-kappa.vercel.app"]}})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Backend is live!"}), 200

@app.route('/recommend', methods=['POST', 'OPTIONS'])
def recommend():
    try:
        if request.method == 'OPTIONS':
            return '', 200

        data = request.json
        skin_type = data.get("skintype")
        concerns = data.get("notable_effects")

        if not skin_type or not concerns:
            return jsonify({"error": "Missing required fields"}), 400

        routines = recommend_routines(skin_type, concerns)

        try:
            pdf_path = generate_pdf(routines)
            app.logger.info(f"PDF generated at {pdf_path}")
        except Exception as e:
            app.logger.warning(f"PDF Generation Error: {e}")

        return jsonify({
            "message": "Recommendations generated successfully!",
            "routines": routines
        }), 200
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)  # Debug disabled for production
