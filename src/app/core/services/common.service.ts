import { Injectable, EventEmitter, Output } from '@angular/core';
import { config, callToolTips } from './../../config/config';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';
// import { DatePipe } from '@angular/common';
import { promise } from 'protractor';

@Injectable()
export class CommonService {
    @Output() inboxRefresh: EventEmitter<any> = new EventEmitter(true);
    intervieweeList: any;
    fblogindata: any;
    date = new Date();

    constructor( public _apiService: ApiService, private _localStorageService: LocalStorageService) { }

    getDefaultTagColor(title) {
        if (title === 'Ignore') {
            return { 'background-color': '#FF0000' };
        } else if (title === 'Genuine Applicant') {
            return { 'background-color': '#41A317' };
        } else if (title === 'Reject') {
            return { 'background-color': '#F1B2B2' };
        } else if (title === 'Schedule') {
            return { 'background-color': '#FBB917' };
        } else if (title === 'First Round') {
            return { 'background-color': '#00cc93' };
        } else if (title === 'Second Round') {
            return { 'background-color': '#e5cf00' };
        } else if (title === 'Third Round') {
            return { 'background-color': '#007f00' };
        } else {
            return { 'background-color': 'cyan' };
        }
    }

    getDefaultTagIcon(title) {
        if (title === 'Ignore') {
            return 'block';
        } else if (title === 'Genuine Applicant') {
            return 'done_all';
        } else if (title === 'Reject') {
            return 'highlight_off';
        } else if (title === 'Schedule') {
            return 'access_time';
        } else if (title === 'First Round') {
            return 'done';
        } else if (title === 'Second Round') {
            return 'done_all';
        } else if (title === 'Third Round') {
            return 'thumb_up';
        } else {
            return 'thumb_up';
        }
    }

    formateDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    interviewRoundDisableCheck(dataForInterviewScheduleRound, tagselected) {
        const interviewRounds = config['interviewRounds'];
        let interviewRoundsDisableIndex = -1;
        _.forEach(interviewRounds, (value, key) => {
            value['id'] = dataForInterviewScheduleRound[key]['id'];
            if (dataForInterviewScheduleRound[key]['id'] == tagselected) {
                interviewRoundsDisableIndex = key;
            }
        });
        // performing interview rounnd disable login as per select tag id from side nav
        if (interviewRoundsDisableIndex >= 0) {
            _.forEach(interviewRounds, (value, key) => {
                if (interviewRoundsDisableIndex >= key) {
                    value['disable'] = true;
                } else {
                    value['disable'] = false;
                }
            });
            _.forEach(interviewRounds, (value, key) => {
                if (key > 0 && interviewRounds[key]['disable'] === false && interviewRounds[key - 1]['disable'] === true) {
                    interviewRounds[key - 1]['disable'] = false;
                } else {
                    if (key === interviewRounds.length - 1 && interviewRounds[interviewRounds.length - 1]) {
                        interviewRounds[interviewRounds.length - 1]['disable'] = false;
                    }
                }
            });
        } else {
            _.forEach(interviewRounds, (value, key) => {
                if (key == 0) {
                    value['disable'] = false;
                } else {
                    value['disable'] = true;
                }
            });
        }
        return interviewRounds;
    }

    inboxRefreshEvent() {
        this.inboxRefresh.emit();
    }

    formateTags(data) {
        return new Promise((resolve, reject) => {
            const tagsForEmailListAndModel = {};
            const dataForInterviewScheduleRound = [];
            let inboxMailsTagsForEmailListAndModel = {};
            let subject_for_genuine = '';
            const role = this._localStorageService.getItem('role');
            if (role === 'Guest') {
                resolve(
                    {
                        'tagsForEmailListAndModel': tagsForEmailListAndModel,
                        'dataForInterviewScheduleRound': dataForInterviewScheduleRound,
                        'subject_for_genuine': subject_for_genuine,
                        'inboxMailsTagsForEmailListAndModel': inboxMailsTagsForEmailListAndModel
                    }
                );
                return;
            }
            if (data && data.length > 0) {
                inboxMailsTagsForEmailListAndModel = data[0];
            }
            _.forEach(data, (value, key) => {
                if (value['subject_for_genuine']) {
                    subject_for_genuine = value['subject_for_genuine'];
                    localStorage.setItem('subject_for_genuine', value['subject_for_genuine']);
                } else {
                    subject_for_genuine = 'Revert Information';
                    localStorage.setItem('subject_for_genuine', 'Revert Information');
                }
                if (!tagsForEmailListAndModel['Default']) {
                    tagsForEmailListAndModel['Default'] = [];
                    tagsForEmailListAndModel['Default'] = data[0]['data'].length > 0 ? data[0]['data'][0]['subchild'] : [];
                } else {
                    tagsForEmailListAndModel['Default'] = data[0]['data'].length > 0 ? data[0]['data'][0]['subchild'] : [];
                }
                if (value['data'] && value['data'].length > 0) {
                    _.forEach(value['data'], (value1, key1) => {
                        if (value1['type'] === 'Automatic') {
                            if (!tagsForEmailListAndModel['Automatic']) {
                                tagsForEmailListAndModel['Automatic'] = [];
                                tagsForEmailListAndModel['Automatic'].push(value1);
                            } else {
                                tagsForEmailListAndModel['Automatic'].push(value1);
                            }
                        }
                    });
                }
            });
            // code for removing schedule_first_round, schedule_second_round, schedule_third_round for tagsForEmailListAndModel
            // also creating interview schedule array from here
            this._apiService.getScheduleData().subscribe((scheduleData) => {
                if (scheduleData && scheduleData.length > 0) {
                    _.forEach(scheduleData[0]['rounds'], (scheduleDataValue, scheduleDataKey) => {
                        if (tagsForEmailListAndModel && tagsForEmailListAndModel['Default'] && tagsForEmailListAndModel['Default'].length > 0) {
                            _.forEach(tagsForEmailListAndModel['Default'], (value, key) => {
                                if (value['title'] === scheduleDataValue['round']) {
                                    dataForInterviewScheduleRound.push(value);
                                }
                            });
                        }
                    });
                    _.pullAll(tagsForEmailListAndModel['Default'], dataForInterviewScheduleRound);
                    tagsForEmailListAndModel['Default'].push({ color: '#ba21d3', count: 0, id: 9999, title: 'Schedule', unread: 0 });
                }
                resolve({
                    'tagsForEmailListAndModel': tagsForEmailListAndModel,
                    'dataForInterviewScheduleRound': dataForInterviewScheduleRound,
                    'subject_for_genuine': subject_for_genuine,
                    'inboxMailsTagsForEmailListAndModel': inboxMailsTagsForEmailListAndModel
                })
            }, (err) => {
                console.log(err);
            });
        });
    }

    reduseCountEmail(tags, selectedTag, parantId) {
        _.forEach(tags, (value, key) => {
            _.forEach(value['data'], (dataValue, dataKey) => {
                if (!selectedTag && dataValue['title'] === 'Mails') {
                    dataValue['unread'] = dataValue['unread'] - 1;
                }
                if (parantId && parantId * 1 === dataValue['id'] * 1) {
                    _.forEach(dataValue['subchild'], (subchildValue, subchildKey) => {
                        if (subchildValue['id'] === selectedTag) {
                            subchildValue['unread'] = subchildValue['unread'] - 1;
                        }
                    });
                }
            });
        });
        return tags;
    }

    markAllAsReadTag(tags, selectedTag, parantId) {
        _.forEach(tags, (value, key) => {
            _.forEach(value['data'], (dataValue, dataKey) => {
                if (!selectedTag && dataValue['title'] === 'Mails') {
                    dataValue['unread'] = 0;
                }
                if (parantId && parantId * 1 === dataValue['id'] * 1) {
                    _.forEach(dataValue['subchild'], (subchildValue, subchildKey) => {
                        if (subchildValue['id'] === selectedTag) {
                            subchildValue['unread'] = 0;
                        }
                    });
                }
            });
        });
        return tags;
    }

    formateEmailHistoryData(data, emailId) {
        const deletedData = _.find(data.data, { '_id': emailId });
        _.remove(data.data, {
            '_id': emailId
        });
        data.data.unshift(deletedData)
        _.forEach(data['data'], (value, key: any) => {
            if (value['body']) {
                value['body'] = value['body'].replace(/<a/g, '<a target="_blank" ');
            }
            if (key * 1 === 0) {
                value['accordianIsOpen'] = true;
            } else {
                value['accordianIsOpen'] = false;
            }
        });
        return data;
    }
    getIntervieweeList() {
        return new Promise((resolve, reject) => {
            if (this.intervieweeList && this.intervieweeList.length) {
                resolve(this.intervieweeList);
            } else {
                this._apiService.getIntervieweeList().subscribe((res) => {
                    this.intervieweeList = res;
                    resolve(res);
                }, (err) => {
                    console.log(err)
                    reject(err);
                })
            }
        })
    }
    storeFbdata(data) {
        if (data === 'verifyEmail') {
            return this.fblogindata;
        } else {
            this.fblogindata = data;
            return 'added';
        }
    }

    getTagTitle(email) {
        // const allTags = this._localStorageService.getItem('allTags');
        // const emailYear = this.datePipe.transform(email['date'], 'y');
        const currentYear = this.date.getFullYear();
        // let dateFilterString = 'MMM d, yy, h:mm a';
        // if (currentYear.toString() === emailYear) {
        //     dateFilterString = 'MMM d, h:mm a';
        // }
        // email['date'] = this.datePipe.transform(email['date'], dateFilterString);
        // if (email['updatedAt']) {
        //     email['updatedAt'] = this.datePipe.transform(email['updatedAt'], dateFilterString);
        // }
        if (email['tag_id'] && email['tag_id'].length === 0) {
            email['tagTitle'] = config['allTagTitle'];
        } else {
            // _.forEach(allTags['data'], (filterData, filterKey) => {
            //     if (filterData['title'] === 'candidate') {
            //         _.forEach(filterData['data'], (tagChildData, tagChildKey) => {
            //             if (email && email['tag_id'] && email['tag_id'].length && (email['tag_id'][0] * 1 === tagChildData['id'])) {
            //                 const index = _.findIndex(tagChildData['subchild'], { id: email['default_tag'] * 1 });
            //                 if (index === -1) {
            //                     email['tagTitle'] = tagChildData['title'] + ' : All';
            //                 } else {
            //                     email['tagTitle'] = tagChildData['title'] + ' : ' + tagChildData['subchild'][index]['title'];
            //                 }

            //             }
            //         })
            //     }
            // })
        }
        return email;
    }
    filtertag(email) {
        const allTags = this._localStorageService.getItem('allTags');
        let newArray = [];
        if (email['tag_id'] && email['tag_id'].length === 0) {
            _.forEach(allTags['data'], (filterData, filterKey) => {
                if (filterData['title'] === 'candidate') {
                    _.forEach(filterData['data'], (tagChildData, tagChildKey) => {
                        newArray.push(tagChildData)
                    })
                }
            })
        } else {
            _.forEach(allTags['data'], (filterData, filterKey) => {
                if (filterData['title'] === 'candidate') {
                    _.forEach(filterData['data'], (tagChildData, tagChildKey) => {
                        if (email && email['tag_id'] && email['tag_id'].length && (email['tag_id'][0] * 1 === tagChildData['id'])) {
                            const index = _.findIndex(tagChildData['subchild'], { id: email['default_tag'] * 1 });
                            newArray = tagChildData['subchild'];
                            if (index !== -1) {
                                newArray = newArray.splice(index + 1)
                            }
                        }
                    })
                }
            })
        }
        return this.removeRoundsAddScheduleTag(newArray);
    }

    removeRoundsAddScheduleTag(tags) {
        let count = 0;
        const finalArray = [];
        _.forEach(tags, (data, key) => {
            if (data) {
                if (data.title === config['round1'] || data.title === config['round2'] || data.title === config['round3']) {
                    count = 1
                } else {
                    finalArray.push(data);
                }
            }
        })
        if (count) {
            finalArray.push({ color: '#ba21d3', count: 0, id: 9999, title: 'Schedule', unread: 0 })
        }
        return finalArray;
    }

    sortBydate(data) {
        let newdata = [];
        newdata = _.sortBy(data.data, function (value) {
            if (value['body'] && value['body'].length > 0) {
                value['body'] = value['body'].replace(/<a/g, '<a target="_blank" ').replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
            return new Date(value.date);
        }).reverse();
        return newdata;
    }

    callToolTips(data) {
        let date, time;
        if (data['callSuccessTime']) {
            date = moment(new Date(data['callSuccessTime'])).format('DD-MM-YYYY');
            time = moment(new Date(data['callSuccessTime'])).format('hh:mm:ss a');
        }
        return callToolTips[`${data['callingStatus']}`] + ' ' + `${date} at ${time}`;
    }

    jobProfile(tags, jobProfile) {
        let jobTag = [];
        if (jobProfile[0]) {
            jobTag = [jobProfile[0]];
        }
        _.forEach(tags['data'][0]['data'], (value, key) => {
            if (value.id != null && value.id != 0 && value.active_status == true) {
                jobTag.push({ title: value.title, tag_id: value.id });
            }
        });
        return jobTag;
    }
    sortByJobProfileStatus(tags) {
        let tagStatus;
        _.forEach(tags, (tagValue, tagKey) => {
            if (tagValue['title'] === 'candidate') {
                tagStatus = _.groupBy(tagValue['data'], 'active_status');
                if (tagStatus['true']) {
                    tagValue['data'] = tagStatus['true']
                    _.forEach(tagStatus['false'], (tagData, key) => {
                        let count = 0;
                        _.forEach(tagData['subchild'], (subchild, keyChild) => {
                            // to update count for false status
                            count = count + subchild.count;
                            tagData['count'] = count;
                        });
                        tagValue['data'].push(tagData)
                    });
                } else {
                    tagValue['data'] = tagStatus['false']
                }

            }
        });
        return tags;
    }
    checkedItem(questionType, questions, selectedData) {
        if (questionType === 'Objective') {
            _.forEach(questions, (group, groupKey) => {
                _.forEach(group.questions, (ques, key) => {
                    _.forEach(selectedData, (data, keySelected) => {
                        if (data._id === ques._id) {
                            ques.selected = true;
                            group.selected = true;
                        }
                    })
                })
            })
        } else {
            _.forEach(questions, (ques, key) => {
                _.forEach(selectedData, (data, keySelected) => {
                    if (data._id === ques._id) {
                        ques.selected = true;
                    }
                })
            })
        }
        return questions
    }
    getAllTag() {
        return new Promise((resolve, reolve) => {
            const data = JSON.parse(localStorage.getItem('allTags')).data;
            if (data.length > 0) {
                _.forEach(data, (value, key) => {
                    if (value['title'] === 'candidate') {
                        resolve(value.data);
                    }
                })
            }
        })
    }

    getOS() {
        let OSName = 'Unknown OS';
        if (navigator.userAgent.indexOf('Win') !== -1) { OSName = 'Windows' };
        if (navigator.userAgent.indexOf('Mac') !== -1) { OSName = 'Macintosh' };
        if (navigator.userAgent.indexOf('Linux') !== -1) { OSName = 'Linux' };
        if (navigator.userAgent.indexOf('Android') !== -1) { OSName = 'Android' };
        if (navigator.userAgent.indexOf('like Mac') !== -1) { OSName = 'iOS' };
        console.log('Your OS: ' + OSName);
        return OSName;
    }
}