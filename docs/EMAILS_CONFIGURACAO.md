# Configuração de Emails com Resend

## 📧 Visão Geral

O sistema de emails foi implementado usando a biblioteca **react-email** para criar componentes de email reutilizáveis e o serviço **Resend** para enviar os emails. Os emails são enviados automaticamente quando usuários submetem projetos.

## 🔧 Configuração do Resend

### 1. Criar Conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Crie uma conta com seu email
3. Confirme seu email

### 2. Obter API Key

1. Após fazer login, vá para **Integrations** ou **API Keys**
2. Clique em **Create API Key**
3. Copie a chave gerada

### 3. Configurar Variável de Ambiente

Adicione a seguinte variável ao seu arquivo `.env.local`:

```env
RESEND_API_KEY=seu_api_key_aqui
```

### 4. Verificar Domínio (Opcional)

Para enviar emails de um domínio customizado (ex: `noreply@profpinho.com`):

1. No dashboard do Resend, vá para **Domains**
2. Adicione seu domínio
3. Siga as instruções para adicionar os registros DNS
4. Aguarde pela verificação (pode levar até 24h)

Se não tiver um domínio verificado, use o domínio padrão do Resend fornecido (geralmente `onboarding@resend.dev`).

## 📨 Como Funcionam os Emails

### Fluxo de Envio

```
Usuário submete projeto
        ↓
API recebe submissão
        ↓
Dados salvos no Firestore
        ↓
Component de email renderizado (React → HTML)
        ↓
HTML enviado via Resend API
        ↓
Email entregue ao aluno
```

### Componentes de Email

#### ProjectSubmissionEmail
**Quando é enviado:** Imediatamente após o aluno submeter um projeto

**O que contém:**
- Confirmação de recebimento da submissão
- Nome do aluno
- Nome do curso
- Data de entrega
- Link para o dashboard
- Status "EM AVALIAÇÃO"

**Localização:** `src/components/emails/ProjectSubmissionEmail.jsx`

#### EvaluationCompletedEmail
**Quando é enviado:** Quando o professor aprova uma submissão de projeto

**O que contém:**
- Notificação de conclusão da avaliação
- Nome do aluno
- Nome do curso
- Data de conclusão
- Link para visualizar resultado

**Localização:** `src/components/emails/EvaluationCompletedEmail.jsx`

### Arquivo Principal

**Localização:** `src/lib/emails.js`

Contém as funções:
- `sendProjectSubmissionEmail()` - Envia email de confirmação de submissão
- `sendEvaluationCompletedEmail()` - Envia email de conclusão de avaliação
- `sendBatchEmails()` - (Futuro) Para envios em lote

### Integração com API

**Localização:** `src/app/api/submissions/route.js`

A submissão de projetos dispara automaticamente o envio de email:

```javascript
// Após salvar no Firestore
await sendProjectSubmissionEmail({
  recipientEmail: usuario.email,
  studentName: usuario.nome,
  courseName: nomeDoCurso,
  submissionDate: dataEnvio,
});
```

## 🎨 Customização

### Cores

Os emails usam a paleta de cores do site (`src/app/globals.css`):

- **Primária (Header/Buttons):** `#F34C61` (vermelho/rosa)
- **Fundo info:** `#F6F6FD` (cinza claro)
- **Texto:** `#2A2836` (preto)

**Para alterar cores:**
1. Edite os valores `backgroundColor`, `color` ou `borderLeft` nos arquivos de componente de email
2. As cores estão definidas como constantes de estilo no final de cada arquivo

### Textos

Para alterar mensagens ou textos nos emails:
1. Abra `src/components/emails/ProjectSubmissionEmail.jsx` ou `EvaluationCompletedEmail.jsx`
2. Localize o `<Text>` que deseja alterar
3. Modifique o conteúdo

### Estrutura HTML

Os emails usam componentes do react-email:
- `<Html>` - Raiz do documento
- `<Body>` - Corpo
- `<Section>` - Divisão de conteúdo
- `<Row>` / `<Column>` - Layout em grid
- `<Text>` - Parágrafo
- `<Button>` - Botão

## 🧪 Testando Emails

### Opção 1: Submeter um Projeto de Verdade
1. Acesse a plataforma como aluno
2. Navegue até a aba de Projetos
3. Submeta um projeto
4. Verifique seu email (pasta de spam às vezes)

### Opção 2: Logs do Console
Os emails registram sucesso/erro no console do servidor:

```javascript
// Sucesso
✓ Project submission email sent to usuario@example.com

// Erro
❌ Erro ao enviar email de submissão: [erro]
```

## ❌ Solução de Problemas

### Email não é enviado
1. **Verifique a API Key:**
   - Abra `.env.local`
   - Confirme que `RESEND_API_KEY` está preenchida
   - A chave está válida/não expirou no Resend?

2. **Verifique o email de destino:**
   - Na fase de onboarding do Resend, você só pode enviar para seu próprio email
   - Após verificar domínio, pode enviar para qualquer um

3. **Verifique os logs:**
   - Abra o terminal onde roda `npm run dev`
   - Procure por mensagens `✓` ou `❌`

### Email vai para spam
1. Se usar domínio (`@profpinho.com`), verifique se registros SPF/DKIM estão corretos no Resend
2. Se usar domínio padrão do Resend, é normal no início até ganhar reputação

### Erro "The `html` field must be a `string`"
Isso significa o `render()` do react-email não foi aguardado. Verifique se há `await` antes do `render()` em `src/lib/emails.js`.

## 📝 Próximos Passos

Após configurar:
1. ✅ Configure a API Key do Resend
2. ✅ Teste enviando um projeto
3. ✅ Customize cores/textos se desejar
4. ✅ (Opcional) Verifique domínio customizado

## 📚 Recursos Adicionais

- [Documentação Resend](https://resend.com/docs)
- [Documentação react-email](https://react.email)
- [Componentes disponíveis](https://react.email/components)
