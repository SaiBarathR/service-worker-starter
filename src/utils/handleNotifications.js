import { showErrorNotification, showSuccessNotification } from "../components/NotiService";

export function handleIncommingCallNotification() {
    if (Notification.permission !== 'denied') {
        Notification.requestPermission((result) => {
            console.log('Notifications permission is:', Notification.permission)
            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification('Sw Test', {
                        icon: `${process.env.PUBLIC_URL}/icons/ozonetel-logo.svg`,
                        body: 'Test Incomming Call',
                        requireInteraction: true,
                        actions: [{ title: "Answer", action: 'answer' },
                        { title: "Decline", action: 'decline' }],
                    });
                    console.log('Sent Notification"')
                    showSuccessNotification("Sent Notification")
                });
                navigator.serviceWorker.onmessage = (msg) => {
                    if (msg.data.action === 'answer') {
                        showSuccessNotification('Answer');
                        console.log('Answer');
                    } else if (msg.data.action === 'decline') {
                        showSuccessNotification('Decline');
                        console.log('Decline');
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
