import { Request, Response } from 'express';
import Env from '../utils/env';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export interface IResponseType {
  message: string;
  status?: number;
  code?: number;
  data: any;
}

export class ResponseHandler {
  private readonly environment: string;
  private readonly response: Response;

  constructor(_req: Request, res: Response) {
    this.environment = Env.get('LOANIFY_NODE_ENV');
    this.response = res;
  }

  success(options: IResponseType): object {
    const { message, data, code = StatusCodes.OK } = options;
    const response = {
      environment: this.environment,
      status:
        code === StatusCodes.OK || code === StatusCodes.CREATED
          ? 'success'
          : 'failed',
      message,
      data,
      type: getReasonPhrase(code),
    };

    return this.response.status(code).json(response);
  }
}
