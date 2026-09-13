"""Cria versões menores (-480 e -800) de cada imagem WebP.

Rode depois de gerar_imagens.py:
    python3 scripts/variantes_imagens.py
"""
import os
from PIL import Image

PASTA = os.path.join(os.path.dirname(__file__), "..", "public", "img")
LARGURAS = (480, 800)

originais = [f for f in sorted(os.listdir(PASTA)) if f.endswith(".webp") and "-480" not in f and "-800" not in f]

for nome in originais:
    caminho = os.path.join(PASTA, nome)
    with Image.open(caminho) as im:
        im = im.convert("RGB")
        base = nome[:-5]
        for largura in LARGURAS:
            if im.width < largura:
                continue
            altura = round(im.height * largura / im.width)
            saida = os.path.join(PASTA, f"{base}-{largura}.webp")
            im.resize((largura, altura), Image.LANCZOS).save(saida, "WEBP", quality=76, method=6)
total = sum(os.path.getsize(os.path.join(PASTA, f)) for f in os.listdir(PASTA))
print(f"{len(os.listdir(PASTA))} arquivos, {total/1024:.0f} KB no total")
