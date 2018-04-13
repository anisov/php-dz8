var table = $(".table").find('.table__body');
$('.button__show').on('click', function () {
    $.ajax({
        url: '/products',
        type: 'GET',
        dataType: 'JSON'
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            table.append($('<tr>')
                .attr('id', data[i].id)
                .append($('<td>')
                    .attr('class', 'table__td')
                    .text(data[i].name)
                )
                .append($('<td>')
                    .attr('class', 'table__td')
                    .text(data[i].price)
                )
                .append($('<td>')
                    .attr('class', 'table__td')
                    .text(data[i].category_id)
                )
                .append($('<td>')
                    .attr('class', 'table__td')
                    .append($('<a>')
                        .attr('class', 'table__delete')
                        .attr('href', '/products?id=' + data[i].id)
                        .text('удалить пользователя')
                    )
                    .append($('<a>')
                        .attr('class', 'table__put')
                        .attr('href', '/products')
                        .attr('id', data[i].id)
                        .text('Редактировать пользователя')
                    )
                )
            );
        }
    }).fail(function (jqXHR, textStatus) {
        console.log(textStatus)
    });
});

$(document).on('click', '.table__delete', function (e) {
    e.preventDefault();
    var url = e.currentTarget.getAttribute('href');
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'JSON'
    }).done(function (data) {
        table.find($('#' + data.id)).remove();
    }).fail(function (jqXHR, textStatus) {
        console.log(textStatus)
    });
});

$(document).on('click', '.table__put', function (e) {
    event.preventDefault();
    var url = e.currentTarget.getAttribute('href');
    var id = e.currentTarget.getAttribute('id');
    var form = $('#modal_form');
    form.find($('.modal__form')).attr("action", url);
    form.find($('#modal-id')).attr("value", id);
    $('#overlay').fadeIn(400,
        function () {
            $('#modal_form')
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        });
});

$('#modal_close, #overlay').click(function () {
    $('#modal_form, #modal_form-add')
        .animate({opacity: 0, top: '45%'}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
});

$(document).on('submit', '.js-put', function (e) {
    e.preventDefault();
    form = $(this);
    data = form.serialize();
    var url = form.attr('action');
    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'JSON',
        data: data
    }).done(function (data) {
        form.append($('<p>')
            .text('Товар изменён'));
        table.find($('#' + data.id)).empty()
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.name)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.price)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.category_id)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .append($('<a>')
                    .attr('class', 'table__delete')
                    .attr('href', '/products?id=' + data.id)
                    .text('удалить пользователя')
                )
                .append($('<a>')
                    .attr('class', 'table__put')
                    .attr('href', '/products')
                    .attr('id', data.id)
                    .text('Редактировать пользователя')
                )
            );
    }).fail(function (jqXHR, textStatus) {
        var responseText = $.parseJSON(jqXHR.responseText);
        form.children('p').remove();
        form.append($('<p>')
            .text(responseText));
    });
});

$(document).on('click', '.button__add', function (e) {
    event.preventDefault();
    $('#overlay').fadeIn(400,
        function () {
            $('#modal_form-add')
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        });
});

$(document).on('submit', '.js-add', function (e) {
    e.preventDefault();
    form = $(this);
    data = form.serialize();
    var url = form.attr('action');
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: data
    }).done(function (data) {
        form.append($('<p>')
            .text('Товар добавлен'));
        table.append($('<tr>')
            .attr('id', data.id))
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.name)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.price)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .text(data.category_id)
            )
            .append($('<td>')
                .attr('class', 'table__td')
                .append($('<a>')
                    .attr('class', 'table__delete')
                    .attr('href', '/products?id=' + data.id)
                    .text('удалить пользователя')
                )
                .append($('<a>')
                    .attr('class', 'table__put')
                    .attr('href', '/products')
                    .attr('id', data.id)
                    .text('Редактировать пользователя')
                )
            );
    }).fail(function (jqXHR, textStatus) {
        var responseText = $.parseJSON(jqXHR.responseText);
        form.children('p').remove();
        form.append($('<p>')
            .text(responseText));
    });
});