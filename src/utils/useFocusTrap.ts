import { RefObject, useEffect, useRef } from "react";

/**
 * Attach `ref` to the HTMLElement within which focus needs to be trapped.
 * @returns {ref} ref
 */
export const useFocusTrap = () => {
  const ref: RefObject<any> = useRef(null);
  const isAutoFocused = useRef(false);
  const currentFocusIdxRef = useRef(0); // is a ref because index shouldn't be reset on each effect rerun.

  useEffect(() => {
    const containerRef = ref.current;
    if (!containerRef) {
      return;
    }

    const focusableElements = [
      ...containerRef.querySelectorAll(focusableElementsList),
    ];

    if (focusableElements.length === 0) {
      return;
    }

    const updateFocus = (element: Element | null) => {
      const idx = focusableElements.indexOf(element);
      if (idx !== -1) {
        currentFocusIdxRef.current = idx;
      }
    };

    updateFocus(document.activeElement);

    // Should not auto focus in eventual reruns of effect if focus is already set once.
    if (!isAutoFocused.current) {
      focusableElements[currentFocusIdxRef.current].focus();
      isAutoFocused.current = true;
    }

    const focusTrap = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();

        if (event.shiftKey) {
          currentFocusIdxRef.current =
            currentFocusIdxRef.current === 0
              ? focusableElements.length - 1
              : currentFocusIdxRef.current - 1;
        } else {
          currentFocusIdxRef.current =
            currentFocusIdxRef.current === focusableElements.length - 1
              ? 0
              : currentFocusIdxRef.current + 1;
        }

        focusableElements[currentFocusIdxRef.current].focus();
      }
    };

    // Update current focus when user focuses an element manually using mouse click
    const clickHandler = (event: MouseEvent) => {
      event.target instanceof Element && updateFocus(event.target);
    };

    containerRef.addEventListener("keydown", focusTrap);
    focusableElements.forEach((element) =>
      element.addEventListener("click", clickHandler)
    );

    return () => {
      focusableElements.forEach((element) =>
        element.removeEventListener("click", clickHandler)
      );
      containerRef.removeEventListener("keydown", focusTrap);
    };
  }, []);

  return ref;
};

const focusableElementsList =
  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex], [contenteditable]";
