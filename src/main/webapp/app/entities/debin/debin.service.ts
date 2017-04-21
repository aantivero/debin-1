import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Debin } from './debin.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class DebinService {

    private resourceUrl = 'api/debins';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(debin: Debin): Observable<Debin> {
        const copy: Debin = Object.assign({}, debin);
        copy.desde = this.dateUtils.toDate(debin.desde);
        copy.hasta = this.dateUtils.toDate(debin.hasta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(debin: Debin): Observable<Debin> {
        const copy: Debin = Object.assign({}, debin);

        copy.desde = this.dateUtils.toDate(debin.desde);

        copy.hasta = this.dateUtils.toDate(debin.hasta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Debin> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.desde = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.desde);
            jsonResponse.hasta = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.hasta);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: any): any {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].desde = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].desde);
            jsonResponse[i].hasta = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].hasta);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
