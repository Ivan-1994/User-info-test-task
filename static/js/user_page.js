let user_id;

function user_page(pk) {
    user_id = pk;
    $.getJSON(window.location.origin + "/api/users/" + pk, function (json) {
        let items = '';
        items += "<tr class=\"table-success\"><td>" + json.first_name + "</td><td>" + json.last_name + "</td><td>" + json.email + "</td><td>" +
            json.gender + "</td><td>" + json.ip_address + "</td>";
        document.getElementById('user_date').innerHTML = items;

        $.getJSON(window.location.origin + "/api/users/" + pk + "/statistic/?date1=" + "2019-10-1" + "&date2=" + "2019-11-10",
            function (json) {
                let items = '';
                $.each(json, function (id, val) {
                    items += "<tr><th scope='row'>" + (id + 1) + '</th><td>' + val.date + "</td><td>" + val.clicks +
                        "</td><td>" + val.page_views + "</td></tr>";
                });
                document.getElementById('statictic_date').innerHTML = items;
            });
    });
}

function date_picker() {
    let date = new Date();
    let date_now = date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
    date.setDate(date.getDate() - 6);
    let date_start = date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
    document.getElementById('datepicker2').value = date_now;
    document.getElementById('datepicker1').value = date_start;
    $("#datepicker1").datepicker({dateFormat: "yy-mm-dd"});
    $("#datepicker2").datepicker({dateFormat: "yy-mm-dd"});
}

function loadChart() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChartClick);
    google.charts.setOnLoadCallback(drawChartPageViews);
}

function drawChartClick() {
    let start_date = new Date(document.getElementById('datepicker1').value);
    let end_date = new Date(document.getElementById('datepicker2').value);
    let user_statistic = [['Дата', 'Клики']];
    let date1 = start_date.getFullYear() + '-' + (Number(start_date.getMonth()) + 1) + '-' + start_date.getDate();
    let date2 = end_date.getFullYear() + '-' + (Number(end_date.getMonth()) + 1) + '-' + end_date.getDate();

    $.getJSON(window.location.origin + "/api/users/" + user_id + "/statistic/?date1=" + date1 + "&date2=" + date2, function (user_data_statistic) {
        for (const key in Array.from(Array(7).keys())) {
            let write_data_bool = true;
            if (user_statistic.length === 8) {

                break;
            }
            for (const i in Array.from(user_data_statistic.keys())) {
                statistic_date = new Date(user_data_statistic[i].date);
                if (start_date.toLocaleDateString() === statistic_date.toLocaleDateString()) {
                    user_statistic.push([user_data_statistic[i].date, user_data_statistic[i].clicks]);
                    start_date.setDate(start_date.getDate() + 1);
                    write_data_bool = false;
                    break;
                }
            }
            if (write_data_bool) {
                user_statistic.push([start_date.getFullYear() + '-' + (Number(start_date.getMonth()) + 1) + '-' + start_date.getDate(), 0]);
                start_date.setDate(start_date.getDate() + 1);
            }
        }
        let data = google.visualization.arrayToDataTable(user_statistic);
        let options = {
            title: 'Статистика Кликов',
            curveType: 'function',
            legend: {position: 'bottom'}
        };
        let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
    });
}

function drawChartPageViews() {
    let start_date = new Date(document.getElementById('datepicker1').value);
    let end_date = new Date(document.getElementById('datepicker2').value);
    let user_statistic = [['Дата', 'Просмотры Страниц']];
    let date1 = start_date.getFullYear() + '-' + (Number(start_date.getMonth()) + 1) + '-' + start_date.getDate();
    let date2 = end_date.getFullYear() + '-' + (Number(end_date.getMonth()) + 1) + '-' + end_date.getDate();

    $.getJSON(window.location.origin + "/api/users/" + user_id + "/statistic/?date1=" + date1 + "&date2=" + date2, function (user_data_statistic) {
        for (const key in Array.from(Array(7).keys())) {
            let write_data_bool = true;
            if (user_statistic.length === 8) {
                break;
            }
            for (const i in Array.from(user_data_statistic.keys())) {
                statistic_date = new Date(user_data_statistic[i].date);

                if (start_date.toLocaleDateString() === statistic_date.toLocaleDateString()) {
                    user_statistic.push([user_data_statistic[i].date, user_data_statistic[i].page_views]);
                    start_date.setDate(start_date.getDate() + 1);
                    write_data_bool = false;
                    break;
                }


            }
            if (write_data_bool) {
                user_statistic.push([start_date.getFullYear() + '-' + (Number(start_date.getMonth()) + 1) + '-' + start_date.getDate(), 0]);
                start_date.setDate(start_date.getDate() + 1);
            }
        }
        let data = google.visualization.arrayToDataTable(user_statistic);
        let options = {
            title: 'Статистика Просмотров Страниц',
            curveType: 'function',
            legend: {position: 'bottom'}
        };
        let chart = new google.visualization.LineChart(document.getElementById('curve_chart1'));
        chart.draw(data, options);
    });
}

function change_date_picker1() {
    let dp1_date = new Date(document.getElementById('datepicker1').value);
    dp1_date.setDate(dp1_date.getDate() + 6);
    document.getElementById('datepicker2').value =
        dp1_date.getFullYear() + '-' + (Number(dp1_date.getMonth()) + 1) + '-' + dp1_date.getDate();
}

function change_date_picker2() {
    let dp1_date = new Date(document.getElementById('datepicker2').value);
    dp1_date.setDate(dp1_date.getDate() - 6);
    document.getElementById('datepicker1').value =
        dp1_date.getFullYear() + '-' + (Number(dp1_date.getMonth()) + 1) + '-' + dp1_date.getDate();
}