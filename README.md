# exercicios-orion

Repo com as atividades do Orion Bootcamp.

## Docker

Cada exercício tá na sua pasta dentro de `docker/`. Antes de subir qualquer um, rodar `npm install` na pasta da aplicação (gera o `package-lock.json`, que o `npm ci` do Dockerfile usa).
Nos que tem banco, copiar o `.env.example` pra `.env` antes.

### exercicio-1
Hello world com Express. O `src` fica montado como volume, então dá pra editar e aí o node reinicia sozinho.

```
docker compose up -d --build
```

http://localhost:3000

### exercicio-2
API + Postgres. A API cria a tabela `messages` quando sobe.

```
docker compose up -d --build
```

- `GET /messages`
- `POST /messages` com body `{ "content": "teste" }`

Pra testar a persistência é só criar uma mensagem, dar `docker compose down`, subir de novo e aí ver que ela continua lá (o volume `pgdata` não é apagado no `down`, só com `down -v`).

### exercicio-3
Mesmo projeto do exercicio-2, mas esse é com Dockerfile multi-stage (dev e prod) e um compose pra cada ambiente.
Cada compose define o próprio `name`, então dev e prod são projetos separados no Docker, cada um com seus containers, rede e volume. 
Dá pra rodar os dois ao mesmo tempo.

```
docker compose -f docker-compose.dev.yml up -d --build
docker compose -f docker-compose.prod.yml up -d --build
docker compose ls
```

- dev (http://localhost:3000): código montado via volume e nodemon
- prod (http://localhost:3001): só dependências de produção, sem volume de código, rodando com usuário `node`


### exercicio-extra
API de tarefas + Postgres + pgAdmin.

```
docker compose up -d --build
```

- API: http://localhost:3000/health
- pgAdmin: http://localhost:8080 (login com o email e senha do `.env`)

O servidor `Extra DB` já vem cadastrado pelo `pgadmin/servers.json` (host `db`). Ao abrir ele pede a senha do banco, que é a `POSTGRES_PASSWORD` do `.env`.
Rotas: `GET /extra`, `POST /extra` (`{ "title": "..." }`), `PATCH /extra/:id/done`, `DELETE /extra/:id`.
