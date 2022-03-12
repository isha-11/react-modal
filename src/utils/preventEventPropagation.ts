const stopEvent = (event: any) => event.stopPropagation();

export const preventEventPropagationProps = {
  onClick: stopEvent,
  onContextMenu: stopEvent,
  onDoubleClick: stopEvent,
  onDrag: stopEvent,
  onDragEnd: stopEvent,
  onDragEnter: stopEvent,
  onDragExit: stopEvent,
  onDragLeave: stopEvent,
  onDragOver: stopEvent,
  onDragStart: stopEvent,
  onDrop: stopEvent,
  onMouseDown: stopEvent,
  onMouseEnter: stopEvent,
  onMouseLeave: stopEvent,
  onMouseMove: stopEvent,
  onMouseOver: stopEvent,
  onMouseOut: stopEvent,
  onMouseUp: stopEvent,

  onKeyDown: stopEvent,
  onKeyPress: stopEvent,
  onKeyUp: stopEvent,

  onFocus: stopEvent,
  onBlur: stopEvent,

  onChange: stopEvent,
  onInput: stopEvent,
  onInvalid: stopEvent,
  onSubmit: stopEvent,
};
