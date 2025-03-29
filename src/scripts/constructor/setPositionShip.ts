import { TypePlaneShip, TypeSizeShip } from "../../types/general/Ship";

export interface IntrfStyle {
    highlight: string,
    perimeter: string,
    putting: string,
}

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
    size: number;
    plane: TypePlaneShip;
    index: number;
}

interface IntrCoordPuttingShip {
    ship: {
        index: number;
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
 * @property {objWarn} - объект предупреждений;
 * @property {style} - - класс, который будет применяться к коодинате поля в случае,
 *      если корабль находится прям под ним;
 * @property {field} - поле, куда ставятся корабли;
 * @property {coordFiled} - координаты поля;
 * @property {arrShip} - массив кораблей;
 * @property {arrFieldRect} - массив квадратов поля;
 * @property {arrObjPotShip} - массив объектов, которые содержат корабли принадлежащие порту;
 * @property {currentParamsShip} - объект, который содержит в себе характеристика о корабле, который перемещают
 * @property {_arrCoordSettingShip} - массив объектов, которые данные о корбалях, поставленных на поле;
 * 
 * Доступные методы:
 * --
 * @method init - инициализация работы класса;
 * @method unInit - остановить работу класса;
 * @method arrCoordPuttingShip - возвращает массив данных о расположении кораблей на поле (readonly);
 * @method resetPositionShips - возвращает корабли на свои изначальные места.
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
        'perimeterAnotherShip': `${this.nameClass}: Perimeter of another ship`,
        'notFoundCoordForPerimeter': `${this.nameClass}: Coordinate not found for perimeter`,
    };

    //params class
    style: IntrfStyle;
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
        size: 0,
        index: 0
    };
    private _arrCoordPuttingShip: IntrCoordPuttingShip[] = [];

    //params for dblClick
    clickCount: 0 | 1 | 2 = 0;
    lastClickTime:number = 0;

    constructor(field: HTMLDivElement, style:IntrfStyle) {
        this.style = style;
        this.field = field;
        this.coordFiled = field.getBoundingClientRect();
        this.arrShip = document.querySelectorAll('[data-ship]');
        this.arrFieldRect = field.querySelectorAll('[data-coord-x]');
        this.arrCoordFieldRect = [...this.arrFieldRect].map((rect):DOMRect => rect.getBoundingClientRect());
    }

    //#Methods for use outside
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
     * @method unInit 
     * - остановить/удалить все обработчики событий
     * - удалить оставшиеся корабли, если они оказались вне react компонента,
     * так как при добавлении корабля на поле, они добавляются в body.
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
     * @method resetPositionShips - возвращает корабли на свое изначальное место
     */
    resetPositionShips = ():void => {

    };
    /**
     * @method arrCoordPuttingShip - возвращает массив данных о рассположении кораблей на поле (readonly)
     */
    get arrCoordPuttingShip(): IntrCoordPuttingShip[] {
        return this._arrCoordPuttingShip;
    }
    // /#Methods for use outside

    //#Handelrs
    /**
    * @method takeShip - обработчик события, когда корабль взяли.
     */
    private takeShip = (event: MouseEvent):void => {
        try {
            event.preventDefault();

            const parentShip = (event.target as HTMLDivElement).closest('[data-ship]') as HTMLDivElement;
            const planeShip = parentShip.getAttribute('data-plane') as TypePlaneShip;
            let portShip = parentShip.closest('[data-port-ship]') as HTMLDivElement;
            const isPutting = parentShip.dataset.putting;

            //если корабль был взят с поля боя, то определим его порт
            if (!portShip) {
                portShip = document.querySelector(`[data-port-ship][data-index='${parentShip.dataset.index}']`) as HTMLDivElement;
            }

            const index = this.setIndexPortShip(parentShip, portShip);
            if (!index) throw new Error(this.objError.failedLinkPortShip + ', because index = ' + index);

            this.currentParamsShip = {
                parentShip,
                portShip,
                index,
                plane: planeShip,
                size: +parentShip.dataset.shipSize!,
                widthParentShip: parentShip.offsetWidth,
                heightParentShip: parentShip.offsetHeight,
                shiftX: event.clientX - parentShip.getBoundingClientRect().left,
                shiftY: event.clientY - parentShip.getBoundingClientRect().top,
            };

            //если корабль находится на поле, то проверяем был ли дабл клик, 
            //если он был, то меняется положение корабля 
            if (isPutting == 'true') {
                this.checkDblClick(this.changePlane);
                // return;
            }

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
        if (!this.isCheckAreaShip()) {
            this.resetHighlightCoord();
            return;
        }
        
        this.toggleHighlightShipCoord();
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

    //#Methods for Handelrs
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
    private putShip = (): void =>  {
        try {
            const {parentShip, size} = this.currentParamsShip;
            const arrBlockHighlight = [...this.arrFieldRect].filter((el) => el.classList.contains(this.style.highlight));
            const firstBlockHighlight = arrBlockHighlight[0] as HTMLDivElement;
            const lastBlockHighlight = arrBlockHighlight[arrBlockHighlight.length - 1];
            const coordFirstBlockHighlight = firstBlockHighlight?.getBoundingClientRect();

            if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);
            if (arrBlockHighlight.length != size) {
                this.returnShip();
                console.warn(this.objWarn.perimeterAnotherShip);
                return;
            }
            if (!firstBlockHighlight) {
                this.returnShip();
                throw new Error(this.objError.failedFinedHighLightBlock);
            }

            //создаем объект данных поставленного корабля на поле
            const objPuttingShip: IntrCoordPuttingShip = {
                ship: {
                    index: +parentShip.dataset.index!,
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
            //убираем стили подсвечивания координат
            this.resetHighlightCoord();
            //добавляем данные о координатах корабля на поле
            this.changeArrCoordPuttingShip(+parentShip.dataset.index!, 'push', objPuttingShip);
            //показываем периметр корабля на поле, за который нельзя заходить
            this.setPerimeterPuttingCoord('set', arrBlockHighlight);
            //устанавливаем корабль визуально на поле по координатам
            parentShip.style.top = coordFirstBlockHighlight.top + 'px';
            parentShip.style.left = coordFirstBlockHighlight.left + 'px';
            //добавляем аттрибут putting, который означает, что корабль поставлен
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
            const { parentShip, portShip, index, plane } = this.currentParamsShip;
            const arrRectPutting = [...this.arrFieldRect].filter((el) => el.dataset.dataIndex === `${index}`);
            
            if (!portShip || !parentShip) return;

            //удаляем объект данных о координатах корабля на поле, если он там был
            this.changeArrCoordPuttingShip(+index!, 'delete');
            //убираем стили подсвечивания координат
            this.resetHighlightCoord();
            //удаляем периметр корабля на поле
            this.setPerimeterPuttingCoord('delete', arrRectPutting);
            portShip.appendChild(parentShip);

            if (plane === "vertical") {
                this.changePlane('vertical');
            } 

            parentShip.style.zIndex = '2';
            parentShip.style.left = '0';
            parentShip.style.top = '0';
            parentShip.dataset.putting = 'false';

            parentShip.removeEventListener('mouseup', this.checkPosition);
            document.removeEventListener('mousemove', this.moveCursor);
        } catch (e) {
            console.error(e);
        }
    };
    // /#Methods for Handelrs

    // #General methdos
    /**
    * @method changePlane - метод, который отвечает
    * за изменение плоскости корабля ('horizontal' | 'vertical')
    * 
    * @param current - принимает плоскость, c которой нужно поменять
    */
    private changePlane = (current?: TypePlaneShip): void => {
        const { parentShip, widthParentShip, heightParentShip, shiftX, shiftY } = this.currentParamsShip;
        const plane = current ? current : this.currentParamsShip.plane;

        if (plane === "horizontal") {
            parentShip!.dataset.plane = 'vertical';
            this.currentParamsShip.plane = 'vertical';

            parentShip!.style.width = heightParentShip + 'px';
            parentShip!.style.height = widthParentShip + 'px';

            this.currentParamsShip.shiftX = shiftY;
            this.currentParamsShip.shiftY = shiftX;

            this.currentParamsShip.widthParentShip = heightParentShip;
            this.currentParamsShip.heightParentShip = widthParentShip;
        } else {
            parentShip!.dataset.plane = 'horizontal';
            this.currentParamsShip.plane = 'horizontal';

            parentShip!.style.width = heightParentShip + 'px';
            parentShip!.style.height = widthParentShip + 'px';

            this.currentParamsShip.shiftX = shiftY;
            this.currentParamsShip.shiftY = shiftX;

            this.currentParamsShip.widthParentShip = widthParentShip;
            this.currentParamsShip.heightParentShip = heightParentShip;
        }
    };
    /**
     * @method setIndexPortShip - метод, который устанавливает связь между кораблем и его портом, 
     * в случае если его нужно будет вернуть. Связь устанавливается методом простановки одинаковых индексов, 
     * которые прописываются в аттрибут data-index.
     * Если связь уже была установлена, то просто возвращается связанный индекс.
     */
    private setIndexPortShip = (parentShip: HTMLDivElement, portShip: HTMLDivElement):number | undefined => {
        const indexParent = parentShip.dataset.index;
        let index: number | undefined;

        if (!indexParent && portShip) {
            console.log(this.nameClass + ": The ship was not connected to the port, start linkig...");
            const obj: IntrfObjPortShip = {
                port: portShip,
                parentShip: parentShip,
            };

            this.arrObjPotShip.push(obj);
            index = this.arrObjPotShip.length;

            portShip.setAttribute('data-index', index + '');
            parentShip.setAttribute('data-index', index + '');
            console.log(this.nameClass + ": The ship successfully linked the port");
        } else if (indexParent) {
            index = Number(indexParent);
        }
        
        return index;
    };
    /**
     * @method toggleHighlightShipCoord - метод, который подсвечивает координаты
     * над которыминаходится корабль
     */
    private toggleHighlightShipCoord = ():void => {
        const {parentShip} = this.currentParamsShip;
        if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

        const coordParentShip = parentShip.getBoundingClientRect();

        this.arrCoordFieldRect.forEach((coordRect, i) => {

            if (this.isShowingHighlightShipCoord(coordRect, coordParentShip)) {
                const rect = this.arrFieldRect[i];
                const isTest = !rect.classList.contains(this.style.perimeter) && !rect.classList.contains(this.style.putting);
                //если корабль не на координате перемитра другого корабля, то подсвечиваем координату
                if (isTest) rect.classList.add(this.style.highlight);
            } else {
                this.arrFieldRect[i].classList.remove(this.style.highlight);
            }
        });
    };
    /**
     * @method isShowingHighlightShipCoord - метод, который вычесляет, над какими координатами,
     * находится корабль.
     * 
     * @returns boolean:
     * - true находится пол короблем;
     * - false не находится под кораблем.
     */
    private isShowingHighlightShipCoord = (coordRect: DOMRect, coordParentShip: DOMRect): boolean => {
        const {plane} = this.currentParamsShip;
        const isPlane = plane === 'horizontal';
        let res: boolean = false;
        // Вычисляем допустимые границы по оси Y
        // const minTop = coordRect.top - ((isPlane) ? (coordParentShip.height / 2) : (coordParentShip.width / 2));
        // const maxBottom = coordRect.bottom + ((isPlane) ? (coordParentShip.height / 2) : (coordParentShip.width / 2));
        // Вычисляем допустимые границы по оси X
        let minLeft = coordParentShip.left - (coordRect.width / 2);
        let maxRight = coordParentShip.right + (coordRect.width / 2);

        if (isPlane) {
            const minTop = coordRect.top - coordParentShip.height / 2;
            const maxBottom = coordRect.bottom + coordParentShip.height / 2;
            // Проверяем заходит ли корабль за поле или нет, если да, то изменяем диапазоны для координат
            if (this.coordFiled.right < coordParentShip.right) minLeft = minLeft - (coordParentShip.right - this.coordFiled.right);
            if (this.coordFiled.left > coordParentShip.left) maxRight = maxRight + (this.coordFiled.left - coordParentShip.left);
            // Проверяем, попадает ли корабль в допустимую область по Y и по X
            const testVertical = coordParentShip.top >= minTop && coordParentShip.bottom <= maxBottom;
            const testHorizontal = coordRect.left >= minLeft && coordRect.right <= maxRight;

            res = testHorizontal && testVertical;
        } else {
            let minTop = coordParentShip.top - (coordParentShip.width / 2);
            let maxBottom = coordParentShip.bottom + (coordParentShip.width / 2);

            if (this.coordFiled.top > coordParentShip.top) maxBottom = maxBottom + (this.coordFiled.top - coordParentShip.top);
            if (this.coordFiled.bottom < coordParentShip.bottom) minTop = minTop - (coordParentShip.bottom - this.coordFiled.bottom);

            // Проверяем, попадает ли корабль в допустимую область по Y и по X
            const testVertical = coordRect.top >= minTop && coordRect.bottom <= maxBottom;
            const testHorizontal = coordRect.left >= minLeft && coordRect.right <= maxRight;

            res = testHorizontal && testVertical;
        }

        return res;
    };
    /**
     * @method isCheckAreaShip - метод, который вычесляет находится ли корабль в области поля.
     * 
     * @return boolean:
     * - true находится в области поля;
     * - false не находится в области поля.
     * 
     * ** Примечание**: 
     * - Диапазон увеличен для поля. Увеличение поля зависит от половины размеров корабля.
     * - Например: если корабль будет 200 weight, то right поля = right + (weight корабля / 1.5),
     * а left поля будет = left - (weight корабля / 1.5).
     * С top и bottom поля будет увеличение диапазона входа корабля по его height;
     */
    private isCheckAreaShip = (): boolean => {
        const { parentShip} = this.currentParamsShip;
        if (!parentShip) throw new Error(this.objError.notFinedShipInCurrentObj);

        const { widthParentShip, heightParentShip } = this.currentParamsShip;
        const coordFieldBattle = this.coordFiled;
        const coordParentShip = parentShip.getBoundingClientRect();

        const objRangePosition = {
            top: coordFieldBattle.top - (heightParentShip / 1.5),
            bottom: coordFieldBattle.bottom + (heightParentShip / 1.5),
            left: coordFieldBattle.left - (widthParentShip / 1.5),
            right: coordFieldBattle.right + (widthParentShip / 1.5),
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
     * @method changeArrCoordPuttingShip - метод, который отвечает за добавления информации 
     * о координатах корабля в массив.
     * @param index - связующий корабль и порт;
     * @param type - принимает тип 'delete' | 'push';
     * @param obj - принимает объект при @param type = 'push;
     */
    private changeArrCoordPuttingShip = (index: number, type: 'delete' | 'push', objPuttingShip?: IntrCoordPuttingShip):void => {
        const searchIndex = this._arrCoordPuttingShip.findIndex(el => index == el.ship.index);

        switch (type) {
            case 'delete':
                if (+searchIndex != -1) {
                    this._arrCoordPuttingShip.splice(searchIndex, 1); 
                };
                break;
            case 'push':
                //смотрим, если корабль быле уже в массиве поставленных кораблей, 
                //то перезаписываем на обновленные данные 
                if (searchIndex == -1) {
                    this._arrCoordPuttingShip.push(objPuttingShip!);
                } else {
                    this._arrCoordPuttingShip[searchIndex] = objPuttingShip!;
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
        const {index} = this.currentParamsShip;
        const currentTime = Date.now(); // Текущее время

        const arrRectPutting = [...this.arrFieldRect].filter((el) => el.dataset.index === `${index}`);
        this.setPerimeterPuttingCoord("delete", arrRectPutting);

        // Если интервал между кликами меньше 500 мс, увеличиваем счётчик
        if (currentTime - this.lastClickTime < 300) {
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

        this.toggleHighlightShipCoord();

        return isRes;
    };
    /**
     * @method resetHighlightCoord - метод, убирает стиль подсвечивания координат
    */
    private resetHighlightCoord = (): void => {
        this.arrFieldRect.forEach(rect => {
            if (!rect) return;
            rect.classList.remove(this.style.highlight);
        });
    };
    /**
     * @method setPerimeterPuttingCoord - метод подсвечивает периметр вокруг корабля за который
     * нельзя заходить при установке другого корабля на поле;
     * @param arrRectPutting - массив подсвеченных координат, на которых стоит корабль;
     * @param type - тип действия, который принимает 'set' | 'delete'. 
     * 
     * @description
     * - это важный метод в построении логики показа зоны(периметра) корабля.
     * 
     * Пояснение аттрибутов:
     * - data-index - задается самим координатам, на которых "стоит" корабль. Присваивается исходя из id корабля
     * - data-perimeter-index - массив индефикаторов координат корабля, задается периметру кораблей в случае, 
     * если периметр больше не связан с индекфикаторами кораблей, то он удаляется с поля.
    */
    private setPerimeterPuttingCoord = (type: 'set' | 'delete', arrRectPutting: HTMLDivElement[]): void => {
        try {
            const { perimeter, putting } = this.style;
            const { plane, index } = this.currentParamsShip;
            const isPlane = plane === 'horizontal';

            //функция измененния периметра
            const togglePerimeter = (elPerimeter: HTMLDivElement | null, ishouldAdd: boolean):void => {
                if (!elPerimeter) return;

                if (ishouldAdd) {
                    //если еще не было ни одной связки периметра с кораблем, то установим первую связь.
                    //если же она была, то добавляем связь с еще одним кораблем
                    if (!elPerimeter.hasAttribute('data-perimeter-index')) {
                        elPerimeter.dataset.perimeterIndex = "[" + index+ "]";
                        elPerimeter.classList.toggle(perimeter, ishouldAdd);
                    } else {
                        const arrIndex: number[] = JSON.parse(elPerimeter.dataset.perimeterIndex!);
                        arrIndex.push(index);
                        const arrJSON = JSON.stringify(arrIndex);

                        elPerimeter.dataset.perimeterIndex = arrJSON;
                        return;
                    }
                } else {
                    //удаляем связь
                    const arrIndex: number[] = JSON.parse(elPerimeter.dataset.perimeterIndex!).filter((el: number) => +el !== index);
                    //если связей больше нет, то убираем показ периметра
                    //если связя еще имеется с другими кораблями, то перезапишем аттрибут
                    if (arrIndex.length === 0) {
                        elPerimeter.removeAttribute('data-perimeter-index');
                        elPerimeter.classList.toggle(perimeter, ishouldAdd);
                    } else {
                        const arrJSON = JSON.stringify(arrIndex);
                        elPerimeter.dataset.perimeterIndex = arrJSON;
                    }
                }
            };
            //функция поиска периметра по координатам
            const getElementByCoords = (x: number, y: number): HTMLDivElement | null => {
                return this.field.querySelector(`[data-coord-x='${x}'][data-coord-y='${y}']`) as HTMLDivElement;
            };

            arrRectPutting.forEach((rect, i, arr) => {
                const rectX = rect.dataset.coordX as string;
                const rectY = rect.dataset.coordY as string;
                //проверка находится ли корма или нос корабля под координатой
                const isBow = i === 0;
                const isStern = i === arr.length - 1;
                //правый борт
                const rectRightBoard = (isPlane) ? getElementByCoords(+rectX, +rectY - 1) : getElementByCoords(+rectX + 1, +rectY); 
                //левый борт
                const rectLeftBoard = (isPlane) ? getElementByCoords(+rectX, +rectY + 1) : getElementByCoords(+rectX - 1, +rectY);
                //нос корабля
                const rectBow = (isBow && isPlane) ? rect.previousElementSibling : (isBow && !isPlane) ? getElementByCoords(+rectX, +rectY - 1) : null;
                //корма корабля
                const rectStern = (isStern && isPlane) ? rect.nextElementSibling : (isStern && !isPlane) ? getElementByCoords(+rectX, +rectY + 1) : null;
                //периметры по бокам от кормы или от носа
                const rectBowLeft = (isBow && isPlane) ? getElementByCoords(+rectX - 1, +rectY - 1) : (isBow && !isPlane) ? getElementByCoords(+rectX - 1, +rectY - 1) : null;
                const rectBowRight = (isBow && isPlane) ? getElementByCoords(+rectX - 1, +rectY + 1) : (isBow && !isPlane) ? getElementByCoords(+rectX + 1, +rectY - 1) : null;
                const rectSternLeft = (isStern && isPlane) ? getElementByCoords(+rectX + 1, +rectY + 1) : (isStern && !isPlane) ? getElementByCoords(+rectX - 1, +rectY + 1) : null;
                const rectSternRight = (isStern && isPlane) ? getElementByCoords(+rectX + 1, +rectY - 1) : (isStern && !isPlane) ? getElementByCoords(+rectX + 1, +rectY + 1) : null;

                const ishouldAdd = type === 'set';

                togglePerimeter(rectRightBoard, ishouldAdd);
                togglePerimeter(rectLeftBoard, ishouldAdd);
                togglePerimeter(rectBow as HTMLDivElement | null, ishouldAdd);
                togglePerimeter(rectStern as HTMLDivElement | null, ishouldAdd);
                togglePerimeter(rectBowLeft, ishouldAdd);
                togglePerimeter(rectBowRight, ishouldAdd);
                togglePerimeter(rectSternLeft, ishouldAdd);
                togglePerimeter(rectSternRight, ishouldAdd);

                rect.classList.toggle(putting, ishouldAdd);
                if (ishouldAdd) {
                    rect.dataset.index = '' + index;
                } else {
                    rect.removeAttribute('data-index');
                }
            });
        } catch (e) {
            console.error(e);
        }
    };
    // #General methdos
}