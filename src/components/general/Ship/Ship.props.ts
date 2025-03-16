import { TypePlaneShip, TypeSizeShip, TypeViewShip } from "../../../types/general/Ship";

export interface PropsShip {
  style: {
    width: number;
  };
  cls?: string;
  view?: TypeViewShip;
  size: TypeSizeShip;
  plane?: TypePlaneShip;
}
