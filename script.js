let griditem = document.querySelectorAll(".grid-item");
        let container = document.querySelector(".container");
        let Body = document.querySelector(".wholescreen");
        let now = true; // true = Player Y (O), false = Player X (X)
        let resetBtn = document.querySelector(".reset-btn");

        let winner = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        griditem.forEach(element => {
            element.addEventListener("click", () => {
                if (element.innerText === "") { // Prevent overwriting
                    element.innerText = now ? "O" : "X";
                    checkwinner();
                    now = !now; // Toggle player turn
                }
            });
        });

        const checkwinner = () => {
            let filledCells = 0;
            for (const pattern of winner) {
                let first = griditem[pattern[0]].innerText;
                let second = griditem[pattern[1]].innerText;
                let third = griditem[pattern[2]].innerText;

                if (first !== "" && first === second && second === third) {
                    let winn = document.createElement("div");
                    winn.setAttribute("class", "winner-msg");
                    winn.innerText = `Player ${first} wins the game 🎉`;
                    Body.append(winn);
                    disableGame(); // Prevent further clicks
                    return;
                }
            }

            // Check for a draw
            griditem.forEach(cell => {
                if (cell.innerText !== "") filledCells++;
            });

            if (filledCells === 9) {
                let drawMsg = document.createElement("div");
                drawMsg.setAttribute("class", "winner-msg");

                drawMsg.style.color = "red"
                drawMsg.innerText = "It's a Draw! 🤝";
                Body.append(drawMsg);
            }
        };



        const disableGame = () => {
            griditem.forEach(cell => cell.style.pointerEvents = "none"); // Disable clicks
        };

        resetBtn.addEventListener("click", () => {
            griditem.forEach(cell => {
                cell.innerText = ""; // Clear board
                cell.style.pointerEvents = "auto"; // Enable clicks again
            });
            now = true; // Reset player turn

            // Remove winner message if exists
            let winnerMsg = document.querySelector(".winner-msg");
            if (winnerMsg) winnerMsg.remove();
        });