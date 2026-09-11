"""Gera todas as imagens do projeto em WebP.

As ilustrações são criadas por código (formas geométricas + granulado),
sem uso de marcas registradas, fotos de terceiros ou links externos.
Rode com:  python3 scripts/gerar_imagens.py
"""
import math
import os
import random
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
os.makedirs(OUT, exist_ok=True)
random.seed(27)


def hx(c):
    c = c.lstrip("#")
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    a, b = hx(a) if isinstance(a, str) else a, hx(b) if isinstance(b, str) else b
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical(size, top, bottom):
    w, h = size
    img = Image.new("RGB", (1, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.point((0, y), fill=mix(top, bottom, y / max(h - 1, 1)))
    return img.resize(size, Image.BILINEAR)


def radial(size, inner, outer, cx=0.5, cy=0.45):
    w, h = size
    small = (max(w // 6, 60), max(h // 6, 60))
    img = Image.new("RGB", small)
    d = ImageDraw.Draw(img)
    sw, sh = small
    maxd = math.hypot(max(cx, 1 - cx) * sw, max(cy, 1 - cy) * sh)
    for y in range(sh):
        for x in range(sw):
            t = min(math.hypot(x - cx * sw, y - cy * sh) / maxd, 1)
            d.point((x, y), fill=mix(inner, outer, t ** 0.9))
    return img.resize(size, Image.BICUBIC)


def grain(img, amount=9):
    n = Image.effect_noise(img.size, 24).convert("L").filter(ImageFilter.GaussianBlur(0.4))
    return Image.blend(img, Image.merge("RGB", (n, n, n)), amount / 100)


def save(img, name, quality=82):
    img = grain(img)
    img.save(os.path.join(OUT, name), "WEBP", quality=quality, method=6)
    print("  ", name, img.size)


# ---------------------------------------------------------------- pizzaria
CRUST = ["#E3B269", "#D9A053", "#E8BE7C"]


def pizza(size, sauce="#B03427", toppings="pepperoni", slices=True):
    w, h = size
    img = radial(size, "#3A2419", "#20140E")
    d = ImageDraw.Draw(img, "RGBA")
    # tábua de madeira
    for i in range(0, w, 46):
        d.rectangle([i, 0, i + 40, h], fill=(0, 0, 0, 26))
    cx, cy, r = w / 2, h / 2, min(w, h) * 0.40
    d.ellipse([cx - r - 8, cy - r + 10, cx + r + 8, cy + r + 18], fill=(0, 0, 0, 70))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=hx(random.choice(CRUST)))
    # bolhas da borda
    for _ in range(26):
        a = random.uniform(0, math.tau)
        rr = r * random.uniform(0.86, 0.96)
        s = r * random.uniform(0.02, 0.05)
        d.ellipse([cx + math.cos(a) * rr - s, cy + math.sin(a) * rr - s,
                   cx + math.cos(a) * rr + s, cy + math.sin(a) * rr + s],
                  fill=(96, 54, 28, 150))
    ir = r * 0.84
    d.ellipse([cx - ir, cy - ir, cx + ir, cy + ir], fill=hx(sauce))
    # queijo
    for _ in range(150):
        a, rr = random.uniform(0, math.tau), ir * math.sqrt(random.random()) * 0.97
        s = ir * random.uniform(0.03, 0.08)
        x, y = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        d.ellipse([x - s, y - s, x + s, y + s], fill=(244, 221, 160, 190))
    pal = {
        "pepperoni": ["#9E2B21", "#8A2019"],
        "calabresa": ["#8E2C22", "#6E2019"],
        "verde": ["#3F6B33", "#4F7C3B"],
        "branca": ["#F0E6CE", "#E4D6B4"],
        "frango": ["#C98B4B", "#B57938"],
        "portuguesa": ["#8E2C22", "#3F6B33", "#F2E7C8", "#E9C96A"],
    }[toppings]
    for _ in range(16):
        a, rr = random.uniform(0, math.tau), ir * math.sqrt(random.random()) * 0.85
        s = ir * random.uniform(0.07, 0.11)
        x, y = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        d.ellipse([x - s, y - s, x + s, y + s], fill=hx(random.choice(pal)))
    for _ in range(9):  # manjericão
        a, rr = random.uniform(0, math.tau), ir * math.sqrt(random.random()) * 0.8
        s = ir * random.uniform(0.04, 0.07)
        x, y = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        d.ellipse([x - s * 1.4, y - s, x + s * 1.4, y + s], fill=(58, 92, 44, 235))
    if slices:
        for i in range(8):
            a = math.tau * i / 8 + 0.2
            d.line([cx, cy, cx + math.cos(a) * ir, cy + math.sin(a) * ir],
                   fill=(120, 72, 40, 70), width=max(2, int(r * 0.012)))
    return img


def copo(size, liquido, espuma=False):
    w, h = size
    img = vertical(size, "#2A1B14", "#170E0A")
    d = ImageDraw.Draw(img, "RGBA")
    cx = w / 2
    top, bot = h * 0.2, h * 0.86
    bw, tw = w * 0.13, w * 0.17
    d.polygon([(cx - tw, top), (cx + tw, top), (cx + bw, bot), (cx - bw, bot)], fill=hx(liquido))
    d.polygon([(cx - tw, top), (cx - tw * 0.6, top), (cx - bw * 0.55, bot), (cx - bw, bot)],
              fill=(255, 255, 255, 38))
    if espuma:
        d.ellipse([cx - tw, top - h * 0.05, cx + tw, top + h * 0.05], fill=(246, 238, 220))
    else:
        d.ellipse([cx - tw, top - h * 0.03, cx + tw, top + h * 0.03], fill=mix(liquido, "#FFFFFF", .25))
    d.ellipse([cx - bw * 1.5, bot - h * 0.02, cx + bw * 1.5, bot + h * 0.03], fill=(0, 0, 0, 90))
    return img


def doce(size, base, cobertura):
    w, h = size
    img = radial(size, "#332018", "#1C1210")
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy = w / 2, h * 0.58
    d.ellipse([cx - w * .3, cy + h * .1, cx + w * .3, cy + h * .2], fill=(0, 0, 0, 80))
    d.rounded_rectangle([cx - w * .24, cy - h * .18, cx + w * .24, cy + h * .16], radius=w * .03,
                        fill=hx(base))
    d.rounded_rectangle([cx - w * .24, cy - h * .22, cx + w * .24, cy - h * .06], radius=w * .03,
                        fill=hx(cobertura))
    for i in range(7):
        x = cx - w * .2 + i * w * .066
        d.ellipse([x - w * .02, cy - h * .26, x + w * .02, cy - h * .2], fill=mix(cobertura, "#FFFFFF", .3))
    return img


# ---------------------------------------------------------------- veículos
def carro(size, corpo, fundo_top, fundo_bot, tipo="sedan", ang=0):
    w, h = size
    img = vertical(size, fundo_top, fundo_bot)
    d = ImageDraw.Draw(img, "RGBA")
    # piso
    d.rectangle([0, h * 0.72, w, h], fill=mix(fundo_bot, "#000000", .18))
    cx, cy = w * 0.5, h * 0.60
    L, H = w * 0.40, h * 0.13
    if tipo == "suv":
        H *= 1.22
    if tipo == "hatch":
        L *= 0.90
    d.ellipse([cx - L * 1.05, cy + H * 0.85, cx + L * 1.05, cy + H * 1.5], fill=(0, 0, 0, 60))
    teto = 0.50 if tipo != "suv" else 0.58
    body = [
        (cx - L, cy + H * .45), (cx - L * .97, cy - H * .05), (cx - L * .62, cy - H * .2),
        (cx - L * .38, cy - H * teto * 1.7), (cx + L * .18, cy - H * teto * 1.75),
        (cx + L * .62, cy - H * .22), (cx + L * .98, cy - H * .02), (cx + L, cy + H * .45),
    ]
    if ang:  # leve variação de enquadramento
        body = [(x + ang * w * .01, y) for x, y in body]
    d.polygon(body, fill=hx(corpo))
    glass = [(cx - L * .34, cy - H * teto * 1.55), (cx + L * .14, cy - H * teto * 1.6),
             (cx + L * .5, cy - H * .22), (cx - L * .56, cy - H * .2)]
    d.polygon(glass, fill=mix(fundo_top, "#0B1220", .55))
    d.polygon([(cx - L * .08, cy - H * teto * 1.58), (cx - L * .02, cy - H * teto * 1.58),
               (cx + L * .2, cy - H * .21), (cx + L * .13, cy - H * .21)], fill=(255, 255, 255, 45))
    d.line([(cx - L * .95, cy + H * .12), (cx + L * .95, cy + H * .1)], fill=(255, 255, 255, 55), width=3)
    for rx in (cx - L * .58, cx + L * .58):
        d.ellipse([rx - H * .58, cy + H * .05, rx + H * .58, cy + H * 1.2], fill=(22, 22, 24))
        d.ellipse([rx - H * .28, cy + H * .35, rx + H * .28, cy + H * .9], fill=(176, 180, 186))
    d.rounded_rectangle([cx + L * .82, cy - H * .05, cx + L * .99, cy + H * .12], radius=6,
                        fill=(246, 244, 236, 230))
    d.rounded_rectangle([cx - L * .99, cy - H * .03, cx - L * .84, cy + H * .12], radius=6,
                        fill=(190, 60, 48, 220))
    return img


# ---------------------------------------------------------------- retratos
def retrato(size, fundo, tom, roupa):
    w, h = size
    img = vertical(size, fundo, mix(fundo, "#000000", .35))
    d = ImageDraw.Draw(img, "RGBA")
    cx = w * .5
    d.ellipse([cx - w * .42, h * .62, cx + w * .42, h * 1.5], fill=hx(roupa))
    d.rectangle([cx - w * .09, h * .42, cx + w * .09, h * .68], fill=mix(tom, "#000000", .12))
    d.ellipse([cx - w * .17, h * .17, cx + w * .17, h * .55], fill=hx(tom))
    d.chord([cx - w * .18, h * .12, cx + w * .18, h * .42], 180, 360, fill=mix(tom, "#1A1A1A", .78))
    d.ellipse([cx - w * .15, h * .34, cx + w * .15, h * .53], fill=mix(tom, "#2A1B12", .5))  # barba
    d.ellipse([cx - w * .17, h * .3, cx - w * .05, h * .38], fill=(0, 0, 0, 30))
    d.ellipse([cx + w * .05, h * .3, cx + w * .17, h * .38], fill=(0, 0, 0, 30))
    return img


# ---------------------------------------------------------------- cenas
def cena_corte(size, base, luz):
    w, h = size
    img = radial(size, luz, base, cx=.38, cy=.3)
    d = ImageDraw.Draw(img, "RGBA")
    for i in range(6):
        x = w * (.08 + i * .17)
        d.rounded_rectangle([x, h * (.2 + .05 * (i % 3)), x + w * .11, h * .95], radius=w * .02,
                            fill=(255, 255, 255, 12 + i * 4))
    d.ellipse([w * .58, h * .12, w * .92, h * .52], fill=mix(base, luz, .5))
    d.line([(w * .1, h * .78), (w * .95, h * .72)], fill=mix(base, "#FFFFFF", .22), width=max(3, w // 200))
    return img


def cena_escritorio(size, base, luz, dourado="#B99349"):
    w, h = size
    img = vertical(size, luz, base)
    d = ImageDraw.Draw(img, "RGBA")
    for i in range(4):  # janelas
        x = w * (.06 + i * .16)
        d.rectangle([x, h * .1, x + w * .1, h * .66], fill=(255, 255, 255, 26))
    d.rectangle([0, h * .68, w, h * .72], fill=hx(dourado))
    d.rounded_rectangle([w * .12, h * .72, w * .88, h * .84], radius=w * .012, fill=mix(base, "#000000", .3))
    for x in (w * .2, w * .8):
        d.rectangle([x - w * .01, h * .84, x + w * .01, h * .96], fill=mix(base, "#000000", .45))
    return img


def cena_showroom(size, base, luz, destaque="#1F3D73"):
    w, h = size
    img = vertical(size, luz, base)
    d = ImageDraw.Draw(img, "RGBA")
    d.rectangle([0, h * .62, w, h], fill=mix(base, "#000000", .25))
    for i in range(5):
        d.ellipse([w * (.05 + i * .2), h * .02, w * (.16 + i * .2), h * .1], fill=(255, 255, 255, 30))
    car = carro((int(w * .8), int(h * .8)), destaque, luz, base, "sedan")
    img.paste(car.resize((int(w * .78), int(h * .72))), (int(w * .11), int(h * .24)))
    return img


def cena_forno(size):
    w, h = size
    img = radial(size, "#8A3A1E", "#1B0F0A", cx=.62, cy=.55)
    d = ImageDraw.Draw(img, "RGBA")
    d.ellipse([w * .38, h * .22, w * .92, h * .86], fill=(30, 16, 12))
    d.ellipse([w * .45, h * .32, w * .85, h * .78], fill=(214, 96, 34))
    d.ellipse([w * .52, h * .42, w * .78, h * .72], fill=(246, 190, 84))
    for i in range(0, int(w * .36), 30):
        d.rectangle([i, 0, i + 22, h], fill=(0, 0, 0, 30))
    return img


def mapa(size, base, linha, pin):
    w, h = size
    img = Image.new("RGB", size, hx(base))
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, w, int(w / 9)):
        d.rectangle([x, 0, x + 6, h], fill=hx(linha))
    for y in range(0, h, int(h / 5)):
        d.rectangle([0, y, w, y + 6], fill=hx(linha))
    d.line([(0, h * .78), (w, h * .2)], fill=mix(linha, "#FFFFFF", .25), width=14)
    cx, cy = w * .5, h * .46
    d.ellipse([cx - 26, cy - 34, cx + 26, cy + 18], fill=hx(pin))
    d.polygon([(cx - 14, cy + 8), (cx + 14, cy + 8), (cx, cy + 40)], fill=hx(pin))
    d.ellipse([cx - 9, cy - 17, cx + 9, cy + 1], fill=hx(base))
    return img


def painel_editorial(size, a, b, c):
    """Composição abstrata usada em capas e aberturas."""
    w, h = size
    img = vertical(size, a, b)
    d = ImageDraw.Draw(img, "RGBA")
    d.ellipse([-w * .1, h * .3, w * .55, h * 1.3], fill=hx(c))
    d.rounded_rectangle([w * .52, h * .12, w * .95, h * .78], radius=w * .04, fill=(255, 255, 255, 30))
    d.line([(0, h * .82), (w, h * .74)], fill=mix(c, "#FFFFFF", .4), width=max(2, w // 260))
    return img


print("Gerando imagens…")

# Capas dos modelos + aberturas
save(painel_editorial((1200, 800), "#7E1F17", "#33110C", "#D9A053"), "capa-forno27.webp")
save(painel_editorial((1200, 800), "#1A1A18", "#0B0B0A", "#A66A3A"), "capa-distrito13.webp")
save(painel_editorial((1200, 800), "#123F34", "#0B241F", "#B99349"), "capa-aurea.webp")
save(painel_editorial((1200, 800), "#2B3138", "#14181C", "#1F3D73"), "capa-linhanorte.webp")
save(painel_editorial((1200, 630), "#F6F2EA", "#E6DECE", "#4B5B3C"), "og-ramblas.webp")

save(cena_forno((1600, 900)), "hero-pizzaria.webp")
save(cena_corte((1600, 900), "#121210", "#8A5A32"), "hero-barbearia.webp")
save(cena_escritorio((1600, 900), "#0E2E27", "#F4EFE3"), "hero-escritorio.webp")
save(cena_showroom((1600, 900), "#20252B", "#F2F4F6"), "hero-concessionaria.webp")

# Pizzas e demais itens do cardápio
for nome, sauce, top in [
    ("margherita", "#B03427", "verde"),
    ("calabresa", "#A32F23", "calabresa"),
    ("portuguesa", "#AE3526", "portuguesa"),
    ("quatro-queijos", "#C9A96B", "branca"),
    ("frango-catupiry", "#B4462F", "frango"),
    ("pepperoni", "#A82D22", "pepperoni"),
    ("vegetariana", "#A93A2A", "verde"),
    ("doce-chocolate", "#5B3220", "branca"),
]:
    save(pizza((800, 800), sauce, top), f"pizza-{nome}.webp")

save(copo((800, 800), "#3A1E14"), "bebida-refrigerante.webp")
save(copo((800, 800), "#C8761F"), "bebida-suco.webp")
save(copo((800, 800), "#C08A22", espuma=True), "bebida-cerveja.webp")
save(copo((800, 800), "#7FA0B8"), "bebida-agua.webp")
save(doce((800, 800), "#4A2A18", "#6B3B22"), "sobremesa-brownie.webp")
save(doce((800, 800), "#E8D9B5", "#B8422F"), "sobremesa-petit.webp")
save(mapa((1200, 620), "#F3EADB", "#E0D2BA", "#8E2C22"), "mapa-pizzaria.webp")

# Barbearia
for i, (fundo, tom, roupa) in enumerate([
    ("#1C1C1A", "#C69A73", "#2E3A2C"),
    ("#22201C", "#8A6244", "#1A1A1A"),
    ("#1A1D1A", "#E0B894", "#5A3A24"),
], start=1):
    save(retrato((700, 700), fundo, tom, roupa), f"barbeiro-{i}.webp")
for i in range(1, 7):
    save(cena_corte((800, 800), ["#141312", "#1B1815", "#101312"][i % 3],
                    ["#8A5A32", "#6B7A5A", "#A6764A"][i % 3]), f"barbearia-galeria-{i}.webp")
save(mapa((1200, 620), "#1A1917", "#26241F", "#A66A3A"), "mapa-barbearia.webp")

# Escritório
for i, (fundo, tom, roupa) in enumerate([
    ("#123F34", "#D8B492", "#1B2A3F"),
    ("#15433A", "#9C7250", "#22303F"),
    ("#0F3A31", "#EAC9A6", "#2B3A2E"),
    ("#124038", "#B98E68", "#1E2B3A"),
], start=1):
    save(retrato((700, 700), fundo, tom, roupa), f"aurea-equipe-{i}.webp")
for i, cor in enumerate(["#123F34", "#1B2A3F", "#7A5C2E"], start=1):
    save(painel_editorial((1000, 620), cor, mix(cor, "#000000", .5), "#B99349"), f"aurea-artigo-{i}.webp")
save(cena_escritorio((1200, 800), "#123F34", "#F4EFE3"), "aurea-sobre.webp")
save(mapa((1200, 620), "#F4EFE3", "#E4DAC6", "#123F34"), "mapa-escritorio.webp")

# Concessionária
veiculos = [
    ("sedan-prata", "#C9CDD2", "sedan"),
    ("suv-azul", "#20477F", "suv"),
    ("hatch-branco", "#EDEFF1", "hatch"),
    ("sedan-grafite", "#3A3F45", "sedan"),
    ("suv-preto", "#191B1E", "suv"),
    ("hatch-vermelho", "#8E2C22", "hatch"),
    ("sedan-azul", "#2C3E5C", "sedan"),
    ("suv-prata", "#B6BCC2", "suv"),
]
for nome, cor, tipo in veiculos:
    for k, ang in enumerate([0, -1.2, 1.4], start=1):
        save(carro((1200, 800), cor, "#F2F4F6", "#D7DBE0", tipo, ang), f"veiculo-{nome}-{k}.webp")
save(mapa((1200, 620), "#EDEFF2", "#DCE0E6", "#1F3D73"), "mapa-concessionaria.webp")

print("Concluído.")
