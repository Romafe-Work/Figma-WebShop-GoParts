# -*- coding: utf-8 -*-
import math, os

OUT = "/home/tguedes/projects/romafe-entrada-ui"

# ---------- tokens (manual de UI Romafe) ----------
NAVY      = "#012338"   # 02 §1.1 superficie invertida
BLUE      = "#00537e"   # azul da marca
BLUE_FOCUS= "#1e8bcb"
ORANGE    = "#ef7b10"   # 02 §1 laranja da marca
ORANGE_DN = "#d86c01"
RED       = "#cf372d"
WORDMARK  = "#1b62b7"   # azul do logotipo
INK       = "#0b0b0b"
INK_2     = "#52514e"
INK_3     = "#6b6e74"
BORDER    = "#cbdcf0"
FIELD_BG  = "#eaf2fb"
NEUTRAL   = "#eceff3"
HAIRLINE  = "#e6e8ec"
WHITE     = "#ffffff"
ON_NAVY   = "#cfe0f2"

F_T = "Jost"   # titulos
F_B = "Lato"   # corpo

def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

def txt(x, y, s, size=13, weight=400, fill=INK, font=F_B, anchor="start", ls=None, op=None):
    a = ' text-anchor="%s"' % anchor if anchor != "start" else ""
    l = ' letter-spacing="%s"' % ls if ls else ""
    o = ' opacity="%s"' % op if op else ""
    return ('<text x="%g" y="%g" font-family="%s" font-size="%g" font-weight="%d" '
            'fill="%s"%s%s%s xml:space="preserve">%s</text>' % (x, y, font, size, weight, fill, a, l, o, esc(s)))

def rect(x, y, w, h, fill="none", rx=0, stroke=None, sw=1, op=None, extra=""):
    s = ' stroke="%s" stroke-width="%g"' % (stroke, sw) if stroke else ""
    o = ' opacity="%s"' % op if op else ""
    r = ' rx="%g"' % rx if rx else ""
    return '<rect x="%g" y="%g" width="%g" height="%g"%s fill="%s"%s%s%s/>' % (x, y, w, h, r, fill, s, o, extra)

def line(x1, y1, x2, y2, stroke, sw=1, op=None):
    o = ' opacity="%s"' % op if op else ""
    return '<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="%g"%s/>' % (x1, y1, x2, y2, stroke, sw, o)

def g(name, body, transform=None):
    t = ' transform="%s"' % transform if transform else ""
    return '<g id="%s"%s>\n%s\n</g>' % (esc(name), t, "\n".join(body))

# ---------- icones 24x24, traco 2 ----------
def _ico(name, paths, x, y, size=24, color=INK, sw=2, fills=None):
    s = size / 24.0
    body = ['<g fill="none" stroke="%s" stroke-width="%g" stroke-linecap="round" stroke-linejoin="round">' % (color, sw / s)]
    body += paths
    body.append('</g>')
    if fills:
        body.append('<g fill="%s" stroke="none">' % color)
        body += fills
        body.append('</g>')
    return g("Ícone / " + name, body, "translate(%g %g) scale(%g)" % (x, y, s))

def ico_user(x, y, **k):
    return _ico("Utilizador", ['<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>',
                               '<circle cx="12" cy="7" r="4"/>'], x, y, **k)

def ico_lock(x, y, **k):
    return _ico("Cadeado", ['<rect x="3" y="11" width="18" height="11" rx="2"/>',
                            '<path d="M7 11V7a5 5 0 0 1 10 0v4"/>'], x, y, **k)

def ico_eye(x, y, **k):
    return _ico("Olho", ['<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/>',
                         '<circle cx="12" cy="12" r="3"/>'], x, y, **k)

def ico_globe(x, y, **k):
    return _ico("Globo", ['<circle cx="12" cy="12" r="10"/>', '<path d="M2 12h20"/>',
                          '<path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z"/>'], x, y, **k)

def ico_chevron(x, y, **k):
    return _ico("Seta para baixo", ['<path d="M6 9l6 6 6-6"/>'], x, y, **k)

def ico_login(x, y, **k):
    return _ico("Entrar", ['<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
                           '<path d="M10 17l5-5-5-5"/>', '<path d="M15 12H3"/>'], x, y, **k)

def ico_shield(x, y, **k):
    return _ico("Escudo", ['<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>'], x, y, **k)

def ico_headset(x, y, **k):
    return _ico("Auscultadores", ['<path d="M3 18v-6a9 9 0 0 1 18 0v6"/>',
                                  '<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>',
                                  '<path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z"/>'], x, y, **k)

def ico_gear(x, y, **k):
    teeth = []
    for i in range(8):
        teeth.append('<rect x="10.6" y="0.6" width="2.8" height="4.4" rx="1" '
                     'transform="rotate(%g 12 12)"/>' % (i * 45))
    return _ico("Engrenagem", ['<circle cx="12" cy="12" r="7.2"/>', '<circle cx="12" cy="12" r="3"/>'] + teeth, x, y, **k)

def ico_truck(x, y, **k):
    return _ico("Camião", ['<path d="M1.5 5.5h13v10h-13Z"/>', '<path d="M14.5 9h4l3.5 3.5v3h-7.5Z"/>',
                           '<circle cx="6" cy="18" r="2.2"/>', '<circle cx="18" cy="18" r="2.2"/>',
                           '<path d="M8.2 18h7.6"/>'], x, y, **k)

def ico_hands(x, y, **k):
    return _ico("Parceria", ['<circle cx="9" cy="8" r="3.4"/>',
                             '<path d="M2.6 20v-1.6A4.4 4.4 0 0 1 7 14h4a4.4 4.4 0 0 1 4.4 4.4V20"/>',
                             '<path d="M16.2 4.9a3.4 3.4 0 0 1 0 6.4"/>',
                             '<path d="M21.4 20v-1.6a4.4 4.4 0 0 0-3.2-4.2"/>'], x, y, **k)

def ico_check(x, y, size=14, color=WHITE, sw=2.6):
    return _ico("Visto", ['<path d="M4 12.5 9.5 18 20 6.5"/>'], x, y, size=size, color=color, sw=sw)

# ---------- pecas reutilizaveis ----------
def campo(x, y, w, label, valor, icon_fn, estado="Normal", obrigatorio=True,
          placeholder=True, olho=False, dica=None, h=44):
    """Campo do manual: etiqueta 12px maiusculas + caixa. 10 §1, 19 §2."""
    body = []
    lb = esc(label.upper())
    aster = '<tspan fill="%s"> *</tspan>' % RED if obrigatorio else ""
    body.append(txt(x, y + 12, label.upper(), size=12, weight=700, fill=INK_2, ls="0.04em").replace(
        "</text>", aster + "</text>"))
    top = y + 18
    if estado == "Foco":
        stroke, sw, bg = BLUE_FOCUS, 2, WHITE
    elif estado == "Erro":
        stroke, sw, bg = RED, 2, WHITE
    elif estado == "Desativado":
        stroke, sw, bg = HAIRLINE, 1, "#f4f5f7"
    else:
        stroke, sw, bg = BORDER, 1, FIELD_BG
    body.append(rect(x, top, w, h, fill=bg, rx=6, stroke=stroke, sw=sw))
    body.append(icon_fn(x + 12, top + (h - 18) / 2, size=18, color=INK_3, sw=1.8))
    body.append(txt(x + 40, top + h / 2 + 4.5, valor, size=13, weight=400,
                    fill=(INK_3 if placeholder else INK)))
    if olho:
        body.append(ico_eye(x + w - 32, top + (h - 18) / 2, size=18, color=INK_2, sw=1.8))
    bottom = top + h
    if dica:
        body.append(txt(x, bottom + 15, dica, size=12, weight=400,
                        fill=(RED if estado == "Erro" else INK_3)))
        bottom += 20
    return g("Campo / " + label, body), bottom

def botao(x, y, w, rotulo, variante="Primário", icon_fn=None, h=44):
    if variante == "Primário":
        bg, fg, st = ORANGE, WHITE, None
    elif variante == "Premido":
        bg, fg, st = ORANGE_DN, WHITE, None
    elif variante == "Desativado":
        bg, fg, st = "#f3d9bf", WHITE, None
    elif variante == "Neutro":
        bg, fg, st = NEUTRAL, INK, None
    elif variante == "Fantasma":
        bg, fg, st = WHITE, BLUE, BORDER
    else:  # Destrutivo
        bg, fg, st = RED, WHITE, None
    body = [rect(x, y, w, h, fill=bg, rx=6, stroke=st, sw=1)]
    tw = 7.4 * len(rotulo)
    if icon_fn:
        total = tw + 8 + 18
        ix = x + (w - total) / 2
        body.append(icon_fn(ix, y + (h - 18) / 2, size=18, color=fg, sw=2))
        body.append(txt(ix + 26, y + h / 2 + 5, rotulo, size=14, weight=700, fill=fg))
    else:
        body.append(txt(x + w / 2, y + h / 2 + 5, rotulo, size=14, weight=700, fill=fg, anchor="middle"))
    return g("Botão / %s / %s" % (variante, rotulo), body)

def caixa_verificacao(x, y, rotulo, dica=None, ligada=True):
    body = []
    if ligada:
        body.append(rect(x, y, 18, 18, fill=BLUE, rx=4))
        body.append(ico_check(x + 2, y + 2, size=14))
    else:
        body.append(rect(x, y, 18, 18, fill=WHITE, rx=4, stroke=BORDER, sw=1.4))
    body.append(txt(x + 28, y + 13.5, rotulo, size=13, weight=400, fill=INK))
    if dica:
        body.append(txt(x + 28, y + 32, dica, size=12, weight=400, fill=INK_3))
    return g("Caixa de verificação / " + rotulo, body)

def item_vantagem(x, y, titulo, sub, icon_fn):
    body = [icon_fn(x, y, size=40, color=ORANGE, sw=2),
            txt(x + 64, y + 17, titulo, size=20, weight=700, fill=WHITE, font=F_B),
            txt(x + 64, y + 41, sub, size=15, weight=400, fill=ON_NAVY)]
    return g("Item de vantagem / " + titulo, body)

def item_apoio(x, y, titulo, sub, icon_fn):
    body = [icon_fn(x, y + 2, size=20, color=BLUE, sw=1.8),
            txt(x + 30, y + 9, titulo, size=12, weight=700, fill=INK),
            txt(x + 30, y + 25, sub, size=11, weight=400, fill=INK_3)]
    return g("Item de apoio / " + titulo, body)

def svg(w, h, body, bg=None):
    head = ['<svg xmlns="http://www.w3.org/2000/svg" width="%g" height="%g" viewBox="0 0 %g %g">' % (w, h, w, h)]
    head.append('<defs>'
                '<linearGradient id="foto" x1="0" y1="0" x2="1" y2="1">'
                '<stop offset="0" stop-color="#16283c"/><stop offset="1" stop-color="#0b1a2b"/></linearGradient>'
                '<linearGradient id="veu" x1="0" y1="0" x2="1" y2="0">'
                '<stop offset="0" stop-color="#012338" stop-opacity="0.92"/>'
                '<stop offset="0.62" stop-color="#012338" stop-opacity="0.45"/>'
                '<stop offset="1" stop-color="#012338" stop-opacity="0.15"/></linearGradient>'
                '<filter id="sombra" x="-30%" y="-30%" width="160%" height="160%">'
                '<feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#222428" flood-opacity="0.16"/>'
                '</filter></defs>')
    if bg:
        head.append(rect(0, 0, w, h, fill=bg))
    return "\n".join(head + body + ['</svg>'])

# ================= 01 — ecra de entrada =================
W, H = 1440, 900
HEAD_H, FOOT_H = 64, 44
body = []

# --- fundo ---
body.append(g("Fotografia da oficina (substituir)", [
    rect(0, HEAD_H, W, H - HEAD_H - FOOT_H, fill="url(#foto)"),
    txt(48, H - FOOT_H - 16, "Substituir esta camada pela fotografia da oficina.",
        size=11, weight=400, fill=WHITE, op="0.35"),
]))
body.append(g("Véu sobre a fotografia", [rect(0, HEAD_H, W, H - HEAD_H - FOOT_H, fill="url(#veu)")]))

# --- cabecalho ---
body.append(g("Cabeçalho", [
    rect(0, 0, W, HEAD_H, fill=NAVY),
    txt(48, 32, "ROMAFE", size=26, weight=700, fill=WHITE, font=F_T, ls="0.02em"),
    rect(48, 38, 116, 2.5, fill=ORANGE, rx=1),
    txt(48, 54, "Gestão de oficina", size=11, weight=400, fill=ON_NAVY),
    ico_globe(1276, 23, size=18, color=WHITE, sw=1.8),
    txt(1302, 37, "Português", size=13, weight=400, fill=WHITE),
    ico_chevron(1376, 25, size=14, color=WHITE, sw=2),
]))

# --- coluna esquerda ---
msg = ["MAIS QUE PEÇAS", "SOLUÇÕES QUE MANTÊM", "O SEU NEGÓCIO A ANDAR"]
mensagem = [txt(96, 214 + i * 50, l, size=40, weight=700, fill=WHITE, font=F_T, ls="0.01em")
            for i, l in enumerate(msg)]
body.append(g("Mensagem", mensagem))

body.append(g("Vantagens", [
    item_vantagem(96, 452, "Peças e equipamentos", "Das melhores marcas", ico_gear),
    item_vantagem(96, 548, "Apoio ao profissional", "Sempre ao seu lado", ico_truck),
    item_vantagem(96, 644, "Juntos a fazer o seu negócio avançar", "Parceria de todos os dias", ico_hands),
]))
body.append(g("Assinatura", [
    line(96, 744, 600, 744, WHITE, 1, op="0.28"),
    txt(96, 780, "Qualidade. Confiança. Parceria.", size=17, weight=400, fill=WHITE),
]))

# --- cartao de sessao (19 §1) ---
CW, PAD = 400, 32
CX = 880
cx_in = CX + PAD
w_in = CW - 2 * PAD
CY = 178
card = []

y = CY + PAD
card.append(txt(CX + CW / 2, y + 28, "ROMAFE", size=34, weight=700, fill=WORDMARK, font=F_T, anchor="middle", ls="0.02em"))
card.append(rect(CX + CW / 2 - 72, y + 36, 144, 3, fill=ORANGE, rx=1.5))
card.append(txt(CX + CW / 2, y + 56, "Gestão de oficina", size=14, weight=400, fill=INK_2, anchor="middle"))
y += 84

c1, y = campo(cx_in, y, w_in, "Endereço de email", "exemplo@romafe.com", ico_user)
card.append(c1); y += 16
c2, y = campo(cx_in, y, w_in, "Palavra-passe", "••••••••", ico_lock, placeholder=False, olho=True)
card.append(c2); y += 18

card.append(caixa_verificacao(cx_in, y, "Manter sessão iniciada",
                              "Não usar em computadores partilhados", ligada=False))
y += 52

card.append(botao(cx_in, y, w_in, "Iniciar sessão", "Primário", icon_fn=ico_login))
y += 44 + 22

card.append(g("Separador / Ainda não tem conta", [
    line(cx_in, y, cx_in + 96, y, HAIRLINE, 1),
    line(cx_in + w_in - 96, y, cx_in + w_in, y, HAIRLINE, 1),
    txt(CX + CW / 2, y + 4, "Ainda não tem conta?", size=12, weight=400, fill=INK_3, anchor="middle"),
]))
y += 18

card.append(botao(cx_in, y, w_in, "Pedir acesso", "Fantasma"))
y += 44 + 22

card.append(line(cx_in, y, cx_in + w_in, y, HAIRLINE, 1))
y += 14
card.append(g("Apoio", [
    item_apoio(cx_in, y, "Acesso seguro", "Ligação cifrada", ico_shield),
    line(CX + CW / 2 + 4, y - 2, CX + CW / 2 + 4, y + 34, HAIRLINE, 1),
    item_apoio(CX + CW / 2 + 24, y, "Precisa de ajuda?", "Contacte-nos", ico_headset),
]))

card.insert(0, rect(CX, CY, CW, (y + 34) - CY + PAD, fill=WHITE, rx=14, extra=' filter="url(#sombra)"'))
body.append(g("Cartão de sessão", card))

# --- rodape ---
links = [("Aviso legal", 930), ("Política de privacidade", 1030), ("Contactos", 1196)]
foot = [rect(0, H - FOOT_H, W, FOOT_H, fill=NAVY),
        txt(48, H - 17, "© 2026 ROMAFE. Todos os direitos reservados.", size=12, weight=400, fill=ON_NAVY)]
for rot, lx in links:
    foot.append(txt(lx, H - 17, rot, size=12, weight=400, fill=WHITE))
foot.append(txt(1014, H - 17, "|", size=12, weight=400, fill=ON_NAVY, op="0.6"))
foot.append(txt(1180, H - 17, "|", size=12, weight=400, fill=ON_NAVY, op="0.6"))
foot.append(txt(1290, H - 21, "///", size=15, weight=700, fill=ORANGE, ls="0.06em"))
foot.append(txt(1322, H - 25, "OFICINAS MAIS FORTES", size=8, weight=700, fill=WHITE, ls="0.12em"))
foot.append(txt(1322, H - 14, "TODOS OS DIAS", size=8, weight=400, fill=ON_NAVY, ls="0.12em"))
body.append(g("Rodapé", foot))

open(os.path.join(OUT, "01-ecra-entrada.svg"), "w", encoding="utf-8").write(
    svg(W, H, [g("Ecrã / Entrada", body)]))

# ================= 02 — componentes =================
CW2, CH2 = 1240, 1180
b = [rect(0, 0, CW2, CH2, fill="#f6f7f9")]

def titulo(x, y, s):
    return txt(x, y, s, size=18, weight=700, fill=INK, font=F_T)

def sub(x, y, s):
    return txt(x, y, s, size=12, weight=400, fill=INK_3)

b.append(txt(64, 72, "ROMAFE — componentes de entrada", size=28, weight=700, fill=INK, font=F_T))
b.append(sub(64, 96, "Cada bloco é uma peça isolada: botão, campo, caixa de verificação, item e ícone. Copia e reutiliza."))

# botoes
b.append(titulo(64, 160, "Botões  ·  09 §1: raio 6, 13–14px peso 700, folga 9×16"))
bx, by = 64, 180
for i, (rot, var, ic) in enumerate([("Iniciar sessão", "Primário", ico_login),
                                    ("Iniciar sessão", "Premido", ico_login),
                                    ("Iniciar sessão", "Desativado", ico_login)]):
    b.append(botao(bx + i * 200, by, 176, rot, var, icon_fn=ic))
    b.append(sub(bx + i * 200, by + 62, var))
by += 92
for i, (rot, var) in enumerate([("Pedir acesso", "Fantasma"), ("Exportar", "Neutro"), ("Terminar sessão", "Destrutivo")]):
    b.append(botao(bx + i * 200, by, 176, rot, var))
    b.append(sub(bx + i * 200, by + 62, var))

# campos
b.append(titulo(64, 384, "Campos  ·  10 §1 e 19 §2: altura 44 na entrada, raio 6"))
fy = 404
for i, (est, val, ph, dica) in enumerate([("Normal", "exemplo@romafe.com", True, None),
                                          ("Foco", "oficina@romafe.com", False, None),
                                          ("Erro", "oficina@romafe", False, "Email ou palavra-passe incorretos")]):
    c, _ = campo(64 + i * 300, fy, 264, "Endereço de email", val, ico_user, estado=est,
                 placeholder=ph, dica=dica)
    b.append(c)
    b.append(sub(64 + i * 300, fy + 96, est))
fy += 132
c, _ = campo(64, fy, 264, "Palavra-passe", "••••••••", ico_lock, placeholder=False, olho=True)
b.append(c); b.append(sub(64, fy + 82, "Com mostrar/ocultar — 19 §2.1"))
c, _ = campo(364, fy, 264, "Palavra-passe", "Indisponível", ico_lock, estado="Desativado")
b.append(c); b.append(sub(364, fy + 82, "Desativado"))

# caixa de verificacao
b.append(titulo(64, 720, "Caixa de verificação  ·  19 §5: desligada por omissão, com dica"))
b.append(caixa_verificacao(64, 740, "Manter sessão iniciada", "Não usar em computadores partilhados", ligada=False))
b.append(caixa_verificacao(400, 740, "Manter sessão iniciada", "Não usar em computadores partilhados", ligada=True))
b.append(sub(64, 800, "Desligada"))
b.append(sub(400, 800, "Ligada"))

# itens
b.append(titulo(64, 866, "Itens de apoio do cartão"))
b.append(item_apoio(64, 886, "Acesso seguro", "Ligação cifrada", ico_shield))
b.append(item_apoio(400, 886, "Precisa de ajuda?", "Contacte-nos", ico_headset))

b.append(titulo(660, 720, "Item de vantagem (sobre fundo escuro)"))
b.append(rect(660, 740, 540, 190, fill=NAVY, rx=10))
b.append(item_vantagem(692, 764, "Peças e equipamentos", "Das melhores marcas", ico_gear))
b.append(item_vantagem(692, 848, "Apoio ao profissional", "Sempre ao seu lado", ico_truck))

# icones
b.append(titulo(64, 986, "Ícones  ·  traço 2, grelha 24"))
icons = [ico_user, ico_lock, ico_eye, ico_globe, ico_chevron, ico_login,
         ico_shield, ico_headset, ico_gear, ico_truck, ico_hands, ico_check]
for i, fn in enumerate(icons):
    ix = 64 + (i % 12) * 62
    b.append(rect(ix - 8, 1006, 48, 48, fill=WHITE, rx=8, stroke=HAIRLINE, sw=1))
    if fn is ico_check:
        b.append(fn(ix, 1018, size=24, color=BLUE, sw=2))
    else:
        b.append(fn(ix, 1018, size=24, color=BLUE, sw=2))

b.append(titulo(64, 1112, "Paleta"))
pal = [("Azul da marca", BLUE), ("Fundo escuro", NAVY), ("Laranja de ação", ORANGE),
       ("Azul do logótipo", WORDMARK), ("Fundo de campo", FIELD_BG), ("Borda", BORDER),
       ("Tinta", INK), ("Tinta discreta", INK_3), ("Vermelho", RED)]
for i, (nome, cor) in enumerate(pal):
    px = 64 + i * 130
    b.append(rect(px, 1128, 40, 40, fill=cor, rx=6, stroke=HAIRLINE, sw=1))
    b.append(txt(px + 48, 1144, nome, size=9.5, weight=700, fill=INK))
    b.append(txt(px + 48, 1158, cor, size=10, weight=400, fill=INK_3))

open(os.path.join(OUT, "02-componentes.svg"), "w", encoding="utf-8").write(svg(CW2, CH2, b))
print("escrito em", OUT)
