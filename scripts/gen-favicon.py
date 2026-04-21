#!/usr/bin/env python3
"""Generate a Secbot-themed favicon.ico — rounded green shield with white 'S'."""

import math
from PIL import Image, ImageDraw, ImageFont


def draw_favicon(size: int) -> Image.Image:
    scale = 8
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    margin = round(s * 0.04)
    cx = s / 2

    left = margin
    right = s - margin
    top = margin
    bottom = s - margin
    w = right - left

    # Classic shield: rounded-rect top 55%, then taper to a point at bottom
    split_y = top + (bottom - top) * 0.52
    cr = round(s * 0.12)  # top corner radius

    def build_shield() -> list[tuple[float, float]]:
        pts: list[tuple[float, float]] = []
        # top-left rounded corner
        for i in range(13):
            a = math.pi + (math.pi / 2) * (i / 12)
            pts.append((left + cr + cr * math.cos(a), top + cr + cr * math.sin(a)))
        # top-right rounded corner
        for i in range(13):
            a = -math.pi / 2 + (math.pi / 2) * (i / 12)
            pts.append((right - cr + cr * math.cos(a), top + cr + cr * math.sin(a)))
        # right side down to split
        pts.append((right, split_y))
        # right side -> bottom tip (smooth curve)
        curve_steps = 20
        for i in range(1, curve_steps + 1):
            t = i / curve_steps
            x = right - (right - cx) * t
            # ease-in curve for the taper
            y = split_y + (bottom - split_y) * (1 - (1 - t) ** 2.2)
            pts.append((x, y))
        # bottom tip -> left side
        for i in range(1, curve_steps + 1):
            t = i / curve_steps
            x = cx - (cx - left) * t
            y = bottom - (bottom - split_y) * (1 - (1 - t) ** 2.2)
            pts.append((x, y))
        pts.append((left, split_y))
        return pts

    shield = build_shield()

    # gradient fill
    y_min, y_max = int(top), int(bottom)
    for row in range(y_min, y_max + 1):
        t = (row - y_min) / max(1, y_max - y_min)
        r = int(30 * (1 - t) + 21 * t)
        g = int(165 * (1 - t) + 125 * t)
        b = int(85 * (1 - t) + 66 * t)
        xs: list[float] = []
        n = len(shield)
        for i in range(n):
            x1, y1 = shield[i]
            x2, y2 = shield[(i + 1) % n]
            if (y1 <= row < y2) or (y2 <= row < y1):
                if y2 != y1:
                    xs.append(x1 + (row - y1) / (y2 - y1) * (x2 - x1))
        xs.sort()
        for j in range(0, len(xs) - 1, 2):
            d.line([(int(xs[j]), row), (int(xs[j + 1]), row)], fill=(r, g, b, 255))

    # "S" letter
    font_size = round(s * 0.52)
    font = None
    for name in [
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/SFNSMono.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        try:
            font = ImageFont.truetype(name, font_size)
            break
        except (OSError, IOError):
            continue
    if font is None:
        font = ImageFont.load_default()

    letter = "S"
    bbox = d.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    vis_cy = top + (bottom - top) * 0.42
    tx = cx - tw / 2 - bbox[0]
    ty = vis_cy - th / 2 - bbox[1]

    shd = max(1, round(s * 0.01))
    d.text((tx + shd, ty + shd), letter, fill=(8, 45, 24, 80), font=font)
    d.text((tx, ty), letter, fill=(255, 255, 255, 250), font=font)

    return img.resize((size, size), Image.LANCZOS)


def main():
    import os

    out_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "app",
        "favicon.ico",
    )

    sizes = [16, 32, 48]
    images = [draw_favicon(sz) for sz in sizes]
    images[-1].save(out_path, format="ICO", append_images=images[:-1])
    print(f"Favicon saved to {out_path}  ({', '.join(str(s) for s in sizes)}px)")


if __name__ == "__main__":
    main()
