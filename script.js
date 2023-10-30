 document.addEventListener('DOMContentLoaded', function () {
            const puzzle = document.getElementById('puzzle');
            const startButton = document.getElementById('startButton');
            let buttons = [];
            let gameStarted = false;

            function createPuzzle() {
                for (let i = 1; i <= 15; i++) {
                    const button = document.createElement('button');
                    button.textContent = i;
                    button.disabled = true;
                    button.classList.add('puzzle-button');
                    button.addEventListener('click', () => {
                        if (gameStarted) moveTile(i);
                    });
                    buttons.push(button);
                    puzzle.appendChild(button);
                }

                const emptyButton = document.createElement('button');
                emptyButton.textContent = '';
                emptyButton.classList.add('puzzle-button');
                emptyButton.addEventListener('click', () => {
                    if (gameStarted) moveTile(16);
                });
                buttons.push(emptyButton);
                puzzle.appendChild(emptyButton);

                startButton.addEventListener('click', () => {
                    if (!gameStarted) startGame();
                    else resetGame();
                });
            }

            function shuffleNumbers() {
                for (let i = buttons.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [buttons[i].textContent, buttons[j].textContent] = [buttons[j].textContent, buttons[i].textContent];
                }
            }

            function startGame() {
                gameStarted = true;
                startButton.textContent = 'Kết thúc';
                startButton.removeEventListener('click', startGame);

                buttons.forEach(button => button.disabled = false);

                shuffleNumbers();
            }

            function resetGame() {
                gameStarted = false;
                startButton.textContent = 'Bắt đầu';
                startButton.addEventListener('click', startGame);

                buttons.forEach(button => {
                    button.disabled = true;
                    button.textContent = '';
                });

                buttons = [];
                while (puzzle.firstChild) {
                    puzzle.removeChild(puzzle.firstChild);
                }
                createPuzzle();
            }

            function moveTile(index) {
                const emptyIndex = buttons.findIndex(button => button.textContent === '');
                const emptyRow = Math.floor(emptyIndex / 4);
                const emptyCol = emptyIndex % 4;

                const clickedRow = Math.floor((index - 1) / 4);
                const clickedCol = (index - 1) % 4;

                const isAdjacent = (Math.abs(emptyRow - clickedRow) + Math.abs(emptyCol - clickedCol) === 1);

                if (isAdjacent) {
                    [buttons[index - 1].textContent, buttons[emptyIndex].textContent] = [buttons[emptyIndex].textContent, buttons[index - 1].textContent];
                }

                if (isPuzzleSolved()) {
                    if (confirm("Chúc mừng! Bạn đã giành chiến thắng. Chơi lại?")) {
                        resetGame();
                    } else {
                        location.reload();
                    }
                }
            }

            function isPuzzleSolved() {
                for (let i = 0; i < buttons.length - 1; i++) {
                    if (buttons[i].textContent !== '' && +buttons[i].textContent !== i + 1) {
                        return false;
                    }
                }
                return true;
            }

            createPuzzle();
        });