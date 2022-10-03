import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import environment from 'src/environments/environment';
import { ConsentDescription } from '../models/item.model';
import { AuthService } from './auth.service';

export enum ECONSENTSTYLE {
    HIDE = 1,
    TRANSPARENT = 2,
}

@Injectable({
    providedIn: 'root',
})
export class ConsentService {
    constructor(
        private readonly service: AuthService,
        private http: HttpClient
    ) {}

    accessToken = this.service.getUserLocalData()?.data?.accessToken;

    backendUrl = environment.baseUrl;

    public consentDetail: any;

    getConsentDescription(payload: ConsentDescription): Observable<any> {
        return this.http.post<any>(
            `${this.backendUrl}/dpcm/data-subject`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            }
        );
    }

    updateConsent(payload: any): Observable<any> {
        return this.http.patch<any>(
            `${this.backendUrl}/dpcm/data-consents`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            }
        );
    }

    consentApprovalStatus(payload: any): Observable<any> {
        return this.http.post<any>(
            `${this.backendUrl}/dpcm/data-usage`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            }
        );
    }

    updateSignupConsent(payload): Observable<any> {
        const apiAccessToken = this.service.getUserLocalData()?.data
            ?.apiAccessToken;
        return this.http.patch<any>(
            `${this.backendUrl}/dpcm/data-consents`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${apiAccessToken}`,
                },
            }
        );
    }

    getConsentStyles(type: number): string {
        switch (type) {
            case ECONSENTSTYLE.HIDE:
                return 'hide';
            case ECONSENTSTYLE.TRANSPARENT:
                return 'transparent';
            default:
                return '';
        }
    }
}
