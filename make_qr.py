
import qrcode
url = "https://slick-lands-remain.loca.lt/demo-boda-elegante-oscuro.html"
qr = qrcode.QRCode(version=1, box_size=10, border=4)
qr.add_data(url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("C:/Users/germa/.gemini/antigravity/brain/2c3a9e6b-c352-4151-a10e-e2bc0182afdc/qr_boda_oscura.png")
print("QR generado")

