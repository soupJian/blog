---
title: shopify hydrogen 自定义结账
date: 2023-05-05 17:00:00
categories:
 - shopify
tags:
 - shopify
---

:::tip
[shopify](https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/checkout/create#step-2-create-the-checkout)
[stripe createToken](https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement)
[stripe createPaymentMethod](https://stripe.com/docs/js/payment_methods/create_payment_method)
:::

## 业务流程
1. 根据购物车 利用 mutation 创建 一个 checkout

2. 利用 stripe的 `createToken` 或者 `createPaymentMethod` 信息 获取到 信用卡的 vaultId

3. 利用 shopify hydrogen 的 `checkoutCompleteWithTokenizedPaymentV3` 实现结账

## 根节点配置

由于需要在客户端实现 graphql 的 mutation

在根节点配置如下

```js
import {ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://${PUBLIC_STORE_DOMAIN}/api/graphql`,
  headers: {
    'X-Shopify-Storefront-Access-Token': PUBLIC_STOREFRONT_API_TOKEN,
  },
});

<ApolloProvider client={client}>
  <Layout cart={data.cart}>
    <Outlet />
  </Layout>
</ApolloProvider>
```

## checkout 界面

```jsx
import {useEffect, useState} from 'react';
import {useMatches} from '@remix-run/react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripePayment from '~/components/payment/stripe';
import CustomerCheckout from '~/components/payment/shopify-payments';
const stripePromise = loadStripe(
  'pk_test_51N3w8AAPhoBb4O2ovltdbnrYB2BRjnNAuUHlMg6Uytrovxi0u84ANZLADCfpUI7ALDdyc6MQVGpDvBvqxTtk7npe00gtWKY5eg',
);

function Checkout() {
  const [vaultId, setVaultId] = useState(null);
  const [root] = useMatches();
  const [cartLines, setCartLines] = useState(root.data.cart || []);
  useEffect(() => {
    const list = root.data?.cart?.lines;
    if (list) {
      const arr = list.edges
        .map((i) => i.node)
        .map((item) => {
          return {
            variantId: item.merchandise.id,
            quantity: item.quantity,
          };
        });
      console.log(arr);
      setCartLines(arr);
    }
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <StripePayment setVaultId={setVaultId} />
      </Elements>
      <div>vaultId: {vaultId}</div>
      <CustomerCheckout vaultId={vaultId} cartLines={cartLines} />
    </>
  );
}

export default Checkout;

```
在此处，我们获取到购物车的信息后，处理一下传递给 CustomerCheckout 中，为创建 checkout 做准备

导入了 stripe 配置相关信息 

## StripePayment 代码如下

```jsx
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({setVaultId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleChangeCardNumber = (value) => {
    console.log(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    if (!stripe || !elements) {
      return;
    }
    // 法一
    // const {paymentMethod, error} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardNumberElement),
    // });

    // if (error) {
    //   console.error(error);
    //   return;
    // }
    // console.log(paymentMethod);
    // setVaultId(paymentMethod.id);
    // 法二
    const {token, error} = await stripe.createToken(
      elements.getElement(CardNumberElement),
    );
    if (error) {
      console.log('[createToken error]', error);
    } else {
      console.log('[createToken success]', token);
      setVaultId(token.card.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{margin: '100px'}}>
      <label>
        Card number
        <CardNumberElement onChange={handleChangeCardNumber} />
      </label>
      <label>
        Expiration date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCvcElement />
      </label>
      <button type="submit" disabled={!stripe}>
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;

```
我们在此处单独导入 `CardNumberElement`、`CardExpiryElement`、`CardCvcElement` 是为了更好的控制样式，也可以直接导入一个 `CardElement`

填写完信息后，我们可以 利用 stripe 的 api 来获取 `vaultId` 信息，注意偶两种方法实现

## checkout 界面

1. 创建一个 checkout
2. 结合 vaultId 来实现  checkoutCompleteWithTokenizedPaymentV3 结账

```jsx

import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {
  CHECKOUT_CREATE_MUTATION,
  CHECKOUT_COMPLETE_WITH_TOKENIZEDpYAMENTV3,
} from '~/graphql/checkout';

const ShopifyPayments = ({cartLines, vaultId}) => {
  const [checkout, setCheckout] = useState(null);
  const [checkoutCreate] = useMutation(CHECKOUT_CREATE_MUTATION, {
    variables: {
      input: {
        lineItems: cartLines,
      },
    },
  });
  const [checkoutCompleted] = useMutation(
    CHECKOUT_COMPLETE_WITH_TOKENIZEDpYAMENTV3,
  );
  // 创建 checkout
  const handleCreateCheckout = async () => {
    try {
      const {data} = await checkoutCreate();
      console.log(data);
      setCheckout(data.checkoutCreate.checkout);
    } catch (e) {
      console.error(e);
    }
  };
  // 结账
  const customerCheckout = async () => {
    const input = {
      checkoutId: checkout.id,
      payment: {
        paymentData: JSON.stringify({
          token: vaultId,
        }),
        idempotencyKey: 'unique-idempotency-key',
        paymentAmount: {
          amount: '88.71',
          currencyCode: 'USD',
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address1: '123 Main St',
          city: 'Anytown',
          province: 'CA',
          country: 'US',
          zip: '12345',
        },
        type: 'STRIPE_VAULT_TOKEN',
      },
    };
    const res = await checkoutCompleted({
      variables: {...input},
    });
    console.log(res);
  };
  return (
    <div style={{marginTop: '20px'}}>
      <button onClick={handleCreateCheckout}>创建一个checkout</button>
      {checkout && (
        <>
          <p>Checkout ID: {checkout.id}</p>
          <p style={{marginTop: '16px'}}>Checkout webUrl: {checkout.webUrl}</p>
        </>
      )}
      <br />
      <br />
      <div>
        <button onClick={customerCheckout}>点击结账</button>
      </div>
    </div>
  );
};

export default ShopifyPayments;

```

由于在上面我们已经配置了 `ApolloProvider`，则此时我们可以用 `useMutation` 这个 hooks 来实现 客户端的 mutation 相关操作

我们先定义两个 graphql 的 mutation
```js
// eslint-disable-next-line hydrogen/prefer-gql
import {gql} from '@apollo/client';

export const CHECKOUT_CREATE_MUTATION = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
export const CHECKOUT_COMPLETED_WITH_CARD = gql`
  mutation checkoutCompleteWithCreditCardV2(
    $checkoutId: ID!
    $payment: CreditCardPaymentInputV2!
  ) {
    checkoutCompleteWithCreditCardV2(
      checkoutId: $checkoutId
      payment: $payment
    ) {
      checkout {
        id
        webUrl
        completedAt
      }
      payment {
        amountV2 {
          amount
          currencyCode
        }
        errorMessage
      }
    }
  }
`;
export const CHECKOUT_COMPLETE_WITH_TOKENIZEDpYAMENTV3 = gql`
  mutation checkoutCompleteWithTokenizedPaymentV3(
    $checkoutId: ID!
    $payment: TokenizedPaymentInputV3!
  ) {
    checkoutCompleteWithTokenizedPaymentV3(
      checkoutId: $checkoutId
      payment: $payment
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id
      }
    }
  }
`;

```

在页面中引用他们
```js
  const [checkoutCreate] = useMutation(CHECKOUT_CREATE_MUTATION, {
    variables: {
      input: {
        lineItems: cartLines,
      },
    },
  });

  // 则可以直接使用 checkoutCreate() 来获取 graphql的操作返回结果
    // 创建 checkout
  const handleCreateCheckout = async () => {
    try {
      const {data} = await checkoutCreate();
      console.log(data);
      setCheckout(data.checkoutCreate.checkout);
    } catch (e) {
      console.error(e);
    }
  };
```

**完整代码如下**

```jsx
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {
  CHECKOUT_CREATE_MUTATION,
  CHECKOUT_COMPLETE_WITH_TOKENIZEDpYAMENTV3,
} from '~/graphql/checkout';

const ShopifyPayments = ({cartLines, vaultId}) => {
  const [checkout, setCheckout] = useState(null);
  const [checkoutCreate] = useMutation(CHECKOUT_CREATE_MUTATION, {
    variables: {
      input: {
        lineItems: cartLines,
      },
    },
  });
  const [checkoutCompleted] = useMutation(
    CHECKOUT_COMPLETE_WITH_TOKENIZEDpYAMENTV3,
  );
  // 创建 checkout
  const handleCreateCheckout = async () => {
    try {
      const {data} = await checkoutCreate();
      console.log(data);
      setCheckout(data.checkoutCreate.checkout);
    } catch (e) {
      console.error(e);
    }
  };
  // 结账
  const customerCheckout = async () => {
    const input = {
      checkoutId: checkout.id,
      payment: {
        paymentData: JSON.stringify({
          token: vaultId,
        }),
        idempotencyKey: 'unique-idempotency-key',
        paymentAmount: {
          amount: '88.71',
          currencyCode: 'USD',
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address1: '123 Main St',
          city: 'Anytown',
          province: 'CA',
          country: 'US',
          zip: '12345',
        },
        type: 'STRIPE_VAULT_TOKEN',
      },
    };
    const res = await checkoutCompleted({
      variables: {...input},
    });
    console.log(res);
  };
  return (
    <div style={{marginTop: '20px'}}>
      <button onClick={handleCreateCheckout}>创建一个checkout</button>
      {checkout && (
        <>
          <p>Checkout ID: {checkout.id}</p>
          <p style={{marginTop: '16px'}}>Checkout webUrl: {checkout.webUrl}</p>
        </>
      )}
      <br />
      <br />
      <div>
        <button onClick={customerCheckout}>点击结账</button>
      </div>
    </div>
  );
};

export default ShopifyPayments;

```

