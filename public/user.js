var username;


function login() {
    $.confirm({
        title: 'Ingresa tu Nombre',
        content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>Ingresa tus Credenciales de Usuario</label>' +
        '<input type="text" placeholder="Tu Nombre Aqui" class="name form-control" required />' +
        '<input type="password" placeholder="Tu Contraseña" class="password form-control" required />' + 
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {
                    var name = this.$content.find('.name').val();
                    var password = this.$content.find('.password').val();
                    if(!name || !password){
                        $.alert('Este campo no puede estar vacio');
                        return false;
                    }
                    // HERE YOU CAN ADD THE REQUEST TO THE SERVER TO SEE IF THE LOGIN IS OK
                    // return loginRequest(name, password);
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
}

