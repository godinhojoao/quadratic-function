(function () {
    const solveButton = document.querySelector('button.solve');

    solveButton.addEventListener('click', solve);

    function solve() {
        let valueA = document.querySelector('input#a').value.trim();
        let valueB = document.querySelector('input#b').value.trim();
        let valueC = document.querySelector('input#c').value.trim();
        let delta;
        let allValues = [valueA, valueB, valueC];

        let haveNanValue = allValues.map((element, index) => {
            element === "" ? allValues.splice(index, 1, '0') : 0;

            if (isNaN(element)) {
                let value = element === '' ? 0 : 1;

                return value;
            };
            return 0;
        });

        [valueA, valueB, valueC] = allValues;

        delta = (parseFloat(valueB) ** 2) - (4 * parseFloat(valueA) * parseFloat(valueC));

        if (haveNanValue.indexOf(1) > -1) {
            let closeButton = createCustomAlert('./images/abc.png', 'Não digite nada além de <span class="very-weight">números</span>.');

            closeButton.addEventListener('click', closeAlertAndAdjust);

            // deixando os inputs vazios
            showResults('', ['', ''], '', '', '');
        }
        else if (valueA === '0' || delta < 0) {
            let message = '';
            let imgSrc = '';
            let closeButton;

            message = valueA === '0' ? 'O valor de <span class="very-weight">a</span> não pode ser <span class="very-weight">igual a 0</span>.' : 'O delta é <span class="very-weight">negativo</span>, sem raízes.';

            imgSrc = valueA === '0' ? './images/zero.png' : './images/delta.png';

            closeButton = createCustomAlert(imgSrc, message);

            closeButton.addEventListener('click', closeAlertAndAdjust);

            showResults('', ['', ''], '', '', '');
        } else {
            allValues = allValues.map(element => parseFloat(element));

            let [functionZeros, opening, vertex, typeFunction] = getResults(valueA, valueB, delta, allValues);

            showResults(delta, functionZeros, opening, vertex, typeFunction);
        };
    };

    function createCustomAlert(imageSrc, message) {
        let alertContainer = document.createElement('div');
        let alertBox =`
            <div class="alert-box normal-border"> 
                <img src="${imageSrc}" />
                <h2> ${message} </h2>
                <button class="normal-border close">Fechar</button>
                <h2 class=""></h2>
            </div>
        `;
        let closeButton;
       
        alertContainer.classList.add('alert');
        alertContainer.innerHTML = alertBox;
        document.body.appendChild(alertContainer);

        closeButton = document.querySelector('button.close');

        return closeButton;
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

    function showResults(delta, functionZeros, opening, vertex, typeFunction) {
        let xOneInput = document.querySelector('input#x-one');
        let xTwoInput = document.querySelector('input#x-two');
        let deltaInput = document.querySelector('input#delta');
        let openingInput = document.querySelector('input#opening');
        let vertexInput = document.querySelector('input#vertex');
        let typeFunctionInput = document.querySelector('input#type-function');

        xOneInput.value = functionZeros[0];
        xTwoInput.value = functionZeros[1];
        deltaInput.value = delta;
        openingInput.value = opening;
        vertexInput.value = vertex;
        typeFunctionInput.value = typeFunction;
    };

    function closeAlertAndAdjust(e) {
        e.target.parentElement.parentElement.remove();
    };

    function getResults(valueA, valueB, delta, allValues) {
        let functionZeros = bhaskara(valueA, valueB, delta);
        let opening = valueA > 0 ? 'cima' : 'baixo';
        let vertex = vertextSolve(valueA, valueB, delta);
        let incomplete = 0;
        let typeFunction = '';

        allValues.forEach(element => {
            element !== 0 ? 0 : incomplete++;

            if (incomplete > 0) {
                typeFunction = 'Incompleta';
            } else {
                typeFunction = 'Completa';
            };
        });

        return [functionZeros, opening, vertex, typeFunction];
    };
})();