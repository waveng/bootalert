/// <reference path="../../../bootalert.js" />
/// <reference path="../qunit/qunit.js" />
(function () {
    var iconClasses = {
        error: 'bootalert-error',
        info: 'bootalert-info',
        success: 'bootalert-success',
        warning: 'bootalert-warning'
    };
    var positionClasses = {
        topRight: 'bootalert-top-right',
        bottomRight: 'bootalert-bottom-right',
        bottomLeft: 'bootalert-bottom-left',
        topLeft: 'bootalert-top-left',
        topCenter: 'bootalert-top-center',
        bottomCenter: 'bootalert-bottom-center'
    };
    var sampleMsg = 'I don\'t think they really exist';
    var sampleTitle = 'TEST';
    var selectors = {
        container: 'div#bootalert-container',
        bootalertInfo: 'div#bootalert-container > div.bootalert-info',
        bootalertWarning: 'div#bootalert-container > div.bootalert-success',
        bootalertError: 'div#bootalert-container > div.bootalert-error',
        bootalertSuccess: 'div#bootalert-container > div.bootalert-success'
    };

    bootalert.options = {
        timeOut: 2000,
        extendedTimeOut: 0,
        fadeOut: 0,
        fadeIn: 0,
        showDuration: 0,
        hideDuration: 0,
        debug: false
    };

    var delay = bootalert.options.timeOut + 500;

    // 'Clears' must go first
    module('clear');
    asyncTest('clear - show 3 bootalerts, clear the 2nd', 1, function () {
        //Arrange
        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        $bootalert[2] = bootalert.info(sampleMsg, sampleTitle + '-3');
        var $container = bootalert.getContainer();
        //Act
        bootalert.clear($bootalert[1]);
        //Assert
        setTimeout(function () {
            ok($container && $container.children().length === 2);
            //Teardown
            resetContainer();
            start();
        }, 1000);
    });
    asyncTest('clear - show 3 bootalerts, clear all 3, 0 left', 1, function () {
        //Arrange
        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        $bootalert[2] = bootalert.info(sampleMsg, sampleTitle + '-3');
        var $container = bootalert.getContainer();
        //Act
        bootalert.clear();
        //Assert
        setTimeout(function () {
            ok($container && $container.children().length === 0);
            //Teardown
            resetContainer();
            start();
        }, delay);
    });
    test('clear - after clear with force option bootalert with focus disappears', 1, function () {
        //Arrange
        var $bootalert;
        var msg = sampleMsg + '<br/><br/><button type="button">Clear</button>';
        //Act
        $bootalert = bootalert.info(msg, sampleTitle + '-1');
        $bootalert.find('button').focus();
        bootalert.clear($bootalert, { force: true });
        var $container = bootalert.getContainer();
        //Assert
        ok($container && $container.children().length === 0, 'Focused bootalert after a clear with force is not visible');
        //Teardown
        resetContainer();
    });
    asyncTest('clear and show - show 2 bootalerts, clear both, then show 1 more', 2, function () {
        //Arrange
        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        var $container = bootalert.getContainer();
        bootalert.clear();
        //Act
        setTimeout(function () {
            $bootalert[2] = bootalert.info(sampleMsg, sampleTitle + '-3-Visible');
            //Assert
            equal($bootalert[2].find('div.bootalert-title').html(), sampleTitle + '-3-Visible', 'Finds bootalert after a clear');
            ok($bootalert[2].is(':visible'), 'bootalert after a clear is visible');
            //Teardown
            resetContainer();
            start();
        }, delay);
    });
    asyncTest('clear and show - clear removes bootalert container', 2, function () {
        //Arrange
        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        var $container = bootalert.getContainer();
        bootalert.clear();
        //Act
        setTimeout(function () {
            //Assert
            equal($(selectors.container).length, 0, 'bootalert container does not exist');
            ok(!$bootalert[1].is(':visible'), 'bootalert after a clear is visible');
            //Teardown
            resetContainer();
            start();
        }, delay);
    });
    asyncTest('clear and show - after clear new bootalert creates container', 1, function () {
        //Arrange
        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        var $container = bootalert.getContainer();
        bootalert.clear();
        //Act
        setTimeout(function () {
            $bootalert[2] = bootalert.info(sampleMsg, sampleTitle + '-3-Visible');
            //Assert
            equal($(selectors.container).find('div.bootalert-title').html(), sampleTitle + '-3-Visible', 'Finds bootalert after a clear'); //Teardown
            resetContainer();
            start();
        }, delay);
    });
    asyncTest('clear and show - clear bootalert after hover', 1, function () {
        //Arrange
        var $bootalert = bootalert.info(sampleMsg, sampleTitle);
        var $container = bootalert.getContainer();
        $bootalert.trigger("mouseout");
        //Act
        setTimeout(function () {
            //Assert
            ok($container.find('div.bootalert-title').length === 0, 'bootalert clears after a mouse hover'); //Teardown
            resetContainer();
            start();
        }, 500);
    });
    asyncTest('clear and show - do not clear bootalert after hover', 1, function () {
        //Arrange
        var $bootalert = bootalert.info(sampleMsg, sampleTitle, { closeOnHover: false });
        var $container = bootalert.getContainer();
        $bootalert.trigger("mouseout");
        //Act
        setTimeout(function () {
            //Assert
            ok($container.find('div.bootalert-title').length === 1, 'bootalert does not clear after a mouse hover'); //Teardown
            resetContainer();
            start();
        }, 500);
    });
    test('clear and show - after clear all bootalerts new bootalert still appears', 1, function () {
        //Arrange
        var $bootalert = [];
        //Act
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle + '-1');
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle + '-2');
        bootalert.clear();
        $bootalert[2] = bootalert.info(sampleMsg, sampleTitle + '-3-Visible');
        //Assert
        ok($bootalert[2].is(':visible'), 'bootalert after a clear is visible');
        //Teardown
        resetContainer();
    });
    module('info');
    test('info - pass title and message', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.info(sampleMsg, sampleTitle);
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), sampleTitle, 'Sets title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.info), 'Sets info icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('info - pass message, but no title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.info(sampleMsg);
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets null title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.info), 'Sets info icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('info - pass no message nor title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.info(); //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets null title');
        equal($bootalert.find('div.bootalert-message').html(), null, 'Sets message');
        ok($bootalert.hasClass(iconClasses.info), 'Sets info icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    module('warning');
    test('warning - pass message and title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.warning(sampleMsg, sampleTitle);
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), sampleTitle, 'Sets title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.warning), 'Sets warning icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('warning - pass message, but no title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.warning(sampleMsg);
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets empty title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.warning), 'Sets warning icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('warning - no message nor title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.warning('');
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets null title');
        equal($bootalert.find('div.bootalert-message').length, 0, 'Sets empty message');
        ok($bootalert.hasClass(iconClasses.warning), 'Sets warning icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    module('error');
    test('error - pass message and title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.error(sampleMsg, sampleTitle);
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), sampleTitle, 'Sets title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.error), 'Sets error icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('error - pass message, but no title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.error(sampleMsg); //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets empty title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.error), 'Sets error icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('error - no message nor title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.error('');
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets empty title');
        equal($bootalert.find('div.bootalert-message').length, 0, 'Sets empty message');
        ok($bootalert.hasClass(iconClasses.error), 'Sets error icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    module('success');
    test('success - pass message and title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), sampleTitle, 'Sets title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.success), 'Sets success icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('success - pass message, but no title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets empty title');
        equal($bootalert.find('div.bootalert-message').html(), sampleMsg, 'Sets message');
        ok($bootalert.hasClass(iconClasses.success), 'Sets success icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('success - no message nor title', 3, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('div.bootalert-title').length, 0, 'Sets null title');
        equal($bootalert.find('div.bootalert-message').length, 0, 'Sets empty message');
        ok($bootalert.hasClass(iconClasses.success), 'Sets success icon'); //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });


    module('escape html', {
        teardown: function () {
            bootalert.options.escapeHtml = false;
        }
    });
    test('info - escape html', 2, function () {
        //Arrange
        bootalert.options.escapeHtml = true;
        //Act
        var $bootalert = bootalert.info('html <strong>message</strong>', 'html <u>title</u>');
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), 'html &lt;u&gt;title&lt;/u&gt;', 'Title is escaped');
        equal($bootalert.find('div.bootalert-message').html(), 'html &lt;strong&gt;message&lt;/strong&gt;', 'Message is escaped');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('warning - escape html', 2, function () {
        //Arrange
        bootalert.options.escapeHtml = true;
        //Act
        var $bootalert = bootalert.warning('html <strong>message</strong>', 'html <u>title</u>');
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), 'html &lt;u&gt;title&lt;/u&gt;', 'Title is escaped');
        equal($bootalert.find('div.bootalert-message').html(), 'html &lt;strong&gt;message&lt;/strong&gt;', 'Message is escaped');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('error - escape html', 2, function () {
        //Arrange
        bootalert.options.escapeHtml = true;
        //Act
        var $bootalert = bootalert.error('html <strong>message</strong>', 'html <u>title</u>');
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), 'html &lt;u&gt;title&lt;/u&gt;', 'Title is escaped');
        equal($bootalert.find('div.bootalert-message').html(), 'html &lt;strong&gt;message&lt;/strong&gt;', 'Message is escaped');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('success - escape html', 2, function () {
        //Arrange
        bootalert.options.escapeHtml = true;
        //Act
        var $bootalert = bootalert.success('html <strong>message</strong>', 'html <u>title</u>');
        //Assert
        equal($bootalert.find('div.bootalert-title').html(), 'html &lt;u&gt;title&lt;/u&gt;', 'Title is escaped');
        equal($bootalert.find('div.bootalert-message').html(), 'html &lt;strong&gt;message&lt;/strong&gt;', 'Message is escaped');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });

    module('closeButton', {
        teardown: function () {
            bootalert.options.closeButton = false;
        }
    });
    test('close button disabled', 1, function () {
        //Arrange
        bootalert.options.closeButton = false;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('button.bootalert-close-button').length, 0, 'close button should not exist with closeButton=false');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('close button enabled', 1, function () {
        //Arrange
        bootalert.options.closeButton = true;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('button.bootalert-close-button').length, 1, 'close button should exist with closeButton=true');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('close button has type=button', 1, function () {
        //Arrange
        bootalert.options.closeButton = true;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('button[type="button"].bootalert-close-button').length, 1, 'close button should have type=button');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    asyncTest('close button duration', 1, function () {
        //Arrange
        bootalert.options.closeButton = true;
        bootalert.options.closeDuration = 0;
        bootalert.options.hideDuration = 2000;
        var $container = bootalert.getContainer();
        //Act
        var $bootalert = bootalert.success('');
        $bootalert.find('button.bootalert-close-button').click();
        setTimeout(function () {
            //Assert
            ok($container && $container.children().length === 0, 'close button should support own hide animation');
            //Teardown
            bootalert.options.hideDuration = 0;
            resetContainer();
            start();
        }, 500);
    });

    module('progressBar', {
        teardown: function () {
            bootalert.options.progressBar = false;
        }
    });
    test('progress bar disabled', 1, function () {
        //Arrange
        bootalert.options.progressBar = false;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('div.bootalert-progress').length, 0, 'progress bar should not exist with progressBar=false');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('progress bar enabled', 1, function () {
        //Arrange
        bootalert.options.progressBar = true;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        equal($bootalert.find('div.bootalert-progress').length, 1, 'progress bar should exist with progressBar=true');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });

    module('rtl', {
        teardown: function () {
            bootalert.options.rtl = false;
        }
    });
    test('bootalert is ltr by default', 1, function () {
        //Arrange
        //Act
        //Assert
        bootalert.subscribe(function(response) {
            equal(response.options.rtl, false, 'ltr by default (i.e. rtl=false)');
        });
        var $bootalert = bootalert.success('');
        //Teardown
        bootalert.subscribe(null);
        $bootalert.remove();
        clearContainerChildren();
    });
    test('ltr bootalert does not have .rtl class', 1, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        ok($bootalert.hasClass('rtl') === false, 'ltr div container does not have .rtl class');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('rtl bootalert has .rtl class', 1, function () {
        //Arrange
        bootalert.options.rtl = true;
        //Act
        var $bootalert = bootalert.success('');
        //Assert
        ok($bootalert.hasClass('rtl'), 'rtl div container has .rtl class');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });

    module('accessibility');
    test('bootalert success has aria polite',1,function() {
        // Arrange
        var $bootalert = bootalert.success('');

        // Act
        ok($bootalert.attr('aria-live')==='polite', 'success bootalert has aria-live of polite');

        // Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('bootalert info has aria polite',1,function() {
        // Arrange
        var $bootalert = bootalert.info('');

        // Act
        ok($bootalert.attr('aria-live')==='polite', 'info bootalert has aria-live of polite');

        // Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('bootalert warning has aria assertive',1,function() {
        // Arrange
        var $bootalert = bootalert.warning('');

        // Act
        ok($bootalert.attr('aria-live')==='assertive', 'warning bootalert has aria-live of assertive');

        // Teardown
        $bootalert.remove();
        clearContainerChildren();
    });
    test('bootalert error has aria assertive',1,function() {
        // Arrange
        var $bootalert = bootalert.error('');

        // Act
        ok($bootalert.attr('aria-live')==='assertive', 'error bootalert has aria-live of assertive');

        // Teardown
        $bootalert.remove();
        clearContainerChildren();
    });

    module('event', {
        teardown: function () {
            bootalert.options.closeButton = false;
            bootalert.options.hideDuration = 0;
        }
    });
    asyncTest('event - onShown is executed', 1, function () {
        // Arrange
        var run = false;
        var onShown = function () { run = true; };
        bootalert.options.onShown = onShown;
        // Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        setTimeout(function () {
            // Assert
            ok(run);
            //Teardown
            $bootalert.remove();
            clearContainerChildren();
            start();
        }, delay);
    });

    asyncTest('event - onHidden is executed', 1, function () {
        //Arrange
        var run = false;
        var onHidden = function () { run = true; };
        bootalert.options.onHidden = onHidden;
        bootalert.options.timeOut = 1;
        //Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        setTimeout(function () {
            // Assert
            ok(run); //Teardown
            $bootalert.remove();
            clearContainerChildren();
            start();
        }, delay);
    });

    asyncTest('event - onShown and onHidden are both executed', 2, function () {
        //Arrange
        var onShowRun = false;
        var onHideRun = false;
        var onShow = function () { onShowRun = true; };
        var onHide = function () { onHideRun = true; };
        bootalert.options.onShown = onShow;
        bootalert.options.onHidden = onHide;
        bootalert.options.timeOut = 1;
        //Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        setTimeout(function () {
            // Assert
            ok(onShowRun);
            ok(onHideRun);
            //Teardown
            $bootalert.remove();
            clearContainerChildren();
            start();
        }, delay);
    });

    asyncTest('event - onCloseClick is executed', 1, function () {
        //Arrange
        var run = false;
        bootalert.options.closeButton = true;
        bootalert.options.closeDuration = 0;
        bootalert.options.hideDuration = 2000;
        var onCloseClick = function () { run = true; };
        bootalert.options.onCloseClick = onCloseClick;
        bootalert.options.timeOut = 1;
        //Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        $bootalert.find('button.bootalert-close-button').click();
        setTimeout(function () {
            // Assert
            ok(run); //Teardown
            $bootalert.remove();
            clearContainerChildren();
            start();
        }, delay);
    });

    test('event - message appears when no show or hide method functions provided', 1, function () {
        //Arrange
        //Act
        var $bootalert = bootalert.success(sampleMsg, sampleTitle);
        //Assert
        ok($bootalert.hasClass(iconClasses.success), 'Sets success icon');
        //Teardown
        $bootalert.remove();
        clearContainerChildren();
    });

    test('event - prevent duplicate sequential bootalerts.', 1, function(){
        bootalert.options.preventDuplicates = true;

        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle);
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle);
        $bootalert[2] = bootalert.info(sampleMsg + " 1", sampleTitle);
        $bootalert[3] = bootalert.info(sampleMsg, sampleTitle);
        var $container = bootalert.getContainer();

        ok($container && $container.children().length === 3);

        clearContainerChildren();
    });

    test('event - prevent duplicate sequential bootalerts, but allow previous after clear.', 1, function(){
        bootalert.options.preventDuplicates = true;

        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle);
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle);
        clearContainerChildren();
        $bootalert[3] = bootalert.info(sampleMsg, sampleTitle);
        var $container = bootalert.getContainer();

        ok($container && $container.children().length === 1);

        clearContainerChildren();
    });

    test('event - allow duplicate sequential bootalerts.', 1, function(){
        bootalert.options.preventDuplicates = false;

        var $bootalert = [];
        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle);
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle);
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle);
        var $container = bootalert.getContainer();

        ok($container && $container.children().length === 3);

        clearContainerChildren();
    });

    test('event - allow preventDuplicates option to be overridden.', 1, function() {
        var $bootalert = [];

        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle, {
            preventDuplicates: true
        });
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle, {
            preventDuplicates: true
        });
        $bootalert[2] = bootalert.info(sampleMsg, sampleTitle);
        var $container = bootalert.getContainer();

        ok($container && $container.children().length === 2);
        clearContainerChildren();
    });

    module('subscription');
    asyncTest('subscribe - triggers 2 visible and 2 hidden response notifications while clicking on a bootalert', 1, function () {
        //Arrange
        var $bootalert = [];
        var expectedReponses = [];
        //Act
        bootalert.subscribe(function(response) {
          if(response.options.testId) {
            expectedReponses.push(response);
          }
        })

        $bootalert[0] = bootalert.info(sampleMsg, sampleTitle, {testId : 1});
        $bootalert[1] = bootalert.info(sampleMsg, sampleTitle, {testId : 2});

        $bootalert[1].click()

        setTimeout(function () {
            // Assert
            ok(expectedReponses.length === 4);
            //Teardown
            clearContainerChildren();
            bootalert.subscribe(null);
            start();
        }, delay);
    });

    module('order of appearance');
    test('Newest bootalert on top', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.newestOnTop = true;
        //Act
        var $first = bootalert.success("First bootalert");
        var $second = bootalert.success("Second bootalert");
        //Assert
        var containerHtml = bootalert.getContainer().html();
        ok(containerHtml.indexOf("First bootalert") > containerHtml.indexOf("Second bootalert"), 'Newest bootalert is on top');
        //Teardown
        $first.remove();
        $second.remove();
        resetContainer();
    });

    test('Oldest bootalert on top', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.newestOnTop = false;
        //Act
        var $first = bootalert.success("First bootalert");
        var $second = bootalert.success("Second bootalert");
        //Assert
        var containerHtml = bootalert.getContainer().html();
        ok(containerHtml.indexOf("First bootalert") < containerHtml.indexOf("Second bootalert"), 'Oldest bootalert is on top');
        //Teardown
        $first.remove();
        $second.remove();
        resetContainer();
    });

    // These must go last
    module('positioning');
    test('Container - position top-right', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.positionClass = positionClasses.topRight;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.topRight), 'Has position top right');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });
    test('Container - position bottom-right', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.positionClass = positionClasses.bottomRight;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.bottomRight), 'Has position bottom right');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });
    test('Container - position bottom-left', 1, function () {
        //Arrange
        resetContainer();
        //$(selectors.container).remove()
        bootalert.options.positionClass = positionClasses.bottomLeft;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.bottomLeft), 'Has position bottom left');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });
    test('Container - position top-left', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.positionClass = positionClasses.topLeft;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.topLeft), 'Has position top left');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });
    test('Container - position top-center', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.positionClass = positionClasses.topCenter;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.topCenter), 'Has position top center');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });
    test('Container - position bottom-center', 1, function () {
        //Arrange
        resetContainer();
        bootalert.options.positionClass = positionClasses.bottomCenter;
        //Act
        var $bootalert = bootalert.success(sampleMsg);
        var $container = bootalert.getContainer();
        //Assert
        ok($container.hasClass(positionClasses.bottomCenter), 'Has position bottom center');
        //Teardown
        $bootalert.remove();
        resetContainer();
    });

    function resetContainer() {
        var $container = bootalert.getContainer();
        if ($container) {
            $container.remove();
        }
        $(selectors.container).remove();
        clearContainerChildren();
    }

    function clearContainerChildren() {
        bootalert.clear();
    }

})();
