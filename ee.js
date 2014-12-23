(function (global) {
	var EE;

	if (!global.UAM) {
		global.UAM = {};
	}

	EE = function () {

		this.listeners = {};

	};

	EE.prototype.on = function (eventName, listener, context) {
		var listenerObject,
			self = this;
		
		if(!this.listeners.hasOwnProperty(eventName)){

			this.listeners[eventName] = [];

		}

		listenerObject = {
			listener: listener,
			context: context
		};
		
		this.listeners[eventName].push(listenerObject);
		
		var removeListener = function(){
			
			var i, length, index;	

			if (self.listeners.hasOwnProperty(eventName)){
				index = self.listeners[eventName].indexOf(listenerObject);

				if (index >= 0) {
					self.listeners[eventName].splice(index,1);
				}
			}
				if (self.listeners[eventName].length === 0) {
					delete self.listeners[eventName];
				}
			
			
			
		};	

		return removeListener;		
	};

	EE.prototype.emit = function (eventName /*, other args...*/) {
		var i, length, args;
		
			if (this.listeners.hasOwnProperty(eventName)) {
					
				for(i=0, length=this.listeners[eventName].length; i<length; i++) {
					
					args = Array.prototype.slice.call(arguments, 1);
					this.listeners[eventName][i].listener.apply(this.listeners[eventName][i].context, args);

				}

			}
		
	};


	global.UAM.EventEmitter = EE;

}(window));
