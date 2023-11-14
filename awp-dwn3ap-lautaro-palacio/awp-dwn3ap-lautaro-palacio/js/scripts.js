(function () {

    document.querySelector('.share').addEventListener('click', function () {

        if (navigator.share) {
            navigator.share({
                title: 'PWA',
                text: 'Compartir PWA',
                url: 'http://127.0.0.1:5500/index.html',
            })
                .then(function () {
                    console.log("Se compartió")

                })
                .catch(function (error) {
                    console.log(error)


                })
        }
    });

})()

  // Evento que se dispara cuando la PWA puede ser instalada
    window.addEventListener('beforeinstallprompt', (event) => {
    // Previene que la ventana de instalación se muestre automáticamente
    event.preventDefault();

    // Guarda el evento para usarlo después
    let deferredPrompt = event;

    // Muestra un botón o realiza alguna acción para permitir al usuario instalar la PWA
    const installButton = document.getElementById('instalar');
    installButton.textContent = 'Instalar PWA';
    installButton.addEventListener('click', () => {
      // Muestra la ventana de instalación
    deferredPrompt.prompt();

      // Espera a que el usuario responda
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('El usuario instaló la PWA');
        } else {
            console.log('El usuario canceló la instalación');
        }

        // Limpiar la referencia al evento
        deferredPrompt = null;
        });
    });
});