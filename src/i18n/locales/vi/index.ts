export const vi = {
  landingPage: {
    sidebar: {
      home: 'Trang chủ',
      service: 'Tính năng',
      about: 'Về chúng tôi',
      docs: 'Tài liệu',
    },
    navbar: {
      signIn: 'Đăng nhập',
      register: 'Đăng ký',
      home: 'Trang chủ',
      service: 'Tính năng',
      about: 'Về chúng tôi',
      docs: 'Tài liệu',
    },
    body: {
      intro: {
        brand: 'MONEY MASTER',
        title: 'Công cụ quản lý đầu tư và tài chính cá nhân.',
        desc: 'Mang đến công cụ hữu ích giúp theo dõi các khoản đầu tư, quản lý tài sản cá nhân, và xây dựng mục tiêu tài chính.',
        findOutMore: 'Tìm hiểu thêm',
      },
      service: {
        title: 'Tính năng',
        desc: 'Money Master cung cấp nhiều dịch vụ giúp quản lý các khoản đầu tư, theo sát thông tin thị trường, và lên kế hoạch tài chính cá nhân.',
        feature: [
          {
            title: 'Quản lý kênh đầu tư',
            desc: 'Dễ dàng theo dõi các khoản đầu tư cá nhân, với đa dạng loại tài sản như tiền kỹ thuật số, chứng khoán, và tiền tệ.',
          },
          {
            title: 'Theo dõi thị trường ',
            desc: 'Nhanh chóng cập nhật thông tin thị trường, theo sát biến động thị trường với đa dạng các loại tài sản.',
          },
          {
            title: 'Xây dựng mục tiêu tài chính',
            desc: 'Thuận tiện quản lý, lên kế hoạch tài chính, lộ trình đạt mục tiêu, thống kê trực quan trên nhiều biểu đồ.',
          },
        ],
      },
    },
    aboutUs: {},

    footer: {
      service: {
        title: 'Giới thiệu',
        home: 'Trang chủ',
        service: 'Tính năng',
        about: 'Về chúng tôi',
        docs: 'Tài liệu',
      },
      ourAddress: {
        title: 'Địa chỉ liên hệ',
        address:
          '235, Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh',
        email: 'Email',
        phone: 'Số điện thoại',
      },
    },
  },
  signInPage: {
    signIn: 'Đăng nhập',
    email: 'Email',
    password: 'Mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    or: 'hoặc',
    facebookSignIn: 'Đăng nhập bằng facebook',
    googleSignIn: 'Đăng nhập bằng google',
    noAccount: 'Không có tài khoản?',
    register: 'Đăng ký ngay.',
    error: {
      invalidEmail: 'Email không hợp lê',
      passwordRequired: 'Vui lòng nhập mật khẩu',
      emailRequired: 'Vui lòng nhập email',
      passwordMin: 'Mật khẩu phải có ít nhất 8 ký tự',
    },
  },
  registerPage: {
    signUp: 'Đăng ký',
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    or: 'hoặc',
    facebookSignUp: 'Đăng ký bằng facebook',
    googleSignUp: 'Đăng ký bằng google',
    register: 'Đăng ký',
    error: {
      invalidEmail: 'Email không hợp lê',
      passwordRequired: 'Vui lòng nhập password',
      passwordMin: 'Mật khẩu phải có ít nhất 8 ký tự',
      confirmPasswordRequired: 'Vui lòng nhập mật khẩu xác nhận',
      confirmPasswordNotMatch: 'Mật khẩu xác nhận không khớp',
      emailRequired: 'Vui lòng nhập email',
    },
  },
  mainSidebar: {
    dashboard: 'Trang chính',
    portfolio: 'Danh mục đầu tư',
    report: 'Báo cáo',
    plan: 'Kế hoạch',
    profile: 'Tài khoản',
    setting: 'Cài đặt',
  },
  dashboardPage: {
    title: 'Trang chính',
  },
  portfolioPage: {
    title: 'Danh mục đầu tư',
    interestBearingAssets: 'Tài sải sinh lãi',
    noneInterestBearningAssets: 'Tài sản biến động',
    realEstate: 'Bất động sản',
    cash: 'Tiền tệ',
  },
  planPage: {
    title: 'Kế hoạch',
    progress: 'Tiến độ',
  },
  reportPage: {
    title: 'Thống kê',
  },
  profilePage: {
    title: 'Thông tin tài khoản',
    uploadPicture: 'Tải ảnh lên',
    editProfile: {
      header: {
        title: 'Thông tin của bạn',
        content: 'Chỉnh sửa thông tin tài khoản.',
      },
      body: {
        firstName: 'Họ và tên lót',
        lastName: 'Tên',
        emailAddress: 'Địa chỉ email',
        phoneNumber: 'Số điện thoại',
        country: 'Quốc gia',
      },
      footer: {
        saveDetails: 'Luư thay đổi',
      },
    },
  },
  portfolioDetailPage: {
    title: 'Danh mục tài sản',
    header: 'Tổng quan',
    assetAllocation: {
      title: 'Phân bổ tài sản',
      crypto: 'Tiền kỹ thuật số',
      stock: 'Cổ phiếu',
      cash: 'Tiền mặt',
      bankSaving: 'Tiền gửi ngân hàng',
      realEstate: 'Bất động sản',
      customAsset: 'Tài sản khác',
    },
    cryptoTable: {
      title: 'Tiền kỹ thuật số',
      collumnsName: {
        symbol: 'MÃ',
        currentPrice: 'GIÁ HIỆN TẠI',
        todayChange: `THAY ĐỔI TRONG NGÀY`,
        totalPL: 'TỔNG LỜI/LỖ',
        shares: 'SỐ LƯỢNG',
        total: 'TỔNG CỘNG',
      },
      settingDropDownMenu: {
        moveToPortfolio: 'Di chuyển đến danh mục',
        delete: 'Xóa tài sản',
      },
    },
    stockTable: {
      title: 'Cổ phiếu',
      collumnsName: {
        symbol: 'MÃ',
        currentPrice: 'GIÁ HIỆN TẠI',
        todayChange: `THAY ĐỔI TRONG NGÀY`,
        totalPL: 'TỔNG LỜI/LỖ',
        shares: 'SỐ LƯỢNG',
        total: 'TỔNG CỘNG',
      },
      settingDropDownMenu: {
        moveToPortfolio: 'Di chuyển đến danh mục',
        delete: 'Xóa tài sản',
      },
    },
    bankSavingsTable: {
      title: 'Tiền gửi ngân hàng',
      collumnsName: {
        name: 'TÊN',
        deposit: 'TIỀN GỬI',
        interestRate: `LÃI SUẤT`,
        termRange: 'KỲ HẠN',
        description: 'MÔ TẢ',
      },
      settingDropDownMenu: {
        moveToPortfolio: 'Di chuyển đến danh mục',
        delete: 'Xóa tài sản',
      },
    },
    cashTable: {
      title: 'Tiền tệ',
      collumnsName: {
        currency: 'MÃ',
        total: 'TỔNG ',
      },
      settingDropDownMenu: {
        moveToPortfolio: 'Di chuyển đến danh mục',
        delete: 'Xóa tài sản',
      },
    },
    realEstateTable: {
      title: 'Bất động sản',
      collumnsName: {
        name: 'TÊN',
        buyPrice: 'GIÁ MUA',
        currentPrice: 'GIÁ HIỆN TẠI',
        description: 'MÔ TẢ',
      },
      settingDropDownMenu: {
        moveToPortfolio: 'Di chuyển đến danh mục',
        delete: 'Xóa tài sản',
      },
    },
    addNewAssets: {
      buttonTooltip: 'Thêm tài sản',
      chooseType: {
        title: 'Chọn loại',
        cryptoCurrency: 'Tiền kỹ thuật số',
        stock: 'Cổ phiếu',
        realEstate: 'Bất động sản',
        cash: 'Tiền tệ',
        bankSavings: 'Tiền gửi ngân hàng',
        others: 'Khác+',
      },
      searchAssets: {
        title: 'Tìm kiếm',
        searchYourAsset: 'Tìm kiếm tài sản',
      },
      bankSavingsTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        inputMoney: 'Số tiền gửi',
        interestRate: 'Lãi suất',
        termRange: 'Kỳ hạn',
        months: 'tháng',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        bankCode: 'Mã ngân hàng',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },

      otherCustomAssetTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        assetType: 'Loại tài sản',
        inputMoney: 'Số tiền gửi',
        interestRate: 'Lãi suất',
        termRange: 'Kỳ hạn',
        months: 'tháng',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },
      cashTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        amount: 'Số lượng',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },
      realEstateTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        purchasePrice: 'Giá mua',
        currentPrice: 'Giá hiện tại',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },
      cryptoTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        purchasePrice: 'Giá mua',
        amount: 'Số lượng',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },
      stockTransaction: {
        title: 'Thêm tài sản',
        name: 'Tên',
        purchasePrice: 'Giá mua',
        shares: 'Số lượng',
        currency: 'Tiền tệ',
        inputDay: 'Ngày nhập',
        description: 'Mô tả',
        addNew: 'Thêm mới',
      },
    },
  },
  settingsPage: {
    title: 'Cài đặt',
  },
  _404Page: {
    title: '404',
    content: 'Trang của bạn không tồn tại.',
    subContent:
      'Oops, có vẻ trang bạn đang tìm không có sẵn, vui lòng quay lại sau.',
    goBack: 'Quay lại trang trước đó',
  },
  success: {
    edit: 'Chỉnh sửa thành công',
    update: 'Cập nhật thành công',
    delete: 'Xóa thành công',
    create: 'Tạo mới thành công',
    add: 'Thêm mới thành công',
    default: 'Đã hoàn thành',
  },
  error: {
    failedToLoadInitialData: 'Lỗi! Không tải được dữ liệu',
    methodNotAllowed: 'Lỗi! Truy cập không tồn tại.',
    badRequest: 'Lỗi! Không tìm thấy nội dung.',
    unauthorizedUser: 'Lỗi! Bạn không thể truy cập tài nguyên này.',
    internalServerError: 'Lỗi hệ thống. Vui lòng quay lại sau.',
    credentialFailed: 'Lỗi! Email/ mật khẩu không hợp lệ',
    alreadyEmailExist: 'Lỗi! Email đã được đăng ký',
    default: 'Lỗi! Thất bại.',
  },
  portfolioListPage: {
    title: 'Danh mục tài sản',
    add: 'Thêm danh mục',
    portfolioCard: {
      detail: 'Chi tiết',
      update: 'Cập nhật',
      delete: 'Xóa',
    },
    newPortfolioModal: {
      title: 'THÊM DANH MỤC TÀI SẢN',
      name: 'Tên danh mục tài sản (*)',
      currency: 'Đơn vị tiền tệ (*)',
      submit: 'Thêm',
    },
    updatePortfolioModal: {
      title: 'CẬP NHẬT DANH MỤC TÀI SẢN',
      name: 'Tên danh mục tài sản (*)',
      currency: 'Đơn vị tiền tệ (*)',
      submit: 'Cập nhật',
    },
    deletePortfolioModal: {
      title: 'XÓA DANH MỤC TÀI SẢN',
      message: 'Bạn có chắc chắn rằng muốn xóa danh mục tài sản này không?',
      confirm: 'Xóa',
      cancel: 'Trở lại',
    },
  },
};
