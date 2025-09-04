const jsxbootstrap = {};

jsxbootstrap.include_script = function(p_url)
{
   document.write("<script src=\"" + p_url + "\"></script>\n");
}

jsxbootstrap.include_style = function(p_url)
{
   document.write("<style>@import url(\"" + p_url + "\");</style>\n");
}

jsxbootstrap.include_all = function()
{
   jsxbootstrap.include_style("../css/__all.css");

   jsxbootstrap.include_script("../js/_jsx.js");
   jsxbootstrap.include_script("../js/_jsx_assert.js");
   jsxbootstrap.include_script("../js/_jsx_regex.js");
   jsxbootstrap.include_script("../js/_jsx_html.js");
   jsxbootstrap.include_script("../js/_jsx_test.js");

   jsxbootstrap.include_script("../js/HtmlCppClassGenerator.js");

   // Add your JS scripts here
}

jsxbootstrap.include_all();
