import { cloneElement, Component, PropTypes } from 'react';

export default class FilterMonitor extends Component {
  static update = () => ({});

  static propTypes = {
    children: PropTypes.element,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array
  };

  render() {
    const { whitelist, blacklist, children, ...childProps } = this.props;

    if (whitelist || blacklist) {
      let { stagedActionIds, actionsById } = childProps;
      stagedActionIds = stagedActionIds.filter(id => {
        const action = actionsById[id].action;
        return (
          whitelist && whitelist.indexOf(action.type) !== -1 ||
          blacklist && blacklist.indexOf(action.type) === -1
        );
      });
      childProps = {
        ...childProps,
        stagedActionIds: stagedActionIds
      };
    }

    return cloneElement(children, childProps);
  }
}
