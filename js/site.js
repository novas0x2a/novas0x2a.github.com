function pickColor(name)
{
    $('link[title][rel*=stylesheet]').attr('disabled', true).filter('[title=' + name + ']').attr('disabled', false);
}

function sortAttr(key) {
    return function(a,b) {
        return (a[key] > b[key]) - (a[key] < b[key]);
    }
}

function sortKey(f) {
    return function(a,b) {
        var at = f(a);
        var bt = f(b);
        return (at > bt) - (at < bt);
    }
}

var sortText = sortKey(function(a) {return $(a).text();})

// description -> tooltip
//
//"owner": "novas0x2a",
//"forks": 0,
//"name": "novas0x2a.github.com",
//"private": false,
//"url": "http://github.com/novas0x2a/novas0x2a.github.com",
//"watchers": 1,
//"fork": false,
//"homepage": "novas0x2a.github.com"
// <script src="http://github.com/api/v1/json/novas0x2a?callback=populateCode" type="text/javascript"></script>

$(function() {
    $.getJSON('http://github.com/api/v1/json/novas0x2a?callback=?',
        function(json) {
            var repo = json.user.repositories.sort(sortAttr('name'));

            $(repo).each(function(i, val) {
                if (val.private)
                    return;
                $("#code_list").append(
                    "<li><a title=\"" + val.description + "\" href=\"" + val.url + "\">" +
                         val.name.replace(".github.com", "") +
                    "</a></li>");
            });

            // sort it afterward to get the entries in the html, too
            var $kids = $("#code_list").children();
            var $sorted = jQuery.makeArray($kids).sort(sortText);
            $($sorted).appendTo("#code_list");
        }
    )
});
