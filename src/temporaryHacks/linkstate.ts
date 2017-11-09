function dlv(obj: any, key: string | string[], def?: any, p?: any) {
  p = 0;
  key = (key as string).split ? (key as string).split(".") : key;
  while (obj && p < key.length) {
    obj = obj[key[p++]];
  }
  return obj === undefined ? def : obj;
}

/** Create an Event handler function that sets a given state property.
 *  @param {Component} component  The component whose state should be updated
 *  @param {string} key        A dot-notated key path to update in the component's state
 *  @param {string} eventPath    A dot-notated key path to the value that should be retrieved from the Event or component
 *  @returns {function} linkedStateHandler
 */
function linkState(component: any, key: string, eventPath?: string) {
  const path = key.split(".");
  const cache = component.__lsc || (component.__lsc = {});

  return (
    cache[key + eventPath] ||
    (cache[key + eventPath] = function(e: any) {
      const t = (e && e.target) || this;
      const state = {};
      const v =
        typeof eventPath === "string"
          ? dlv(e, eventPath)
          : t.nodeName ? (t.type.match(/^che|rad/) ? t.checked : t.value) : e;

      let obj = state;
      let i = 0;

      for (; i < path.length - 1; i++) {
        obj =
          obj[path[i]] ||
          (obj[path[i]] = (!i && component.state[path[i]]) || {});
      }
      obj[path[i]] = v;
      component.setState(state);
    })
  );
}

export default linkState;
