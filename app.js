class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.quizScore = 0;
        this.updateSlider();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    handleAnswer(isCorrect) {
        if (isCorrect) {
            this.quizScore += 1; // Add 1 to the score if the answer is correct
            alert("Correct! Your current score is: " + this.quizScore);
        } else {
            alert("Incorrect! Your current score is: " + this.quizScore);
        }
        this.disableQuizButtons(); // Disable the buttons after answering
    }

    disableQuizButtons() {
        const activeSlide = this.slides[this.currentIndex];
        const trueButton = activeSlide.querySelector('.true');
        const falseButton = activeSlide.querySelector('.false');
        if (trueButton) trueButton.disabled = true;
        if (falseButton) falseButton.disabled = true;
    }

    updateSlider() {
        const offset = -this.currentIndex * 100;
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

        // Hide the "Start" button and show arrows for other slides
        const startButton = document.querySelector('.start');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next'); // Global "Next" button
        const restartButton = document.querySelector('#s10 .restart');

        // Get the buttons for the currently active slide
        const activeSlide = this.slides[this.currentIndex];
        const trueButton = activeSlide.querySelector('.true');
        const falseButton = activeSlide.querySelector('.false');

        if (this.currentIndex === 0) {
            startButton.style.display = 'block'; // Show "Start" button
            prevButton.style.display = 'none';  // Hide "Prev" button
            if (nextButton) nextButton.style.display = 'none';  // Hide global "Next" button
            if (restartButton) restartButton.style.display = 'none';
            if (trueButton) trueButton.style.display = 'none';
            if (falseButton) falseButton.style.display = 'none';
            
        } else if (this.currentIndex >= 4 && this.currentIndex <= 9) {
            startButton.style.display = 'none'; // Hide "Start" button
            prevButton.style.display = 'block'; // Show "Prev" button
            if(nextButton) nextButton.style.display = 'block'; // Show global "Next" button
            if (restartButton) restartButton.style.display = 'none';
            if (trueButton) {
                trueButton.style.display = 'block';
                trueButton.disabled = false; // Re-enable for new question
            }
            if (falseButton) {
                falseButton.style.display = 'block';
                falseButton.disabled = false; // Re-enable for new question
            }
        } else if (this.currentIndex === 10) { 
            startButton.style.display = 'none'; // Hide "Start" button
            prevButton.style.display = 'none'; // Hide "Prev" button
            if(nextButton) nextButton.style.display = 'block'; // Hide global "Next" button
            if (restartButton) restartButton.style.display = 'block'; // Show "Restart Quiz" button
            

            // Update the score on the results slide
            const scoreElement = document.getElementById('quiz-score');
            scoreElement.textContent = `You scored ${this.quizScore} out of 5 points!`;
        } else {
            startButton.style.display = 'none'; // Hide "Start" button
            prevButton.style.display = 'block'; // Show "Prev" button
            if(nextButton) nextButton.style.display = 'block'; // Show global "Next" button
            if (restartButton) restartButton.style.display = 'none';
            if (trueButton) trueButton.style.display = 'none';
            if (falseButton) falseButton.style.display = 'none';
        }
    }

    // Add a method to restart the quiz
    restartQuiz() {
        this.currentIndex = 5; // Set to the fifth slide
        this.quizScore = 0; // Reset the quiz score
        this.updateSlider(); // Update the slider to reflect the changes
    }
}

// Initialize the slider and attach it to the global scope
const slider = new Slider();

document.addEventListener("DOMContentLoaded", () => {
    const trueButtons = document.querySelectorAll(".true");
    const falseButtons = document.querySelectorAll(".false");
    const restartButton = document.querySelector(".restart");

    trueButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            button.style.backgroundColor = "green"; // Turn green when clicked
            button.style.color = "white"; // Change text color for better contrast
            button.disabled = true; // Disable the clicked button
            falseButtons[index].disabled = true; // Disable the corresponding "False" button
        });
    });

    falseButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            button.style.backgroundColor = "red"; // Turn red when clicked
            button.style.color = "white"; // Change text color for better contrast
            button.disabled = true; // Disable the clicked button
            trueButtons[index].disabled = true; // Disable the corresponding "True" button
        });
    });

    // Reset buttons when the "Restart Quiz" button is clicked
    restartButton.addEventListener("click", () => {
        trueButtons.forEach((button) => {
            button.style.backgroundColor = ""; // Reset background color
            button.style.color = ""; // Reset text color
            button.disabled = false; // Re-enable the button
        });

        falseButtons.forEach((button) => {
            button.style.backgroundColor = ""; // Reset background color
            button.style.color = ""; // Reset text color
            button.disabled = false; // Re-enable the button
        });
    });

    });