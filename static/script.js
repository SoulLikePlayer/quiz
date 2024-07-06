document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            const quizDiv = document.getElementById('quiz');
            data.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `<p>${question.question}</p>`;
                question.options.forEach((option, index) => {
                    questionDiv.innerHTML += `<input type="radio" name="q${question.id}" value="${index}"> ${option}<br>`;
                });
                quizDiv.appendChild(questionDiv);
            });
        });
});
