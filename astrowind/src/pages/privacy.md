---
title: 'Privacy Policy'
layout: '~/layouts/MarkdownLayout.astro'
---

_Last updated: July 27, 2026_

This Privacy Policy explains how the Zentip browser extension, website, and support service handle information.

Zentip is operated from Cyprus by Neophytos Gregoriou under the name Zentip. For personal information handled directly for Zentip, Neophytos Gregoriou is the data controller. Privacy requests can be sent to [support@zentip.org](mailto:support@zentip.org).

## Summary

Zentip is designed to work without sending your Zendesk data to servers operated by the developer. The developer does not collect, transmit to their own servers, sell, or use for advertising your:

- Zendesk ticket or reply content
- Zendesk subdomain
- Browsing history
- Notification content

Zentip does not use developer-operated analytics or advertising trackers in the extension.

Subscription, payment, website-hosting, and contact-form information is handled with the third-party providers described below.

## Information processed by the extension

Zentip requires you to be signed in to Zendesk in your browser and asks for your Zendesk subdomain so it knows which account to monitor. It processes the information needed to find new tickets or replies and uses your browser's notification system to display operating-system notifications.

Depending on the views and tickets available to your Zendesk account, this can include:

- Your Zendesk subdomain and selected views
- Ticket IDs, subjects, statuses, dates, tags, brands, groups, and assignment information
- Requester, submitter, follower, CC, assignee, and comment-author names or identifiers
- Email addresses, profile images, and other user details returned by Zendesk when needed to identify ticket participants
- Ticket descriptions, comments, message excerpts, and attachment names, links, or previews
- Notification history, refresh timestamps, and extension preferences

Zentip does not request your Zendesk password or copy Zendesk session cookies into extension storage. Chrome attaches your existing signed-in session when Zentip makes an authorized request to your configured Zendesk account. Signing out of Zendesk or losing access also removes Zentip's ability to retrieve that data.

This Zendesk information is processed within your browser and is not sent to or stored on servers operated by the Zentip developer. Ticket data, notification history, your subdomain, and webhook URLs are kept in local extension storage. Some non-secret preferences may be stored in Chrome's synced extension storage and follow your Chrome profile when browser sync is enabled. Webhook URLs are not placed in synced storage or included in a settings export.

The legal basis for processing this information is providing the functionality you request under the Zentip contract. Where you use Zentip through an organization, that organization is responsible for ensuring that your use of Zendesk information is authorized.

## Browser permissions

Zentip requests the following browser permissions for its single purpose of monitoring authorized Zendesk activity and notifying the user:

- **Notifications** to display ticket alerts
- **Storage** to retain settings, access state, ticket cache, and notification history
- **Alarms** to schedule the checks requested by the user
- **Offscreen access** to play the selected notification sound
- **Zendesk site access** to request data from the configured `*.zendesk.com` account
- **ExtensionPay site access** to start and verify trials or subscriptions

Access to supported Slack, Microsoft Teams, or Discord webhook hosts is optional. Chrome asks for that site access only when you enable a webhook and provide a supported URL.

## Optional webhook integration

If you enable webhook integration, Zentip sends matching notification information directly from your browser to the Slack, Microsoft Teams, or Discord webhook URL you configure. Depending on your Hide Details setting, the alert can include a ticket ID, subject, status, link, message excerpt, requester or assignee names, and brand. You choose and control that destination. The Zentip developer does not receive the webhook content and is not responsible for how your selected webhook provider handles it.

The extension shows this disclosure before webhook setup. Enabling the feature is your instruction to make the transfer. You are responsible for having a lawful basis and authorization to send ticket information to the selected destination.

## Trials, subscriptions, and payments

Zentip uses [ExtensionPay](https://extensionpay.com/) to manage free trials, subscription status, account activation, and cancellations. ExtensionPay communicates with its servers to provide these features.

When you purchase or activate paid access, ExtensionPay may process your email address, trial or payment status, plan, and relevant subscription dates. Zentip can access the account information needed to show and verify your access. The operator may also use relevant account and transaction records when providing billing support, processing refunds, preventing abuse, or meeting accounting and legal obligations.

Stripe processes payment details. Zentip does not receive or store your full payment-card number.

The legal bases for this processing are performing the subscription contract, complying with applicable accounting or legal obligations, and legitimate interests in preventing abuse and resolving billing or support issues.

ExtensionPay and Stripe process information under their own privacy practices. Review [ExtensionPay's privacy information](https://extensionpay.com/#faq) and [Stripe's Privacy Policy](https://stripe.com/privacy) for details.

## Zentip website

The Zentip website does not use Zentip-operated analytics, advertising trackers, or marketing cookies.

The website is hosted by GitHub Pages. GitHub may process technical request information such as your IP address, browser details, requested page, and request time to deliver and secure the website. See the [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Contacting support

If you use the website contact form, the name, email address, subject, and message you provide are processed by [Static Forms](https://www.staticforms.dev/privacy-policy) and delivered to the Zentip support inbox. Static Forms also applies spam filtering and stores submitted information according to the retention period for Zentip's plan. You can instead contact support directly by email.

This information is used to respond to your request, provide support, maintain the security and reliability of Zentip, and establish or defend legal claims when necessary. The legal bases are taking steps at your request, performing the Zentip contract, and legitimate interests in providing support and protecting the service.

Do not include passwords, full payment-card details, webhook URLs, or private Zendesk ticket content in a support request.

## Recipients and international processing

Depending on how you use Zentip, information may be processed by:

- ExtensionPay for trials, subscription access, and account activation
- Stripe for payment processing
- GitHub for website hosting
- Static Forms and the email provider for contact and support messages
- A webhook provider selected and configured by you
- Professional advisers or public authorities where reasonably necessary or legally required

Some providers may process information outside Cyprus or the European Economic Area. Their privacy notices explain the locations and safeguards they use for international processing.

Zentip does not sell personal information.

## Retention

- Local extension settings and webhook URLs remain in your browser until you clear or replace them, reset or uninstall Zentip, or the browser removes them.
- Cached tickets and notification history remain until you clear them, the configured retention or clear-on-close rule applies, Zendesk access is lost and the cache is reduced, you uninstall Zentip, or the browser removes them.
- Synced non-secret preferences remain subject to your Chrome sync settings and may need to be cleared from other synced profiles separately.
- Static Forms currently retains form-submission records for 30 days on its Free plan. Copies delivered to the support inbox and subsequent support correspondence are normally retained for up to 24 months after the last interaction, unless needed longer for an active issue, security, legal claims, or a legal obligation.
- Subscription and transaction records are retained for as long as reasonably needed to provide access, process refunds, prevent abuse, and satisfy accounting or legal requirements.
- Third-party providers apply their own retention periods to information they control.

Information may be deleted or anonymized earlier when it is no longer needed.

## Your rights

Depending on the applicable law, you may have rights to:

- Request access to your personal information
- Correct inaccurate or incomplete information
- Request deletion or restriction of processing
- Object to processing based on legitimate interests
- Receive certain information in a portable format
- Withdraw consent where processing relies on consent
- Lodge a complaint with a data-protection authority

Send a request to [support@zentip.org](mailto:support@zentip.org). Limited information may be requested to verify your identity before completing a request.

If you are in Cyprus, you may contact the [Office of the Commissioner for Personal Data Protection](https://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/contact_en/contact_en). If you live elsewhere in the EEA, you may also contact your local supervisory authority.

## Children

Zentip is not intended for purchase or use by anyone under 18.

## Automated decision-making

Zentip does not use personal information for advertising profiles or automated decisions that produce legal or similarly significant effects.

## Third-party services

Your use of Zendesk and other third-party services remains subject to their own terms and privacy practices. Zentip does not control how Zendesk, ExtensionPay, Stripe, GitHub, Static Forms, your email provider, or a webhook provider processes information through its own services.

## Changes to this policy

This Privacy Policy may be updated when Zentip's features, providers, or applicable requirements change. The date at the top of this page shows when it was last revised. Material changes will be communicated through the website, extension, or email when appropriate.

## Contact

For privacy questions or requests, contact:

**Neophytos Gregoriou, trading as Zentip**

Cyprus

[support@zentip.org](mailto:support@zentip.org)
