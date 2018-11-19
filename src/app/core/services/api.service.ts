import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { historylog, Emaillist, SystemVar } from './mock-data';
// import { bitlySetup, config } from '../config/config';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    count = 0;
    API_URL = 'http://5.9.144.226:3000';
    @Output() apiStartEvent: EventEmitter<any> = new EventEmitter(true);
    @Output() apiEndEvent: EventEmitter<any> = new EventEmitter(true);
    private childMethodCall = new Subject<any>();
    // Observalbe string streams
    componentMehtodCalled$ = this.childMethodCall.asObservable();
    constructor(public http: HttpClient) {
        window.onbeforeunload = (e) => {
            if (this.count) {
                const dialogText = 'Dialog text here';
                e.returnValue = dialogText;
                return dialogText;
            } else {
                return e;
            }
        };
    }

    // fetchNewEmail() {
    //     this.childMethodCall.next();
    // }
    // refreshNewEmails() {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + 'email/fetchByButton')
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    increaseAPiCount() {
        ++this.count;
        this.apiStartEvent.emit();
    }
    decreaseAPiCount() {
        --this.count;
        if (this.count === 0) {
            this.apiEndEvent.emit();
        }
    }
    // getEmailList(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     if (!!body.type) {
    //         return this.http.put(environment['apibase'] + `email/fetch/${body.tag_id}/${body.page}/${body.limit}`, body)
    //             .pipe(map((res: Response) => {
    //                 this.decreaseAPiCount();
    //                 return res;
    //             })
    //             ,catchError((error: any) => {
    //                 this.count = 0;
    //                 this.apiEndEvent.emit();
    //                 return Observable.throw(error || 'Server error');
    //             });
    //     } else {
    //         return this.http.put(environment['apibase'] + `email/fetch/${body.tag_id}/${body.page}/${body.limit}`, body)
    //             .pipe(map((res: Response) => {
    //                 this.decreaseAPiCount();
    //                 return res;
    //             })
    //             ,catchError((error: any) => {
    //                 this.count = 0;
    //                 this.apiEndEvent.emit();
    //                 return Observable.throw(error || 'Server error');
    //             });
    //     }
    // }
    // sendEmailToPendingCandidates(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'email/send_to_selected_tag', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updatePriority(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'update/priority', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getDashboardData(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + 'dashboard')
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getEmailStatus(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'get/emailStatus', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    getScheduleData(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + 'get/shedule'))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
            ,catchError((error: any) => {
                this.count = 0;
                this.apiEndEvent.emit();
                return Observable.throw(error || 'Server error');
            })
        );
    }
    // getEmailLogs(body): Observable<any> {
    //     this.increaseAPiCount();
    //     let url: any;
    //     if (body['email']) {
    //         url = `search/email/logs/${body.email}/${body.page}/${body.limit}`;
    //     } else {
    //         url = `get/email/logs/${body.page}/${body.limit}`;
    //     }
    //     return this.http.get(environment['apibase'] + url)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getUserList(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `user/list/${body.page}/${body.limit}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getSpamList(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `spamList/get/${body.page}/${body.limit}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updateSpam(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'spamList/update/' + data.id, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // moveSpamFromJobProfile() {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'remove/spamFromJobProfile', {})
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // addSpam(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'spamData/add', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // fetchEmailByDays(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `fetch/emails/${body.days}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    private updateUrl(req: string) {
        return req + '?accessToken=' + localStorage.getItem('accessToken');
    }
    async getAllTagsMain() {
        return await this.http.get(this.updateUrl(`${this.API_URL}/email/countEmail`)).toPromise();
    }
    // getAllTags(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + 'tag/get')
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // addTag(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'tag/add/' + body.type, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getCronStatus(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'email/cron_status', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // addUser(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'user/add_user', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // sendEmail(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'email/sendtomany', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // sendToNotReplied(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'sendToNotReplied', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // UnreadStatus(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/changeUnreadStatus/${body.mongo_id}/${body.status}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // MarkASUnreadStatus(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/markAsUnread`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // resetPassword(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `account/update_password`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // emailAttachment(id: string): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/mailAttachment/${id}`)
    //         .retryWhen(error => {
    //             return error.flatMap((error1: any) => {
    //                 if (error1.status === 400) {
    //                     return Observable.of(error1.status).delay(2000)
    //                 }
    //                 return Observable.throw({ error: 'No retry' });
    //             })
    //                 .take(20)
    //                 .concat(Observable.throw({ error: 'Sorry, there was an error (after 5 retries)' }));
    //         })
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // assignTag(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/assignMultiple/${body.tag_id}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteEmail(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `email/deleteEmail/${body.tag_id}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updateTag(tag: any, type: string): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'tag/update/' + type + '/' + tag.id, tag)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteTag(tag: string, type: string): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + 'tag/delete/' + type + '/' + tag)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteUser(path, id): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + path + id)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }

    // getHistory(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `user/log/${body.email}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    getUserVariable(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + 'variable/get/1/20'))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            }),
                catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    getSystemVariable(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + 'systemVariable/get/1/20'))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    addUserVariable(body): Observable<any> {
        this.increaseAPiCount();
        return this.http.post(this.updateUrl(environment['apibase'] + 'variable/add/'), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    deleteVariable(id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.delete(this.updateUrl(environment['apibase'] + 'variable/delete/' + id))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    updateVariable(body: any, id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.put(this.updateUrl(environment['apibase'] + 'variable/update/' + id), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    addTemplate(body: any): Observable<any> {
        this.increaseAPiCount();
        return this.http.post(this.updateUrl(environment['apibase'] + 'template/add/'), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // getEmailName(): Promise<any[]> {
    //     return Promise.resolve(Emaillist);
    // }
    async deleteImap(id: string) {
        return await this.http.delete(this.updateUrl(`${this.API_URL}/imap/delete/${id}`)).toPromise();
    }
    storeImap(body): Observable<any> {
        this.increaseAPiCount();
        return this.http.post(this.updateUrl(`${environment['apibase']}imap/save`), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    async getImapList() {
        return await this.http.get(this.updateUrl(`${this.API_URL}/imap/get`)).toPromise();
    }
    storeSmtp(body: any): Observable<any> {
        this.increaseAPiCount();
        return this.http.post(this.updateUrl(environment['apibase'] + 'smtp/save'), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // sendTestEmail(userDetail: any, body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `template/email/${userDetail.CandidateEmail}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // sendEmailBySeclection(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `email/by_seclection`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // resendEmailForTracking(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + 'send/sendEmailToNotviewed', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    async activateImap(email_id: string) {
        return await this.http.put(this.updateUrl(`${this.API_URL}/imap/statusActive/${email_id}`), {}).toPromise();
    }
    getSmtpList(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + 'smtp/get/1/10'))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    console.log("error", error)
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    deleteSmtp(id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.delete(this.updateUrl(environment['apibase'] + 'smtp/delete/' + id))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    testSmtp(email: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.put(this.updateUrl(this.updateUrl(environment['apibase'] + `smtp/testSmtp/${email}`)), {})
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    changeSmtpStatus(email: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.put(this.updateUrl(environment['apibase'] + `smtp/changeStatus/${email}`), {})
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // *** Email template service functions ***
    getTemplate(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + 'template/get/1/20'))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    updateTemplate(body: any, id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.put(this.updateUrl(environment['apibase'] + 'template/update/' + id), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    deleteTemplate(id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.delete(this.updateUrl(environment['apibase'] + 'template/delete/' + id))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // getCandidateHistory(Email_id: string): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `email/inbox/${Email_id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    testTemplate(temp_id: string): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(environment['apibase'] + `template/test/${temp_id}`)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // addNote(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'candidate_notes/insert', data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updateNote(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `candidate_notes/update/`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    sendSlackInfo(info: any): Observable<any> {
        this.increaseAPiCount();
        return this.http.post(this.updateUrl(environment['apibase'] + `add/slackInfo/`), info)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    getSlackInfo(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + `get/slackInfo/`))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    updateSlackInfo(body: any, id: any): Observable<any> {
        this.increaseAPiCount();
        return this.http.put(this.updateUrl(environment['apibase'] + 'update/slackInfo/' + id), body)
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    deleteSlackData(id: any): Observable<any> {
        this.increaseAPiCount();
        return this.http.delete(this.updateUrl(environment['apibase'] + `delete/slackInfo/` + id))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // addSubTag(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'tag/add/' + body.type, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // addNewCandidate(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + 'add/addNewCandidate', body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteSubTag(type: any, id: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + `tag/delete/` + type + '/' + id)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getEmailTrackingData(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `fetch/trackingData`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    getIntervieweeList(): Observable<any> {
        this.increaseAPiCount();
        return this.http.get(this.updateUrl(environment['apibase'] + `get/Interviewee`))
            .pipe(map((res: Response) => {
                this.decreaseAPiCount();
                return res;
            })
                , catchError((error: any) => {
                    this.count = 0;
                    this.apiEndEvent.emit();
                    return Observable.throw(error || 'Server error');
                })
            );
    }
    // assignInterviewee(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `assign/interviewee`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteCampaign(campaign_name): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + `delete/campaign/${campaign_name}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getIntervieweeInboxData(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `get/candidate/byInterviewee`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // creteQues(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/addQuestion`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updateQues(body: any, questionId: String): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/updateQuestion/${questionId}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getQuesAdmin(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getAllQuestions`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getQues(fb_id: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getQuestinsForCandidate/${fb_id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getQuesByid(quesId: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getQuestionById/${quesId}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteQueByid(quesId: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/deleteQuestion/${quesId}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // jobprofile(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/job_profile`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // submitTest(data): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/submitExam`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // score(data: any, body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/showExamResult/${data.page}/${data.limit}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // detailedScore(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/getCandidateResult`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // createGroup(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/examSubjects`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // examGroup(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getExamSubjects`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // generateTestLink(id): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/generateLink/${id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getCandidateDetails(id): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/candidateDetails/${id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // addWalkinCandidate(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/addNewCandidate`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // pendingList(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getPendingList`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // approveCandidate(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/approveCandidate`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // markStarred(status: boolean, body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `star/starEmail/` + `${status}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getStarredMails() {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `star/getStaredEmails`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // removeOldEmails(body: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `tag/remove`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // moveEmailToSpam(email: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `spam/candidate/${email}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // moveEmailToArchive(email: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/candidateArchive/${email}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // markAllAsRead(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/tag/markAsRead`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // // Candidate calling for help
    // helpMe(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/askHrForHelp`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // // For candidate delete
    // removeCandidate(param): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + `exams/deletePendingCandidate/${param}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // setCallStatus(param, body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/candidate/${param}`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // // For bulk Archive Mail
    // archiveAllMail(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `email/archive`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // archivefindTotalMail(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `email/archiveCount`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // closeJobProfile(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `tag/closeJobProfile`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // createTestSet(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/addTestPapers`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // updateTestSet(data: any): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.put(environment['apibase'] + `exams/updateTestPapers`, data)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // removeOldlogs(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + `user/deleteLogs/${body['userId']}/${body['start']}/${body['end']}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getAllTestPaper(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getTestPapers`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getTestPaperById(id): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/getOneTestPaper/${id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // questionsForPDF(id): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `exams/questionsForPDF/${id}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteTestPaper(body): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `exams/deleteTestPapers`, body)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // deleteGroup(groupId): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.delete(environment['apibase'] + `exams/deleteExamSubjects/${groupId}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
    // getBitlyURL(url): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(`${bitlySetup.host}?login=${bitlySetup.login}&apiKey=${bitlySetup.apiKey}&longUrl=${url}&format=json`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }

    // getCompanyProfile(): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.get(environment['apibase'] + `tag/getCompanyProfile/${config.companyProfileId}`)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }

    // addCompanyProfile(apiData): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `tag/addCompanyProfile`, apiData)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }

    // updateCompanyProfile(id, apiData): Observable<any> {
    //     this.increaseAPiCount();
    //     return this.http.post(environment['apibase'] + `tag/updateCompanyProfile/${id}`, apiData)
    //         .pipe(map((res: Response) => {
    //             this.decreaseAPiCount();
    //             return res;
    //         })
    //         ,catchError((error: any) => {
    //             this.count = 0;
    //             this.apiEndEvent.emit();
    //             return Observable.throw(error || 'Server error');
    //         });
    // }
}
