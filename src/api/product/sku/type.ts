export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
export interface Attr {
    id?: number;
    attrId: number | string; //平台属性的ID
    valueId: number | string; //属性值的ID
}
export interface saleArr {
    id?: number;
    saleAttrId: number | string; //属性ID
    saleAttrValueId: number | string; //属性值的ID
}
export interface SkuData {
    category3Id?: string | number; //三级分类的ID
    spuId?: string | number; //已有的SPU的ID
    tmId?: string | number; //SPU品牌的ID
    skuName?: string; //sku名字
    price?: string | number; //sku价格
    weight?: string | number; //sku重量
    skuDesc?: string; //sku的描述
    skuAttrValueList?: Attr[];
    skuSaleAttrValueList?: saleArr[];
    skuDefaultImg?: string; //sku图片地址
    isSale?: number; //控制商品的上架与下架
    id?: number;
}

export interface SkuResponseData extends ResponseData {
    data: {
        records: SkuData[];
        total: number;
        size: number;
        current: number;
        orders: [];
        optimizeCountSql: boolean;
        hitCount: boolean;
        countId: null;
        maxLimit: null;
        searchCount: boolean;
        pages: number;
    };
}

export interface SkuInfoData extends ResponseData {
    data: SkuData;
}
