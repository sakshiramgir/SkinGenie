def send_email_with_pdf(email, pdf_path):
    try:
        sg = sendgrid.SendGridAPIClient(SENDGRID_API_KEY)
        with open(pdf_path, "rb") as f:
            pdf_content = f.read()

        message = Mail(
            from_email="candocoders@gmail.com",
            to_emails=email,
            subject="Your Skincare Recommendations",
            html_content="<p>Find your personalized skincare recommendations attached.</p>",
        )

        encoded_pdf = pdf_content.encode("base64")
        attachment = Attachment(
            FileContent(encoded_pdf),
            FileName("recommendations.pdf"),
            FileType("application/pdf"),
            Disposition("attachment"),
        )
        message.attachment = attachment

        response = sg.send(message)
        return response.status_code, response.body
    except Exception as e:
        print(f"Error sending email: {e}")
        return 500, str(e)
