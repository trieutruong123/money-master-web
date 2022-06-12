export const en = {
  landingPage: {
    sidebar: {
      home: "HOME",
      service: "SERVICES",
      about: "ABOUT US",
      docs: "DOCS",
    },
    navbar: {
      signIn: "SIGN IN",
      register: "REGISTER",
      home: "HOME",
      service: "SERVICES",
      about: "ABOUT US",
      docs: "DOCS",
    },
    body: {
      intro: {
        brand: "MONEY MASTER",
        title: "Manage your investments and finances",
        desc: "Bring you the best tool to monitor investment channels, manage assets, and plan for own finances.",
        findOutMore: "Find out how",
      },
      service: {
        title: "OUR SERVICES",
        desc: "Money Master provides service help you observe investment channels, monitor the market for specific assets, and plan for own finances.",
        feature: [
          {
            title: "Observe investment channels",
            desc: "Easiy manage personal investment channels, such as crypto currenies, stocks, and cash.",
          },
          {
            title: "Track market price",
            desc: "Quickly track the market value of many assets, update information.",
          },
          {
            title: "Plan for own finances",
            desc: "Conviniently plan personal investment, progress to achieve goal, and visual insights.",
          },
        ],
      },
    },
    aboutUs: {},

    footer: {
      service: {
        title: "Intro",
        home: "HOME",
        service: "SERVICES",
        about: "ABOUT US",
        docs: "DOCS",
      },
      ourAddress: {
        title: "OUR ADDRESS",
        address:
          "235 Nguyen Van Cu Street, Ward 4, District 5, Ho Chi Minh City",
        email: "Email",
        phone: "Phone number",
      },
    },
  },
  signInPage: {
    signIn: "SIGN IN",
    email: "Email",
    password: "Passwrod",
    forgotPassword: "Forgot password?",
    or: "or",
    facebookSignIn: "Sign in with Facebook",
    googleSignIn: "Sign in with Google",
    noAccount: "Don't have an account?",
    register: "Register.",
    error: {
      invalidEmail: "Email is invalid",
      passwordRequired: "Password is required",
      emailRequired: "Email is required",
      passwordMin: "Password must be at least 8 characters",
    },
  },
  registerPage: {
    signUp: "SIGN UP",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    or: "or",
    facebookSignUp: "Sign up with Facebook",
    googleSignUp: "Sign up with Google",
    register: "Đăng ký",
    error: {
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 8 characters",
      confirmPasswordRequired: "Confirm password is required",
      confirmPasswordNotMatch: "Confirm password must match",
      emailRequired: "Email is required",
      invalidEmail: "Email is invalid",
    },
  },
  mainSidebar: {
    dashboard: "DASHBOARD",
    portfolio: "PORTFOLIO",
    profile: "PROFILE",
    setting: "SETTINGS",
  },
  accountDropdown: {
    logout: "Logout",
    settings: "Settings",
  },
  dashboardPage: {
    title: "Dashboard",
  },
  profilePage: {
    title: "Profile",
    uploadAvatar: {
      uploadAvatar: "UPLOAD AVATAR",
    },
    editProfile: {
      title: "Your profile",
      content: "Edit your information.",
      email: "Email",
      firstName: "First name",
      lastName: "Last name",
      gender: "Gender",
      male: "Male",
      female: "Female",
      birthday: "Birthday",
      phoneNumber: "Phone number",
      country: "Country",
      saveDetails: "SAVE",
    },
  },
  portfolioDetailPage: {
    title: "PORTFOLIO DETAIL",
    header: "Overview",
    breadCrumbs: {
      holding: "Holdings",
      investFund: "Invest fund",
      settings: "Settings",
      report: "Report",
    },
    assetAllocation: {
      title: "Asset Allocation",
      crypto: "Crypto Currency",
      stock: "Stock",
      cash: "Cash",
      bankSaving: "Bank Saving",
      realEstate: "Real Estate",
      customAsset: "Others",
    },
    sankeyChart: {
      title: "Sankey chart",
    },
    settings: {
      editPortfolioInfo: "Edit portfolio info",
      portfolioName: "Portfolio name",
      currency: "Currency",
      portfolio: "Portfolio",
    },
    cryptoTable: {
      title: "Crypto Currency",
      collumnsName: {
        symbol: "Symbol",
        currentPrice: "Current price",
        amount: "Amount",
        total: "Total",
      },
      settingDropDownMenu: {
        transferToInvestFund: "Transfer to invest fund",
        delete: "Delete",
      },
    },
    stockTable: {
      title: "Stock",
      collumnsName: {
        symbol: "Symbol",
        currentPrice: "Current price",
        shares: "Shares",
        total: "Total",
      },
      settingDropDownMenu: {
        transferToInvestFund: "Transfer to invest fund",
        delete: "Delete",
      },
    },
    bankSavingsTable: {
      title: "Bank Saving",
      collumnsName: {
        name: "Name",
        deposit: "Deposit",
        interestRate: `Interest rate`,
        termRange: "Term range",
        description: "Description",
      },
      settingDropDownMenu: {
        transferToInvestFund: "Transfer to invest fund",
        delete: "Delete",
      },
    },
    cashTable: {
      title: "Cash",
      collumnsName: {
        currency: "Currency",
        total: "Total",
        description: "Description",
      },
      settingDropDownMenu: {
        transferToInvestFund: "Transfer to invest fund",
        delete: "Delete",
      },
    },
    realEstateTable: {
      title: "Real Estate",
      collumnsName: {
        name: "Name",
        buyPrice: "Buy price",
        currentPrice: "Current price",
        description: "Description",
      },
      settingDropDownMenu: {
        moveToPortfolio: "Move to portfolio",
        transferToInvestFund: "Transfer to invest fund",
        delete: "Delete",
      },
    },
    addNewAssets: {
      buttonTooltip: "Add new asset",
      chooseType: {
        title: "Choose Type",
        cryptoCurrency: "Crypto Currency",
        stock: "Stock",
        realEstate: "Real Estate",
        cash: "Cash",
        bankSavings: "Bank Savings",
        others: "Others+",
      },
      searchAssets: {
        title: "Search Assets",
        searchYourAsset: "Search your asset",
        addNewAssetType: "Add new asset type",
        assetType: "Asset type",
      },
      usingMoneySource: {
        usingFund: "Invest fund",
        usingCash: "Cash",
        usingOutside: "Outside",
        title: "Select money source",
      },
      bankSavingsTransaction: {
        title: "Add new asset",
        name: "Name",
        inputMoney: "Input money",
        interestRate: "Interest rate",
        termRange: "Term range",
        months: "months",
        currency: "Currency",
        inputDay: "Input day",
        bankCode: "Bank code",
        description: "Description",
        fee: "Fee",
        tax: "Tax",
        addMore: "ADD",
        addNew: "ADD",
      },
      otherCustomAssetTransaction: {
        title: "Add new asset",
        name: "Name",
        assetType: "Asset type",
        inputMoney: "Input money",
        interestRate: "Interest rate",
        termRange: "Term range",
        months: "months",
        currency: "Currency",
        inputDay: "Input day",
        fee: "Fee",
        tax: "Tax",
        selectCashSource: "Select cash source",
        description: "Description",
        addMore: "ADD",
        addNew: "ADD",
      },
      cashTransaction: {
        title: "Add New Asset",
        name: "Name",
        amount: "Amount",
        currency: "Currency",
        inputDay: "Input day",
        selectCashSource: "Select cash source",
        description: "Description",
        fee: "Fee",
        tax: "Tax",
        addMore: "ADD",
        addNew: "ADD",
      },
      realEstateTransaction: {
        title: "Add New Asset",
        name: "Name",
        purchasePrice: "Purchase price",
        currentPrice: "Current price",
        currency: "Currency",
        inputDay: "Input day",
        selectCashSource: "Select cash source",
        fee: "Fee",
        tax: "Tax",
        description: "Description",
        addMore: "ADD",
        addNew: "ADD",
      },
      cryptoTransaction: {
        title: "Add new asset",
        name: "Name",
        purchasePrice: "Purchase price",
        amount: "Amount",
        currency: "Currency",
        inputDay: "Input day",
        description: "Description",
        fee: "Fee",
        tax: "Tax",
        selectCashSource: "Select cash source",
        addMore: "ADD",
        addNew: "ADD",
      },
      stockTransaction: {
        title: "Add New Asset",
        name: "Name",
        amount: "Amount",
        purchasePrice: "Purchase Price",
        shares: "Shares",
        currency: "Currency",
        inputDay: "Input day",
        description: "Description",
        selectCashSource: "Select cash source",
        fee: "Fee",
        tax: "Tax",
        addMore: "ADD",
        addNew: "ADD",
      },
    },
  },
  stockDetailPage: {
    title: "Stock",
    addNewTransaction: "Add new transaction",
    overview: "Overview",
    marketData: "Market data",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      amount: "Amount",
      purchasePrice: "Purchase price",
      sellPrice: "Sell price",
      currency: "Currency",
      destinationCash: "Detination cash",
      useMoneyFrom: "Use money from",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      addButton: "ADD",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      open: "Open",
      avgPrice: "avg. price",
      currency: "Currency",
    },
    marketDataTab: {
      area: "Area",
      candleStick: "Candle",
      startDate: "Start date",
      endDate: "End date",
      open: "Open",
      close: "Close",
      high: "High",
      low: "Low",
      dailyChange: "Daily change",
    },
  },
  cryptoDetailPage: {
    title: "Crypto",
    addNewTransaction: "Add new transaction",
    overview: "Overview",
    marketData: "Market data",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      amount: "Amount",
      purchasePrice: "Purchase price",
      sellPrice: "Sell price",
      currency: "Currency",
      destinationCash: "Detination cash",
      useMoneyFrom: "Use money from",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      addButton: "ADD",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      open: "Open",
      avgPrice: "avg. price",
      currency: "Currency",
    },
    marketDataTab: {
      timeRange: "Time range",
      interval: "Interval",
      area: "Area",
      candleStick: "Candle",
      startDate: "Start date",
      endDate: "End date",
      open: "Open",
      close: "Close",
      high: "High",
      low: "Low",
      dailyChange: "Daily change",
    },
  },
  bankSavingDetailPage: {
    title: "Bank savings",
    addNewTransaction: "Add new transaction",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      allMoneyFromAssetWillBeSold: "All money from asset will be sold",
      amount: "Amount",
      currency: "Currency",
      destinationCash: "Detination cash",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      interestRate: "Interest rate",
      termRange: "Term range",
      description: "Description",
    },
  },
  realEstateDetailPage: {
    title: "Real estate",
    addNewTransaction: "Add new transaction",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      allMoneyFromAssetWillBeSold: "All money from asset will be sold",
      amount: "Amount",
      currency: "Currency",
      destinationCash: "Detination cash",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      inputCurrency: "Input currency",
      description: "Description",
    },
  },
  customAssetDetailPage: {
    title: "Others",
    addNewTransaction: "Add new transaction",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      allMoneyFromAssetWillBeSold: "All money from asset will be sold",
      amount: "Amount",
      currency: "Currency",
      destinationCash: "Detination cash",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      inputCurrency: "Input currency",
      description: "Description",
    },
  },
  cashDetailPage: {
    title: "Cash",
    addNewTransaction: "Add new transaction",
    overview: "Overview",
    marketData: "Market data",
    transactionForm: {
      title: "Transaction",
      transaction: "Transaction",
      sell: "Sell",
      withdraw: "Withdraw",
      transfer: "Transfer",
      allMoneyFromAssetWillBeTransferred:
        "All money from asset will be transferred",
      allMoneyFromAssetWillBeWithdrawn:
        "All money from asset will be withdrawn",
      amount: "Amount",
      currency: "Currency",
      destinationCash: "Detination cash",
      useMoneyFrom: "Use money from",
      fee: "Fee",
      tax: "tax",
      sellButton: "SELL",
      addButton: "ADD",
      withdrawButton: "WITHDRAW",
      moveToFund: "MOVE TO FUND",
    },
    transactionHistory: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      fromTo: "From/To",
      buy: "Buy",
      sell: "Sell",
      move: "Move",
      transfer: "Transfer",
      withdraw: "Withdraw",
      outside: "Outside",
    },
    introSection: {
      name: "Name",
      inputCurrency: "Input currency",
      currency: "Currency",
      description: "Description",
    },
    marketDataTab: {
      timeRange: "Time range",
      interval: "Interval",
      area: "Area",
      candleStick: "Candle",
      source: "Source",
      amount: "Amount",
      target: "Target",
      exchangeRate: "Exchange rate",
      dailyChange: "Daily change",
      open: "Open",
      close: "Close",
      high: "High",
      low: "Low",
    },
  },
  settingsPage: {
    title: "SETTINGS",
  },
  _404Page: {
    title: "404",
    content: "The page you are looking for isn’t here.",
    subContent:
      "Oops, it seems like your page unavailable now, come back later.",
    goBack: "Go back previous page",
  },
  success: {
    edit: "Edit successfullly",
    update: "Update successfully",
    delete: "Delete successfully",
    create: "Create successfully",
    add: "Add successfully",
    transfer: "Transfer successfully",
    editItem: "Edit item successfullly",
    updateItem: "Update item successfully",
    deleteItem: "Delete item successfully",
    createItem: "Create item successfully",
    addNewItem: "Add new item successfully",
    addMore: "Add successfully",
    transferItem: "Transfer item successfully",
    default: "Done",
  },

  error: {
    failedToLoadInitialData: "Error! Failed to load data",
    methodNotAllowed: "Error! Method now allowed.",
    badRequest: "Error! Bad request.",
    unauthorizedUser:
      "Error! You dont have perrmission to access this resources.",
    internalServerError: "Error! Please come back later",
    credentialFailed: "Invalid email/ password",
    alreadyEmailExist: "Already email exist",
    default: "Error! Failed",
    error: "Error! Failed",
  },
  portfolioListPage: {
    title: "Portfolio",
    add: "Create",
    portfolioCard: {
      detail: "Detail",
      update: "Update",
      delete: "Delete",
    },
    newPortfolioModal: {
      title: "NEW PORTFOLIO",
      name: "Portfolio Name (*)",
      currency: "Currency (*)",
      submit: "Create",
    },
    updatePortfolioModal: {
      title: "UPDATE PORTFOLIO",
      name: "Portfolio Name (*)",
      currency: "Currency (*)",
      submit: "Update",
    },
    deletePortfolioModal: {
      title: "DELETE PORTFOLIO",
      message: "Please confirm that you surely want to delete this portfolio?",
      confirm: "Delete",
      cancel: "Cancel",
    },
  },
};
