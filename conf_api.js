exports.config = {
    directConnect: false,
    allScriptsTimeout: 110000,
    getPageTimeout: 60000,


    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

        suites:{
    regression:['./features/api.feature']
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            displayDuration: true,
            durationInMS: true,
        }
    }],
    cucumberOpts: {
        require: ["./src/step_definitions/*.ts","./src/support/*.ts"],
        'require-module':   [ 'ts-node/register'],
        format: 'json:temp/Reports/results.json',
        strict:  true,
        keepAlive: false,
        'fail-fast': true,    
    },
    capabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: [ "--headless" ]
          }
    }
};
