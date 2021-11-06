exports.config = {
    baseUrl: 'http://automationpractice.com/index.php',

    directConnect: true,
    allScriptsTimeout: 110000,
    getPageTimeout: 60000,


    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

        suites:{
    regression:['./features/store.feature']
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            displayDuration: true,
            durationInMS: true,
        }
    }],
    onPrepare: function() {
        browser.manage().window().maximize();
    },
    cucumberOpts: {
        require: ["./src/step_definitions/*.ts","./src/support/*.ts"],
        'require-module':   [ 'ts-node/register'],
        format: 'json:temp/Reports/results.json',
        strict:  true,
        keepAlive: false,
        'fail-fast': true,
    },
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
          }
    },
    onComplete:function () {
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
    }
};
