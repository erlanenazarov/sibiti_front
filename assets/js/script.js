


// Select
$('.slct').click(function () {
    /* Заносим выпадающий список в переменную */
    var dropBlock = $(this).parent().find('.drop');

    /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
    if (dropBlock.is(':hidden')) {
        dropBlock.slideDown();

        /* Выделяем ссылку открывающую select */
        $(this).addClass('active');

        /* Работаем с событием клика по элементам выпадающего списка */
        $('.drop').find('li').click(function () {

            /* Заносим в переменную HTML код элемента
             списка по которому кликнули */
            var selectResult = $(this).html();

            /* Находим наш скрытый инпут и передаем в него
             значение из переменной selectResult */
            $(this).parent().parent().find('input').val(selectResult);

            /* Передаем значение переменной selectResult в ссылку которая
             открывает наш выпадающий список и удаляем активность */
            $(this).parent().parent().find('.slct').removeClass('active').html(selectResult);

            /* Скрываем выпадающий блок */
            dropBlock.slideUp();
        });

        /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
    } else {
        $(this).removeClass('active');
        dropBlock.slideUp();
    }

    /* Предотвращаем обычное поведение ссылки при клике */
    return false;
});/**
 * Created by avtan on 03.12.2016.
 */

$('.flat_slider').slick({
    cssEase: 'ease-in',
    //dots: true,
    initialSlide: 5,
    arrow: false,
    asNavFor: '.flat_slider2'
    //autoplay: true,
    //autoplaySpeed: 2000

    //responsive: [
    //    {
    //        breakpoint: 480,
    //        settings: {
    //            dots: false
    //
    //        }
    //    }
    //]
});


$('.flat_slider2').slick({
    //dots: true,
    slidesToShow: 5,
    //centerMode: true,
    //centerPadding: '40px',

    variableWidth: true,
    focusOnSelect: true,
    asNavFor: '.flat_slider'
    //initialSlide: 10
    //arrows: false
});


function Tabs(options){

    var tabs = document.querySelector(options.el);
    var initCalled = false;
    var tabNavigation = tabs.querySelector(".c-tabs-nav");
    var tabNavigationLinks = tabs.querySelectorAll(".c-tabs-nav__link");
    var tabContentContainers = tabs.querySelectorAll(".c-tab");

    var marker = options.marker ? createNavMarker() : false;

    var activeIndex = 0;

    function init(){
        if (!initCalled){
            initCalled = true;

            for (var i = 0; i < tabNavigationLinks.length; i++){
                var link = tabNavigationLinks[i];
                clickHandlerSetup(link, i)
            }

            if (marker){
                setMarker(tabNavigationLinks[activeIndex]);
            }
        }
    }

    function clickHandlerSetup(link, index){
        link.addEventListener("click", function(e){
            e.preventDefault();
            goToTab(index);
        })
    }

    function goToTab(index){
        if (index >= 0 && index != activeIndex && index <= tabNavigationLinks.length){
            tabNavigationLinks[activeIndex].classList.remove('is-active');
            tabNavigationLinks[index].classList.add('is-active');

            tabContentContainers[activeIndex].classList.remove('is-active');
            tabContentContainers[index].classList.add('is-active');

            if (marker){
                setMarker(tabNavigationLinks[index]);
            }

            activeIndex = index;
        }
    }

    function createNavMarker(){
        var marker = document.createElement("div");
        marker.classList.add("c-tab-nav-marker");
        tabNavigation.appendChild(marker);
        return marker;
    }

    function setMarker(element){
        marker.style.left = element.offsetLeft +"px";
        marker.style.width = element.offsetWidth + "px";
    }

    return {
        init: init,
        goToTab: goToTab
    }
}


var m = new Tabs({
    el: "#tabs",
    marker: true
});

m.init();


function popupApp(){
    //$(this).css('display','none');
    //$(this).parent('.c-tab__content').children().css('display', 'none');
    //$(this).parent('.c-tab__content').children('.application').css('display', 'block');
    var application = $('.application');
    $(this).css('display','none');
    $(this).parent('.c-tab__content').children().css('display', 'none');
    $(this).parent('.c-tab__content').append(application);
    $(this).parent('.c-tab__content').children('.application').css('display', 'block');


}
//
function ClosePopup(){
    $(this).parent('form').parent('.application').css('display', 'none');
    $(this).parent('form').parent('.application').parent('.c-tab__content').children('div:first-of-type').css('display', 'block');
    $(this).parent('form').parent('.application').parent('.c-tab__content').children('.button').css('display', 'block');
}

function LocationPopup(){
    $('.gallery').css('display', 'none');
}

function ShowSlider(){
    $('.gallery').css('display', 'block');
}

$(document).ready(function () {
    $('.accommodation_desc,.comments,.accommodation_details').perfectScrollbar();
    $('.ps-scrollbar-y-rail').css('opacity', 1);

    $('.c-tab__content > .button').click(popupApp);
    $('.application').find('.button').click(ClosePopup);
    $('.c-tabs-nav').find('a:nth-child(3)').click(LocationPopup);
    $('.c-tabs-nav').find('a:not(a:nth-child(3))').click(ShowSlider);

});
