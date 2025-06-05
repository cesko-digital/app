import {
  decodeSubscriber,
  decodeSubscription,
  type Subscriber,
  type Subscription,
} from "./ecomail";

test("Decode subscriber", () => {
  const payload = {
    name: null,
    surname: null,
    email: "zoul@cesko.digital",
    gender: null,
    vokativ: null,
    bounce_soft: 0,
    bounce_soft_count: 0,
    bounced_hard: 0,
    bounce_message: null,
    inserted_at: "0000-00-00 00:00:00",
    rating: 3,
    nameday: null,
    source: "api",
    company: null,
    street: null,
    city: null,
    country: null,
    zip: null,
    phone: null,
    pretitle: null,
    surtitle: null,
    birthday: null,
    notes: "",
    vokativ_s: null,
    tags: ["web-subscribe-form"],
    last_delivery: null,
    last_open: "2022-04-14 12:58:55",
    last_click: null,
    last_pageview: null,
    last_transaction_id: null,
    last_transaction: null,
    lists: {
      "2": {
        list_id: 2,
        email: "zoul@cesko.digital",
        status: 1,
        subscribed_at: "2021-12-16T14:33:40.000000Z",
        unsubscribed_at: null,
        c_fields: {
          AIRTABLE_ID: "",
        },
        groups: null,
        source: "api",
        unsub_reason: null,
        status_history: [],
        sms_status: 1,
        owner: {
          id: 2,
          name: "Newsletter >C.D",
          groups: [],
          active_subscribers: 0,
        },
      },
    },
  };
  expect(decodeSubscriber(payload)).toEqual<Subscriber>({
    name: null,
    surname: null,
    email: "zoul@cesko.digital",
    lists: [
      {
        listId: 2,
        state: "subscribed",
        groups: {},
      },
    ],
  });
});

test("Decode subscription", () => {
  const payload = {
    list_id: 2,
    email: "zoul@cesko.digital",
    status: 1,
    subscribed_at: "2021-12-16T14:33:40.000000Z",
    unsubscribed_at: null,
    c_fields: {
      AIRTABLE_ID: "",
    },
    groups: null,
    source: "api",
    unsub_reason: null,
    status_history: [],
    sms_status: 1,
    owner: {
      id: 2,
      name: "Newsletter >C.D",
      groups: [],
      active_subscribers: 0,
    },
  };
  expect(decodeSubscription(payload)).toEqual<Subscription>({
    listId: 2,
    state: "subscribed",
    groups: {},
  });
});
