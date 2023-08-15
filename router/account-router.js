import accountEntry from '../src/views/account-entry'
import accountMain from '../src/components/account-components/account-main'
import userManage from '../src/components/account-components/account-main/user-manage'
import roleManage from '../src/components/account-components/account-main/role-manage'
import powerManage from '../src/components/account-components/account-main/power-manage'
import initPage from '../src/components/account-components/account-main/init-page'
import balanceBook from '../src/components/account-components/account-main/balance-book'
import detailBook from '../src/components/account-components/account-main/detail-book'
import cmImport from '../src/components/account-components/account-main/cm-import'
import cmManage from '../src/components/account-components/account-main/cm-manage'
import voucherImport from '../src/components/account-components/account-main/voucher-import'
import voucherManage from '../src/components/account-components/account-main/voucher-manage'
import systemManage from '../src/components/account-components/account-main/system-manage'
import orgAssist from '../src/components/account-components/account-main/assist-manage/org-assist.vue'
import bankAssist from '../src/components/account-components/account-main/assist-manage/bank-account-assist.vue'
import currencyAssist from '../src/components/account-components/account-main/assist-manage/currency-assist.vue'

export default {
  accountEntry: accountEntry,
  accountMain: accountMain,
  userManage: userManage,
  powerManage: powerManage,
  roleManage: roleManage,
  initPage: initPage,
  balanceBook: balanceBook,
  detailBook: detailBook,
  cmImport: cmImport,
  cmManage: cmManage,
  voucherImport: voucherImport,
  voucherManage: voucherManage,
  systemManage: systemManage,
  orgAssist: orgAssist,
  currencyAssist: currencyAssist,
  bankAssist: bankAssist
}
