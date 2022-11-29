const Store = require('electron-store');

const schema = {
  autoStart: {
		type: 'boolean',
		default: false
	},
	workMinute: {
		type: 'number',
		maximum: 240,
		minimum: 1,
		default: 50
	},
	isFirstInstall: {
		type: 'boolean',
		default: true
	},
	sleepMinute: {
		type: 'number',
		maximum: 120,
		minimum: 1,
		default: 5
	},
  blankMinute: {
    type: 'number',
		maximum: 60,
		minimum: 1,
		default: 10
  },
	adSettings: {
		type: 'object',
		default: {
			width: 400,
			height: 300
		}
	},
	sleepHtml: {
		type: 'string',
		default: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="script-src 'self' 'unsafe-inline'"
    />
    <title>休息</title>
    <style type="text/css">
      html, body {
        padding:0;
        margin:0;
      }
      .main_body {
      	color: yellow;
      }
    </style>
  </head>
  <body>
    <div class="main_body" style="width: 100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;justify-content: center;align-items: center;">休息一下</div>
  </body>
</html>
		`
	},
	adHtml: {
		type: 'string',
		default: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="script-src 'self' 'unsafe-inline'"
    />
    <title>休息</title>
    <style type="text/css">
      html, body {
        padding:0;
        margin:0;
      }
      .main_body {
      	color: yellow;
      }
    </style>
  </head>
  <body>
    <div class="main_body" style="width: 100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;justify-content: center;align-items: center;">休息一下</div>
  </body>
</html>
		`
	}
};

const store = new Store({schema});
export default store;