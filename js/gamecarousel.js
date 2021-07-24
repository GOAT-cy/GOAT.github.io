        window.onload = function() {
                var container = document.getElementById('container');
                var list = document.getElementById('list');
                var imgLen= document.getElementsByTagName('img');
                var buttons = document.getElementById('buttons').getElementsByTagName('span');
                var prev = document.getElementById('prev');
                var next = document.getElementById('next');
                var index = 1;
                var timer;
                var offset = -1000; //单个图的宽度的负值
                var maxPicNums = 5;
     
                function animate(offset) {
     
                    var indexNums = 3;
                    var newLeft = parseInt(list.style.left) + offset;
                    list.style.left = newLeft + 'px';
                    //这里定的是最大5个轮播图，
                    var maxOffset = maxPicNums * offset;
                    if (newLeft > offset) {
                        list.style.left = -maxOffset + 'px';
                    }
                    if (newLeft < offset * (indexNums)) {
                        list.style.left = offset + 'px';
                    }
                }
     
                function play() {
                    timer = setInterval(function() {
                        next.onclick();
                    }, 2000)
                }
     
                function stop() {
                    clearInterval(timer);
                }
     
                function buttonsShow() {
                    for (var i = 0; i < buttons.length; i++) {
                        if (buttons[i].className == "on") {
                            buttons[i].className = "";
                        }
                    }
                    //buttons[index - 1].className = "on";
                    $(buttons[index - 1]).css("on");
                }
     
                prev.onclick = function() {
                    // index -= 1;
                    // if (index < 1) {
                    //     index = maxPicNums
                    // }
                    // buttonsShow();
                    // animate(Math.abs(offset));                    
                    index -= 1;
                    if (index < 1) {
                        index = -1;
                    }
                    animate(offset)
                    buttonsShow();
                };
     
                next.onclick = function() {
                    index += 1;
                    if (index > maxPicNums) {
                        index = 1
                    }
                    animate(offset);
                    buttonsShow();
                };
     
                for (var i = 0; i < buttons.length; i++) {
                    (function(i) {
                        buttons[i].onclick = function() {
     
     
                            var clickIndex = parseInt(this.getAttribute('index'));
                            var offset = Math.abs(offset) * (index - clickIndex); 
                            animate(offset);
                            index = clickIndex;
                            buttonsShow();
                        }
                    })(i)
                }
     
                container.onmouseover = stop;
                container.onmouseout = play;
                play();
     
            }