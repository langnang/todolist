$(document).ready(function () {
    function itemInnerHtml(value) {
        let _html = `
<li class="list-group-item todo-item" todo-id="${value.id}">
                                `;
        if (value.state) {
            _html += `
                <input type="checkbox" checked="checked" todo-id="${value.id}"/>
                <span class="del" todo-id="${value.id}">${value.name}</span>`;
        }
        else {
            _html += `
                <input type="checkbox" todo-id="${value.id}"/>
                <span todo-id="${value.id}">${value.name}</span>`;

        }
        _html += `
<div class="btn-group btn-group-sm pull-right" role="group">
  <button type="button" class="btn btn-default glyphicon glyphicon-floppy-disk" todo-id="${value.id}"></button>
  <button type="button" class="btn btn-default glyphicon glyphicon-trash" todo-id="${value.id}"></button>
</div>
                            </li>`;
        return _html;
    }

    $.ajax({
        method: "get",
        url: "/api/todo/list",
        success: res => {
            console.log(res);
            if (res.status == 200) {
                res.data.forEach(v => {
                    console.log(v);
                    if (!v.state) {
                        $("#panel_todo").prepend(itemInnerHtml(v));
                    } else {
                        $("#panel_done").prepend(itemInnerHtml(v));
                    }
                })
            }
        },
        error: res => {
            console.log(res);
        }
    })

    $(document).on('keypress', '#input_todo', function (e) {
        if (event.keyCode == 13) {
            $.ajax({
                method: "post",
                url: "/api/todo/insert",
                contentType: "application/json",
                data: JSON.stringify({
                    name: $("#input_todo").val(),
                }),
                success: res => {
                    console.log(res);
                    if (res.status == 200) {
                        $("#panel_todo").prepend(itemInnerHtml(res.data));
                        $('#input_todo').val('');
                    }
                },
                error: res => {
                    console.log(res);
                }
            });
        }
    })
    $(document).on('click', 'span[todo-id]', function (e) {
        const _this = $(e.target);
        const _id = _this.attr("todo-id")
        const _val = _this.html();
        const _hasInput = _this.find("input").length == 0 ? false : true;
        if (!_hasInput && _id) {
            _this.html(`
                <div class="input-group">
                    <input type="text" class="form-control" value="${_val}">
                    <span class="input-group-btn">
                        <button class="btn btn-default glyphicon glyphicon-ok" type="button" todo-id="${_id}"></button>
                    </span>
                </div>
            `);
        }
    })

    $(document).on('click', '.glyphicon-ok', function (e) {
        const _this = $(e.target);
        const _id = _this.attr("todo-id")
        console.log(_this.parent().prev().val());
        $(`span[todo-id='${_id}']`).html(_this.parent().prev().val());
    })


    $(document).on('click', '.glyphicon-floppy-disk', function (e) {
        const _id = $(e.target).attr("todo-id");
        $.ajax({
            method: "post",
            url: "/api/todo/update",
            contentType: "application/json",
            data: JSON.stringify({
                id: parseInt(_id),
                state: $(`input[todo-id='${_id}'][type='checkbox']`).prop('checked'),
                name: $(`span[todo-id='${_id}']`).html(),
            }),
            success: res => {
                console.log(res);
                if (res.status == 200) {
                    if (res.data.state) {
                        $(`.todo-item[todo-id='${_id}']`).remove();
                        $("#panel_done").prepend(itemInnerHtml(res.data));
                    } else {
                        $(`.todo-item[todo-id='${_id}']`).remove();
                        $("#panel_todo").prepend(itemInnerHtml(res.data));
                    }
                }
            },
            error: res => {
                console.log(res);
            }
        })
    })

    $(document).on('click', '.glyphicon-trash', function (e) {
        const _id = $(e.target).attr("todo-id");
        $.ajax({
            method: "post",
            url: "/api/todo/delete",
            contentType: "application/json",
            data: JSON.stringify({
                id: parseInt(_id),
            }),
            success: res => {
                console.log(res);
                if (res.status == 200) {
                    $(`.todo-item[todo-id='${_id}']`).remove();
                }
            },
            error: res => {
                console.log(res);
            }
        })
    })
})