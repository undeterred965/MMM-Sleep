Module.register("MMM-CarouselSleep",{
	defaults: {
		timeToSleep: 20,   // In minutes.
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = "";
		return wrapper;
	},

	start: function() {
		var self = this;
		self.awake = true;
		setTimeout(function() {
			self.sleepCarousel();
			}, self.config.timeToSleep*60000);
	},

	sleepCarousel: function() {
		var self = this;
		if (self.cancelTimer === true) {
			self.cancelTimer = false;
			return;
		}
		if (self.awake === true) {
			self.sendNotification("GO_TO_SLEEP");
			self.awake = false;
		}
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		if ((notification === "WAKE_UP")&&(self.awake === false)) {
			self.awake = true;
			self.start();
		} else if ((notification === "WAKE_UP")&&(self.awake === true)) {
			self.cancelTimer = true;
			setTimeout(function() {
				self.sleepCarousel();
				}, self.config.timeToSleep*60000);
		}
	},
});
