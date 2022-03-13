import { render } from "@testing-library/react";
import { useFocusTrap } from "./useFocusTrap";

const TestComponent = () => {
  const ref = useFocusTrap();

  return (
    <div ref={ref}>
      <button>Button 1</button>
      <a href="link1"></a>
      <textarea />
      <p tabIndex={1} />
    </div>
  );
};

describe("useFocusTrap", () => {
  it.todo("should not add focus trap if ref is not attached to any element");
  it.todo("should not add focus trap if no element is focusable");
  it("should focus the first focusable element by default", () => {
    render(<TestComponent />);

    expect(document.querySelector("button")).toHaveFocus();
  });
  it.todo("should autofocus on elements");
  it.todo("should focus next element on tab click");
  it.todo("should focus first element on tab click at last element");
  it.todo("should focus previous element on shift+tab click");
  it.todo("should focus last element on shift+tab click at first element");
  it.todo(
    "should persist focus on the same element if only 1 element is focusable on click of tab"
  );
  it.todo(
    "should persist focus on the same element if only 1 element is focusable on click of shift+tab"
  );
  it.todo("should not focus on disabled elements");
  it.todo("should not focus on elements with negative tabIndex");
  it.todo(
    "should not focus on natively non-focusable elements with positive tabIndex"
  );
  it.todo("!isAutoFocused.current");
  it.todo(
    "should keep focus on current element in case focusable elements change"
  );
});
