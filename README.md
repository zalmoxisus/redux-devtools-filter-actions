Redux DevTools Filter Actions
==============================

A composable monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools) with the ability to specify actions to be hidden (blacklisted) or shown (whitelisted).

### Installation

```
npm install --save-dev redux-devtools-filter-actions
```

### Usage

Wrap any other Redux DevTools monitor in `FilterMonitor`. For example, you can use it together with [`LogMonitor`](https://github.com/gaearon/redux-devtools-log-monitor):

##### `containers/DevTools.js`

```js
import React from 'react';
import { createDevTools } from 'redux-devtools';
import FilterMonitor from 'redux-devtools-filter-actions';
import LogMonitor from 'redux-devtools-log-monitor';

export default createDevTools(
  <FilterMonitor blacklist={['ACTION1', 'ACTION2']}>
    <LogMonitor />
  </FilterMonitor>
);
```

Also, you can wrap it into the [`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor) to make it dockable.

[Read how to start using Redux DevTools.](https://github.com/gaearon/redux-devtools)

### Props

Name                  | Description
-------------         | -------------
`blacklist`           | An array of actions to be hidden in the child monitor.
`whitelist`           | An array of actions to be shown. If specified, other than those actions will be hidden (the 'blacklist' parameter will be ignored).

### License

MIT
