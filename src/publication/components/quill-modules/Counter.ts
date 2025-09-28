import Quill from "quill";

interface CounterOptions{
    container: string;
    unit: string;
    limit: number;
    minimum: number;
}

class Counter{

    quill: Quill;
    options: CounterOptions;
    container: HTMLElement | null;

    constructor(quill: Quill, options: CounterOptions) {
        this.quill = quill;
        this.options = options;
        if(!options.container) this.addToToolbar()
        else this.container = document.querySelector(options.container);
        quill.on(Quill.events.TEXT_CHANGE, this.update.bind(this));
    }

    private addToToolbar() {
        const toolbar: any = this.quill.getModule('toolbar');
        if (toolbar && toolbar.container) {

            this.container = document.createElement('span');
            this.container.id = 'word-count';
            this.container.className = 'ql-word-count';
            this.container.innerHTML = '0' + "/" + this.options.minimum + " minimum symbols"; // Начальное значение

            const toolbarContainer = toolbar.container as HTMLElement;
            toolbarContainer.style.position = 'relative';
            toolbarContainer.appendChild(this.container);

            this.container.style.cssText = 'position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #666; padding: 5px;';
        } else {
            console.warn('Toolbar module not found. Cannot add counter to toolbar.');
        }
    }

    calculate() {
        const text = this.quill.getText();

        if(this.options.unit === 'word'){
            const trimmed = text.trim();
            return trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;
        } else {
            return text.trim().length;
        }
    }

    update(){
        const length = this.calculate();
        if(length < this.options.minimum) this.container.innerText = length + "/" + this.options.minimum + " minimum symbols";
        else this.container.innerText = length + "/" + this.options.limit + " maximum symbols";

    }
}

export default Counter;