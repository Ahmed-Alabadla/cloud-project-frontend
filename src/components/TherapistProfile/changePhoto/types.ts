import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export interface Props {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isProfileOwner: boolean;
  hover: boolean;
  setHover: Dispatch<SetStateAction<boolean>>;
  imgUrl: string;
}
