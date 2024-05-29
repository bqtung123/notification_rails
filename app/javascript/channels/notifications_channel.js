import consumer from "channels/consumer"

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    console.log("connected notification channel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    this.displayNotification(data);
  },

  displayNotification(data) {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("notification granted");
      var notification = new Notification(data.title, { body: data.body });
    } else if (Notification.permission !== "denied") {
      console.log("notification permissions need to be requested");
    } else {
      console.warn("notification denied");
    }
  }
});
