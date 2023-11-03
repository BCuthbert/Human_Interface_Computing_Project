


window.onload = function () {
                                                    // Create RealCompany navlink
    // Include css file
    var place = document.getElementsByTagName("script")[0];
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", "navbar.css");
    place.append(css);


    // link to realcompany
    var aReal = document.getElementById("realcompany");
    aReal.setAttribute("href", "http://localhost:8000");
    

    // link to why
    var aWhy = document.getElementById("why");
    aWhy.setAttribute("href", "http://localhost:8000/why");


    // link to product
    var aProduct = document.getElementById("product");
    aProduct.setAttribute("href", "http://localhost:8000/product");


    // link to company
    var aCompany = document.getElementById("company");
    aCompany.setAttribute("href", "http://localhost:8000/company");


    // link to blog
    var aBlog = document.getElementById("blog");
    aBlog.setAttribute("href", "http://localhost:8000/blog");


    // link to profile
    var pic = document.getElementById("profileIcon");
    pic.setAttribute("onclick", "window.location.href='http://localhost:8000/login.html'");


};
