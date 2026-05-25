'use client';

import { useState } from 'react';
import './NameEditModal.css';

export function NameEditModal({
  isOpen,
  currentName,
  onConfirm,
  onCancel,
  loading = false,
}) {
  const [editedName, setEditedName] = useState(currentName || '');
  const [error, setError] = useState('');

  const trimmedName = editedName.trim();
  const isNameValid = trimmedName.length >= 3;
  const isNameChanged = trimmedName !== (currentName?.trim() || '');
  const isSubmitDisabled = loading || !isNameValid || !isNameChanged;

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
    setError('');
  };

  const handleConfirm = async () => {
    if (!isNameValid) {
      setError('Nome deve ter no mínimo 3 caracteres');
      return;
    }

    try {
      await onConfirm(trimmedName);
      setEditedName('');
      setError('');
    } catch (err) {
      setError(err.message || 'Erro ao atualizar nome');
    }
  };

  const handleCancel = () => {
    setEditedName(currentName || '');
    setError('');
    onCancel();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitDisabled) {
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="name-edit-overlay">
      <div className="name-edit-modal">
        <h3 className="name-edit-title">✏️ Editar Nome</h3>

        <div className="name-edit-content">
          <p className="name-edit-hint">
            Este é o nome que aparecerá no seu certificado. Use seu nome completo.
          </p>

          <div className="name-edit-form-group">
            <label htmlFor="name-input" className="name-edit-label">
              Seu nome completo
            </label>
            <input
              id="name-input"
              type="text"
              value={editedName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`name-edit-input ${error ? 'name-edit-input--error' : ''}`}
              placeholder="Digite seu nome"
              disabled={loading}
              autoFocus
            />
            {error && (
              <p className="name-edit-error">{error}</p>
            )}
            {!error && editedName && (
              <p className="name-edit-char-count">
                {trimmedName.length} caracteres
              </p>
            )}
          </div>

          <div className="name-edit-preview">
            <p className="name-edit-preview-label">Prévia no certificado:</p>
            <p className="name-edit-preview-text">
              {trimmedName || '(seu nome aqui)'}
            </p>
          </div>
        </div>

        <div className="name-edit-actions">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="name-edit-btn name-edit-btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitDisabled}
            className="name-edit-btn name-edit-btn-confirm"
            title={!isNameValid ? 'Nome deve ter no mínimo 3 caracteres' : !isNameChanged ? 'Nenhuma alteração no nome' : 'Salvar novo nome'}
          >
            {loading ? (
              <>
                <span className="name-edit-spinner" aria-hidden="true" />
                Salvando...
              </>
            ) : (
              '✓ Salvar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
