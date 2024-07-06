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
                const scoreDiv = document.getElementById('score');
                scoreDiv.innerHTML = `Votre score: ${(score / totalQuestions) * 20} / 20`;
            });
        });
});
