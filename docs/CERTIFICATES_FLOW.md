# Fluxo de Certificados

## 📋 Como Funciona

### **Fluxo Completo: Aprovação → Geração → Armazenamento**

```
1. Admin aprova projeto em /admin/submissoes
   ↓
2. POST /api/admin/evaluate (action=approve)
   ↓
3. Chamar diretamente createCertificate(userId, courseData)
   ↓
4. Gerar PDF com generateCertificatePDF()
   ↓
5. Upload para Firebase Storage: uploadCertificatePDF(pdfBuffer)
   ↓
6. Atualizar Firestore com pdfUrl: updateCertificatePdfUrl()
   ↓
7. ✅ Certificado pronto para download
```

### **Passo a Passo**

### 1. **Aluno Completa Curso e Envia Projeto**
- Aluno finaliza todas as aulas
- Envia projeto para avaliação

### 2. **Admin Aprova Projeto**
- Admin acessa `/admin/submissoes`
- Clica em "✓ Aprovar" na submissão
- Sistema gera automaticamente um certificado PDF

### 3. **Certificado é Criado**
- ID único gerado: `YYYYMMDD + 6 aleatórios` (ex: `20260414A7K9M2`)
- Documento criado em Firestore: `users/{userId}/certificates/{certId}`
- PDF renderizado via Puppeteer com os dados do aluno
- PDF salvo em Firebase Storage: `certificates/{certificateId}.pdf`
- URL do PDF armazenada no documento Firestore para downloads rápidos

### 4. **Aluno Visualiza Certificado**
- Em `/meu-perfil` → seção "Certificados"
- Lista todos os certificados com curso, data e ID
- Botões: **Baixar PDF** | **Copiar Link**

### 5. **Validação Pública**
- Qualquer pessoa acessa `/validar-certificado`
- Cole o ID do certificado e valida
- Sistema retorna: nome aluno, curso, carga horária, data emissão
- Link permanente: `/validar-certificado/{certificateId}`

---

## 🗂️ Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `src/lib/certificates.js` | Lógica de geração e validação de certificados |
| `src/lib/pdf-generator.js` | Renderiza HTML→PDF com Puppeteer |
| `src/templates/certificate-template.html` | Design visual do certificado |
| `src/app/api/certificates/generate/route.js` | API para gerar certificados |
| `src/app/api/certificates/download/[id]/route.js` | Download do PDF |
| `src/app/api/certificates/validate/route.js` | Validação pública |
| `src/components/CertificatesSection/` | UI em Meu Perfil |

---

## 💾 Armazenamento

### Firestore (Metadados)
```
users/{userId}/certificates/{certificateId}
├── certificateId: "20260414A7K9M2"
├── studentName: "Ana Beatriz Pinheiro dos Santos"
├── courseName: "SQL Fundamental"
├── courseSlug: "sql-fundamental"
├── workloadHours: 6
├── generatedAt: 2026-04-14T10:30:00.000Z
├── pdfUrl: "https://storage.googleapis.com/.../certificates/20260414A7K9M2.pdf"
├── validatedCount: 3
└── lastValidatedAt: 2026-04-15T14:22:00.000Z
```

### Firebase Storage (PDFs)
```
certificates/
├── 20260414A7K9M2.pdf
├── 20260416B3X2Y8.pdf
└── ...
```

---

## 🆙 Otimização para Vercel

O sistema usa:
- **Em desenvolvimento:** `puppeteer` normal (~300MB)
- **Em produção (Vercel):** `puppeteer-core` + `@sparticuz/chromium` (~50MB)

Detecção automática via `process.env.NODE_ENV === "production"`.

Isso é necessário, pois 300mbs são maiores que o limite de 250mbs da Vercel, e o `puppeteer-core` sozinho não funciona sem um Chromium. O `@sparticuz/chromium` é uma versão leve e compatível para ambientes serverless.

---

## 🔐 Segurança

- ✅ Download PDF: apenas aluno ou admin
- ✅ Validação pública: sem autenticação (lê-se dados públicos)
- ✅ ID único praticamente impossível de adivinhar
- ✅ PDFs armazenados em Firebase Storage (`certificates/{certificateId}.pdf`)
- ✅ URL do PDF salva em Firestore com cache de 1 ano
