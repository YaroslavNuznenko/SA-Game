class Timer {
    constructor(props) {
        this._timer = null;
        this._now = new Date().getTime();
        this.distance = 0;
        this._timeBlock = document.querySelector("#timeBlock");
        this._countTime = new Date().setTime(this._now + 60000);
        this.init();
    }
    init() {
        this._timeBlock.innerHTML = "1:00";
        this.start();
    }

    timerFunc() {
        this.distance = Math.floor(this._countTime - new Date().getTime());
        if (this.distance > -1) {
            this._timeBlock.innerHTML =
                "00:" + Math.floor(this.distance / 1000);
        } else {
            stopMessage();
            this.stop();
            let message = `Время вышло! \n Что бы начать игру заново перезагрузите страницу`;
            stopMessage(message);
        }
    }

    start() {
        this._timer = setInterval(this.timerFunc.bind(this), 1000);
    }

    stop() {
        clearInterval(this._timer);
    }
}

class Game {
    constructor() {
        this._pointsBlock = document.querySelector("#pointsBlock");
        this._panelButtons = document.querySelectorAll("#panel button");
        this._multiplyBlock = document.querySelector("#multiplyBlock");
        this._multiply = 0;
        this._variantsMas = [];
        this._isChange = true;
        this._isWork = true;
        this.points = 0;
        this._first = 0;
        this._second = 0;
        this.timer = new Timer();
        this.render();
        this.events();

    }
    getRandom(max = 10, min = 1) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    getMultiply() {
        this._first = this.getRandom();
        this._second = this.getRandom();

        return {
            multiply: this._first * this._second
        };
    }

    getVariants() {
        let variantsMas = [];
        for (let i = 0; i < 5; i++) {
            variantsMas[i] = this.getRandom(this._multiply + 10);
        }
        variantsMas[this.getRandom(variantsMas.length - 1, 0)] = this._multiply;
        return variantsMas;
    }
    render() {
        if (this._isChange) {
            this._multiply = this.getMultiply().multiply;
            this._variantsMas = this.getVariants();
            this._multiplyBlock.innerHTML = this._first + " x " + this._second;
            this._pointsBlock.innerHTML = this.points;
            this._panelButtons.forEach((el, i) => {
                el.innerHTML = this._variantsMas[i];
            });
            this._isChange = false;
        }

    }

    panelButtonsHandler(event){
        let value = event.target.innerHTML;
        if (value == this._multiply) {
            this.points = this.points + 100;
        } else {
            // this.checkPoints.apply(event.target, [this])
            this.points = this.points - 100;
            if (this.points < 0) {
                this._isWork = false;
                this.timer.stop();
                let message = `Ваши очки меньше 0! \n Что бы начать игру заново перезагрузите страницу`;
                stopMessage(message);
            }
        }
        this._isChange = true;
        this.render();
    }
    events() {

        if (this._isWork) {
            this._panelButtons.forEach((el, i) => {
                el.addEventListener("click", event => this.panelButtonsHandler(event));
            });

        } 
        // else {
        //     this._panelButtons.forEach((el, i) => {
        //         el.disabled = true;
        //         el.removeListener('click', this.panelButtonsHandler)
        //     });
        // }
    }
}
function stopMessage(message) {
    let messageBlock = document.querySelector("#messageBlock");
    messageBlock.style.display = "block";
    messageBlock.innerHTML = message;
}

let game = new Game();
