# tiny-conf


```js
const conf = require('tiny-conf');
```

### API
**.get(path)**: {*}  
returns the `value` stored at that path or `undefined`  

**.set(path, value)**: {boolean}  
stores `value` at `path` location  
returns `true` on success, `false` otherwise

**.merge(path, value)**: {boolean}  
merges `value` at `path` location  
returns `true` on success, `false` otherwise

**.clear()**: undefined  
removes everything from the store

**.print()**: undefined  
outputs the current `store` content using `console.dir()`

### Acknowledgements
In-memory store type is from *indexzero*'s [`nconf`](https://github.com/indexzero/nconf/blob/master/lib/nconf/stores/memory.js) module.
