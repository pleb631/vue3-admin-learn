export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface CategoryObj {
    id: number | string;
    name: string;
    category1Id?: number;
    category2Id?: number;
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[];
}

export interface CategoryState {
    c1Id: string | number;
    c1Arr: CategoryObj[];
    c2Arr: CategoryObj[];
    c2Id: string | number;
    c3Arr: CategoryObj[];
    c3Id: string | number;
}

export interface AttrValue {
    id?: number;
    valueName: string;
    attrId?: number;
    flag?: boolean;
}

export type AttrValueList = AttrValue[];
export interface Attr {
    id?: number;
    attrName: string;
    categoryId: number | string;
    categoryLevel: number;
    attrValueList: AttrValueList;
}
export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData {
    data: Attr[];
}
