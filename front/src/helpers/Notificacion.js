import PNotify from "pnotify/dist/es/PNotify";
export const alert_exitoso = (mensaje) => {
    const notice = PNotify.success({
        title: 'Información!',
        text: mensaje,
        hide: true,
        icon: true,
        delay: 1000,
        animation: 'fade',
        mouseReset: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

export const alert_error = (mensaje) => {
    const notice = PNotify.error({
        title: 'Error!',
        text: mensaje,
        hide: true,
        icon: true,
        delay: 1000,
        animation: 'fade',
        mouseReset: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

export const alert_info = (mensaje) => {
    const notice = PNotify.info({
        title: 'Información!',
        text: mensaje,
        hide: true,
        icon: true,
        delay: 1000,
        animation: 'fade',
        mouseReset: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

export const alert_warning = (mensaje) => {
    const notice = PNotify.notice({
        title: 'Advertencia!',
        text: mensaje,
        hide: true,
        icon: true,
        delay: 1000,
        animation: 'fade',
        mouseReset: true,
        modules: {
            Buttons: {
                closer: true,
                sticker: true
            }
        }
    });
    notice.on('click', function () {
        notice.close();
    });
}

