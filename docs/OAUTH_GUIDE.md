# Documentação para Autenticação OAuth — Setup Local

## Google

1. Acesse [console.cloud.google.com](https://console.cloud.google.com/) e crie um projeto
2. Vá em **APIs e Serviços**
3. **Tela de permissão OAuth**
4. **Público Alvo** e inicie o aplicativo para receber requisição oAuth 
5. Em "público", selecione **Externo** e preencha com seu e-mail. Pronto, a tela de permissão OAuth está criada. Agora, é necessário criar as credenciais para o NextAuth.
6. Vá em **APIs e Serviços** → **Credenciais** → **+ Criar credenciais** → **ID do cliente OAuth** → **Aplicativo da Web**
7. Em **Origens JavaScript autorizadas**, adicione:
   ```
   http://localhost:3000
   ```
5. Em **URIs de redirecionamento autorizados**, adicione:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Clique em **Criar** → copie o **Client ID** e o **Client Secret**

---

## GitHub

1. Acesse [github.com/settings/developers](https://github.com/settings/developers) → **New OAuth App**
2. Preencha:
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Clique em **Register application**
4. Na página seguinte, copie o **Client ID** e clique em **Generate a new client secret**

---

## .env.local

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

> Gere o `NEXTAUTH_SECRET` com: `openssl rand -base64 32`