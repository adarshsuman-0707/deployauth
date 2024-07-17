let list = document.getElementById("list")

function restart() {
    $("#list").empty()
    $.get("/todo", (res) => {
        for (let i of res) {
            let li = document.createElement("li")
            li.textContent = i;
            list.appendChild(li)
        }
    })
}
restart()

$("#add").on("click", () => {
    let inp = $("#num").val();
    $.post('/todo', { inp }, (res) => {    
        // console.log(res);
        $("#num").val(' ')
        restart();
    })

})


