document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour récupérer toutes les questions et leurs réponses
    function getQuizData() {
        const quizData = [];

        // Sélectionner toutes les divs contenant des questions
        const questions = document.querySelectorAll('.quiz-question');
        
        questions.forEach((questionElement, index) => {
            // Extraire le texte de la question
            const questionText = questionElement.querySelector('p').textContent.trim();

            // Récupérer toutes les options de réponses (labels contenant les inputs)
            const options = questionElement.querySelectorAll('label');
            
            const answers = [];
            const correctAnswer = [];

            options.forEach(option => {
                // Extraire le texte de chaque option
                const optionText = option.textContent.trim();
                // Extraire la valeur de l'input associé à cette option
                const optionValue = option.querySelector('input').value;

                // Vérifier si l'option est correcte
                const isCorrect = option.querySelector('input').hasAttribute('data-correct');
                if (isCorrect) {
                    correctAnswer.push(optionValue);  // Conserver les bonnes réponses
                }

                // Ajouter l'option à la liste des réponses
                answers.push({ value: optionValue, text: optionText, isCorrect: isCorrect });
            });

            // Ajouter la question et ses options au tableau quizData
            quizData.push({ question: questionText, answers: answers, correctAnswer: correctAnswer });
        });

        return quizData;
    }

    // Fonction pour calculer le score basé sur les réponses de l'utilisateur
    function calculateScore() {
        const quizData = getQuizData();
        let score = 0;
        
        // Parcourir chaque question pour vérifier si l'utilisateur a sélectionné la bonne réponse
        quizData.forEach((data, index) => {
            // Trouver l'option sélectionnée par l'utilisateur pour chaque question
            const selectedAnswer = document.querySelector(`input[name="question${index + 1}"]:checked`);

            if (selectedAnswer) {
                // Comparer la réponse de l'utilisateur avec la bonne réponse
                if (data.correctAnswer.includes(selectedAnswer.value)) {
                    score += 2; // Ajouter 2 points pour une bonne réponse
                }
            }
        });

        // Afficher le score total
        alert(`Votre score est : ${score} / 20`);
    }

    // Ajouter un bouton pour soumettre le quiz et calculer le score
    const submitButton = document.getElementById('submit-quiz');
    submitButton.addEventListener('click', calculateScore);
});
