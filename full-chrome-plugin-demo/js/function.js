console.log("---脚本注入成功！---");


// this.http.request("/user/sysUser/userRoleMenus", {
//     menuType: "FRONT",
//     clientType: "PC"
// })

// var ID = "2c9e80897fdf387a017fe44b9b184e7c"
//
// $.ajax({
//     type: "POST",
//     url: "https://kdhrtrain.kingdee.com/lms/api/user/examactive/viewResult",
//     beforeSend: function(request) {
//         request.setRequestHeader("Authorization","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlSWQiOiIwMDEsMmNhODgwODQ3MjZiM2U0NTAxNzI2ZWU0MTNiMzEwMjciLCJ1c2VySWQiOiIyYzkyNDhkNjZlNDU3NzljMDE2ZThmM2U0N2Y1MzdjZSIsImlhdCI6MTY0ODg3NDA3Mn0.C0KZyj_9jnuygSoiTu1rjVVFsa5CNWMy9chbd_lTF38");
//     },
//     data: {id:ID},
//     dataType: "json",
//     success: function(data){
//         console.log(data)
//     }
// });
//


// setTimeout(function () {
//
//
// //Access-Control-Allow-Origin
//
//
// }, 3000)

function questionsearch(url) {
    var cards = document.getElementsByClassName("card");
    var cardshtml = ''
    var index;
    for (index = 0; index < cards.length; index++) {
        cardshtml += cards[index].innerHTML.trim();
    }
    console.log(cardshtml);

    $(".hackquestion").remove();
    $.ajax({
        type: "post",
        url: url + "/questionsearch",
        dataType:"text",
        data:{
            cardshtml,
        },
        success: function (data) {
            var answerdata = $.parseJSON(data).answer;
            var rightsCount = $.parseJSON(data).rightCount;
            var errorsCount = $.parseJSON(data).errorCount;
            var nonesCount = $.parseJSON(data).noneCount;

            tip("共找到正确答案" + rightsCount + "个，错误答案" + errorsCount + "个，无答案"+ nonesCount +"个！")
            for (var index in answerdata) {
                var itemdom = $("#" + answerdata[index].id)
                var offsettop = itemdom.offset().top;
                var offsetleft = itemdom.offset().left;
                var offsetwidth = itemdom.width();
                var offsetheight = itemdom.height();


                // $(document.body).append(data[index].html);
                if (answerdata[index].result.length > 0) {
                    for (var resindex in answerdata[index].result) {
                        var questionhtml = answerdata[index].result[resindex].html;
                        var isright = answerdata[index].result[resindex].isRight;

                        const question = document.createElement("div");
                        question.className = "hackquestion";
                        if(isright){
                            question.style = "position: absolute;" +
                                "float: left;" +
                                "border: 2px solid green;" +
                                "top:" + offsettop + "px;" +
                                "left:" + (((offsetwidth * resindex) * 0.75) + offsetwidth) + "px;" +
                                "width:" + offsetwidth + "px;" +
                                "background: #e5fff2;" +
                                "transform:scale(0.75,0.75);";
                        }else {
                            question.style = "position: absolute;" +
                                "float: left;" +
                                "border: 2px solid red;" +
                                "top:" + offsettop + "px;" +
                                "left:" + (((offsetwidth * resindex) * 0.75) + offsetwidth) + "px;" +
                                "width:" + offsetwidth + "px;" +
                                "background: #ffe5e5;" +
                                "transform:scale(0.75,0.75);";
                        }
                        question.innerHTML = questionhtml;
                        document.getElementsByTagName('body')[0].appendChild(question);
                    }
                } else {
                    const question = document.createElement("div");
                    question.className = "hackquestion";
                    question.style = "position: absolute;" +
                        "float: left;" +
                        "border: 1px solid black;" +
                        "top:" + offsettop + "px;" +
                        "left:" + (((offsetwidth * 0) * 0.75) + offsetwidth) + "px;" +
                        "width:" + offsetwidth + "px;" +
                        "background: #f5f5f0;" +
                        "transform:scale(0.75,0.75);";
                    question.innerHTML = "未找到该题目";
                    document.getElementsByTagName('body')[0].appendChild(question);
                }
            }
        },
        error: function(){
            //请求出错处理
            alert("error");
        }
    });
}

function questionin(url){
    tip("点击收录")
    var cards = document.getElementsByClassName("card");
    var cardshtml = ''
    var index;
    for (index = 0; index < cards.length; index++) {
        cardshtml += cards[index].innerHTML.trim();
        console.log(cardshtml);
    }

    $.ajax({
        type: "post",
        url: url + "/questionin",
        dataType:"text",
        data:{
            cardshtml,
        },
        success: function (data) {
            tip(data)
            console.log(data)
        },
        error: function(){
            //请求出错处理
            alert("error");
        }
    });
}

function resulton() {
    $(".hackquestion").show()
    tip("打开")
}

function resultoff() {
    $(".hackquestion").hide()
    tip("关闭")
}

function testserver(url) {
    $.ajax({
        type: "post",
        url: url + "/testcontent",
        data:{"test":1},
        dataType: "text",
        success: function (data) {
            if("OK" == data){
                tip("测试成功")
                console.log("测试成功")
            }else {
                tip("测试失败")
                console.log("测试失败")
            }
        },
        error: function () {
            //请求出错处理
            alert("error");
        }
    });
}