# CSS Naming Convention Guide

Esta página documenta a convenção de nomenclatura CSS usada em todo o projeto.

## Estratégia: BEM Simplificado

Usamos uma variação simplificada do BEM (Block Element Modifier) que se integra bem com CSS Modules.

### Padrão Base

```
.block                    /* Componente raiz */
.block__element           /* Sub-elemento do componente */
.block--modifier          /* Variante ou estado do componente */
.block__element--modifier /* Combinação: sub-elemento com variante */
```

### Exemplos Práticos

#### Exemplo 1: Componente de Botão

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  background: var(--color-red);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.button__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.button--secondary {
  background: transparent;
  color: var(--color-red);
  border: 2px solid var(--color-red);
}

.button--small {
  padding: 8px 12px;
  font-size: 14px;
}

.button:hover {
  opacity: 0.9;
}

.button--secondary:hover {
  background: var(--color-red);
  color: var(--color-white);
}
```

**JSX Usage:**
```jsx
import styles from './Button.module.css';

export default function Button({ variant = 'primary', size = 'md', icon, children }) {
  const buttonClass = [
    styles.button,
    variant === 'secondary' && styles['button--secondary'],
    size === 'small' && styles['button--small'],
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClass}>
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children}
    </button>
  );
}
```

---

#### Exemplo 2: Componente de Card

```css
/* CourseCard.module.css */
.card {
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-white);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card__header {
  padding: var(--space-md);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-black);
  margin-bottom: var(--space-sm);
}

.card__subtitle {
  font-size: 0.9rem;
  color: var(--color-text-light-black);
}

.card__content {
  padding: var(--space-md);
}

.card__footer {
  padding: var(--space-md);
  border-top: 1px solid var(--color-light-gray);
  display: flex;
  gap: var(--space-sm);
}

.card--featured {
  border-color: var(--color-red);
  box-shadow: 0 0 0 2px rgba(243, 76, 97, 0.1);
}
```

---

### Regras Gerais

1. **Use nomes descritivos** (não abrevie sem necessidade)
   - ✅ `.button__icon`
   - ❌ `.btn__ico`

2. **Use nomes em inglês**
   - ✅ `.course-card`
   - ❌ `.cartao-curso`

3. **Evite aninhamento profundo** (máximo 2 níveis)
   - ✅ `.card__header`
   - ❌ `.card__header__title__text`

4. **Use modificadores para estados e variantes**
   - ✅ `.button--active`, `.button--disabled`
   - ❌ `.button-active`, `.active-button`

5. **Atributos dinâmicos podem usar operador ternário em JSX**
   ```jsx
   className={`${styles.button} ${isActive ? styles['button--active'] : ''}`}
   ```

6. **Evite seletores de elemento** em CSS Modules
   - ✅ `.button__icon { ... }`
   - ❌ `.button button { ... }`

7. **Use CSS variables do design-system**
   - ✅ `background: var(--color-red);`
   - ❌ `background: #F34C61;`

---

### Mapeamento de Estilo em Componentes

```jsx
import styles from './MyComponent.module.css';

// Forma 1: Classes simples
<div className={styles.card}>

// Forma 2: Múltiplas classes
<div className={`${styles.card} ${styles['card--featured']}`}>

// Forma 3: Com lógica condicional
<div className={`${styles.card} ${isActive ? styles['card--active'] : ''}`}>

// Forma 4: Array com filter (preferido para múltiplas condições)
<div className={[
  styles.card,
  isActive && styles['card--active'],
  isFeatured && styles['card--featured'],
].filter(Boolean).join(' ')}>
```

---

### Quando NÃO usar nomes compostos

Se o componente é tão simples que tem apenas UMA classe, mantém simples:

```css
/* Bom */
.badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-green);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
}

/* Não precisa de .badge__text ou similares */
```

---

## Checklist para Novo Componente

- [ ] Arquivo nomeado em PascalCase (ex: `CourseCard.module.css`)
- [ ] Classes raiz nomeadas em camelCase (ex: `.courseCard`)
- [ ] Sub-elementos com duplo underscore (ex: `.courseCard__title`)
- [ ] Modificadores com duplo hífen (ex: `.courseCard--featured`)
- [ ] Todas as cores usam CSS variables
- [ ] Responsive com media queries em breakpoints padronizados
- [ ] Transições usam `var(--transition-*)` do design-system
