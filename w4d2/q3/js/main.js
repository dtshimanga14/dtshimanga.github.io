$(() => {   
    $("form").submit(function() {      
        const clearMsg = () => $("#msg").text("");
        const addedSuccess = () => {
            $("#msg").text("Item added to cart successfully");
            setTimeout(clearMsg, 3000);
        }
        const noSuccess = () => {
            $("#msg").text("Unable to reach server");
            setTimeout(clearMsg, 3000);
        }
        let name = $(this).children().eq(0).val();
        let price = $(this).children().eq(1).val();
        let item = {prodName:name,prodPrice: price};
        $.post({
            url: "/addToCart",
            data: JSON.stringify(item),
            contentType: "application/json; charset=utf-8"
        }).done(addedSuccess)
            .fail(noSuccess);
        return false;
    })
})

