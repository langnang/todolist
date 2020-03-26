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
})