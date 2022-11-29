// Main process
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['com.yinrui.reminder.pay.version1']
var isVip = true;
var isCheck = false;
var isMac = process.platform == 'darwin';
if (!isMac) {
  isVip = true;
}
export function getIsVip() {
  return isVip;
}
export function restorePay() {
//   inAppPurchase.restoreCompletedTransactions();
}
export function goPay() {
//   inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
//     // Check the parameters.
//     if (!Array.isArray(products) || products.length <= 0) {
//       console.log('Unable to retrieve the product informations.')
//       return
//     }
//     // Display the name and price of each product.
//     products.forEach(product => {
//       console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
//     })
//     // Ask the user which product he/she wants to purchase.
//     const selectedProduct = products[0]
//     const selectedQuantity = 1
//     inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
//       if (!isProductValid) {
//         console.log('The product is not valid.')
//         return
//       }
//       console.log('The payment has been added to the payment queue.')
//     })
//   })
}
// if(isMac){
//   setTimeout(() => {
//     if (!isCheck) {
//       inAppPurchase.restoreCompletedTransactions();
//     }
//   }, 30 * 1000);


//   // Listen for transactions as soon as possible.
//   inAppPurchase.on('transactions-updated', (event, transactions) => {
//     const yearSec = 3600 * 1000 * 24 * 365;
//     isCheck = true;
//     if (!Array.isArray(transactions)) {
//       return
//     }
//     // Check each transaction.
//     transactions.forEach((transaction) => {
//       const payment = transaction.payment;
//       switch (transaction.transactionState) {
//         case 'purchasing': {
//           console.log(`Purchasing ${payment.productIdentifier}...`)
//           break
//         }
//         case 'purchased': {
//           const date = transaction.transactionDate;
//           // 2022-05-01T11:52:21+08:00
//           isVip = true;
//           console.log(`The purchase of ${payment.productIdentifier} has been purchased.`)
//           // Get the receipt url.
//           const receiptURL = inAppPurchase.getReceiptURL()
//           console.log(`Receipt URL: ${receiptURL}`)
//           // Submit the receipt file to the server and check if it is valid.
//           // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
//           // ...
//           // If the receipt is valid, the product is purchased
//           // ...
//           // Finish the transaction.
//           inAppPurchase.finishTransactionByDate(transaction.transactionDate)
//           break
//         }

//         case 'failed': {
//           console.log(`Failed to purchase ${payment.productIdentifier}.`)
//           // Finish the transaction.
//           inAppPurchase.finishTransactionByDate(transaction.transactionDate)
//           break
//         }
//         case 'restored': {
//           isVip = true;
//           console.log(`The purchase of ${payment.productIdentifier} has been restored.`)
//           break
//         }
//         case 'deferred': {
//           console.log(`The purchase of ${payment.productIdentifier} has been deferred.`)
//           break
//         }
//         default:
//           break
//       }
//     })
//   })

//   // Check if the user is allowed to make in-app purchase.
//   if (!inAppPurchase.canMakePayments()) {
//     console.log('The user is not allowed to make in-app purchase.')
//   }
// }
// Retrieve and display the product descriptions.
// inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
//   console.log(products);
//   // Check the parameters.
//   if (!Array.isArray(products) || products.length <= 0) {
//     console.log('Unable to retrieve the product informations.')
//     return
//   }

//   // Display the name and price of each product.
//   products.forEach(product => {
//     console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
//   })

//   // Ask the user which product he/she wants to purchase.
//   const selectedProduct = products[0]
//   const selectedQuantity = 1

//   // Purchase the selected product.
//   // inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
//   //   if (!isProductValid) {
//   //     console.log('The product is not valid.')
//   //     return
//   //   }

//   //   console.log('The payment has been added to the payment queue.')
//   // })
// })