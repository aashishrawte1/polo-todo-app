//have to import jquery cdn link in frontend
$(function(){
    $('#searchBox').autocomplete({
        source: function (req, res) {
            $.ajax({
                url: "search/",
                dataType: "jsonp",
                type: "GET",
                data: req,
                success: function (data) {
                    res(data)
                },
                error: function (err) {
                    console.log(err.status);
                }
            });
        },

        minLength: 3,
        select: function (event, ui) {
            if (ui.item) {
                $('#searchBox').text(ui.item.label)
            }
        }
    })
});
