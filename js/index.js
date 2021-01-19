$("input.task_name").on("focus", function (e) {
    $("div.task_add_block").addClass("-on")
});

$("input.task_name").on("blur", function (e) {
    $("div.task_add_block").removeClass("-on")
});

$("input.task_name").keydown(function (e) {
    if (e.which == 13) {
        $("button.task_add").click()
    }
});

$("button.task_add").on("click", function (e) {

    var taskName = $("input.task_name").val().trim();
    if (taskName != ("")) {

        $("ul.task_list").prepend(`
        <li>
            <div class="item_flex">
                <div class="left_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                    </div>
                </div>
                <div class="middle_block">
                    <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                    </div>
                    <p class="the_text">`+ taskName + `</p>
                     <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value=" `+ taskName + ` ">
                </div>
                <div class="right_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_update">更新</button>
                        <button type="button" class="btn_delete">移除</button>
                    </div>
                </div>
            </div>
        </li>
     `)
        $("input.task_name").val("");
    }
})

$("button.btn_empty").on("click", function (e) {
    let confirmListDel = confirm("確認清空?")
    if (confirmListDel) {
        $("ul.task_list").children("li").animate({
            "opacity": 0
        }, 1000, "swing", function () {
            $(this).remove();
        });
    }
})

$("ul.task_list").on("click", "button.btn_delete", function (e) {
    let confirmBtnDel = confirm("確認移除?")
    if (confirmBtnDel) {
        $(this).closest("li").animate({
            "opacity": 0
        }, 1000, "swing", function () {
            $(this).remove();
        });
    }
})

$("ul.task_list").on("click", "button.btn_update", function (e) {
    let updateTaskName = ($(this).closest("li").find("input.task_name_update").val()).trim();
    if (updateTaskName == "") {
        alert("請輸入代辦事項:");
    } else {
        $(this).closest("li").find("p.the_text").html(updateTaskName).toggleClass("-none");
        $(this).closest("li").find("input.task_name_update").val(updateTaskName).toggleClass("-none");
    }
});

$("ul.task_list").on("click", "button.btn_up", function (e) {
    let move = $(this).closest("li");
    let premove = move.prev();
    if (premove.length != 0) {
        premove.before(move);
    }

});

$("ul.task_list").on("click", "button.btn_down", function (e) {
    let move = $(this).closest("li");
    let nextmove = move.next();
    if (nextmove.length != 0) {
        nextmove.after(move);
    }
});

$("ul.task_list").on("click", "span.star", function (e) {
    let currentStar = parseInt($(this).attr("data-star"));
    $(this).closest("div.star_block").find("span.star").each(function (i, item) {
        if (parseInt($(this).attr("data-star")) <= currentStar) {
            $(this).addClass("-on");
        } else {
            $(this).removeClass("-on");
        }
    })
});