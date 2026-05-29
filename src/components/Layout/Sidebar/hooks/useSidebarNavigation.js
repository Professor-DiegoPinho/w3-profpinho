import { isModifiedClick } from '@/components/Layout/utils/utils';
import { useCallback } from 'react';

export function useSidebarNavigation({ onLinkClick, onNavigateStart }) {
  return useCallback(
    (event, targetPath) => {
      if (!isModifiedClick(event) && !event.defaultPrevented && onNavigateStart) {
        onNavigateStart(targetPath);
      }

      onLinkClick?.();
    },
    [onLinkClick, onNavigateStart],
  );
}