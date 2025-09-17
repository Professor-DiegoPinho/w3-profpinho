# Sidebar Mobile - Documentação

## Visão Geral

A sidebar foi tornada totalmente funcional em dispositivos móveis com um sistema de menu hambúrguer responsivo e intuitivo.

## Recursos Implementados

### 🍔 Menu Hambúrguer
- **Localização**: Canto superior esquerdo (posição fixa)
- **Design**: Ícone de três linhas que se transforma em X quando aberto
- **Animação**: Transição suave de 0.3s
- **Cores**: Fundo preto com hover vermelho

### 📱 Sidebar Responsiva
- **Desktop**: Sempre visível (largura: 280px)
- **Mobile**: Escondida por padrão, overlay completo quando aberta
- **Largura Mobile**: 100% da tela (máximo 320px)
- **Animação**: Desliza da esquerda para direita

### 🔄 Comportamento Inteligente
- **Auto-fechamento**: Fecha automaticamente ao clicar em links de navegação
- **Overlay**: Fundo escuro semitransparente para melhor UX
- **Detecção**: Detecta automaticamente mudanças de tamanho de tela

## Estrutura de Arquivos

### Componentes Modificados

1. **`src/components/Layout.js`**
   - Adicionado estado `isSidebarOpen` e `isMobile`
   - Detecta mudanças de tamanho de tela
   - Renderiza botão hambúrguer e overlay
   - Gerencia abertura/fechamento da sidebar

2. **`src/components/Sidebar.js`**
   - Aceita props para controle mobile
   - Fecha automaticamente ao clicar em links
   - Suporte a classes condicionais

### Estilos CSS Adicionados

3. **`src/app/globals.css`**
   - `.hamburger-button`: Estilos do botão hambúrguer
   - `.hamburger-line`: Animação das linhas do ícone
   - `.sidebar-overlay`: Overlay de fundo
   - `.sidebar-mobile`: Estados mobile da sidebar
   - Media queries atualizadas

## Funcionalidades

### Estados da Sidebar
- **Desktop**: Sempre aberta e visível
- **Mobile Fechada**: `transform: translateX(-100%)`
- **Mobile Aberta**: `transform: translateX(0)`

### Interações do Usuário
1. **Abrir menu**: Toque no botão hambúrguer
2. **Fechar menu**: 
   - Toque no botão hambúrguer novamente
   - Toque no overlay (fundo escuro)
   - Toque em qualquer link de navegação

### Responsividade
- **Breakpoint**: 768px
- **Transições**: 0.3s ease para todas as animações
- **Z-index**: Gerenciamento de camadas apropriado

## Detalhes Técnicos

### Hooks Utilizados
- `useState`: Controle de estado da sidebar
- `useEffect`: Detecção de resize e mudanças de rota

### Classes CSS Dinâmicas
```javascript
className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}
```

### Animações CSS
- **Botão hambúrguer**: Rotação das linhas em X
- **Sidebar**: Slide horizontal
- **Overlay**: Fade in/out

## Compatibilidade

### Dispositivos Testados
- ✅ Smartphones (< 768px)
- ✅ Tablets (768px - 1024px)
- ✅ Desktop (> 1024px)

### Navegadores
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Acessibilidade

### Recursos de Acessibilidade
- **aria-label**: "Abrir menu" no botão hambúrguer
- **Navegação por teclado**: Totalmente suportada
- **Screen readers**: Compatível
- **Contraste**: Cores atendem aos padrões WCAG

## Melhorias Futuras

### Possíveis Enhancements
- **Swipe gestures**: Deslizar para abrir/fechar
- **Posição personalizável**: Sidebar direita ou esquerda
- **Temas**: Modo escuro/claro
- **Animações avançadas**: Micro-interações
- **Persistência**: Lembrar estado preferido do usuário

## Troubleshooting

### Problemas Comuns

1. **Botão não aparece no mobile**
   - Verificar se a largura da tela é < 768px
   - Confirmar que o CSS está carregado

2. **Sidebar não abre**
   - Verificar estado `isSidebarOpen`
   - Confirmar classes CSS aplicadas

3. **Animações não funcionam**
   - Verificar propriedades `transition` no CSS
   - Confirmar que não há conflitos de CSS

### Debug
- Use as DevTools do navegador para inspecionar classes
- Verifique o estado dos componentes no React DevTools
- Teste em diferentes tamanhos de tela