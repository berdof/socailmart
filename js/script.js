/* Author:

 */
var cssFix = function () {
    var u = navigator.userAgent.toLowerCase(),
        addClass = function (el, val) {
            if (!el.className) {
                el.className = val;
            } else {
                var newCl = el.className;
                newCl += (" " + val);
                el.className = newCl;
            }
        },
        is = function (t) {
            return (u.indexOf(t) != -1)
        };
    addClass(document.getElementsByTagName('html')[0], [
        (!(/opera|webtv/i.test(u)) && /msie (d)/.test(u)) ? ('ie ie' + RegExp.$1)
            : is('firefox/2') ? 'gecko ff2'
            : is('firefox/3') ? 'gecko ff3'
            : is('gecko/') ? 'gecko'
            : is('opera/9') ? 'opera opera9' : /opera (d)/.test(u) ? 'opera opera' + RegExp.$1
            : is('konqueror') ? 'konqueror'
            : is('applewebkit/') ? 'webkit safari'
            : is('mozilla/') ? 'gecko' : '',
        (is('x11') || is('linux')) ? ' linux'
            : is('mac') ? ' mac'
            : is('win') ? ' win' : ''
    ].join(" "));
}();


$(document).ready(function () {
    $('.to-top').click(function () {
        $('body').scrollTo('0', 800);
    })
    //data-toggle
    $('*[data-toggle-target]').hover(function () {
        $(this).toggleClass('active');
        $(this).find('.' + $(this).attr('data-toggle-target')).slideToggle(400);
    })
    //!data-toggle


    //data-class-toggle
    $('*[data-class-toggle]').click(function () {
        $(this).toggleClass($(this).attr('data-class-toggle'));
    })
    //!data-class-toggle

    $('input[placeholder], textarea[placeholder]').placeholder();


    var tmpScroll = 0;


    //voting
    $('.voted .column-item__img-wrap__hover__ok').live('click', function () {
        return false;
    })

    $('.voting .column-item__img-wrap__hover__ok').live('click', function () {
        $(this).parents('.column-item').addClass('voted');
    })

    $('.column-item_w215 .column-item__img-wrap__hover a').live('click', function () {
        $(this).addClass('voted');
        $(this).closest('.column-item').addClass('voted');
    })

    //!voting


    //tabs
    $('.tabs__nav li').click(function () {
        $(this).closest('.tabs__nav').find('li').removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();

        var tabs = $(this).closest('.tabs').find('.tabs__contents__item');
        tabs.css('display', 'none');
        tabs.eq(index).fadeIn(400);
    })
    //!tabs
    //user-carousel
    loadUserCarousel(1, 15);
    $('#user-carousel2 .user-carousel').data({'active': 'false'})
    $('.product-users .tabs__nav li:nth-child(2)').click(function () {
        if ($('#user-carousel2 .user-carousel').data('active') == 'false') {
            loadUserCarousel(2, 15);
            $('#user-carousel2 .user-carousel').data({'active': 'true'})
        }
    })
    function loadUserCarousel(index, visible) {
        $('#user-carousel' + index + ' .user-carousel').jCarouselLite({
            btnNext: '#user-carousel' + index + ' .user-carousel__arr_r',
            btnPrev: '#user-carousel' + index + ' .user-carousel__arr_l',
            mouseWheel: true,
            scroll: 1,
            visible: visible,
            circular: false
        })
    }

    $('.user-carousel__in li').hover(function () {
        var balloon = $(this).closest('*[data-balloon]').attr('data-balloon');
        var name = $(this).find('a').attr('title');
        var info = $(this).find('a').attr('data-info');
        $(balloon + ' .user-carousel-info__name').text(name + ', ');
        $(balloon + ' .user-carousel-info__info').text(info);
    })

    $('.user-carousel').hover(function () {
        var balloon = $(this).find('*[data-balloon]').attr('data-balloon');
        $(balloon).fadeIn(200);
    }, function () {
        var balloon = $(this).find('*[data-balloon]').attr('data-balloon');
        $(balloon).fadeOut(200);
    })
    //!user-carousel


    //onboarding__list
    $('*[data-selected]').click(function () {
        var state = $(this).attr('data-selected') == 'true';
        $(this).attr('data-selected', state ? 'false' : 'true');

    })
    $('*[data-show-onboarding]').click(function () {
        var elem = $(this).attr('data-show-onboarding')
        $('.onboarding__body').css('display', 'none');
        $(elem + ', .onboarding__footer').css('display', 'block');
        $('.onboarding__list').jScrollPane();
        $('.onboarding__overlay').css({
            'z-index': 25
        }).fadeIn(400)
        $('.header').css({
            'z-index': 26
        });
    });
    $('#onboarding-next').click(function () {
        var attr = $(this).attr('data-show-onboarding').split('-');
        var counter = ~~attr[1];
        $('#onboarding-next').attr('data-show-onboarding', attr[0] + '-' + (counter + 1))
    })
    $('*[data-show-onboarding="#onboarding__body-5"]').live('click', function () {
        //hide footer and show other header
        $('.onboarding__footer, .onboarding__head').css('display', 'none');
        $('.onboarding__head').eq(1).css('display', 'block');
        $('.onboarding__head-wrap .onboarding__overlay').css({
            'z-index': -1
        }).fadeOut(400)
        $('.onboarding__head-wrap ').css({
            'z-index': 27
        });
    })
    $('*[data-show-onboarding="end"]').live('click', function () {
        //hide overlay
        $('.onboarding__overlay').css({
            'z-index': -1
        }).fadeOut(400)
        $('.onboarding__footer').css('display', 'none');
        $('.header').css({
            'z-index': 27
        });
    })
    //!onboarding__list
    loadUserCarousel(3, 7);
    loadUserCarousel(4, 7);


    $('.notify__close').click(function () {
        $(this).closest('.notify').slideUp();
    })


    $('.tutorial *').live('hover', function () {
        return false;
    })
    $('.tutorial .search input, .ask-question').live('click', function (e) {
        e.preventDefault();
        return false;
    })
    $('.ico_tutorial-close').click(function () {

        $('.tutorial__item__wrap, .ico_tutorial-close , .joverlay').remove();

        $('body').removeClass('tutorial');
        $('.column-item').removeClass('column-item__tutorial')
    })

    if ($('body').find('.welcome').length > 0)
        showPopup('.welcome');


    $('.profile-widget__badge__close').live('click', function () {

        $(this).closest('.profile-widget__badge').fadeOut(200);
    })


    $('.impressions__body .column-item__show-all-answers').click(function () {

        var ico = $(this).find('i');
        var text = $(this).find('.column-item__show-all-answers__text');
        var upClass = 'ico_up';
        var downClass = 'ico_down';
        var flag = ico.hasClass(upClass);

        ico.addClass(flag ? downClass : upClass);
        ico.removeClass(flag ? upClass : downClass);
        text.html(flag ? 'Показать' : 'Скрыть');
        $(this).next('.column-item__answer__in').slideToggle(200)

    })


    $('.column-item__interact a').click(function () {
        $(this).closest('.column-item__interact').find('a').removeClass('active');
        $(this).addClass('active');
        return false;
    })

    cuSel({
        changedEl: "select",
        scrollArrows: false
    });

    $('.onboarding__show').click(function () {
        $('.onboarding__body').slideToggle(250);
        $(this).toggleClass('active');
    })
    $('.onboarding__slider').cycle({
        fx: 'scrollHorz',
        next: ".onboarding__slider__next",
        prev: ".onboarding__slider__prev",
        pager: '.onboarding__slider__pager',
        activePagerClass: 'active'
    })
    $('.onboarding__overlay').live('click', function () {
        $('.onboarding').slideUp(250);
        $(this).fadeOut(250);
    })
})

function initProductScroller() {
    $('.product-places__scroll, .product-features__scroll').jScrollPane();
}

$(window).load(function () {

    $('.columns').masonry({
        // options
        itemSelector: '*[data-column]',
        gutterWidth: 0,
        columnWidth: 310,
        isResizable: true,
        isFitWidth: true
    });

    $('.onboarding__btn a').click(function () {
        $('.onboarding__email').fadeToggle(350);
    })

    $('.settings-bar__in').fixedSidebar();


    initProductScroller();

    $('.product-info').on('click', initProductScroller)

    $('.where-to-buy').on('click', function (e) {
        $(this).find('form').fadeToggle();
        e.preventDefault();
    })

    $('.ico_edit2').on('click', function (e) {
        var self = $(this),
            txt = self.closest('.column-item__answer').find('.column-item__question__text p').text();
        self.closest('.column-item').find('.column-item__answer textarea').html(txt);
        e.preventDefault();
    })

});
$(window).scroll(function () {
    if ($(window).scrollTop() > $('.header').height()) {
        $('.top-bar').css('top', '0px');
        // $('.settings-bar__in').css('position', 'fixed');
    }
    else {
        $('.top-bar').css('top', $('.header').height() - $(window).scrollTop() + 'px');
        //$('.settings-bar__in').css('position', 'static');
    }

})


