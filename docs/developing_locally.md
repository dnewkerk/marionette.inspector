## Installing the Extension in Chrome

### 1. Download the Extension
```bash
git clone git@github.com:MarionetteLabs/marionette.inspector.git
```

### 2. Build the extension

```bash
grunt build
```


### 3. Install in Chrome
```
1. go to the Extensions tab in chrome > Window
2. check the "Developer Mode" checkbox
3. click the "Load unpacked extension" and select the extension folder in the repo
```


---

## agent

### Testing locally

A good way to test the agent is to run it locally in the `index.html` of the
app you want to inspect.

```html
<script src="http://localhost:4001/build/localAgent.js"></script>
````

```bash
cd extension/js/agent
python -m SimpleHTTPServer 4001
```

Including the `localAgent` directly this way, is easier than
debugging the `agent` when it's injected into the window via the extension.
