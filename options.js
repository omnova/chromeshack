function loadOptions()
{
    showLolTags(getOption("lol_tags"));
    showPostPreviewLocation(getOption("post_preview_location"));
    showEnabledScripts();
}

function getOption(name)
{
    var value = localStorage[name];
    if (value)
        return JSON.parse(value);
    return DefaultSettings[name];
}

function saveOption(name, value)
{
    localStorage[name] = JSON.stringify(value);
}

function showPostPreviewLocation(position)
{
    var select = document.getElementById("post_preview_location");
    select.selectedIndex = (position == "Left") ? 0 : 1;
}

function getPostPreviewLocation()
{
    var select = document.getElementById("post_preview_location");
    return select.value;
}

function showLolTags(tags)
{
    var lol_div = document.getElementById("lol_tags");
    lol_div.innerHTML = ""; // clear child nodes

    for (var i = 0; i < tags.length; i++)
    {
        var tag_row = document.createElement("div");
        tag_row.innerHTML = "Tag: <input class='name' value='" + tags[i].name + "'/> Color: <input class='color' value='" + tags[i].color + "'/> <a href='#' onclick='removeTag(this); return false'>(remove)</a>";
        lol_div.appendChild(tag_row);
    }
}

function removeTag(node)
{
    var tag_row = node.parentNode;
    tag_row.parentNode.removeChild(tag_row);
}

function addTag()
{
    var tag_row = document.createElement("div");
    tag_row.innerHTML = "Tag: <input class='name' value=''/> Color: <input class='color' value=''/> <a href='#' onclick='removeTag(this); return false'>(remove)</a>";

    var lol_div = document.getElementById("lol_tags");
    lol_div.appendChild(tag_row);
}

function getLolTagValues()
{
    var tags = [];
    var lol_div = document.getElementById("lol_tags");
    for (var i = 0; i < lol_div.children.length; i++)
    {
        var tag_name = getDescendentByTagAndClassName(lol_div.children[i], "input", "name").value;
        var tag_color = getDescendentByTagAndClassName(lol_div.children[i], "input", "color").value;
        tags[i] = {name: tag_name, color: tag_color};
    }
    return tags;
}

function showEnabledScripts()
{
    var enabled = getOption("enabled_scripts");

    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i].type == "checkbox" && inputs[i].className == "script_check")
        {
            var found = false;
            for (var j = 0; j < enabled.length; j++)
            {
                if (enabled[j] == inputs[i].id)
                {
                    found = true;
                    break;
                }
            }
            inputs[i].checked = found;
        }
    }
}

function getEnabledScripts()
{
    var enabled = [];
    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i].type == "checkbox" && inputs[i].className == "script_check")
        {
            if (inputs[i].checked)
            {
                enabled.push(inputs[i].id); 
            }
        }
    }

    return enabled;
}

function getDescendentByTagAndClassName(parent, tag, class) 
{
    var descendents = parent.getElementsByTagName(tag);
    for (var i = 0; i < descendents.length; i++) 
    {
        if (descendents[i].className.indexOf(class) == 0) 
            return descendents[i];
    }
}

function saveOptions()
{
    saveOption("lol_tags", getLolTagValues());
    saveOption("post_preview_location", getPostPreviewLocation());
    saveOption("enabled_scripts", getEnabledScripts());
    
    // Update status to let the user know options were saved
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1000);
}
