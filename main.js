var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'jpeg',
    jpeg_quality:90
});

Camera = document.getElementById("camera");
Webcam.attach(Camera);

function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri +'" >'
    });
}

console.log("ml5 version : ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dHe0BGsu-/model.json", modelLoaded);

function modelLoaded() {
    console.log("ml5 model loaded");
}

function speakComputer() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "and the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance( speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predictEmotion() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speakComputer();

        if (prediction_1 == "Happy") {
            document.getElementById("emoji_1").innerHTML = "🤩";
        }

        if (prediction_1 == "Sad") {
            document.getElementById("emoji_1").innerHTML = "😭";
        }

        if (prediction_1 == "Annoyed") {
            document.getElementById("emoji_1").innerHTML = "😤";
        }

        if (prediction_1 == "Sleepy") {
            document.getElementById("emoji_1").innerHTML = "😴"
        }


        if (prediction_2 == "Happy") {
            document.getElementById("emoji_2").innerHTML = "🤩";
        }

        if (prediction_2 == "Sad") {
            document.getElementById("emoji_2").innerHTML = "😭";
        }

        if (prediction_2 == "Annoyed") {
            document.getElementById("emoji_2").innerHTML = "😤";
        }

        if (prediction_2 == "Sleepy") {
            document.getElementById("emoji_2").innerHTML = "😴"
        }
    }
}