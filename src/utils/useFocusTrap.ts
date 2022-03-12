import { RefObject, useEffect, useRef } from "react";

/**
 * Attach `ref` to the HTMLElement within which focus needs to be trapped.
 * @returns {ref} ref
 */
export const useFocusTrap = () => {
  const ref: RefObject<any> = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const focusableElements = [
      ...ref.current.querySelectorAll(focusableElementsList),
    ];

    if (focusableElements.length === 0) {
      return;
    }

    let currentFocusIdx = 0;
    focusableElements[currentFocusIdx].focus();

    const focusTrap = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();

        if (event.shiftKey) {
          currentFocusIdx =
            currentFocusIdx === 0
              ? focusableElements.length - 1
              : currentFocusIdx - 1;
        } else {
          currentFocusIdx =
            currentFocusIdx === focusableElements.length - 1
              ? 0
              : currentFocusIdx + 1;
        }

        focusableElements[currentFocusIdx].focus();
      }
    };

    // Update current focus when user focuses an element manually using mouse click
    function updateFocus(event: FocusEvent) {
      const idx = focusableElements.indexOf(event.target);
      if (idx !== -1) {
        currentFocusIdx = idx;
      }
    }

    window.addEventListener("keydown", focusTrap);
    focusableElements.forEach((element) =>
      element.addEventListener("click", updateFocus)
    );

    return () => {
      focusableElements.forEach((element) =>
        element.removeEventListener("click", updateFocus)
      );
      window.removeEventListener("keydown", focusTrap);
    };
  }, [ref.current]);

  return ref;
};

const focusableElementsList =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex], [contenteditable]";
