interface WidthScreen {
    profile: string;
    menu: string;
    settings: string;
}

export type TypeWidthScreen = WidthScreen | null; 

export function countWidthScreens(obj):TypeWidthScreen {

    console.log(obj)
;    const objWidthScreen: TypeWidthScreen = {
      profile: obj.profile.current.width,
      menu: obj.menu.current.width,
      settings: obj.settings.current.width,
    };

    return objWidthScreen;   
}