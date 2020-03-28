$(document).ready(function(){

    $(document).on("click", "#btnRegister", function (e) {
        console.log(123);
        $.ajax({
            type: "get",
            url: "/api/user",
            success: res => {
                console.log(res);
            },
            error: res => {
                console.log(res);
            }
        })
    })

    $(document).on("click", "#btnSignin", function (e) {
        console.log(557);
    })
    $(document).on('keypress', '#user_name_signin', function (e) {
        if (event.keyCode == 13) {
            $.ajax({
                method: "post",
                url: "/api/user/select",
                contentType: "application/json",
                data: JSON.stringify( {
                    name: $("#user_name_signin").val(),
                    password: $("#user_password_signin").val()
                }),
                success: res => {
                    console.log(res);
                    if (res.status == 200) {
                        window.location.href = `/todo`;
                    }
                },
                error: res => {
                    console.log(res);
                }
            });
        }
    })
    $(document).on('keypress', '#user_name_register', function (e) {
        if (event.keyCode == 13) {
            $.ajax({
                method: "post",
                url: "/api/user/insert",
                contentType: "application/json",
                data: JSON.stringify({
                    name: $("#user_name_register").val(),
                }),
                success: res => {
                    console.log(res);
                    if (res.status == 200) {
                        console.log("jump");
                        window.location.href = `/`;
                    }
                },
                error: res => {
                    console.log(res);
                }
            });
        }
    })
})