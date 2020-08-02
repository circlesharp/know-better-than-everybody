# Know Better than Everybody - Back End

## the structure of the document
```
// 这个项目占一个 database 中的一个 collection
// 每个用户一个 document

const personSample = {
  _id: 'weixinOpenID',
  defaultPayDay: 'DD', // 默认发薪日
  personalMonths: [ // 并非自然月，而是根据发薪日而定的
    monthSample, monthSample, monthSample
  ],
}

const monthSample = {
  monthName: 'YYYY-MM',
  payDay: 'defaultPayDay' + 1, // 默认发薪日 + 1
  withdraw, // the BRIDGE of sectionA & sectionC
  sectionA: { // how much I wanna save, wannaSave === actualSave + withdraw
    wannaSave,
    actualSave,
  },
  sectionB:{ // how much I have to pay, === rent + family + other
    rent,
    family,
    other,
  },
  sectionC: { // how much I wanna spend, budget + withdraw = left + costs
    budget,
    costs,
    left,
  },
  days: [ daySample, daySample, daySample ],
}

const daySample = {
  createdAt: 'timeStamp',
  date: 'timeStamp',
  dailyCost, // 日常开销
  nonRoutineCost, // 非日常开销
  dailyWithdraw, // 当天取款
  comment, // 当天备注
}
```