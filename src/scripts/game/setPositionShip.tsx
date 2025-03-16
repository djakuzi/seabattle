import { TypePlaneShip, TypeSizeShip } from "../../types/general/Ship";

interface IntrfObjPortShip {
    port: HTMLDivElement;
    parentShip: HTMLDivElement;
}

interface IntrfObjParamsShip {
    parentShip?: HTMLDivElement;
    portShip?: HTMLDivElement;
    widthParentShip: number;
    heightParentShip: number;
    shiftX: number;
    shiftY: number;
    plane: TypePlaneShip;
}

interface IntrCoordPuttingShip {
    ship: {
        id: number;
        size: TypeSizeShip;
        plane: TypePlaneShip;
    };
    firstCoord: {
        x: number;
        y: number;
    };
    lastCoord: {
        x: number;
        y: number;
    };
}

/**
 * @class - отвечает за расстановку кораблей на поле
 * -----
 * @constructor принимает следующие значения:
 * @param field - поле, куда ставятся корабли@type {HTMLDivElement};
 * @param style - класс, который будет применяться к коодинате поля в случае, если корабль находится прям под ним@type {string}.
 * -----
 * @property {nameClass} - название класса;
 * @property {objError} - объект ошибок;
 * @property {style} - - класс, который будет применяться к коодинате поля в случае,
 *      если корабль находится прям под ним;
 * @property {field} - поле, куда ставятся корабли;
 * @property {coordFiled} - координаты поля;
 * @property {arrShip} - массив кораблей;
 * @property {arrFieldRect} - массив квадратов поля;
 * @property {arrObjPotShip} - массив объектов, которые содержат корабли принадлежащие порту;
 * @property {arrCoordSettingShip} - массив объектов, которые данные о корбалях, поставленных на поле;
 * @property {currentParamsShip} - объект, который содержит в себе характеристика о корабле, который перемещают
 * -----
 * @method init - инициализация работы класса;
 * @method unInit - остановить работу класса;
 * @method arrCoordPuttingShip - возвращает массив данных о расположении кораблей на поле (readonly).
 */
export default class MoveShip {
    nameClass: string = 'MoveShip';

    objError = {
        'notFinedShip': `${this.nameClass}: Ships not fined`,
        'notFinedShipInCurrentObj': `${this.nameClass}: Ship not found in current ship drag parameters object`,
        'failedLinkPortShip': `${this.nameClass}: Failed to linked ship with port`,
        'failedFinedHighLightBlock': `${this.nameClass}: Failed to secure ship over field because first allocated block was not found`,
    };
    objWarn = {
        'notFinedShip': `${this.nameClass}: Ships not fined`,
    };

    //params class
    style: string;
    field: HTMLDivElement;
    coordFiled: DOMRect;
    arrShip: NodeListOf<HTMLDivElement>;
    arrFieldRect: NodeListOf<HTMLDivElement>;
    arrCoordFieldRect: DOMRect[];
    arrObjPotShip: IntrfObjPortShip[] = [];
    currentParamsShip: IntrfObjParamsShip = {
        widthParentShip: 0,
        heightParentShip: 0,
        shiftX: 0,
        shiftY: 0,
        plane: 'horizontal',
    };
    private _arrCoordPuttingShip: IntrCoordPuttingShip[] = [];

    //params for dblClick
    clickCount: 0 | 1 | 2 = 0;
    lastClickTime:number = 0;

    constructor(field: HTMLDivElement, style:string) {
        this.style = style;
        this.field = field;
        this.coordFiled = field.getBoundingClientRect();
        this.arrShip = document.querySelectorAll('[data-ship]');
        this.arrFieldRect = field.querySelectorAll('[data-coord-x]');
        this.arrCoordFieldRect = [...this.arrFieldRect].map((rect):DOMRect => rect.getBoundingClientRect());
    }

    //#General methods
    /**
     * @method init - инициализация работы класса
     */
    init = ():void => {
        if (this.arrShip.length === 0 || this.arrFieldRect.length === 0) throw new Error(this.objError.notFinedShip);

        this.arrShip.forEach( (ship) => {
            ship.addEventListener('mousedown', this.takeShip as (event: Event) => void);
            (ship as HTMLDivElement).ondragstart = function (): boolean {
                return false;
            };
        });
    };
    /**
     * @method unInit - остановить работу класса
     */
    unInit = (): void => {
        if (this.arrShip.length === 0 || this.arrFieldRect.length === 0) throw new Error(this.objError.notFinedShip);

        this.arrShip.forEach((ship) => {
            ship.removeEventListener('mousedown', this.takeShip as (event: Event) => void);
            ship.removeEventListener('mouseup', this.checkPosition as (event: Event) => void);
            (ship as HTMLDivElement).ondragstart = function (): boolean {
                return true;
            };
        });

        document.removeEventListener('mousemove', this.moveCursor);
    };
    /**
     * @method arrCoordPuttingShip - возвращает массив данных о рассположении кораблей на поле (readonly)
     */
    get arrCoordPuttingShip(): IntrCoordPuttingShip[] {
        return this._arrCoordPuttingShip;
    }
    // /#General methods

    //#Handelrs
    /**
    * @method takeShip - обработчик события, когда корабль взяли.
     */
    private takeShip = (event: MouseEvent):void => {
        try {
            event.preventDefault();

            const parentShip = (event.target as HTMLDivElement).closest('[data-ship]') as HTMLDivElement;
            const planeShip = parentShip.getAttribute('data-plane') as TypePlaneShip;
            const portShip = parentShip.closest('[data-port-ship]') as HTMLDivElement;
            const isPutting = parentShip.dataset.putting;

            //если корабль находится на поле, то проверяем был ли дабл клик, 
            // если он был то меняет положение корабля 
            if (isPutting == 'true') {
                this.checkDblClick(this.changePlane);
            }

            this.currentParamsShip = {
                parentShip,
                portShip,
                plane: planeShip,
                widthParentShip: parentShip.offsetWidth,
                heightParentShip: parentShip.offsetHeight,
                shiftX: event.clientX - parentShip.getBoundingClientRect().left,
                shiftY: event.clientY - parentShip.getBoundingClientRect().top,
            };

            const index = this.setIndexPortShip(parentShip, portShip);
            if (!index) throw new Error(this.objError.failedLinkPortShip + ', because index = ' + index);

            parentShip.style.position = 'absolute';
            parentShip.style.zIndex = '1000';

            document.body.appendChild(parentShip);
            this.currentCord(event.clientX, event.clientY);

            document.addEventListener('mousemove', this.moveCursor);
            parentShip.addEventListener('mouseup', this.checkPosition);
        } catch (e) {
            console.error(e);
        }
    };
    /**
    * @method moveCursor - обработчик события, когда корабли начали перетаскивать
    */
    private moveCursor = (event: MouseEvent): void => {
        event.preventDefault();

        this.currentCord(event.clientX, event.clientY);
        //проверка, находится ли корабли в области поля
        if (!this.isCheckAreaShip()) return;

        const parentShip = this.currentParamsShip.parentShip;
        if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

        const coordParentShip = parentShip.getBoundingClientRect();

        this.arrCoordFieldRect.forEach((coordRect, i) => {

            if (this.showPlaceShipCoord(coordRect, coordParentShip)) {
                this.arrFieldRect[i].classList.add(this.style);
            } else {
                this.arrFieldRect[i].classList.remove(this.style);
            }
        });
    };
    /**
    * @method checkPosition - обработчик события, когда корабль отпускают.
    * Если корабль находится в зоне поля, то он добавлятся на поле, если нет,
    * то он добавляется обратно в свое изначальное место, то есть порт.
    */
    private checkPosition = (event: MouseEvent): void => {
        try {
            event.preventDefault();
            //проверка, находится ли корабли в области поля
            const test = this.isCheckAreaShip();

            if (test) {
                this.putShip();
            } else {
                this.returnShip();
            }
        } catch (e) {
            console.error(e);
        }
    };
    // /#Handelrs
    
    //#Handler methods
    /**
    * @method currentCord - опреляется координаты корабля 
    * относильно координат мыши или зажатого тача
    */
    private currentCord = (corX: number, corY: number): void => {
        const parentShip = this.currentParamsShip.parentShip as HTMLDivElement;
        const coordX = corX - this.currentParamsShip.shiftX;
        const coordY = corY - this.currentParamsShip.shiftY;

        parentShip.style.left = coordX + 'px';
        parentShip.style.top = coordY + 'px';
    };
    /**
    * @method putShip - метод, который ставит корабль на те координаты, 
    * над которымы он находится
    */
    private putShip = (): void => {
        try {
            const plane = this.currentParamsShip.plane;
            const parentShip = this.currentParamsShip.parentShip;
            const arrBlockHighlight = this.field.querySelectorAll('.' + this.style) as NodeListOf<HTMLDivElement>;
            const firstBlockHighlight = arrBlockHighlight[0] as HTMLDivElement;
            const lastBlockHighlight = arrBlockHighlight[arrBlockHighlight.length - 1];
            const coordFirstBlockHighlight = firstBlockHighlight?.getBoundingClientRect();

            if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);
            if (!firstBlockHighlight) {
                this.returnShip();
                throw new Error(this.objError.failedFinedHighLightBlock);
            }

            //создаем объект данных поставленного корабля на поле
            const objPuttingShip: IntrCoordPuttingShip = {
                ship: {
                    id: +parentShip.dataset.id!,
                    plane: this.currentParamsShip.plane,
                    size: +parentShip.dataset.shipSize! as TypeSizeShip,
                },
                firstCoord: {
                    x: +firstBlockHighlight.dataset.coordX!,
                    y: +firstBlockHighlight.dataset.coordY!,
                },
                lastCoord: {
                    x: +lastBlockHighlight.dataset.coordX!,
                    y: +lastBlockHighlight.dataset.coordY!,
                }
            };

            //устанавливаем корабль визуально на поле по координатам
            if (plane == "horizontal") {
                parentShip.style.top = coordFirstBlockHighlight.top + 'px';
                parentShip.style.left = coordFirstBlockHighlight.left + 'px';
            } else if (plane == 'vertical') {
                parentShip.style.top = coordFirstBlockHighlight.top + 'px';
                parentShip.style.left = coordFirstBlockHighlight.left + 'px';
            }

            //добавляем данные о координатах корабля на поле
            this.changeArrCoordPuttingShip(+parentShip.dataset.id!, 'push', objPuttingShip);

            parentShip.dataset.putting = 'true';
            
            document.removeEventListener('mousemove', this.moveCursor);
            parentShip.removeEventListener('mouseup', this.checkPosition);
        } catch (e) {
            console.error(e);
        }
    };
    /**
    * @method returnShip - метод, который возвращает корабль в свой порт
    */
    private returnShip = (): void => {
        try {
            const parentShip = this.currentParamsShip.parentShip;
            const id = parentShip?.dataset.id;
            const port = document.querySelector(`[data-port-ship][data-id='${id}']`);

            if (!port || !parentShip) return;

            //удлаяем объект данных о координатах корабля на поле, если он там был
            this.changeArrCoordPuttingShip(+id!, 'delete');
            this.arrFieldRect.forEach( el => el.classList.remove(this.style));
            port.appendChild(parentShip);

            parentShip.style.zIndex = '2';
            parentShip.style.left = '0';
            parentShip.style.top = '0';
            parentShip.dataset.plane = 'horizontal';
            parentShip.dataset.putting = 'false';

            parentShip.removeEventListener('mouseup', this.checkPosition);
            document.removeEventListener('mousemove', this.moveCursor);
        } catch (e) {
            console.error(e);
        }
    };
    /**
    * @method changePlane - обработчик события, который отвечает
    * за изменение плоскости корабля ('horizontal' | 'vertical')
    */
    private changePlane = (): void => {
        const parent = this.currentParamsShip;

        console.log(parent.plane);
    };
    /**
     * @method setIndexPortShip - метод, который устанавливает связь между кораблем и его портом, 
     * в случае если его нужно будет вернуть. Связь устанавливается методом простановки одинаковых индексов, 
     * которые прописываются в аттрибут data-id.
     * Если связь уже была установлена, то просто возвращается связанный индекс.
     */
    private setIndexPortShip = (parentShip: HTMLDivElement, portShip: HTMLDivElement):number | undefined => {
        const idParent = parentShip.dataset.id;
        let index: number | undefined;

        if (!idParent && portShip) {
            console.log(this.nameClass + ": The ship was not connected to the port, start linkig...");
            const obj: IntrfObjPortShip = {
                port: portShip,
                parentShip: parentShip,
            };

            this.arrObjPotShip.push(obj);
            index = this.arrObjPotShip.length;

            portShip.setAttribute('data-id', index + '');
            parentShip.setAttribute('data-id', index + '');
            console.log(this.nameClass + ": The ship successfully linked the port");
        } else if (idParent) {
            index = Number(idParent);
        }
        
        return index;
    };
    /**
     * @method showPlaceShipCoord - метод, который вычесляет, над какими координатами,
     * находится корабль.
     * 
     * @returns boolean:
     * - true находится пол короблем;
     * - false не находится под кораблем.
     */
    private showPlaceShipCoord = (coordRect, coordParentShip): boolean => {
        let res: boolean = false;
        // Вычисляем допустимые границы по оси Y
        const minTop = coordRect.top - (coordParentShip.height / 2);
        const maxBottom = coordRect.bottom + (coordParentShip.height / 2);
        // Вычисляем допустимые границы по оси X
        let minLeft = coordParentShip.left - (coordRect.width / 2);
        let maxRight = coordParentShip.right + (coordRect.width / 2);

        if (this.currentParamsShip.plane == 'horizontal') {
            // Проверяем заходит ли корабль за поле или нет, если да, то изменяем диапазоны для координат
            if (this.coordFiled.right < coordParentShip.right) minLeft = minLeft - (coordParentShip.right - this.coordFiled.right);
            if (this.coordFiled.left > coordParentShip.left) maxRight = maxRight + (this.coordFiled.left - coordParentShip.left);
            // Проверяем, попадает ли корабль в допустимую область по Y и по X
            const testVertical = coordParentShip.top >= minTop && coordParentShip.bottom <= maxBottom;
            const testHorizontal = coordRect.left >= minLeft && coordRect.right <= maxRight;

            res = testHorizontal && testVertical;
        } else if (this.currentParamsShip.plane == "vertical") {
            console.log('ad');
        }

        return res;
    };
    /**
     * @method returnShip - метод, который вычесляет находится ли корабль в области поля.
     * 
     * @return boolean:
     * - true находится в области поля;
     * - false не находится в области поля.
     * 
     * ** Примечание**: 
     * - Диапазон увеличен для поля. Увеличение поля зависит от половины размеров корабля.
     * - Например: если корабль будет 200 weight, то right поля = right + (weight корабля / 2),
     * а left поля будет = left - (weight корабля / 2).
     * С top и bottom поля будет увеличение диапазона входа корабля по его height;
     */
    private isCheckAreaShip = (): boolean => {
        const parentShip = this.currentParamsShip.parentShip;
        if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

        const widthParentShip = this.currentParamsShip.widthParentShip;
        const heightParentShip = this.currentParamsShip.heightParentShip;

        const coordFieldBattle = this.coordFiled;
        const coordParentShip = parentShip.getBoundingClientRect();
        const isCurrentPlane = this.currentParamsShip.plane == "horizontal";

        const objRangePosition = {
            top: isCurrentPlane ? coordFieldBattle.top - (heightParentShip / 2) : coordFieldBattle.top - (widthParentShip / 2),
            bottom: isCurrentPlane ? coordFieldBattle.bottom + (heightParentShip / 2) : coordFieldBattle.bottom + (widthParentShip / 2),
            left: isCurrentPlane ? coordFieldBattle.left - (widthParentShip / 2) : coordFieldBattle.left - (heightParentShip / 2),
            right: isCurrentPlane ? coordFieldBattle.right + (widthParentShip / 2) : coordFieldBattle.right + (heightParentShip / 2),
        };

        let test: boolean = true;

        if (coordParentShip.top < objRangePosition.top || coordParentShip.bottom > objRangePosition.bottom) {
            test = false;
        } else if (coordParentShip.left < objRangePosition.left || coordParentShip.right > objRangePosition.right) {
            test = false;
        }

        return test;
    };
    /**
     * @method changeArrCoordShip - метод, который вычесляет находится ли корабль в области поля.
     * @param id - связующий корабль и порт;
     * @param type - принимает тип 'delete' | 'push';
     * @param obj - принимает объект при @param type = 'push;
     */
    private changeArrCoordPuttingShip = (id: number, type: 'delete' | 'push', objPuttingShip?: IntrCoordPuttingShip):void => {
        const index = this._arrCoordPuttingShip.findIndex(el => id == el.ship.id);

        switch (type) {
            case 'delete':
                if (+index != -1) {
                    this._arrCoordPuttingShip.splice(index, 1); 
                };
                break;
            case 'push':
                //смотрим, если корабль быле уже в массиве поставленных кораблей, 
                //то перезаписываем на обновленные данные 
                if (+index == -1) {
                    this._arrCoordPuttingShip.push(objPuttingShip!);
                } else {
                    this._arrCoordPuttingShip[index] = objPuttingShip!;
                }
                break;
        };
    };
    /**
     * @method checkDblClick - метод, который определяет был ли dblClick или нет.
     * @param callback - метод, который нужно вызвать, если dblClick был совершен
     */
    private checkDblClick = (callback): boolean => {
        let isRes:boolean = false;
        const currentTime = Date.now(); // Текущее время

        // Если интервал между кликами меньше 500 мс, увеличиваем счётчик
        if (currentTime - this.lastClickTime < 500) {
            this.clickCount++;
        } else {
            this.clickCount = 1; // Иначе сбрасываем счётчик
        }

        this.lastClickTime = currentTime; // Обновляем время последнего клика
        if (this.clickCount == 2) {
            isRes = true;
            this.clickCount = 0;
            callback();
        }

        return isRes;
    };
    // /#Handler methods
}


