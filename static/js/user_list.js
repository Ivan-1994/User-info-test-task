function request_api(json) {
    var obj = document.getElementById('user_list');
    var items = '';
    $.each(json.results, function (id, val) {
        var total_page_views = 0;
        var total_clicks = 0;
        $.each(val.statistic, function (id, val) {
            total_page_views += val.page_views;
            total_clicks += val.clicks;

        });
        items += "<tr onclick='return location.href = \"/users/" + (Number(val.id)) + "\"'><th scope='row'>" + val.id + '</th><td>' + val.first_name + "</td><td>" + val.last_name +
            "</td><td>" + val.email + "</td><td>" + val.gender + "</td><td>" + val.ip_address + "</td><td>" +
            total_page_views + "</td><td>" + total_clicks + "</td></tr>";
    });
    obj.innerHTML = items;
}

function user_list_page() {
    $.getJSON(window.location.origin + "/api/users", function (json) {
        request_api(json);
        if (window.location.hash) {
            page = Number(window.location.hash.replace('#page=', ''));
            pagination(page);
        } else {
            p = '<ul class="pagination">\n' +
                '    <li class="page-item disabled">\n' +
                '        <a class="page-link">Previous</a>\n' +
                '     </li>\n' +
                '     <li class="page-item active" aria-current="page">\n' +
                '         <span class="page-link">\n' +
                '               1\n' +
                '               <span class="sr-only">(current)</span>\n' +
                '          </span>\n' +
                '     </li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + 2 + ')">2</a></li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + 3 + ')">3</a></li>\n' +
                '     <li class="page-item">\n' +
                '         <a class="page-link" onclick="pagination(' + 2 + ')">Next</a>\n' +
                '     </li>\n' +
                '</ul>';
            document.getElementById('pagination').innerHTML = p;
        }
    });
}

$(window).bind('hashchange', function () {
    page_hash = Number(window.location.hash.replace('#page=', ''));
    pagination(page_hash);
});

function pagination(page) {
    page = Number(page);
    $.getJSON(window.location.origin + "/api/users/?page=" + String(page), function (json) {
        request_api(json);

        window.location.hash = 'page=' + page;

        if (page === 1) {
            p = '<ul class="pagination">\n' +
                '    <li class="page-item disabled">\n' +
                '        <a class="page-link">Previous</a>\n' +
                '     </li>\n' +
                '     <li class="page-item active" aria-current="page">\n' +
                '         <span class="page-link">\n' +
                '               1\n' +
                '               <span class="sr-only">(current)</span>\n' +
                '          </span>\n' +
                '     </li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page + 1) + ')">2</a></li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page + 2) + ')">3</a></li>\n' +
                '     <li class="page-item">\n' +
                '         <a class="page-link" onclick="pagination(' + (page + 1) + ')">Next</a>\n' +
                '     </li>\n' +
                '</ul>';
        } else if (page !== 1 && page !== Number(json.count) / 50) {
            p = '<ul class="pagination">\n' +
                '    <li class="page-item">\n' +
                '        <a class="page-link" onclick="pagination(' + (page - 1) + ')">Previous</a>\n' +
                '     </li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page - 1) + ')">' + (page - 1) + '</a></li>\n' +
                '     <li class="page-item active" aria-current="page">\n' +
                '         <span class="page-link">\n' +
                '               ' + page + ' \n' +
                '               <span class="sr-only">(current)</span>\n' +
                '          </span>\n' +
                '     </li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page + 1) + ')">' + (page + 1) + '</a></li>\n' +
                '     <li class="page-item">\n' +
                '         <a class="page-link" onclick="pagination(' + (page + 1) + ')">Next</a>\n' +
                '     </li>\n' +
                '</ul>';
        } else if (page === Number(json.count) / 50) {
            p = '<ul class="pagination">\n' +
                '    <li class="page-item">\n' +
                '        <a class="page-link" onclick="pagination(' + (page - 1) + ')">Previous</a>\n' +
                '     </li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page - 2) + ')">' + (page - 2) + '</a></li>\n' +
                '     <li class="page-item"><a class="page-link" onclick="pagination(' + (page - 1) + ')">' + (page - 1) + '</a></li>\n' +
                '     <li class="page-item active" aria-current="page">\n' +
                '         <span class="page-link">\n' +
                '               ' + page + ' \n' +
                '               <span class="sr-only">(current)</span>\n' +
                '          </span>\n' +
                '     </li>\n' +
                '     <li class="page-item disabled">\n' +
                '         <a class="page-link">Next</a>\n' +
                '     </li>\n' +
                '</ul>';
        }

        document.getElementById('pagination').innerHTML = p;
    });
}