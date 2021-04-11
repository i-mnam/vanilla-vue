const h1 = document.createElement('h1');

document.body.appendChild(h1);

const viewModel = {};

let model = '';

Object.defineProperty(viewModel, 'model', {
    get() { return model; },
    set(val) {
        model = val;
        h1.innerHTML = model;
    },
});

// viewModel.model;

viewModel.model = 'hello world';


// cdn server network
// npm library download