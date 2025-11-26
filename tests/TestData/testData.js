const testData = {
  login: {
    admin: {
      email: 'admin@email.com',
      password: 'admin@email.com'
    }
  },

  credits: {
    customerName: 'swati N',
    reportType: 'standard',
    promoCode: 'StandardCred80$',
    orderID: '17233',
    refundId: '17301',
    updateCredit: '17304',
    card: {
      number: '371449635398431',
      month: '07',
      year: '2027',
      name: 'American Express'
    },
    updateCreditsValue: '5',
    packagePrice: '1620',
    quantity: '60',
    cardLast4: '1111'
  },

  customer: {
    newCustomer: {
      companyName: 'IBM',
      firstName: 'Vedant',
      lastName: 'n',
      email: 'vedant@yopmail.com',
      phone: '9856764567',
      address: '2660 Grant Street',
      city: 'Victoria',
      state: 'Florida',
      zip: '77901',
      password: 'Shiv@12345'
    },
    updatePhone: '7865643424',
    ccEmail: 'swatinagula7@gmail.com',
    oldCCEmail: 'swatinagula7@gmail.com',
    updatedCCEmail: 'swati444nagula@gmail.com',
    deleteCCmail: 'swatinagula7@gmail.com',


    ccEmailCust: 'nikhil@yopmail.com',
    deleteCCEmailCust: 'veer@yopmail.com',
    updateCCEmailCust: 'swatinagula7@gmail.com',
    updateCust: 'swatinagula7@gmail.com',
    deactivateCustomer: 'taucayoissuco-8993@yopmail.com',
    activateCustomer: 'veffeuprissoiquoi-1729@yopmail.com',
    addCardCustomer: 'nikhil@yopmail.com',
    deleteCustomer: 'vedanti@yopmail.com',


    addCard: {
      cardNumber: '4111111111111111',
      expiryMonth: '01',
      expiryYear: '2026',
      cardName: 'visa',
    },
    cardDetails: '- 2026-09',
  },


  employee: {
    newEmployee: {
      name: 'march',
      email: 'empp@yopmail.com',
      phone: '9876857687',
      password: 'Swati@97',
      role: 'Technician'
    },
    deleteEmp: 'march@yopmail.com',
    updatePhone: '6578673567',
    activate: 'rockyy@yopmail.com',
    deactivate: 'aun@yopmail.com',
    searchEmail: 'tecd@yopmail.com'
  },
  promoCode: {
    promoHistory: '50%EntireRush',
    deleteCode: '50Prush',
    deactivateCode: 'Comprehensive100$',
    activateCode: '50%EntireRush',
    order: {
      code: '64%Single',
      desc: '64%Single',
      value: '64',
      type: 'P', // P = percentage, F = fixed
      orderType: 'Single Report',
      reportType: 'Any', // Basic Standard Comprehensive Claims Any
      startDate: '2025-10-05',
      endDate: '2026-11-21',
      limit: '10'
    },
    accountCredits: {
      code: 'Claims45%',
      desc: 'Claims45%',
      value: '45',
      type: 'P', // fixed amount
      reportType: 'Claims',
      startDate: '2025-10-06',
      endDate: '2026-11-21',
      limit: '10'
    },
    rushDelivery: {
      code: '43%Rush',
      desc: '43%Rush',
      value: '43',
      type: 'P', // percentage
      orderType: 'Single Report', // Entire Order/Single Report
      startDate: '2025-10-06',
      endDate: '2026-11-21',
      limit: '10'
    },
  },
  order: {
    updateOrder: {
      orderId: '149003',
      zip: '67565',
      latLon: '45.7460146,-34.9833113',
      ccemail: 'swatinagula7@gmail.com',
      managerNotes: 'This is testing',
      productionNotes: 'This is testing'
    },
    downloadOrder: '149001',
    resendReceipt: '149163',
    street: '616 Denson Street',
    orderId: '149038',
    technician: 'Mark', //ted,Mark
  },

  uploadFiles: {
    orderId: '149154',
    file1: 'tests/RTM_Backoffice/fixtures/downloads/order1.RCG',
    file2: 'tests/RTM_Backoffice/fixtures/downloads/order2.ESX'
  },
  changeStatus: {
    orderId: '149112',
    status: 'Quality Control',
  },
  refundOrder: {
    orderId: '149239',
    amount: '20',
  },
  Orderdelivery: {
    orderId: '148696',
  },
  orderFlow:
  {
    customerName: 'swati N',
    location: '95-25 Queens Blvd, Rego Park, NY 11374, USA',
    city: 'Rego Park',
    type: 'Claims',
    deliveryType: 'rush',
    cardLast4: '1111',
    orderId: '149251',
    technician: 'Mark',
    uploadFiles:
    {
      file1: 'tests/RTM_Backoffice/fixtures/downloads/order1.RCG',
      file2: 'tests/RTM_Backoffice/fixtures/downloads/order2.ESX'
    },

  },
  reportType:
  {
    type: 'standard',
  },
  deliveryType:
  {
    type: 'normal',
  },

  orderReport: {
    newCustomer: {
      companyName: 'TCS',
      firstName: 'yug',
      lastName: 'p',
      email: 'yug9723@yopmail.com',
      phone: '9856764567',
      address: '2660 Grant Street',
      city: 'Victoria',
      state: 'Florida',
      zip: '77901',
      password: 'Swati@97',
      confirmPassword: 'Swati@97',
    },
    addCard: {
      cardNumber: '371449635398431',
      expiryMonth: '01',
      expiryYear: '2026',
      cardName: 'AMX',
    },
    cardDetails: '- 2026-01',
    customerName: 'swati N',
    location: '118 Hedgewood Dr greenbelt Maryland 20770',
    city: 'Greenbelt',
    type: 'Claims',
    promoCode: 'EntireAny45%',
    cardLast4: '1111',
    deliveryType: 'normal',
  },

  orderMultipleReport: {
    cardLast4: '1111',
    reports: [
      {
        location: '1004 North White Oak Road White Oak Texas 75693',
        city: 'White Oak',
        reportType: 'COMPREHENSIVE',
        deliveryType: 'Normal'
      },
      {
        location: '5342 N Nevada Ave, Colorado Springs, CO 80918, USA',
        city: 'Colorado',
        reportType: 'STANDARD',
        deliveryType: 'Rush'
      }
    ]
  },
  changeOrder:
  {
    orderId: '149242',
    reportType: "comprehensive",
    quantity: '1',
    deliveryType: false,
    paymentMethod: 'Credit Card',//Package Credit
    cardLast4: '1111'
  },

  orderStatus:
  {
    OrdersReceived: 'Orders Received',
    PendingNeedInfo: 'Pending Need Info',
    InQueue: 'In Queue',
    Assigned: 'Assigned',
    InProduction: 'In Production',
    QualityControl: 'Quality Control',
    Delivered: 'Delivered',
    Refunded: 'Refunded'
  }
};

module.exports = testData;
