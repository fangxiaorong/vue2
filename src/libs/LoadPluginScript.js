function LoadPluginScript(path, callback) {
  if (!LoadPluginScript.scripts) {
    LoadPluginScript.scripts = {};
    LoadPluginScript.container = document.getElementsByTagName('head')[0];
  }
  
  if (!LoadPluginScript.scripts[path]) {
    const el = document.createElement('script');
    el.onload = el.onerror = el.onreadystatechange = (() => {
      const loaded = LoadPluginScript.scripts[path].loaded;
      if (el.readyState && !(/^c|loade/.test(el.readyState)) || loaded) {
        return;
      }
      el.onload = el.onreadystatechange = null;
      LoadPluginScript.scripts[path].loaded = true;

      if (callback) {
        callback();
      }
    });

    el.async = false;
    el.src = `static/plugin/${path}`;
    LoadPluginScript.container.insertBefore(el, LoadPluginScript.container.lastChild);
    LoadPluginScript.scripts[path] = { loaded: false };
  }

  ///static/plugin/prism/components
}

export default LoadPluginScript;