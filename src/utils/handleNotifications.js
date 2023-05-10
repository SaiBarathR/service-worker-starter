import { showErrorNotification, showSuccessNotification } from "../components/NotiService";

export function handleIncommingCallNotification() {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission((result) => {
            console.log('Notifications permission is:', Notification.permission)
            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    const notificationConstraints = {
                        icon: `${process.env.PUBLIC_URL}/icons/peace.jpg`,
                        body: 'Test Notification',
                        requireInteraction: true,
                        actions: [{ title: "Button-1", action: 'button1' },
                        { title: "Button-2", action: 'button2' }],
                    }
                    registration.showNotification('Sw Test', notificationConstraints);
                    console.log('Sent Notification"')
                    showSuccessNotification("Sent Notification")
                });
                navigator.serviceWorker.onmessage = (msg) => {
                    if (msg.data.action === 'button1') {
                        showSuccessNotification('Pressed Button-1');
                        console.log('Pressed Button-1');
                    } else if (msg.data.action === 'button2') {
                        showSuccessNotification('Pressed Button-2');
                        console.log('Pressed Button-2');
                    }
                }
            }
        });
    } else {
        console.log('Notifications permission denied');
        showErrorNotification('Notifications permission denied');
    }
}

export function forceCloseAllNotification() {
    navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.getNotifications().then(function (notifications) {
            notifications.forEach(function (notification) {
                notification.close();
            })
        })
    })
}

export function isServiceWorker() {
    if (localStorage.getItem('isServiceWorker') === 'true') {
        console.log('Service Worker is running');
        showSuccessNotification('Service Worker is running');
        return true
    } else {
        console.log('Service Worker is not running');
        showErrorNotification('service worker is not running');
        return false
    }
}

export const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            navigator.serviceWorker.register("./sw.js", { scope: "/", }).then((registration) => {
                console.log("Service worker registered", registration);
                localStorage.setItem('isServiceWorker', true);
                showSuccessNotification('service worker registered');
                if (registration.installing) {
                    console.log("Service worker installing");
                } else if (registration.waiting) {
                    console.log("Service worker installed");
                } else if (registration.active) {
                    console.log("Service worker active");
                }
            }).catch(error => console.log(error))
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
    else {
        console.error(`Service Worker not supported`);
        showErrorNotification('service worker not supported');
        localStorage.setItem('isServiceWorker', false);
    }
};
