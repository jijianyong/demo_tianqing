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

        //Echarts图表效果
        var myChart1 = echarts.init(document.getElementById('graph-data')),        // 折线图
            myChart2 = echarts.init(document.getElementById('chart-data')),        // 饼状图
            myChart3 = echarts.init(document.getElementById('histogram-data'));    // 柱状图
            // data: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        // 折线图
        var option1 = {
            title: {
            },
            tooltip: {},
            legend: {
                data:['']
            },
            xAxis: {
                axisTick:{
                    show:false//不显示坐标轴刻度线
            },
                axisLine: {
                    show: false,//不显示坐标轴线
            },
                data: ["03/18", "03/19", "03/20", "03/21", "03/22", "03/23", "03/24", "03/25", "03/26", "03/27", "03/28", "03/29", "03/30", "03/31", "04/01", "04/02", "04/03", "04/04", "04/05", "04/06", "04/07", "04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14", "04/15", "04/16"]
            },
            yAxis: {
                axisTick: {
                    show: false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            series: [{
                name: '销量',
                type: 'line',
                smooth:true,
                areaStyle: {
                    normal: {
                        color: '#f3f6fe' //改变区域颜色
                    }
                },
                itemStyle: {
                    normal: {
                        label : {show: true},
                        color: '#5591f1', //改变折线点的颜色
                        lineStyle: {
                            color: '#5591f1' //改变折线颜色
                        }
                    }
                },
                data: [4330, 9670, 4336, 6815, 7836, 6834, 1602, 393, 1466, 816, 1877, 7353, 3974, 811, 4875, 4053, 6779, 5236, 5179, 9501, 8049, 7384, 5767, 4778, 2846, 3569, 386, 6941, 5539, 2797]
            }]
        };
        // 饼状图
        var option2 = {
            title: {
            },
            tooltip: {},
            legend: {},
            xAxis: {
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                data: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
            },
            yAxis: {
                axisLine: {
                    show: false,//不显示坐标轴线
                }
            },
            series: [{
                name: '销量',
                type: 'pie',
                data: [9, 11, 13, 10, 8, 11, 5],
                itemStyle: {
                    normal: {
                        length: 35,
                        length2:80
                    }
                }
                // label: {
                //     show: true,
                //     position: outside
                // }
            }]
        };
        // 柱状图
        var option3 = {
            title: {
            },
            tooltip: {},
            legend: {},
            xAxis: {
                data: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
            },
            yAxis: {
                name: '商品数',
                axisLine: {
                    show: false,//不显示坐标轴线
                }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [9, 11, 13, 10, 8, 11, 5],
                barWidth : 20,
                itemStyle: {
                    normal: {
                        color: '#5591f1'
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);         // 折线图
        myChart2.setOption(option2);         // 饼状图
        myChart3.setOption(option3);         // 柱状图

    $(function() {
            var slip = $('.line');
            var li = $('one');
            console.log(slip);
            //初始化滑块
            slip.css({
                'width':li.width()+69,
                'left' :0 +'px'
            });
            $('.topTitle-right-item ul li').mouseenter(function(){
                //显示滑块
                if(slip.css('display') == 'none'){
                    slip.show();
                };
                //移动滑块
                slip.stop().animate({
                    width: $(this).width()+1,
                    left:  parseInt($(this).position().left) === 0 ? 0 : parseInt($(this).position().left) + 45 +'px'
                },300);
            });
    })
}