$(() => {

    fetch("/js/contactinfo.txt", {
        method : "get",
        headers : {
            'Content-Type' : 'application/text',
            'Accept' : 'application/text'
        }
    }).then(data => data.text())
    .then(res => {
        $("#body").append('<pre>'+ res + '</pre>');
    });
});