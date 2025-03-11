$("#keywords").keydown(function (e) {
    if (e.which == 13) {
        search();
    }
});

$("#searchbtn").click(function () {
    search();
})

function search(){
    var keywords = $("#keywords").val();
    $(location).attr("href", "https://www.baidu.com/s?wd=" + keywords);
}