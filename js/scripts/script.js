$(document).ready(function(){

  

    // Переменные
    var array_box = ['#s_box_one', '#s_box_two', '#s_box_three', '#s_box_four'];
    var new_array = [];
    var margin = 0;
    var seconds = 6;



    // Авто-прокрутка слайда
    // setInterval( () => {
    //     seconds = seconds - 1;
    //     if(!seconds){seconds = 6;}
    //       slide_switch('right')
    //     }, 6000)



    // Функция: Слайдер
    function slide_switch(button) {

      // IF: Ожидаем пока пользователь нажмёт на правую кнопку
      if (button == 'right') {

        // Алгоритм правельного положения слайдов при пролистований 
        for (let i = 0; i < 4; i++){ 
          
          // Отправляем третий элемент в начало массива
          if (i == 3) {
            new_array.unshift(array_box[i]) 
          }

          // Отправляем остальные элементы в конец массива
          if (i <= 2) {
            new_array.push(array_box[i])
          }
          
        };

        // Перезапись массива
        array_box = new_array

        // Очистка массива
        new_array = []

      }

      // IF: Ожидаем пока пользователь нажмёт на левую кнопку
      else if (button == 'left') {

        // Индекс элемента, который надо перенести в конец
        const fromIndex = 0;

        // Получаем элемент, который надо перенести и удаляем его из массива
        const item = array_box.splice(fromIndex, 1)[0]; 

        // Добавляем элемент в конец
        array_box.splice(array_box.length, 1, item); 

        // Очистка массива
        new_array = []

      }



      // Функция: клонирования удаления и добавления элементов в DOM
      function clone_remove_append(slides) {

        // Сохраняем первые слайды в отдельные переменные что-бы подготовить алгоритм
        one_slide = $(array_box[0]).clone()
        two_slide = $(array_box[1]).clone()
        three_slide = $(array_box[2]).clone()
        four_slide = $(array_box[3]).clone()
        
        // Анимация(появление / исчезание)
        $('.s_main_box').fadeOut('fast','linear');
        $('.s_main_box').fadeIn('fast','linear');

        // Удаление слайдов
        for (let i=0; i<4; i++) {
          $(slides[i]).remove()
        }

        // Добавление слайдов в нужной последовательности
        $(".s_main_box").append(one_slide)
        $(".s_main_box").append(two_slide)
        $(".s_main_box").append(three_slide)
        $(".s_main_box").append(four_slide)

        // Анимация: смена слайда
        $('.s_box').fadeIn('fast','linear');

      }


      // Запуск функций 
      clone_remove_append(['#s_box_one', '#s_box_two', '#s_box_three', '#s_box_four'])

    };



    // Функция: алгоритм полоски при смене слайда
    function loading_switch(button) {
      
      // IF: Ожидаем пока пользователь нажмёт на левую кнопку
      if (button == 'left'){
        
        // Делим ширину элемента ".s_loading"
        margin -= $('.s_loading').width() / 4.8
        $(".s_loading_line").attr('style', `margin: -1px ${margin}px;`)

      }

      // IF: Ожидаем пока пользователь нажмёт на правую кнопку
      if (button == 'right') {
        
        // Делим ширину элемента ".s_loading"
        margin += $('.s_loading').width() / 4.8
        $(".s_loading_line").attr('style', `margin: -1px ${margin}px;`)
      
      }
      
    }



    // Ожидание нажатия на левая кнопку слайдера
    $( "#s_button_one" ).click(function() { 

      if (margin > 1 ) {
        
        loading_switch('left')
        slide_switch('left')
      }

    });



    // Ожидание нажатия на правую кнопку слайдера
    $( "#s_button_two" ).click(function() {

      // Узнаём ширину элемента ".s_loading"
      // Вычитаем "100px" что-бы не было 5-той прокрутки
      if (margin < $('.s_loading').width()-100) {

        loading_switch('right')
        slide_switch('right')
      }

    });



});