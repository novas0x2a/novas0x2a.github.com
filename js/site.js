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
