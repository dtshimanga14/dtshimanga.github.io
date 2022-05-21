$(()=> {
    function onPush(evt) {
        let curr = $("#comment");
        let obj = { comment : curr.val() };

        fetch("/addData",{ 
            method : "post",
            body : JSON.stringify(obj),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
         .then(onSucess)
         .catch(onFail);
    }
    function onSucess (data) {
        $("#list").append('<li>'+ data.comment + '</li>')
    }
    function onFail (exception) {
        alert(exception);
    }
    $("#push").on('click',onPush);
});