export const config = {
    'interviewRounds': [{ 'name': 'First Round', 'value': 'first_round' }, { 'name': 'Second Round', 'value': 'second_round' }, { 'name': 'Third Round', 'value': 'third_round' }],
    'userType': ['Admin', 'Hr', 'Guest', 'Interviewee', 'Candidate'],
    'mobileNoPrefix': '+91',
    'testMaxtime': 3600000,
    'timeGrace': 300000,
    'refreshTime': 30000,
    'titles': { '/core/dashboa': 'Dashboard', '/core/setting': 'Settings', '/core/inbox': 'Inbox', '/core/inbox/e': 'Inbox', '/core/email-t': 'Email Tracking', '/core/intervi': 'Inbox' },
    'roles': { 'HR': ['/core/setting/emailtemplate', '/core/setting/createQuestion', '/core/setting/pendingCandidate', '/core/setting/candidateScore', '/core/setting/emailvariable', '/core/setting/tagsetting', '/core/setting/automaticTags', '/core/setting/jobProfileTags', '/core/setting/companyProfile', '/core/inbox', '/core/setting/resetPassword', '/core/dashboard'], 'Guest': ['/core/inbox', '/core/setting/resetPassword', '/core/dashboard'], 'Interviewee': ['/core/interviewee-inbox', '/core/setting/resetPassword', '/core/dashboard'] },
    'dashboardChartColor': [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // green
            backgroundColor: 'rgba(50,205,50,0.2)',
            borderColor: 'rgba(50,205,50,1)',
            pointBackgroundColor: 'rgba(50,205,50,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(50,205,50,0.8)'
        }
    ],
    dashboardChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        animation: {
            easing: 'easeInQuad'
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    dashboardPieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
    },
    dashboardChartRefreshTime: 60000,
    fetchMailInterval: 300000,
    scheduleInterviewBy: 'scheduleByDirect',
    emailTrackingRecordPerPage: 100,
    round1: 'First Round',
    round2: 'Second Round',
    round3: 'Third Round',
    avatarUrl: 'https://pikmail.herokuapp.com',
    emailLimit: 20,
    allTagTitle: 'Mails/Attachment',
    callStatus: "Call Status",
    createJobProfile: [{ title: 'Template will be valid across all Job Profile', tag_id: 0 }],
    showJobProfile: [{ title: 'For All Job Profiles', tag_id: 0 }],
    testType: [{ 'type': 'Objective' }, { 'type': 'Subjective' }],
    companyProfileId: 1

}
export const color_list = ['#cb891b', '#ef2e46', '#ff5722', '#ba21d3', '#f3b08c', '#f0793d', '#eb7303', '#db62e9', '#ffeb3b', '#3882b8'];
export const instructions = [
    'The test consists of multiple sections, make sure to complete all sections.',
    'There is time limit of the test. A time counter will start as soon as the test gets started and test will automatically be submitted when the time limit is reached.',
    'Do not close the test all in between, if you do you will have to start from scratch.',
    'Test is given best in landscape mode. So change your mobile display to landscape.',
    'Do not open any other tabs in your browser, if you open a new tab it will get recorded.'
];
export const callToolTips = {
    'missed': 'Didn\'t Pickup',
    'error': 'Call Not Connected',
    'success': 'Talked To Candidate on ',
    'again': 'Call Again Later'
}
export const pageSet = ['5', '10', '20', '30', '50']
export const displayedColumns = ['from', 'sender_mail', 'exam_submit_date', 'examScore', 'action']
export const limitTime = [{ 'time': 30 }, { 'time': 60 }, { 'time': 90 }, { 'time': 120 }, { 'time': 180 }, { 'time': 240 }]
export const inputBox = [{ option: '', opt_id: 1 }, { option: '', opt_id: 2 }]
export const testTableHeader = ['testName', 'job_profileName', 'testRound', 'timeForExam', 'Preview', 'edit', 'delete']
export const bitlySetup = {
    'apiKey': 'R_8fb82b427799aa1a5082a0baa4c1ddca',
    'login': 'o_6so222ci9c',
    'host': 'http://api.bit.ly/v3/shorten'
}