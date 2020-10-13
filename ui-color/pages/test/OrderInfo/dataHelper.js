// filter 从外部引入
const filter = a => a + '_testFilter';

const handleRecordInfo0 = orderData => {
  return [
    {name: '单号', value: orderData.ReceiptNo},
    {name: '申请时间', value: filter(orderData.CreateAt)},
    {name: '单据状态', value: filter(orderData.Status)},
  ]
};

const handleRecordInfo1 = orderData => {
  return [
    {name: '单号', value: orderData.ReceiptNo},
    {name: '申请时间', value: filter(orderData.CreateAt)},
    {name: '审核时间', value: filter(orderData.UpdatedAt)},
    {name: '单据状态', value: filter(orderData.Status)},
  ]
};

export default {
  0: handleRecordInfo0,
  1: handleRecordInfo1,
};
