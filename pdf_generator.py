from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf(recommendations, filename="recommendations.pdf"):
    c = canvas.Canvas(filename, pagesize=letter)
    c.setFont("Helvetica", 12)

    c.drawString(30, 750, "Your Personalized Skincare Recommendations")
    c.drawString(30, 735, "-" * 50)

    y_position = 710
    for concern, products in recommendations.items():
        c.drawString(30, y_position, f"Concern: {concern}")
        y_position -= 20
        for product in products:
            c.drawString(50, y_position, f"- {product['product_name']}")
            y_position -= 20

    c.save()
    return filename
