(function () {
    const solveButton = document.querySelector('button.solve');

    solveButton.addEventListener('click', solve);

    function createCustomAlert(imageSrc, message) {
        let alertContainer = document.createElement('div');
        let alertBox = document.createElement('div');
        let image = document.createElement('img');
        let h2 = document.createElement('h2');
        let closeButton = document.createElement('button');

        alertContainer.classList.add('alert');

        alertBox.classList.add('alert-box');
        alertBox.classList.add('normal-border');

        image.src = imageSrc;
        h2.innerHTML = message;

        closeButton.classList.add('normal-border');
        closeButton.innerText = 'Fechar';

        alertBox.insertAdjacentElement('afterbegin', closeButton);
        alertBox.insertAdjacentElement('afterbegin', h2);
        alertBox.insertAdjacentElement('afterbegin', image);

        alertContainer.appendChild(alertBox);

        document.body.appendChild(alertContainer);

        return closeButton;
    };

    function solve() {
        let valueA = parseFloat(document.querySelector('input#a').value);
        let valueB = parseFloat(document.querySelector('input#b').value);
        let valueC = parseFloat(document.querySelector('input#c').value);
        let delta = (valueB ** 2) - (4 * valueA * valueC);

        let haveNanValue = [valueA, valueB, valueC].map(element => {
            if (isNaN(element)) {
                return 1;
            };
            return 0;
        });

        if (haveNanValue.indexOf(1) > -1) {
            let closeButton = createCustomAlert('./images/abc.png', 'Não digite nada além de <span class="very-weight">números</span>.');

            closeButton.addEventListener('click', closeAlertAndAdjust);
        }
        else if (valueA === 0 || delta < 0) {
            let message = '';
            let imgSrc = '';

            message = valueA === 0 ? 'O valor de <span class="very-weight">a</span> não pode ser <span class="very-weight">igual a 0</span>.' : 'O delta é <span class="very-weight">negativo</span>, sem raízes.';

            imgSrc = valueA === 0 ? './images/zero.png' : './images/delta.png';

            let closeButton = createCustomAlert(imgSrc, message);

            closeButton.addEventListener('click', closeAlertAndAdjust);
        } else {
            let functionZeros = bhaskara(valueA, valueB, delta);
            let opening = valueA > 0 ? 'cima' : 'baixo';
            let vertex = vertextSolve(valueA, valueB, delta);

            showResults(delta, functionZeros, opening, vertex);
        };
    };

    function bhaskara(a, b, delta) {
        let xOne = (- b + Math.sqrt(delta)) / (2 * a);
        let xTwo = (- b - Math.sqrt(delta)) / (2 * a);

        return [xOne, xTwo];
    };

    function vertextSolve(a, b, delta) {
        let x = -b / (2 * a);
        let y = - delta / (4 * a);

        return `(${x}, ${y})`;
    };

    function showResults(delta, functionZeros, opening, vertex) {
        let xOneInput = document.querySelector('input#x-one');
        let xTwoInput = document.querySelector('input#x-two');
        let deltaInput = document.querySelector('input#delta');
        let openingInput = document.querySelector('input#opening');
        let vertexInput = document.querySelector('input#vertex');

        xOneInput.value = functionZeros[0];
        xTwoInput.value = functionZeros[1];
        deltaInput.value = delta;
        openingInput.value = opening;
        vertexInput.value = vertex;
    };


    function closeAlertAndAdjust(e) {
        e.target.parentElement.parentElement.remove();
    };
})();