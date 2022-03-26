import { useEffect, useMemo } from "react";

/**
 * `useRestoreTriggerFocus` restores focus on last active element.
 */
export const useRestoreTriggerFocus = () => {
  const lastActiveElement = useMemo(() => document.activeElement, []);

  useEffect(() => {
    return () => {
      if (lastActiveElement instanceof HTMLElement) {
        lastActiveElement.focus();
      }
    };
  }, [lastActiveElement]);
};
