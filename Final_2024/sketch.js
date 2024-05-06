let frequencySlider, volumeSlider, waveformSelect;
let mode = 0;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioStarted = false;
let explanationDiv;
let r = 255;
let g = 255;
let b = 255;
let frequencyLabel, volumeLabel;
let dataPoints = [];
let mouseWasPressed = false; // Variable to track if the mouse was pressed

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(230, 230, 255);
    textAlign(CENTER, CENTER);
    getAudioContext().suspend();
  
    // Create labels for sliders
    frequencyLabel = createP("Frequency Range:");
    volumeLabel = createP("Volume Range:");

    // Create sliders and input fields
    frequencySlider = createSlider(50, 1000, 500); // Adjust frequency range from 50 Hz to 1000 Hz
    volumeSlider = createSlider(0.2, 1, 0.5, 0.01); // Adjust volume range from 0.2 to 1
    waveformSelect = createSelect();
    waveformSelect.option('sine');
    waveformSelect.option('square');
    waveformSelect.option('triangle');
    splash = new Splash();
  
   // Attach event listeners to sliders
    frequencySlider.input(sonifyDataPoint);
    volumeSlider.input(sonifyDataPoint);
    waveformSelect.input(sonifyDataPoint);
}

function mouseClicked() {
    const x = mouseX;
    const y = mouseY;

    if (isMouseOverSliderArea(x, y)) {
        return; // Don't draw points if mouse is over slider area
    }

    mouseWasPressed = true; // Set mouseWasPressed to true when mouse is clicked

    sonifyDataPoint();
    dataPoints.push({ x, y, emotion: getEmotionLabel(y) }); // Store the emotion label with the data point
  
    r = random(200, 230);
    g = random(220, 255);
    b = random(220, 255);
}

function sonifyDataPoint() {
    // Map slider values to frequency and volume
    const frequency = frequencySlider.value();
    const volume = volumeSlider.value();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const waveform = waveformSelect.value();

    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}


function draw() {
    if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
    }
    if (mode == 1) {
        splash.hide()
        background(r, g, b);
        strokeWeight(3);
        beginShape();
        dataPoints.forEach(point => {
            const hue = map(point.y, 0, height, 0, 360);
            stroke(hue, 150, 220);
            fill(hue, 150, 220);
            ellipse(point.x, point.y, 20, 20);
            vertex(point.x, point.y);
        });
        endShape();
      
       // Draw text labels
        textSize(16);
        fill(0);
        textAlign(RIGHT, TOP);
        text('Strong', width - 10, 10); // Strong label in the upper-right corner
        textAlign(RIGHT, BOTTOM);
        text('Light', width - 10, height - 10); // Light label in the lower-right corner
      
        // Draw text after drawing data points
        dataPoints.forEach(point => {
            textSize(14);
            fill(50);
            text(point.emotion, point.x, point.y - 25);
            fill(200);
        });
      
        frequencyLabel.position(20, 0);
        frequencySlider.position(20, 30);
        volumeLabel.position(20, 50);
        volumeSlider.position(20, 80);
        waveformSelect.position(20, 120);
      
        // Draw x and y axes labels
        fill(0);
        textSize(14);
        text('State', width / 2, height - 20);
        text('Emotion', 60, height / 2);
    }
}

function getEmotionLabel(y) {
    const waveform = waveformSelect.value();
    if (waveform === 'sine') {
        if (y < height * 0.25) {
            return "sad";
        } else if (y < height * 0.5) {
            return "slightly sad";
        } else if (y < height * 0.75) {
            return "neutral";
        } else {
            return "pleasant";
        }
    } else if (waveform === 'square') {
        if (y < height * 0.25) {
            return "angry";
        } else if (y < height * 0.5) {
            return "slightly angry";
        } else if (y < height * 0.75) {
            return "neutral";
        } else {
            return "tired";
        }
    } else if (waveform === 'triangle') {
        if (y < height * 0.25) {
            return "excited";
        } else if (y < height * 0.5) {
            return "happy";
        } else if (y < height * 0.75) {
            return "neutral";
        } else {
            return "calm";
        }
}


function mousePressed() { 
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
}
}

function isMouseOverSliderArea(x, y) {
    // Define the slider area based on slider positions
    const sliderAreaX = 20;
    const sliderAreaY = 0;
    const sliderAreaWidth = 200; // Adjust this value based on the slider widths
    const sliderAreaHeight = 150; // Adjust this value based on the slider heights
    
    // Check if the mouse is within the slider area
    if (x > sliderAreaX && x < sliderAreaX + sliderAreaWidth && y > sliderAreaY && y < sliderAreaY + sliderAreaHeight) {
        return true; // Mouse is over the slider area
    } else {
        return false; // Mouse is not over the slider area
    }
}