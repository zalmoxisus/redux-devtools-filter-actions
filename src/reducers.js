function childMonitorState(props, state, action) {
  const child = props.children;
  return child.type.update(child.props, state, action);
}

export default function reducer(props, state = {}, action) {
  return {
    childMonitorState: childMonitorState(props, state.childMonitorState, action)
  };
}
