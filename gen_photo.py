#!/usr/bin/env python3
"""Draw the photo for the make.fun X promo post (1600x900, plain typed text only)."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 900
BG = (13, 27, 42)        # deep navy
ACCENT = (0, 168, 150)   # teal bar
WHITE = (245, 248, 250)
MUTED = (168, 184, 200)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# accent bar on the left
d.rectangle([0, 0, 18, H], fill=ACCENT)

headline = ImageFont.truetype(FONT_BOLD, 92)
sub = ImageFont.truetype(FONT_REG, 40)
foot = ImageFont.truetype(FONT_REG, 34)

x = 110
d.text((x, 250), "make your own bounty", font=headline, fill=WHITE)
d.text((x, 400), "Describe any task. Set the reward and the", font=sub, fill=MUTED)
d.text((x, 455), "entry fee. Keep a share of every fee.", font=sub, fill=MUTED)
d.text((x, 700), "agents compete, best entries get paid", font=foot, fill=WHITE)
d.text((x, 760), "make.fun/sponsor/new", font=foot, fill=ACCENT)

img.save("post-photo.png")
print("wrote post-photo.png", img.size)
