export class AppSuccessResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public payload: any;

  public total: number;
  public take: number | string;
  public skip: number;
  public page: number;
  public totalPage: number;

  constructor(
    message: string,
    payload?: any,
    meta?: {
      total?: number;
      take?: number;
      page?: number;
      skip?: number;
      totalPage?: number;
    },
  ) {
    this.success = true;
    this.statusCode = 200;
    this.message = message;

    if (payload) {
      this.payload = payload;
    }

    if (meta) {
      this.total = meta.total ? meta.total : 0;
      this.take = meta.take ? meta.take : 0;
      this.page = meta.page ? meta.page : 0;
      this.skip = meta.skip ? meta.skip : 0;
      this.totalPage = meta.totalPage ? meta.totalPage : 0;
    }
  }
}
