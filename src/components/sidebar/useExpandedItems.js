"use client";

import { useEffect, useState } from 'react';

const SIDEBAR_EXPANDED_ITEMS_KEY = 'sidebar-expanded-items';

export default function useExpandedItems() {
  const [expandedItems, setExpandedItems] = useState({});
  const [hasLoadedExpandedLessons, setHasLoadedExpandedLessons] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(SIDEBAR_EXPANDED_ITEMS_KEY);

      if (!storedValue) {
        return;
      }

      const parsedValue = JSON.parse(storedValue);

      if (parsedValue && typeof parsedValue === 'object') {
        setExpandedItems(parsedValue);
      }
    } catch {
      setExpandedItems({});
    } finally {
      setHasLoadedExpandedLessons(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedExpandedLessons) {
      return;
    }

    try {
      localStorage.setItem(
        SIDEBAR_EXPANDED_ITEMS_KEY,
        JSON.stringify(expandedItems)
      );
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Falha ao persistir estado dos toggles da sidebar:', error);
      }
    }
  }, [expandedItems, hasLoadedExpandedLessons]);

  return [expandedItems, setExpandedItems];
}
