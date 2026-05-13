# Firestore → BigQuery: Passo a Passo

## Pré-requisitos

- Projeto Firebase no **Plano Blaze** (pay as you go)
- Acesso ao Firebase Console

---

## 1. Instalar a extensão "Stream Firestore to BigQuery"

1. Acesse: [extensions.dev/extensions/firebase/firestore-bigquery-export](https://extensions.dev/extensions/firebase/firestore-bigquery-export)
2. Clique em **"Install in Firebase Console"** e selecione seu projeto
3. Na tela de billing, revise os custos (~US$ 0,01/mês) e clique em **Avançar**
4. Na tela de APIs, ative o **Artifact Registry** e o **Compute Engine** clicando em "Ativar" em cada um
5. Avance até a etapa **"Configurar extensão"** e preencha:

| Campo | Valor |
|---|---|
| Cloud Functions location | `southamerica-east1` |
| BigQuery Dataset location | `southamerica-east1` |
| BigQuery Project ID | `seu-project-id` |
| Firestore Instance ID | `(default)` |
| Firestore Instance Location | Região do seu Firestore (ex: `southamerica-east1`) |
| Collection path | Nome da coleção (ex: `users`) |
| Dataset ID | `firestore_export` |
| Table ID | Nome da coleção (ex: `users`) |

6. Clique em **"Instalar extensão"**

> ⚠️ Se der erro de permissão (IAM), aguarde 5-10 minutos e tente reinstalar. É propagação normal do Google Cloud. (aconteceu comigo quando estava fazendo e foi só esperar um pouco)

---

## 2. Dar permissão de BigQuery Admin à conta de serviço

1. Acesse: `https://console.cloud.google.com/iam-admin/iam?project=SEU_PROJECT_ID`
2. Encontre a conta de serviço do Firebase (ex: `firebase-adminsdk-xxxxx@seu-project.iam.gserviceaccount.com`)
3. Clique no **lápis (editar)** → **Adicionar outro papel** → busca **BigQuery Admin** → **Salvar**

---

## 3. Importar dados existentes do Firestore

A extensão só captura mudanças a partir da instalação. Para trazer dados já existentes, rode o script abaixo.

### 3.1 Decodificar a chave de serviço

```bash
echo "SEU_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64" | base64 --decode > /tmp/firebase-key.json
```

### 3.2 Exportar a variável de autenticação

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/tmp/firebase-key.json"
```

### 3.3 Rodar o script de importação

```bash
npx @firebaseextensions/fs-bq-import-collection \
  --non-interactive \
  --project SEU_PROJECT_ID \
  --source-collection-path users \
  --dataset firestore_export \
  --table-name-prefix users \
  --dataset-location us \
  --query-collection-group false \
  --use-new-snapshot-query-syntax true
```

> Repita o passo 3.3 para cada coleção que desejar exportar (ex: `enrollments`).

---

## 4. Verificar os dados no BigQuery

1. Acesse: `https://console.cloud.google.com/bigquery?project=SEU_PROJECT_ID`
2. Na sidebar, expanda o dataset `firestore_export`
3. Rode a query:

```sql
SELECT * FROM `SEU_PROJECT_ID.firestore_export.users_raw_changelog` LIMIT 1000
```

---

## 5. Criar uma View com os dados limpos

Os dados chegam como JSON string no campo `data`. Crie uma View para achatar os campos:

```sql
CREATE OR REPLACE VIEW `SEU_PROJECT_ID.firestore_export.users_clean` AS
SELECT
  document_id,
  JSON_VALUE(data, '$.name') AS name,
  JSON_VALUE(data, '$.email') AS email,
  JSON_VALUE(data, '$.role') AS role,
  JSON_VALUE(data, '$.provider') AS provider,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.createdAt._seconds') AS INT64)) AS createdAt,
  TIMESTAMP_SECONDS(CAST(JSON_VALUE(data, '$.lastLoginAt._seconds') AS INT64)) AS lastLoginAt
FROM (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY document_id ORDER BY timestamp DESC) AS rn
  FROM `SEU_PROJECT_ID.firestore_export.users_raw_changelog`
)
WHERE rn = 1 AND operation != 'DELETE'
```

---

## Como os dados são atualizados

A partir da instalação, a extensão captura automaticamente:

| Situação | Operation |
|---|---|
| Novo documento criado | `CREATE` |
| Documento atualizado | `UPDATE` |
| Documento deletado | `DELETE` |
| Importação manual (script) | `IMPORT` |

> O BigQuery **nunca deleta registros** — ele acumula o histórico completo de operações. A View garante que você veja sempre o estado mais recente de cada documento.

---

