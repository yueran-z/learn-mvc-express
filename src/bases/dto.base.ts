//在设计 Model 的时候，有抽离一个部分叫做 createdAt 与updatedAt，这个基本上会是回传给客户端的重要资讯之一，所以可以将这部分出离出来做成 Base，另外还有一个重要资讯就是资料的 id 栏位，也一同并入 Base 中
// 共有的栏位抽出来做成基类，因为都是需要DTO需要回传的资讯
export class DTOBase {
    public readonly _id?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    constructor(dto: DTOBase) {
        this._id = dto._id;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}