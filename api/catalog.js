exports = module.exports = exports = module.exports = function() {
  var mod = {
    fileCallback: async function(callback, errorCallback, key, method, data, headers) {
      if (!app.has(method)) method = "GET";
      if (!app.has(headers)) headers = {};
      if (!app.has(headers["file-type"])) headers["file-type"] = "*";
      headers.authorization = config.catalog.authorization;
      var url = config.catalog.link + key;
      if (config.api.log.url === true) console.log(method, url);
      var options = {
        method: method,
        headers: headers
      };
      if (app.has(data)) options.body = JSON.stringify(data);
      var result = await fetch(url, options);
      var text= await result.text();
      if (result.status === 200) {
        try {
          var json = JSON.parse(text);
        } catch(error) {};
        if (app.has(json)) callback(json); else callback(text);
      } else {
        errorCallback("Could not load " + url, text);
      }
    }
  };
  return mod;
};