jQuery(document).ready(function () {

    jQuery("*[data-rate=active]").live('hover',
        function () { /* при наведении мыши на блок с рейтингом, динамически добавляем блок с подсветкой выбранной оценки */
            jQuery(this).append("<span></span>");


        },
        function () { /* при уходе с рейтинга, удаляем блок с подсветкой */
           jQuery(this).find("span").remove();
            $(this).append("<span></span>");
            $(this).find('span').css('width',(tmpRating*oneW)+'px');
        });


    var rating;
    var tmpRating;
    var oneW=1;
    jQuery("*[data-rate=active]").live('mousemove',
        /*
         устанавливаем ширину блока с подсветкой таким образом, чтобы была выделена оценка, находящаяся под курсором мыши
         */

        function (e) {
            console.debug(tmpRating);
            if(tmpRating==undefined  )
                tmpRating = getWidth($(this));
          //  console.clear();
                        //console.debug(tmpRating);
            if (!e) e = window.event;
            if (e.pageX) {
                x = e.pageX;
            } else if (e.clientX) {
                x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;

            }
            var posLeft = 0;
            var obj = this;
            while (obj.offsetParent) {
                posLeft += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            var offsetX = x - posLeft,
                modOffsetX = 5 * offsetX % this.offsetWidth;
            /* 5 - число возможных оценок */
            rating = parseInt(5 * offsetX / this.offsetWidth);

            if (modOffsetX > 0) rating += 1;
            oneW  =$(this).width()/5;/* ширина одной оценки, в данном случае одной звезды */
            jQuery(this).find("span").eq(0).css("width", rating * oneW + "px");


        });

    jQuery("*[data-rate=active]").live('click',/* по клику на блоке можно определить какую оценку поставил пользователь */
        function () {
             $(this).attr('data-rate','no-active')
            tmpRating = rating;
            //ajax logic
            return false;
        });

    function getWidth(obj){
        return obj.find('span').width()/(obj.width()/5) ;
    }
});
