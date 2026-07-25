# Zentip remaining launch checklist

Last reviewed: July 25, 2026

This checklist covers the Chrome extension, website, payments, privacy, and Chrome Web Store submission. A checked item should mean it has been verified against the exact production build, not only implemented in source.

## Before uploading to the Chrome Web Store

- [ ] Bump the extension version for the release and run `package-webstore.ps1` from the extension repository.
- [ ] Load the generated ZIP as an unpacked extension in a clean Chrome profile and confirm there are no install, CSP, or permission errors.
- [ ] Test on Chrome 109 and the current stable Chrome release, or raise `minimum_chrome_version` if older-version testing fails.
- [ ] Test connect, disconnect, session expiry, and loss of Zendesk access using a dedicated test Zendesk account with fictional data.
- [ ] Test requested, followed, CC'd, assigned, imported Zendesk views, and custom ticket-ID views.
- [ ] Test desktop notifications, sound playback, notification history, quiet hours, badge settings, cache clearing, reset, and browser restart.
- [ ] Confirm Windows “Show notification banners” instructions still match the current Windows and Chrome behavior.
- [ ] Test the 7-day trial, sign-in, monthly purchase, annual purchase, renewal state, cancellation, expired access, past-due access, and refund workflow through ExtensionPay/Stripe test or approved production flows.
- [ ] Test Slack, Microsoft Teams channel, Microsoft Teams chat, and Discord webhooks. Confirm Chrome requests only the relevant optional host and that denial leaves the integration disabled.
- [ ] Verify Hide Details omits the message excerpt, requester, assignee, and brand from every provider.
- [ ] Confirm webhook URLs stay only in local extension storage, are removed by Reset Settings/uninstall, and never appear in settings exports or console logs.
- [ ] Search the final package for secrets, real ticket data, real webhook URLs, private email addresses, debug helpers, `eval`, `new Function`, remote scripts, source maps, and obsolete archives.
- [ ] Manually review all Zendesk-derived HTML and links with malicious test values to confirm scripts, event attributes, unsafe URLs, and unexpected markup are removed.
- [ ] Confirm the package contains only runtime files. Do not upload old `zentip.zip`, `zentip.7z`, design files, screenshots, private documentation, or repository metadata.

## Chrome Web Store account and policy declarations

- [ ] Register the Chrome Web Store developer account, pay the one-time registration fee, and enable two-step verification on the Google account.
- [ ] Complete identity and contact verification.
- [ ] Decide and declare the correct trader status. Because Zentip is sold commercially, treat trader status as a launch blocker until the Chrome Web Store flow or qualified Cyprus/EU advice confirms the correct declaration.
- [ ] Resolve the public-contact/address issue before offering to EU consumers. Google may require verified trader contact information to be displayed; do not enter false information or silently substitute a home address you do not want published.
- [ ] Accept the current Chrome Web Store Developer Agreement and re-read the Program Policies immediately before submission.
- [ ] Copy and verify the listing draft in the extension repository at `docs/chrome-web-store-listing.md`.
- [ ] In Privacy Practices, enter the single purpose and a specific justification for every permission and host permission.
- [ ] Declare the relevant data categories: personally identifiable information, personal communications, user-generated or website content, subscription/payment metadata, and any authentication category required by Google's exact wording.
- [ ] Declare that data is used only for product functionality, subscription/account handling, security/abuse prevention where applicable, and user-requested support.
- [ ] Certify Limited Use only after confirming the final extension and Privacy Policy match the certification.
- [ ] Answer **No** to remote code only after verifying the final ZIP contains no remotely executed JavaScript or WebAssembly.
- [ ] Confirm the store listing clearly states the 7-day trial and that a paid subscription is required afterward.
- [ ] Add the production homepage, support, documentation, Privacy Policy, Terms, and refund URLs.
- [ ] Upload 1–5 compliant screenshots with fictional data. Add a promotional tile only if it meets Google's current dimensions and branding rules.
- [ ] Submit with time for review and possible follow-up. Chrome Web Store review times can vary and policy enforcement surges can lengthen queues.

Official references:

- [Chrome Web Store Program Policies](https://developer.chrome.com/docs/webstore/program-policies/policies)
- [Minimum permissions policy](https://developer.chrome.com/docs/webstore/program-policies/permissions/)
- [Privacy fields and permission justifications](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [User data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq)
- [Prepare your extension](https://developer.chrome.com/docs/webstore/prepare)
- [Best practices for store listings](https://developer.chrome.com/docs/webstore/best-listing)
- [Trader disclosure](https://developer.chrome.com/docs/webstore/program-policies/trader-disclosure)
- [Chrome Web Store terms](https://developer.chrome.com/docs/webstore/program-policies/terms)

## Website and public policies

- [ ] Deploy the current website build and confirm `https://zentip.org` serves the new version over HTTPS.
- [ ] Verify `/privacy`, `/terms`, `/refund-policy`, `/pricing`, `/documentation`, `/faq`, and `/contact` on the production domain.
- [ ] Confirm the footer exposes Privacy, Terms, refund, documentation, and contact links from every page.
- [ ] Submit the contact form from production and verify delivery, reply-to behavior, spam handling, and the success/error states.
- [ ] Recheck every price, trial statement, renewal statement, cancellation instruction, and refund statement against the production ExtensionPay/Stripe configuration.
- [ ] Confirm the privacy disclosures match the final extension storage keys, permissions, providers, and webhook payloads.
- [ ] Add a security-reporting instruction or alias, even if it initially routes to `support@zentip.org`.
- [ ] Verify sitemap, robots file, canonical URLs, social cards, favicon, mobile menu, light/dark mode, and 404 page in production.
- [ ] Add the blog when useful; it is not required for Chrome Web Store launch.

## Business and legal follow-up

- [ ] Ask a qualified Cyprus accountant or the Social Insurance Services whether selling Zentip requires separate self-employed registration despite current employment, and what social-insurance reporting applies.
- [ ] Ask a qualified Cyprus tax adviser about income reporting, VAT registration thresholds, EU VAT/OSS, invoices, and record retention for monthly and annual subscriptions.
- [ ] Decide what lawful business/contact address can be used where a marketplace or consumer law requires one. Do not publish a home address without understanding the consequences.
- [ ] Confirm whether the 14-day refund/withdrawal wording and immediate digital-service access flow meet the consumer rules applicable to each market.
- [ ] Maintain records of subscriptions, cancellations, refunds, policy versions, and material customer communications for the periods advised by the accountant or lawyer.
- [ ] Ensure employer agreements, confidentiality duties, and intellectual-property clauses do not conflict with operating Zentip.

## Post-launch operations

- [ ] Monitor `support@zentip.org`, Formspree, ExtensionPay, Stripe, and Chrome Web Store notices.
- [ ] Create a repeatable release process: version bump, changelog, static checks, clean-profile test, package, policy diff, upload, and rollback notes.
- [ ] Track Zendesk API changes, Chrome extension API changes, Teams Workflow URL changes, ExtensionPay changes, and Chrome Web Store policy updates.
- [ ] Establish a vulnerability-response process and a target time for acknowledging security reports.
- [ ] Add privacy-preserving error reporting only if needed, with a separate disclosure and opt-in where required.
- [ ] Review pricing, taxes, refund handling, and customer-support capacity after launch.

## Current implementation notes

- The broad `tabs` permission and unnecessary web-accessible sound declaration have been removed.
- Desktop notifications, storage, alarms, offscreen audio, Zendesk access, and ExtensionPay access remain because active features use them.
- Webhook hosts are optional and requested only after the user enables a supported integration.
- Extension pages use an explicit self-only script Content Security Policy.
- Zendesk-authored ticket/comment markup is sanitized before display, and ticket data has been removed from active debug logging.
- Webhook URLs are migrated out of synced settings and kept in local extension storage.
- The website now discloses the paid trial model, permissions, local processing, optional webhook transfer, Limited Use commitment, and seller identity.

These changes materially improve the submission, but only Google can determine whether a particular build is accepted. The final dashboard answers and uploaded ZIP must remain consistent with the code and policies.
