document.addEventListener('DOMContentLoaded', function() {
    //ELIMINAR USUARIOS
    const deleteUserButtons = document.querySelectorAll('.deleteUser');
    deleteUserButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
            if (confirmed) {
                // Envía el formulario para eliminar al usuario.
                button.closest('form').submit();
            } else {
                // El usuario canceló la eliminación, no hagas nada.
            }

            event.preventDefault();
        });
    });
});