'use strict';
const prettyJson = require('prettyjson');
const {Before, Given, When, Then} = require('cucumber');

const stepContext = {};

const prettyPrintJson = function(json) {
    const output = {
        stepContext,
        testOutput: json,
    };

    return prettyJson.render(output, {
        noColor: true,
    });
};

const callbackWithAssertion = function(callback, assertion) {
    if (assertion.success) {
        callback();
    } else {
        callback(prettyPrintJson(assertion));
    }
};

Given(/^I set (.*) header to (.*)$/, function(headerName,headerValue, callback) {
    if(headerName === "Authorization"){
        let value= "Bearer "+headerValue;
        this.apickli.addRequestHeader(headerName,value);
    }else{
        this.apickli.addRequestHeader(headerName,headerValue)
    }
    callback();
  });

Given(/^I pipe contents of file (.*) to body$/, function(file, callback) {
    this.apickli.pipeFileContentsToRequestBody(file, function(error) {
      if (error) {
        callback(new Error(error));
      }
  
      callback();
    });
  });

  
Before(function(scenarioResult, callback) {
    callback();
});

When(/^I POST to (.*)$/, function(resource, callback) {
    this.apickli.post(resource, function(error, response) {
      if (error) {
        callback(new Error(error));
      }
  
      callback();
    });
  });

  When(/^I PUT (.*)$/, function(resource, callback) {
    this.apickli.put(resource, function(error, response) {
      if (error) {
        callback(new Error(error));
      }
  
      callback();
    });
  });
  
When(/^I GET (.*)$/, function(resource, callback)  {
    this.apickli.get(resource, function(error, response) {
        if (error) {
            callback(new Error(error));
        }
        callback();
    });
});

When(/^I DELETE (.*)$/, function(resource, callback) {
    this.apickli.delete(resource, function(error, response) {
      if (error) {
        callback(new Error(error));
      }
  
      callback();
    });
  });
  
Then(/^response code should be (.*)$/, function(responseCode, callback) {
    const assertion = this.apickli.assertResponseCode(responseCode);
    callbackWithAssertion(callback, assertion);
});

Then(/^I store the value of body path (.*) as (.*) in global scope$/, function(path, variableName, callback) {
    this.apickli.storeValueOfResponseBodyPathInGlobalScope(path, variableName);
    callback();
});

Then(/^response body path (.*) should be (((?!of type).*))$/, function(path, value, callback) {
    const assertion = this.apickli.assertPathInResponseBodyMatchesExpression(path, value);
    callbackWithAssertion(callback, assertion);
  });

  Then(/^response body should not contain (.*)$/, function(expression, callback) {
    const assertion = this.apickli.assertResponseBodyContainsExpression(expression);
    assertion.success = !assertion.success;
    callbackWithAssertion(callback, assertion);
  });

Then(/^I wait for (\d+) seconds$/,function(pause,callback){
    setTimeout(callback,pause*1000);
});