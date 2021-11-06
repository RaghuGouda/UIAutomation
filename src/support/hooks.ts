import {After, BeforeAll, setDefaultTimeout} from 'cucumber';
import { browser} from 'protractor';
import { config } from "../../protractor.conf";

setDefaultTimeout(15000);

BeforeAll({timeout: 100 * 1000}, async () => {
    browser.waitForAngularEnabled(false);
    await browser.get(config.baseUrl);
});

After(function(scenario,done)
{
    const world = this;
    if (scenario.result.status === 'failed') {
        browser.takeScreenshot().then(function (stream) {
            let decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            world.attach(decodedImage, 'image/png');
        }).then(function () {
            done();
        });
    }else {
        done();
    }
});

