document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            const quizDiv = document.getElementById('quiz');
            data.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `<p>${question.question}</p>`;
                question.options.forEach((option, index) => {
                    questionDiv.innerHTML += `
                        <label>
                            <input type="radio" name="q${question.id}" value="${index}">
                            ${option}
                        </label><br>`;
                });
                quizDiv.appendChild(questionDiv);
            });

            document.getElementById('submit').addEventListener('click', () => {
                let score = 0;
                let totalQuestions = data.length;
                data.forEach(question => {
                    const selectedOption = document.querySelector(`input[name="q${question.id}"]:checked`);
                    if (selectedOption && parseInt(selectedOption.value) === question.answer) {
                        score++;
                    }
                });
                const finalScore = (score / totalQuestions) * 20;
                const scoreDiv = document.getElementById('score');

                let message = '';
                let cssClass = '';

                if (finalScore >= 16) {
                    message = 'Excellent travail!';
                    cssClass = 'excellent';
                } else if (finalScore >= 12) {
                    message = 'Bon travail!';
                    cssClass = 'good';
                } else if (finalScore >= 8) {
                    message = 'Peut mieux faire!';
                    cssClass = 'average';
                } else {
                    message = 'Besoin de plus de pratique!';
                    cssClass = 'poor';
                }

                scoreDiv.innerHTML = `Votre score: ${finalScore} / 20<br>${message}`;
                scoreDiv.className = cssClass;
            });
        });
});
