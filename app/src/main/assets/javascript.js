function playCurrent() {
	var code = document.getElementById('maininput').value;
	code = split(code);

	var speed = document.getElementById('speed').value;

	play(code, modes[speed]);
}

// Accepted in // for space and / for char
function play(tones, timing) {

	var audio = new AudioContext();
	var o = audio.createOscillator();
	o.type = "sine";

	var time = 0;
	for (var i = 0; i < tones.length; i++) {
		if (tones[i] == "-") {
			setTimeout(function() { // Wait until time to start
				makeTone(timing.dah);
			}, time);

			time += timing.dah + timing.beep;
		} else if (tones[i] == ".") {
			setTimeout(function() {
				makeTone(timing.dit);
			}, time);

			time += timing.dit + timing.beep;
		} else if (tones[i] == "/") {
			time += timing.char;
		} else if (tones[i] == "//") {
			time += timing.word;
		}
	}
}

// Function to create tone
function makeTone(length) {
	var audio = new AudioContext();
	var o = audio.createOscillator();
	o.type = "sine";
	o.connect(audio.destination);

	o.start();
	setTimeout(function() {
		audio.close();
	}, length);
}

// Split -/.//- into -,.,-
function split(string) {
	string = string.split("");
	var array = [];

	for (var i = 0; i < string.length; i++) {
		var toInsert = "";
		if (string[i] == "/") {
			if (string[i + 1] == "/") {
				toInsert = "//";
				i++;
			} else {
				toInsert = "/";
			}
		} else {
			toInsert = string[i];
		}

		array.push(toInsert);
	}

	return array;
}

function convert(direction) {
	var text = document.getElementById("maininput");

	text.value = convertString(direction, text.value);
}

function convertString(direction, string) {
	if (direction == "from") {
		var code = string;
		code = code.split("/")

		for (var i = 0; i < code.length; i++) {
			if (from[code[i]]) {
				code[i] = from[code[i]];
			}
		}

		for (var i = 0; i < code.length; i++) {
			if (code[i] == "") {
				code[i] == " ";
			}
		}

		return code.join("");
	} else {
		string = string.toLowerCase();
		string = string.split("");

		for (var i = 0; i < string.length; i++) {
			if (to[string[i]]) {
				string[i] = to[string[i]] + "/";
			} else if (string[i] == " ") {
				string[i] = "/";
			}
		}

		return string.join("");
	}
}
