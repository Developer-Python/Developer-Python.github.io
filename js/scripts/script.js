
// Чтение всего html документа
$(document).ready(function(){





// ------------------------------------ НАСТРОЙКА ПАРАМЕТРОВ ------------------------------------------------------------ #

    // Переменные
    var count_two;                                         // Счётчик для определения последовательности слайдов по порядку
    var backgroud_slide_lenght;                            // Кол-во слайдов в фоне

    var margin = 0;                                        // На сколько "px" двигать полоску после каждого нажатия
    var seconds = 6;                                       // Через сколько переключать слайд (секунды)
    var count_one = 0;                                     // Первый счётчик
    var array_slides = $(".s_box");                        // Массив со всеми слайдами
    var array_lenght = array_slides.length;                // Кол-во слайдов
    var computer_version_page = $('html').width() > 1101;  // Вкл/Выкл версию если размер (дисплея) > (значение)
    var height_slide_max = [];                             // Массив со значениями высоты блоков '.s_box'
    var count_clide = 0;                                   // Счётчик для переключения слайдов
    var levour = 1

// ----------------------------------------- ФУНКЦИИ --------------------------------------------------------------------- #





    // Перестройка страницы под один слайд
    function rebuild_page() {
      $('.s_main_box').after($('.s_main_loading'))
      $('#s_button_one').after($('.s_box_loading'))
      $('.s_box_next_slide_right').removeClass('unvisible')
    }


    // Авто-прокрутка слайда
    function auto_slide_switch() {

      if (count_clide < backgroud_slide_lenght && levour == 1) {
        count_clide+=1
        switch_slide(array_slides, 'right')   
        switch_loading('right') 
        if (count_clide == backgroud_slide_lenght) {
          levour = 0
        }

      } else {

        count_clide-=1

        switch_slide(array_slides, 'left')    
        switch_loading('left')  

        if (count_clide == 0) {
          levour = 1
        }

      }
    }


    // Переключение слайдов: Компьютер / Смартфон
    function switch_slide(array, button) {
      if (computer_version_page) {
        if (button == 'right') {
          count_two+=1
          $(array[count_two-4]).attr('style', 'display:none;')
          $(array[count_two]).attr('style', `display:inline-block; min-height:${max_count}px !important;`)
        }
        if (button == 'left') {
          $(array[count_two-4]).attr('style', `display:inline-block; min-height:${max_count}px !important;`)
          $(array[count_two]).attr('style', 'display:none;')
          count_two-=1
        }
      }

      else 

      {

        if (button == 'right') {

            count_two+=1   

            if ( count_two == 0 ) {
              $('.s_box_next_slide_left').addClass('unvisible')
            } else {
              $('.s_box_next_slide_left').removeClass('unvisible')
            }

            if ( count_two == array_slides.length-1 ) {
              $('.s_box_next_slide_right').addClass('unvisible')
            } else {
              $('.s_box_next_slide_right').removeClass('unvisible')
            }

            $(array[count_two-1]).attr('style', 'display:none;') 
            $(array[count_two]).attr('style', `display:inline-block; min-height:${max_count}px !important;`)

            $(`#${count_two}`).before($('.s_box_next_slide_left'))
            $(`#${count_two}`).after($('.s_box_next_slide_right'))

          } 

        if (button == 'left') {

            if (count_two==1) {
              $('.s_box_next_slide_left').addClass('unvisible')
            } else {
              $('.s_box_next_slide_left').removeClass('unvisible')
            }

            if (count_two==array_lenght) {
              $('.s_box_next_slide_right').addClass('unvisible')
            } else {
              $('.s_box_next_slide_right').removeClass('unvisible')
            }

            $(array[count_two-1]).attr('style', `display:inline-block; min-height:${max_count}px !important;`)
            $(array[count_two]).attr('style', 'display:none;')

            $(`#${count_two-1}`).after($('.s_box_next_slide_right'))
            $(`#${count_two-1}`).before($('.s_box_next_slide_left'))

            count_two-=1
        }
      }
    }





    // Алгоритм полоски при смене слайда
    function switch_loading(button) {
      
      // Ожидаем пока пользователь нажмёт на левую кнопку
      if (button == 'left') {
        
        // Делим ширину элемента ".s_loading"
        margin -= (($('.s_loading').width()) - ($('.s_loading_line').width())) / backgroud_slide_lenght

        $(".s_loading_line").attr('style', `margin: -1px ${margin}px;`)

      }

      // Ожидаем пока пользователь нажмёт на правую кнопку
      if (button == 'right') {
        
        // Делим ширину элемента ".s_loading"
        margin += ( ($('.s_loading').width()) - ($('.s_loading_line').width()) ) / backgroud_slide_lenght
        $(".s_loading_line").attr('style', `margin: -1px ${margin}px;`)
      
      } 
    }





// -------------------------------------- ПОДГОТОВКА ДАННЫХ -------------------------------------------------------------- #
    
    // Подготовка слайдов(а)
    for(var i=0; i<array_lenght; ++i) {

      if (computer_version_page) {

        var count_two = 3

        $('.s_box_next_slide_right').addClass('disable_physics')

        $(array_slides[i]).attr('id', i)

        if (i > 3) {
          $(array_slides[i]).attr('style', 'display:none;')
          
          count_one-=1
        }

        count_one+=1

      }

      else {

        var count_two = 0

        $(array_slides[i]).attr('id', i)

        if (i > 0) {
          $(array_slides[i]).attr('style', 'display:none;')
          count_one-=1 
        }

        count_one+=1

        rebuild_page()    // Запуск функций <----
   
      }
    }

    backgroud_slide_lenght = array_slides.length - count_one

    // Добавляем размеры высоты всех слайдов
    for (var i=0; i<array_lenght; i++){
        height_slide_max.push(Math.round( $(array_slides[i]).height() ))
    }
 
    // Узнаём максимальную высоту каждого слайда чтобы выравнить все слайды
    max_count = Math.max.apply(null, height_slide_max) + 42


// ------------------------------------ ОБРАБОТКА СОБЫТИЙ ---------------------------------------------------------------- #


    // Ожидание нажатия на левая кнопку слайдера
    $( "#s_button_one" ).click(function() { 
      
      if (0 < count_clide) {

        count_clide-=1

        switch_slide(array_slides, 'left')    
        switch_loading('left')               

      }

    });

    

    // Ожидание нажатия на правую кнопку слайдера
    $( "#s_button_two" ).click(function() {

      if (count_clide < backgroud_slide_lenght) {

        count_clide+=1

        switch_slide(array_slides, 'right')   
        switch_loading('right')               

      }

    });
    


    // Авто-прокрутка слайда
    setInterval( () => {

      seconds = seconds - 1;
      if(!seconds){seconds = 6;}
      auto_slide_switch()

      }, seconds+'000')



    
});