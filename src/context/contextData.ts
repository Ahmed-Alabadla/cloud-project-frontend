import { createContext } from "react";
import type { UserDataContextValue } from "./types";

const userDataContext = createContext<UserDataContextValue | null>(null);

export default userDataContext;
