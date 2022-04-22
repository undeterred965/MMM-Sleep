Module.register("MMM-CarouselSleep",{
	defaults: {
		timeToSleep: 10,   // In minutes.
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
			self.awake = false;
			MM.getModules().exceptModule(self).enumerate(function(module) {
				if (module.name !== "MMM-Touch") {
					module.hide(self.config.sleepTransitionTime);
				}
			});
			Log.info("Putting MM2 to sleep says MMM-Sleep.");
		}
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		if ((notification === "WAKE_UP")&&(self.awake === false)) {
			self.awake = true;
			MM.getModules().exceptModule(self).enumerate(function(module) {
				if (module.name !== "MMM-Touch") {
					module.show(self.config.sleepTransitionTime);
				}
			});
			Log.info("Waking up MM2 says MMM-Sleep.");
			self.start();
		} else if ((notification === "WAKE_UP")&&(self.awake === true)) {
			self.cancelTimer = true;
			setTimeout(function() {
				self.sleepCarousel();
				}, self.config.timeToSleep*60000);
		}
	},
});
