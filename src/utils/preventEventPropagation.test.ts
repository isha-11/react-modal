describe("preventEventPropagation props", () => {
  it.each`
    event
    ${"onClick"}
  `("should stop event propagation of $event event", () => {});
});

export {};
