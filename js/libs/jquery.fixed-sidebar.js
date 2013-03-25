// jQuery fixedSidebar
// Jscrollpane.js requires
// by Alex Berdyshev

(function ($) {

    $.fixedSidebar = function (element, options) {

        var defaults = {
            autoCalcHeight: false, //set to true if you want to calc footer and height automaticly
            paddings: 81,
            headerClass: '.header',
            footerClass: '.footer',
            autoReinitialise: true
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            // code goes here
            plugin.setFullHeight();
            $element.jScrollPane({
                autoReinitialise:   plugin.settings.autoReinitialise
            });

            $(window).on('resize.fixedSidebar', plugin.setFullHeight)

        }

        plugin.setFullHeight = function () {
            var el = plugin.settings,
                height = $(window).height()
                    - (
                    el.autoCalcHeight ?
                        ($(el.footerClass).outerHeight() + $(el.headerClass).outerHeight())
                        : el.paddings
                    );
            $element.height(height);
        }

        plugin.init();

    }

    $.fn.fixedSidebar = function (options) {

        return this.each(function () {
            if (undefined == $(this).data('fixedSidebar')) {
                var plugin = new $.fixedSidebar(this, options);
                $(this).data('fixedSidebar', plugin);
            }
        });

    }

})(jQuery);

