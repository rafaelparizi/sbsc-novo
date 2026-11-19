# Site estático da CESC servido pelo nginx
FROM nginx:1.27-alpine

# Configuração do servidor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos do site
COPY index.html index-v2.html comite.html regimento.html sobre-a-cesc.html atas-relatorios.html \
     publicacoes.html sbsc.html sbsc-old.html homenageados.html wco.html livro.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js  /usr/share/nginx/html/js
COPY img /usr/share/nginx/html/img

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
