

const gridLinesContainer = document.querySelector('.lines');
if (gridLinesContainer) {
    function generateLines(numLines, isHorizontal) {
        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.classList.add(isHorizontal ? 'line-horizontal' : 'line-vertical');
            if (!isHorizontal) {
                line.style.left = `${(i + 1) * (100 / (numLines + 1))}%`;
            } else {
                line.style.top = `${(i + 1) * (100 / (numLines + 1))}%`;
            }
            gridLinesContainer.appendChild(line);
        }
    }
    // generate vertical lines
    generateLines(6, false);
}