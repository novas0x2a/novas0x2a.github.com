function pickColor(name)
{
    var elts = $('link');
    for (var i = 0, len=elts.length; i < len; ++i)
    {
        var elt = elts[i];
        if (elt.rel && elt.title && elt.rel.indexOf("stylesheet") != -1)
            elt.disabled = true;
        if (elt.title == name)
            elt.disabled = false;
    }
}

function sortKey(key) {
    return function(a,b) {
        return (a[key] > b[key]) - (a[key] < b[key]);
    }
}

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
function populateCode(json) {
    var repo = json.user.repositories.sort(sortKey('name'));

    jQuery(function() {
        jQuery.each(repo, function(i, val) {
            if (val.private)
                return;
            $("#code_list").append(
                "<li><a title=\"" + val.description + "\" href=\"" + val.url + "\">" +
                     val.name.replace(".github.com", "") +
                "</a></li>");
        });
    });
}
