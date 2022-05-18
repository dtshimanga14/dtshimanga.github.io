
$(() => {
    const onSuccess = (data) => {
        $("#question").val(data);
    };
    $("#magic").on('click', () => {
        $.get("/8ball","false",onSuccess,"text");
    });
});
