"use client";

import styles from "./SearchInput.module.css";
import * as Icons from "@/assets/icons";

export default function SearchInput({ value, onChange, onClear }) {
  const isClearable = value && value.trim().length > 0;

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Buscar nos meus favoritos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      <Icons.Search size={18} className={styles.searchIcon} />
      {isClearable && (
        <button
          onClick={onClear}
          className={styles.searchClearBtn}
          aria-label="Limpar busca"
          title="Limpar busca"
          type="button"
        >
          <Icons.Close size={18} />
        </button>
      )}
    </div>
  );
}
