export interface ITabMenu {
    links: ITabMenuItem[];
}

interface ITabMenuItem {
    id: string;
    title: string;
    routePath: string;

    icon?: string;
}
