import { cloneElement, Component, PropTypes } from 'react';
import reducer from './reducers';

export default class FilterMonitor extends Component {
  static update = reducer;

  static propTypes = {
    children: PropTypes.element,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array
  };

  render() {
    const { whitelist, blacklist, monitorState, children, ...rest } = this.props;

    if (whitelist || blacklist) {
      let { stagedActionIds, actionsById } = rest;
      stagedActionIds = stagedActionIds.filter(id => {
        const action = actionsById[id].action;
        return (
          whitelist && whitelist.indexOf(action.type) !== -1 ||
          blacklist && blacklist.indexOf(action.type) === -1
        );
      });

      rest = {
        ...rest,
        stagedActionIds: stagedActionIds
      };
    }

    const childProps = {
      ...rest,
      monitorState: monitorState.childMonitorState || {}
    };
    return cloneElement(children, childProps);
  }
}
