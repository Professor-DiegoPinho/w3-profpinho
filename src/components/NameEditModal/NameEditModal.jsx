'use client';

import { useState } from 'react';
import styles from './NameEditModal.module.css';
import * as Icons from '@/assets/icons';

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>
          <Icons.Edit size={20} /> Editar Nome
        </h3>

        <div className={styles.content}>
          <p className={styles.hint}>
            Este é o nome que aparecerá no seu certificado. Use seu nome completo.
          </p>

          <div className={styles.formGroup}>
            <label htmlFor="name-input" className={styles.label}>
              Seu nome completo
            </label>
            <input
              id="name-input"
              type="text"
              value={editedName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="Digite seu nome"
              disabled={loading}
              autoFocus
            />
            {error && (
              <p className={styles.error}>{error}</p>
            )}
            {!error && editedName && (
              <p className={styles.charCount}>
                {trimmedName.length} caracteres
              </p>
            )}
          </div>

          <div className={styles.preview}>
            <p className={styles.previewLabel}>Prévia no certificado:</p>
            <p className={styles.previewText}>
              {trimmedName || '(seu nome aqui)'}
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitDisabled}
            className={`${styles.btn} ${styles.btnConfirm}`}
            title={!isNameValid ? 'Nome deve ter no mínimo 3 caracteres' : !isNameChanged ? 'Nenhuma alteração no nome' : 'Salvar novo nome'}
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
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
