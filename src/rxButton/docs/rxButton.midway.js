var rxButtonPage = require('../rxButton.page.js').rxButton;

describe('rxButton', function () {
    var rxButton;

    before(function () {
        demoPage.go('#/component/rxButton');
        rxButton = rxButtonPage.initialize($('rx-button'));
    });

    it('should show element', function () {
        expect(rxButton.rootElement.isDisplayed()).to.eventually.be.true;
    });
});
