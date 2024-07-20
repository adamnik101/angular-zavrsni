import { EnumActions } from "../../shared/enums/enum-actions";

export interface IMainNavigationLink {
    title: string;
    routePath: string | null;
    icon: string;
    method?: any;
    action?: {
        id: EnumActions;
        dialogConfig?: any;
    }
}