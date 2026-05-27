# Component Migration Template

Este documento mostra passo a passo como migrar um componente do CSS simples para CSS Modules.

## Antes: Componente com CSS simples

```jsx
// AuthButton.jsx
import './AuthButton.css';

export default function AuthButton({ user, onLogout }) {
  return (
    <div className="auth-button">
      {user ? (
        <>
          <button className="auth-button__user-menu">
            <span className="auth-button__avatar">{user.name}</span>
            <div className="auth-button__dropdown">
              <button onClick={onLogout} className="auth-button__logout">
                Logout
              </button>
            </div>
          </button>
        </>
      ) : (
        <button className="auth-button__signin">Sign In</button>
      )}
    </div>
  );
}
```

```css
/* AuthButton.css */
.auth-button {
  display: flex;
  align-items: center;
  gap: 16px;
}

.auth-button__user-menu {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}

.auth-button__avatar {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #F34C61;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-button__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  min-width: 150px;
  display: none;
  z-index: 1000;
}

.auth-button__user-menu:hover .auth-button__dropdown {
  display: block;
}

.auth-button__logout {
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

.auth-button__logout:hover {
  background: #f1f1f1;
}

.auth-button__signin {
  padding: 10px 20px;
  background: #F34C61;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.auth-button__signin:hover {
  background: #ce3635;
}
```

---

## Depois: Componente com CSS Modules

**Passo 1: Renomear arquivo CSS**
```
AuthButton.css  →  AuthButton.module.css
```

**Passo 2: Simplificar nomes de classe (remove o prefixo do componente)**
```css
/* AuthButton.module.css */
.button {
  display: flex;
  align-items: center;
  gap: 16px;
}

.button__menu {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}

.button__avatar {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-red);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  padding: 8px;
  min-width: 150px;
  display: none;
  z-index: var(--z-dropdown);
}

.button__menu:hover .button__dropdown {
  display: block;
}

.button__logout {
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-black);
}

.button__logout:hover {
  background: var(--color-gray);
}

.button__signin {
  padding: 10px 20px;
  background: var(--color-red);
  color: var(--color-white);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background var(--transition-base);
}

.button__signin:hover {
  background: var(--color-red-second);
}
```

**Passo 3: Atualizar JSX para importar e usar CSS Modules**
```jsx
// AuthButton.jsx
import styles from './AuthButton.module.css';

export default function AuthButton({ user, onLogout }) {
  return (
    <div className={styles.button}>
      {user ? (
        <>
          <button className={styles.button__menu}>
            <span className={styles.button__avatar}>{user.name}</span>
            <div className={styles.button__dropdown}>
              <button onClick={onLogout} className={styles.button__logout}>
                Logout
              </button>
            </div>
          </button>
        </>
      ) : (
        <button className={styles.button__signin}>Sign In</button>
      )}
    </div>
  );
}
```

---

## Resumo das Mudanças

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Arquivo CSS** | `AuthButton.css` | `AuthButton.module.css` |
| **Import** | `import './AuthButton.css'` | `import styles from './AuthButton.module.css'` |
| **Classe de raiz** | `.auth-button` | `.button` |
| **Sub-elementos** | `.auth-button__avatar` | `.button__avatar` |
| **Hard-coded color** | `background: #F34C61` | `background: var(--color-red)` |
| **Z-index hard-coded** | `z-index: 1000` | `z-index: var(--z-dropdown)` |
| **Classe no JSX** | `className="auth-button"` | `className={styles.button}` |

---

## Checklist de Migração

- [ ] Renomear `.css` → `.module.css`
- [ ] Remover prefixo do componente dos nomes de classe
- [ ] Substituir hard-coded colors por variáveis (`var(--color-*)`)
- [ ] Substituir hard-coded z-index por variáveis (`var(--z-*)`)
- [ ] Substituir hard-coded border-radius por variáveis (`var(--radius-*)`)
- [ ] Substituir hard-coded transitions por variáveis (`var(--transition-*)`)
- [ ] Atualizar imports no JSX para `import styles from`
- [ ] Converter todas as classNames para `className={styles.className}`
- [ ] Testar que componente funciona visualmente igual
- [ ] Validar que não há vazamento de CSS (escopo local)
- [ ] Commit e push para PR
