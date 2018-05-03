var record = null;
var array = new Array();

var clo_button = null;      //添加的小板块的关闭按钮
var block = null;           //添加的板块;
var judgediv = null;
var title_color = null;

var flag = null;


function dialog() {
    var dialog = document.getElementById("add_dialog");
    dialog.style.setProperty("display", "block")
};

/*
关闭添加窗口
 */
function clos() {
    var iframe = window.parent.document.getElementById("add_dialog");
    iframe.style.setProperty("display", "none");
}


/*
获取输入的值
 */
function get() {
    record = new Object();
    record.week = document.getElementById("sel").value;
    record.tit = document.getElementById("ipt").value.trim();
    record.content = document.getElementById("teta").value;
}

/*
判断是哪个星期模块
 */
function judgeDiv() {
    if (record.week == "Monday") {
        judgediv = document.getElementById("mon");
        title_color = "#D0E0E0";
    } else if (record.week == "Tuesday") {
        judgediv = document.getElementById("tue")
        title_color = "#E9B7B7";
    } else if (record.week == "Wednesday") {
        judgediv = document.getElementById("wed")
        title_color = "#E9B7B7";
    } else if (record.week == "Thursday") {
        judgediv = document.getElementById("thu")
        title_color = "#E2DDC0";
    } else {
        judgediv = document.getElementById("fri")
        title_color = "#86CEEC";
    }
}

/*
此方法创建元素
 */
function createEle() {
    block = document.createElement("div");
    block.style.cssText = 'width:60px; height:50px border:1px solid';
    clo_button = document.createElement("input");
    record.ref_btn = document.createElement("button");

}

/*
添加样式
 */
function addStyle() {
    clo_button.type = "image";
    clo_button.src = "images/close.PNG";
    clo_button.style.cssText = "margin-left:100px"
    record.ref_btn.style.cssText = "background-color:" + title_color.toString() + ";width:90px;height:60px;overflow:auto;margin-left:30px";

}

/*
添加事件的方法
 */
function addMyEvent() {
    clo_button.addEventListener("click", function (event) {                 //给关闭按钮添加事件
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        for (var i = 0; i < array.length; i++) {
            if (array[i].ref_btn === event.target.nextSibling) {
               array[i] = null;
            }
        }
    }, false);

    record.ref_btn.addEventListener("click", function (event) {               //给title按钮添加点击事件
        document.getElementById("detail_dialog").style.cssText = "display:block;"
        for (var i = 0; i < array.length; i++) {
            if (event.target === array[i].ref_btn) {
                flag = i;
                document.getElementById("detail_sel").value = array[i].week;
                document.getElementById("detail_iptt").value = array[i].tit;
                document.getElementById("detail_teta").value = array[i].content;
            }
        }
    }, false);
    array[array.length] = record;
}

function addValue() {
    record.ref_btn.innerHTML = record.tit;
}

/*
插入添加的标题
 */
function insert() {
    judgediv.appendChild(block);
    block.appendChild(clo_button);
    block.appendChild(record.ref_btn);

}

/*
修改的功能
 */
function modify() {
    if(array[flag].week != document.getElementById("detail_sel").value){
        array[flag].ref_btn.parentNode.parentNode.removeChild(array[flag].ref_btn.parentNode);

        array[flag].week = document.getElementById("detail_sel").value;
        array[flag].tit = document.getElementById("detail_iptt").value;
        array[flag].content = document.getElementById("detail_teta").value;
        if (array[flag].week == "Monday") {
            judgediv = document.getElementById("mon");
            title_color = "#D0E0E0";
        } else if (array[flag].week == "Tuesday") {
            judgediv = document.getElementById("tue")
            title_color = "#E9B7B7";
        } else if (array[flag].week == "Wednesday") {
            judgediv = document.getElementById("wed")
            title_color = "#E9B7B7";
        } else if (array[flag].week == "Thursday") {
            judgediv = document.getElementById("thu")
            title_color = "#E2DDC0";
        } else {
            judgediv = document.getElementById("fri")
            title_color = "#86CEEC";
        }

        block = document.createElement("div");
        block.style.cssText = 'width:60px; height:50px border:1px solid';
        clo_button = document.createElement("input");
        judgediv.appendChild(block);
        block.appendChild(clo_button);
        block.appendChild(array[flag].ref_btn);

        clo_button.type = "image";
        clo_button.src = "images/close.PNG";
        clo_button.style.cssText = "margin-left:100px"
        array[flag].ref_btn.style.cssText = "background-color:" + title_color.toString() + ";width:90px;height:60px;overflow:auto;margin-left:30px";

        array[flag].ref_btn.innerHTML = array[flag].tit;
    }else{
        array[flag].week = document.getElementById("detail_sel").value;
        array[flag].tit = document.getElementById("detail_iptt").value;
        array[flag].content = document.getElementById("detail_teta").value;

        array[flag].ref_btn.innerHTML = array[flag].tit;
    }



    //insert();

 //   addValue();
}

/*
关闭查看修改窗口
 */
function clo_detail() {
    document.getElementById("detail_dialog").style.cssText = "display:none;"
}

/*
检索的功能
 */
var search = document.getElementById("search");
search.addEventListener("keyup",function (event) {
    if (event.keyCode == 13){
        var flag_find = 0;
        for (var i = 0 ;i <= array.length;i++){
            if (array[i] != null && search.value.trim() === array[i].tit){
                flag = i;
                document.getElementById("detail_dialog").style.cssText = "display:block;"
                document.getElementById("detail_sel").value = array[i].week;
                document.getElementById("detail_iptt").value = array[i].tit;
                document.getElementById("detail_teta").value = array[i].content;
                flag_find = 1;
            }
        }
        if (flag_find == 0){
            alert("not found!");
        }
    }
})
