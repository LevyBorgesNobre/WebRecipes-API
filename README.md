# 🍽️ WebRecipes-API

Uma API RESTful para uma aplicação de receitas, onde usuários podem criar contas, publicar receitas e interagir com conteúdos de outros usuários de forma simples e organizada.

---

## 🚀 Funcionalidades

* 👤 **Usuário & Perfil**

  * Criar conta de usuário
  * Criar e gerenciar perfil

* 📖 **Receitas**

  * Criar receitas
  * Editar e deletar receitas
  * Visualizar receitas de outros usuários

* ❤️ **Interações**

  * Curtir (like) receitas
  * Favoritar receitas

* 💬 **Comentários**

  * Comentar em receitas de outros usuários
  * Deletar comentários próprios

---

## 🧱 Estrutura do Projeto

A aplicação segue uma arquitetura bem organizada, separando responsabilidades e facilitando a manutenção e escalabilidade:

```
.vscode/
prisma/
src/
 ├── @types/
 ├── domain/
 │   ├── dtos/
 │   └── entities/
 ├── env/
 ├── http/
 │   ├── controllers/
 │   │   ├── comment/
 │   │   ├── favorite/
 │   │   ├── like/
 │   │   ├── recipe/
 │   │   └── user/
 │   ├── middleware/
 │   └── routes/
 ├── lib/
 ├── repositories/
 ├── services/
 ├── errors/
 ├── factories/
 ├── use-cases/
 ├── app.ts
 └── server.ts
.env
.gitignore
docker-compose.yml
```

### 📌 Destaques da Arquitetura

* **Domain-driven**: regras de negócio bem separadas (`entities`, `dtos`, `use-cases`)
* **Controllers**: responsáveis apenas por lidar com HTTP
* **Repositories**: abstração do acesso a dados
* **Services & Factories**: centralizam lógica compartilhada e criação de dependências
* **Prisma**: ORM para comunicação com o banco de dados

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Fastify**
* **Prisma ORM**
* **JWT** para autenticação
* **PostgreSQL** (ou outro banco compatível com Prisma)

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório

```bash
git clone <url-do-repositorio>
```

2. Instale as dependências

```bash
npm install
```

3. Configure o arquivo `.env`

```env
DATABASE_URL=
JWT_SECRET=
```

4. Rode as migrations do Prisma

```bash
npx prisma migrate dev
```

5. Inicie o servidor

```bash
npm run dev
```

---

## 📡 Rotas Principais (Visão Geral)

* **Usuário**: criação de conta, autenticação
* **Receitas**: criação e listagem
* **Likes**: curtir/descurtir receitas
* **Favoritos**: favoritar/desfavoritar receitas
* **Comentários**: criar e deletar comentários

> As rotas estão organizadas dentro de `src/http/routes`

---

## 🐳 Docker

A aplicação utiliza **Docker** para facilitar a configuração do ambiente, especialmente do banco de dados. Atualmente, o Docker é usado para subir o **PostgreSQL**, enquanto a API pode rodar localmente. Também é possível rodar **API + Banco** totalmente via Docker.

---

### 🗄️ Docker apenas para o Banco de Dados


#### docker-compose.yml

```yaml
version: '3'

services:
  webrecipes-db:
    image: postgres
    container_name: webrecipes-db
    environment:
      - POSTGRES_USER=WebRecipes
      - POSTGRES_PASSWORD=10984
      - POSTGRES_DB=webrecipes
    ports:
      - "5432:5432"
```

#### Variável de ambiente (.env)

```env
DATABASE_URL=postgresql://WebRecipes:10984@localhost:5432/webrecipes
JWT_SECRET=sua-chave-secreta
```

#### Subindo o banco

```bash
docker-compose up
```

```bash
npm run dev
```

---

### 🚀 Docker com API + Banco de Dados


#### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    container_name: webrecipes-api
    build: .
    ports:
      - "3333:3333"
    depends_on:
      - webrecipes-db
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev

  webrecipes-db:
    image: postgres
    container_name: webrecipes-db
    environment:
      POSTGRES_USER: WebRecipes
      POSTGRES_PASSWORD: 10984
      POSTGRES_DB: webrecipes
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Variável de ambiente (.env)

```env
DATABASE_URL=postgresql://WebRecipes:10984@webrecipes-db:5432/webrecipes
JWT_SECRET=sua-chave-secreta
```

#### Subindo a aplicação completa

```bash
docker-compose up --build
```

#### Prisma Migrate

```bash
docker-compose exec api npx prisma migrate dev
```

