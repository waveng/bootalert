/*
 * Alertr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/waveng/bootalert
 */
/* global define */
(function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var alertId = 0;
            var alertType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var bootalert = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.4',
                warning: warning
            };

            var previousAlert;

            return bootalert;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: alertType.error,
                    alertClass: getOptions().alertClasses.error,
                    iconClass: getOptions().iconClasses.error,
                    progressColorClass: getOptions().progressColorClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: alertType.info,
                    alertClass: getOptions().alertClasses.info,
                    iconClass: getOptions().iconClasses.info,
                    progressColorClass: getOptions().progressColorClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: alertType.success,
                    alertClass: getOptions().alertClasses.success,
                    iconClass: getOptions().iconClasses.success,
                    progressColorClass: getOptions().progressColorClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: alertType.warning,
                    alertClass: getOptions().alertClasses.warning,
                    iconClass: getOptions().iconClasses.warning,
                    progressColorClass: getOptions().progressColorClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($alertElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearAlert($alertElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($alertElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($alertElement && $(':focus', $alertElement).length === 0) {
                    removeAlert($alertElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var alertsToClear = $container.children();
                for (var i = alertsToClear.length - 1; i >= 0; i--) {
                    clearAlert($(alertsToClear[i]), options);
                }
            }

            function clearAlert ($alertElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($alertElement && (force || $(':focus', $alertElement).length === 0)) {
                    $alertElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeAlert($alertElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    containerId: 'bootalert-container',
                    debug: false,
                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,
                    closeOnHover: true,

                    extendedTimeOut: 1000,
                    alertClasses: {
                        error: 'alert-danger',
                        info: 'alert-info',
                        success: 'alert-success',
                        warning: 'alert-warning'
                    },
                    iconClasses: {
                        error: 'glyphicon-remove-sign',
                        info: 'glyphicon-info-sign',
                        success: 'glyphicon-ok-sign',
                        warning: 'glyphicon-warning-sign'
                    },
                    alertClass: 'alert-info',
                    iconClass: 'glyphicon-info-sign',
                    positionClass: 'bootalert-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'bootalert-title',
                    messageClass: 'bootalert-message',
                    escapeHtml: false,
                    target: 'body',
                    iconHtml:'<div class="bootalert-icon"><i class="glyphicon"></i></div>',
                    closeHtml: '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    closeClass: 'bootalert-close-button',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false,
                    progressColorClasses:{
                        error: 'progress-bar-danger',
                        info: 'progress-bar-info',
                        success: 'progress-bar-success',
                        warning: 'progress-bar-warning'
                    },
                    progressColorClass: 'progress-bar-info',
                    progressClass: 'bootalert-progress',
                    rtl: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;
                var alertClass = map.alertClass || options.alertClass;
                var progressColorClass = map.progressColorClass || options.progressColorClass;
                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                    alertClass = map.optionsOverride.alertClass || alertClass;
                    progressColorClass = map.optionsOverride.progressColorClass || progressColorClass;
                }

                if (shouldExit(options, map)) { return; }

                alertId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $alertElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');

                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    alertId: alertId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeAlert();

                displayAlert();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $alertElement;

                function escapeHtml(source) {
                    if (source == null) {
                        source = '';
                    }

                    return source
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeAlert() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setRTL();
                    setSequence();
                    setAria();
                }

                function setAria() {
                    var ariaValue = '';
                    switch (alertClass) {
                        case 'alert-success':
                        case 'alert-info':
                            ariaValue =  'polite';
                            break;
                        default:
                            ariaValue = 'assertive';
                    }
                    $alertElement.attr('aria-live', ariaValue);
                    $alertElement.attr('role', 'alert');
                }

                function handleEvents() {
                    if (options.closeOnHover) {
                        $alertElement.hover(stickAround, delayedHideAlert);
                    }

                    if (!options.onclick && options.tapToDismiss) {
                        $alertElement.click(hideAlert);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }

                            if (options.onCloseClick) {
                                options.onCloseClick(event);
                            }

                            hideAlert(true);
                        });
                    }

                    if (options.onclick) {
                        $alertElement.click(function (event) {
                            options.onclick(event);
                            hideAlert();
                        });
                    }
                }

                function displayAlert() {
                    $alertElement.hide();

                    $alertElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideAlert, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    $alertElement.addClass('alert ' + alertClass + ' alert-dismissible');
                    if (iconClass) {
                        var iconHtml = $(options.iconHtml);
                        iconHtml.find('i').addClass(iconClass);
                        $alertElement.append(iconHtml);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($alertElement);
                    } else {
                        $container.append($alertElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        var suffix = map.title;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.title);
                        }
                        $titleElement.append(suffix).addClass(options.titleClass);
                        $alertElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        var suffix = map.message;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.message);
                        }
                        $messageElement.append(suffix).addClass(options.messageClass);
                        $alertElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass(options.closeClass).attr('role', 'button');
                        $alertElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass(options.progressClass +' ' + progressColorClass);
                        $alertElement.prepend($progressElement);
                    }
                }

                function setRTL() {
                    if (options.rtl) {
                        $alertElement.addClass('rtl');
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousAlert) {
                            return true;
                        } else {
                            previousAlert = map.message;
                        }
                    }
                    return false;
                }

                function hideAlert(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $alertElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $alertElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeAlert($alertElement);
                            clearTimeout(intervalId);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideAlert() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideAlert, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $alertElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), bootalert.options);
            }

            function removeAlert($alertElement) {
                if (!$container) { $container = getContainer(); }
                if ($alertElement.is(':visible')) {
                    return;
                }
                $alertElement.remove();
                $alertElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousAlert = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window.bootalert = factory(window.jQuery);
    }
}));
