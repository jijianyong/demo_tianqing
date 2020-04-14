window.onload = function () {
    /**
     * 封装动画函数
     * @param {*} element 移动的盒子
     * @param {*} target 移动距离
     */
    function animate(element, target) {
        // 设置定时器
        var timeId = setInterval(function () {
            //获取盒子当前的位置
            var current = element.offsetLeft;
            // 设置每次移动的像素
            var step = 30;
            //判断当前盒子位置是否大于移动后的位置，如果是则step为负值后退
            step = current < target ? step : -step;
            //设置每次移动后的位置
            current += step;
            //判断当前移动的位置是否到达指定位置
            if(Math.abs(target - current) > Math.abs(step)) {
                element.style.left = current + "px";
            }else {
                //清理定时器
                clearInterval(timeId);
                element.style.left = target + "px";
            }
        }, 15)
    }

    //获取盒子
    var layerCarousel = this.document.getElementsByClassName("layer-1-carousel")[0],
        img = this.document.getElementsByClassName("img")[0],
        icon = this.document.getElementsByClassName("icon")[0],
        imgLeft = this.document.getElementsByClassName("imgLeft")[0],
        imgRight = this.document.getElementsByClassName("imgRight")[0],
        link = this.document.getElementsByClassName("link")[0],
        linkUl = link.children[0],
        linkLi = linkUl.children,
        liList = linkLi.length,
        item = 0;

    //自动播放
    function play() {
        var leader = img.offsetLeft;
        var step = -5;
        if(leader > -2200) {
            leader += step;
            img.style.left = leader + "px";
        } else {
            img.style.left = 0 + "px";
        }
    }

    //点击小角标，图片移动到对应位置
    for (var i = 0; i < liList; i++) {
        (function(i) {
            linkLi[i].addEventListener("click", function() {
                for (var index = 0; index < liList; index++) {
                    linkLi[index].className = "";
                }
                linkLi[i].className = "link-first";
                item = i;
                var target = -550 * item;
                animate(img,target);
            }, false)
        }(i))
    }

    //右移动
    imgRight.onclick = function () {
        item++;
        // item = item < liList ? item : liList-1;
        // var target = -550 * item;
        // animate(img,target);
        if(item < liList) {
            var target = -550 * item;
            animate(img,target);
            for (var i = 0; i < liList; i++) {
                linkLi[i].className = "";
                linkLi[item].classList = "link-first";
            }
        }else {
            item = 0;
            img.style.left = 0 + "px";
        }
        for (var i = 0; i < liList; i++) {
            linkLi[i].className = "";
            linkLi[item].classList = "link-first";
        }
    }
    //左移动
    imgLeft.onclick = function () {
        item--;
        item = item < 0 ? 0 : item;
        var target = -550 * item;
        animate(img,target);
        for (var i = 0; i < liList; i++) {
            linkLi[i].className = "";
            linkLi[item].classList = "link-first";
        }
    }

        //幻灯片效果
        var sTimer = setInterval(imgRight.onclick,1000);
    
        //鼠标移入事件
        layerCarousel.addEventListener("mouseover", function() {
            icon.style.display = "block";
            clearInterval(sTimer);
        })
        //鼠标移出事件
        layerCarousel.addEventListener("mouseout", function() {
            icon.style.display = "none";
            sTimer = setInterval(imgRight.onclick,1000);
        })
}