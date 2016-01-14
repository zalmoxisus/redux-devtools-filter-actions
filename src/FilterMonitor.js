import { cloneElement, Component, PropTypes } from 'react';
import reducer from './reducers';

export default class FilterMonitor extends Component {
  static update = reducer;

  static propTypes = {
    children: PropTypes.element,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array
  };

  isFiltered(action) {
    return (
      this.props.whitelist && this.props.whitelist.indexOf(action) !== -1 ||
      this.props.blacklist && this.props.blacklist.indexOf(action) === -1
    );
  }

  render() {
    const {
        whitelist, blacklist, monitorState, children,
        stagedActionIds, computedStates,
        ...rest
      } = this.props;
    const filteredStagedActionIds = [];
    const filteredComputedStates = [];

    if (whitelist || blacklist) {
      stagedActionIds.forEach((id, idx) => {
        if (this.isFiltered(rest.actionsById[id].action.type)) {
          filteredStagedActionIds.push(id);
          filteredComputedStates.push(computedStates[idx]);
        }
      });

      rest = {
        ...rest,
        stagedActionIds: filteredStagedActionIds,
        computedStates: filteredComputedStates
      };
    } else {
      rest = {
        ...rest,
        stagedActionIds, computedStates
      };
    }

    const childProps = {
      ...rest,
      monitorState: monitorState.childMonitorState || {}
    };
    return cloneElement(children, childProps);
  }
}
