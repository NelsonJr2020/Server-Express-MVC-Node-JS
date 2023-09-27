
document.addEventListener('DOMContentLoaded', function() {
    //SELECCIÓN DE COLOR
    const cardElement = document.getElementById('card-color');
    const colorPicker = document.getElementById('color-picker');
    let selectedColor = colorPicker.value;
    cardElement.style.backgroundColor = selectedColor;

    colorPicker.addEventListener('input', function () {
        selectedColor = colorPicker.value;
        cardElement.style.backgroundColor = selectedColor;
    });

    //SELECCIÓN DE AVATAR
    const avatars = [
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671134.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436200.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-cabello-largo_23-2149436197.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-persona-gafas-sol-cabello-verde_23-2149436201.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436180.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436182.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-persona-camiseta-mangas_23-2149436199.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436192.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436178.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436185.jpg",
        "https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611716.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-persona-calva-gafas_23-2149436184.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-hombre-negocios-gafas_23-2149436194.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436190.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-persona-gafas-sol-arco-iris_23-2149436181.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671132.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671149.jpg",
        "https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611740.jpg"
    ];

    const avatarPicker = document.querySelector('.avatar-picker');
    const avatarOptionsContainer = document.querySelector('.avatar-options');
    const avatarButton = document.querySelector('.avatar-button');
    const currentAvatar = document.getElementById('default-avatar');
    const avatarInput = document.getElementById('avatar-input');

    function generateAvatarOptions() {
        avatarOptionsContainer.innerHTML = ''; 
        
        avatars.forEach((url, index) => {
            const option = document.createElement('div');
            option.classList.add('avatar-option');
            option.innerHTML = `<img src="${url}" alt="Avatar ${index}">`;
            option.addEventListener('click', () => {
                currentAvatar.src = url;
                avatarInput.value = url;
            });
            avatarOptionsContainer.appendChild(option);
        });

        avatarOptionsContainer.style.backgroundColor = "#33333399";
        document.addEventListener('click', handleDocumentClick);
    }
    
    avatarButton.addEventListener('click', () => {
        const avatarOptions = document.querySelectorAll('.avatar-option');
        if (avatarOptionsContainer.innerHTML === '') {
          generateAvatarOptions();
        } else {
            avatarOptionsContainer.innerHTML = '';
            avatarOptionsContainer.style.backgroundColor = "transparent";
        }
    });

    function handleDocumentClick(event) {
        if (!avatarPicker.contains(event.target)) {
            avatarOptionsContainer.innerHTML = '';
            avatarOptionsContainer.style.backgroundColor = "transparent";
            document.removeEventListener('click', handleDocumentClick);
        }
    }
});