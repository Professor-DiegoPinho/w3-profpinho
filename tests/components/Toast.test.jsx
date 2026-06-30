/**
 * Teste de componente: Toast
 *
 * Testa a renderização condicional do componente Toast,
 * verificando ícones, mensagens e comportamento de visibilidade.
 *
 * @environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toast } from '@/components/Toast/Toast';

// Mock do CSS import (jsdom não processa CSS modules)
vi.mock('@/components/Toast/Toast.css', () => ({}));

describe('Toast — Teste de Componente', () => {
  afterEach(() => {
    cleanup();
  });

  it('não deve renderizar nada quando isVisible é false', () => {
    const { container } = render(
      <Toast message="Teste" type="success" isVisible={false} />
    );

    expect(container.innerHTML).toBe('');
  });

  it('deve renderizar a mensagem quando isVisible é true', () => {
    render(
      <Toast message="Operação realizada!" type="success" isVisible={true} />
    );

    expect(screen.getByText('Operação realizada!')).toBeInTheDocument();
  });

  it('deve exibir ícone de sucesso (✓) para type="success"', () => {
    render(
      <Toast message="Salvo" type="success" isVisible={true} />
    );

    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('deve exibir ícone de erro (✕) para type="error"', () => {
    render(
      <Toast message="Falha" type="error" isVisible={true} />
    );

    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('deve aplicar a classe CSS correta com base no type', () => {
    const { container } = render(
      <Toast message="Info" type="error" isVisible={true} />
    );

    const toastElement = container.querySelector('.toast');
    expect(toastElement).toHaveClass('toast-error');
  });

  it('deve usar type="success" como padrão quando não informado', () => {
    const { container } = render(
      <Toast message="Padrão" isVisible={true} />
    );

    const toastElement = container.querySelector('.toast');
    expect(toastElement).toHaveClass('toast-success');
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('não deve exibir ícone para types desconhecidos', () => {
    render(
      <Toast message="Custom" type="warning" isVisible={true} />
    );

    // Nenhum ícone padrão para "warning"
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
    expect(screen.queryByText('✕')).not.toBeInTheDocument();

    // Mas a mensagem deve estar presente
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });
});
