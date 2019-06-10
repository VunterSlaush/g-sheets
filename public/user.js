var username;

$.confirm({
    title: 'Ingresa tu Nombre',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Enter something here</label>' +
    '<input type="text" placeholder="Tu Nombre Aqui" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: function () {
                var name = this.$content.find('.name').val();
                if(!name){
                    $.alert('Este campo no puede estar vacio');
                    return false;
                }
                username = name;
            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});