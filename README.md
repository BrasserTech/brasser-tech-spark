# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/201ef954-5673-40d5-854f-fc85b84ed09c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/201ef954-5673-40d5-854f-fc85b84ed09c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

###### Para gerar uma build rode
npm ci
npm run build
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/201ef954-5673-40d5-854f-fc85b84ed09c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploy com Docker e Nginx

O projeto está configurado para rodar com Docker usando Nginx na porta 4173.

**Domínio configurado:** `painel.brassertech.com.br`

### Build e execução com Docker:

```sh
# Build da imagem
docker build -t brasser-tech-spark .

# Executar o container
docker run -d -p 4173:4173 --name brasser-tech brasser-tech-spark
```

### Usando Docker Compose (recomendado):

```sh
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Rebuild após mudanças
docker-compose up -d --build
```

### Configuração SSL/HTTPS:

O `nginx.conf` está configurado para HTTPS com redirecionamento automático de HTTP para HTTPS.

**Opção 1: Sem SSL (apenas HTTP)**
- Use o arquivo `nginx.conf.http` renomeando para `nginx.conf` antes do build
- Ou ajuste o Dockerfile para copiar `nginx.conf.http` ao invés de `nginx.conf`

**Opção 2: Com SSL (Let's Encrypt)**
1. Instale certificados SSL no servidor:
```sh
certbot certonly --standalone -d painel.brassertech.com.br
```

2. Ajuste o Dockerfile para montar os certificados:
```dockerfile
# Adicione volumes no docker-compose.yml:
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

3. Descomente e ajuste as linhas SSL no `nginx.conf`:
```nginx
ssl_certificate /etc/letsencrypt/live/painel.brassertech.com.br/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/painel.brassertech.com.br/privkey.pem;
```

### Acessar a aplicação:

Após iniciar o container, acesse:
- **HTTP:** `http://painel.brassertech.com.br:4173`
- Ou: `http://localhost:4173` (se acessando localmente)

### Estrutura Docker:

- **Dockerfile**: Multi-stage build (Node.js para build + Nginx para servir)
- **nginx.conf**: Configuração do Nginx com HTTPS, suporte a SPA, compressão gzip e cache
- **nginx.conf.http**: Versão HTTP apenas (sem SSL)
- **docker-compose.yml**: Orquestração do container com porta 4173