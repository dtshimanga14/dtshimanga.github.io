
$(() => {
    function onPost() {
        let id = this.id;
        $.get("/data",{ id },onSuccess);
    }
    const onSuccess = (data) => {
        $("#cpu").text(data.cpuSpeed);
        $("#ram").text(data.Ram);
        $("#space").text(data.Storage);
        $("#price").text(data.Price);
        console.log(data);
    };
    $("#1").on('click',onPost);
    $("#2").on('click',onPost);
    $("#3").on('click',onPost);
});