# Zentip Ticket and View Tracking Test Plan

Use this checklist to verify what Zentip currently detects, what it misses, and what the intended behavior should be. Run one test at a time and record the result before changing the code.

## Result labels

Mark each test with one of these:

- `PASS` — Zentip behaved exactly as expected.
- `FAIL` — Zentip did not produce the expected result.
- `FALSE POSITIVE` — Zentip notified about something that should not generate that notification.
- `PARTIAL` — the screen updated, but the notification, cache, label, or view state was wrong.
- `BLOCKED` — the test could not be completed.

For every failure, record:

- The test number.
- The approximate time of the Zendesk action.
- The approximate time Zentip reacted.
- Whether the popup was open or closed.
- What appeared in the browser notification.
- What appeared in Zentip's notification center.
- What appeared in the affected Zentip tab.
- Any error shown in the extension service worker console.

## Test environment

### Accounts

Ideally, use:

1. **Agent A** — the Zendesk agent connected to Zentip.
2. **Agent B** — another Zendesk agent who can create assignments, replies, and internal notes.
3. **End user** — a test requester who can reply by email or through the Zendesk help center.

If Agent B is not available, the end-user account can still cover most reply tests. Do not use Agent A to simulate an external reply because Zentip intentionally ignores comments written by the connected user.

### Create a dedicated Zendesk test view

In Zendesk Admin Center:

1. Create a tag named `zentip_tracking_test`.
2. Create a view named **Zentip Tracking Test**.
3. Add the condition: ticket contains the tag `zentip_tracking_test`.
4. Exclude closed tickets if that matches the behavior of the production views.
5. Save the view.

In Zentip:

1. Add **Zentip Tracking Test** to the active tabs.
2. Also enable **Assigned**, **Requested**, **Followed**, and **CC'd** for their respective tests.
3. Set polling to the shortest normal interval available.
4. Temporarily disable quiet hours.
5. Ensure polling is not set to manual-only.
6. Enable browser notifications, notification sounds if desired, and the Windows notification banner for the test browser.
7. Keep Zendesk signed in.

### Create the baseline ticket

In Zendesk:

1. Create ticket `ZT-TRACK-BASELINE`.
2. Set the requester to the test end user.
3. Add the tag `zentip_tracking_test`.
4. Assign it to Agent A.
5. Add a public reply from Agent B or the end user.

In Zentip:

1. Open the extension.
2. Open **Zentip Tracking Test**.
3. Confirm that `ZT-TRACK-BASELINE` appears.
4. Wait for one complete polling interval.
5. Clear the Zentip notification center.
6. Close the popup before starting the first test.

The baseline fetch should not produce notifications for every existing ticket.

---

## A. Existing ticket reply tests

### A1. Public reply from the end user

Zendesk operation:

1. Open `ZT-TRACK-BASELINE`.
2. Send a new public reply from the test end-user account.
3. Do not change any other fields.

Expected Zentip behavior:

- One browser notification appears after the next poll.
- The notification identifies the correct ticket.
- The ticket appears once in the Zentip notification center.
- The author and latest-message information are correct.
- Clicking the browser notification opens the correct Zendesk ticket.

Current code prediction: **Should work**.

Result: `NOT RUN`

Notes:

### A2. Public reply from another agent

Zendesk operation:

1. Have Agent B post a public reply on `ZT-TRACK-BASELINE`.
2. Do not change any other fields.

Expected Zentip behavior:

- Zentip generates one update notification.
- The latest-message author is Agent B.

Current code prediction: **Should work**.

Result: `NOT RUN`

Notes:

### A3. Internal note from another agent

Zendesk operation:

1. Have Agent B add an internal note to `ZT-TRACK-BASELINE`.
2. Do not change any other fields.

Expected Zentip behavior:

- Zentip generates one update notification if internal notes are intended to count as ticket activity.
- The notification should identify the activity as an internal note, not a public reply.

Product decision required:

- Decide whether internal notes should notify by default.
- If they do, they should be distinguishable from public replies.

Current code prediction: **May notify, but will probably label it as a generic new reply/update**.

Result: `NOT RUN`

Notes:

### A4. Reply written by Agent A

Zendesk operation:

1. Using the same Agent A account connected to Zentip, post a public reply on `ZT-TRACK-BASELINE`.
2. Do not change any other fields.

Expected Zentip behavior:

- No browser notification.
- No new notification-center entry.
- The ticket row can still update when the view is refreshed.

Current code prediction: **Should work; self-authored comments are intentionally ignored**.

Result: `NOT RUN`

Notes:

---

## B. Ticket field update tests

These tests identify false “New reply” notifications caused by changes to `updated_at`.

Before each test, make sure the ticket's latest comment was written by Agent B or the end user. That exposes the current classification problem.

### B1. Status-only change

Zendesk operation:

1. Change only the status of `ZT-TRACK-BASELINE`.
2. Do not add a comment.

Desired behavior:

- If Zentip is meant to track all ticket changes, show **Ticket updated** and identify the status change.
- If Zentip is meant to track replies only, do not notify.
- It must not claim there is a new reply.

Current code prediction: **Possible false “New reply” notification**.

Result: `NOT RUN`

Notes:

### B2. Assignee-only change

Zendesk operation:

1. Change only the ticket assignee.
2. Do not add a comment.

Desired behavior:

- Notify only if assignment changes are an enabled event type.
- If notifying, say that the assignee changed.
- Do not call it a new reply.

Current code prediction: **Possible false “New reply” notification**.

Result: `NOT RUN`

Notes:

### B3. Tag-only change

Zendesk operation:

1. Add a harmless test tag other than `zentip_tracking_test`.
2. Do not add a comment.

Desired behavior:

- Do not notify unless field-change notifications are explicitly supported and enabled.
- Never label it as a reply.

Current code prediction: **Possible false “New reply” notification**.

Result: `NOT RUN`

Notes:

### B4. Priority-only change

Zendesk operation:

1. Change only the ticket priority.
2. Do not add a comment.

Desired behavior:

- If field updates are supported, identify the priority change.
- Otherwise, silently refresh the row.

Current code prediction: **Possible false “New reply” notification**.

Result: `NOT RUN`

Notes:

### B5. Field change after Agent A's own reply

Zendesk operation:

1. Have Agent A post the most recent reply.
2. After the baseline refresh, change only the priority or status.

Desired behavior:

- Follow the selected field-update policy.
- The outcome should not depend on who wrote an older comment.

Current code prediction: **Likely no notification because the stored latest comment belongs to Agent A**.

Result: `NOT RUN`

Notes:

---

## C. New ticket and role-view tests

Use a new, uniquely named ticket for every test.

### C1. New ticket enters a regular Zendesk view

Zendesk operation:

1. Create `ZT-TRACK-NEW-VIEW`.
2. Use the test end user as requester.
3. Leave it unassigned or assign it to Agent B.
4. Add `zentip_tracking_test` after the Zentip view already has a baseline.

Expected Zentip behavior:

- The ticket appears in **Zentip Tracking Test**.
- Zentip produces one new-ticket notification.

Current code prediction: **Should usually work when Agent A is not requester, submitter, or assignee**.

Result: `NOT RUN`

Notes:

### C2. New ticket is assigned to Agent A

Zendesk operation:

1. Create `ZT-TRACK-ASSIGNED`.
2. Use the test end user as requester.
3. Initially assign it to Agent B or leave it unassigned.
4. Wait until the existing views have completed a poll.
5. Assign the ticket to Agent A without adding a comment.

Expected Zentip behavior:

- The ticket appears in **Assigned**.
- Agent A receives a **Ticket assigned to you** notification.
- The notification opens the correct ticket.

Current code prediction: **Expected to fail**. New tickets are currently suppressed when Agent A is the assignee.

Result: `NOT RUN`

Notes:

### C3. Agent A is added as a CC

Zendesk operation:

1. Create `ZT-TRACK-CCD`.
2. Use the test end user as requester.
3. Add Agent A as a CC after the baseline poll.

Expected Zentip behavior:

- The ticket appears in **CC'd**.
- Zentip produces a relevant notification, provided CC membership changes are intended to notify.

Current code prediction: **Needs live confirmation**.

Result: `NOT RUN`

Notes:

### C4. Agent A follows a ticket

Zendesk operation:

1. Create `ZT-TRACK-FOLLOWED`.
2. Use the test end user as requester.
3. Have Agent A follow the ticket after the baseline poll.

Expected Zentip behavior:

- The ticket appears in **Followed**.
- Decide whether following a ticket itself should notify, or only later activity should notify.

Current code prediction: **Needs live confirmation**.

Result: `NOT RUN`

Notes:

### C5. Ticket requested by Agent A

Zendesk operation:

1. Create `ZT-TRACK-REQUESTED` with Agent A as requester.
2. Ensure the Requested view already has a baseline.

Expected Zentip behavior:

- The ticket appears in **Requested**.
- Normally, creation by Agent A should not notify Agent A.
- A later reply from another user should notify.

Current code prediction: **Creation is suppressed; a later external reply should work**.

Result: `NOT RUN`

Notes:

---

## D. View membership tests

### D1. Ticket leaves the dedicated view

Zendesk operation:

1. Confirm `ZT-TRACK-BASELINE` is visible in **Zentip Tracking Test**.
2. Remove the `zentip_tracking_test` tag.
3. Wait for a poll, then reopen or refresh the Zentip tab.

Expected Zentip behavior:

- The ticket disappears from the view.
- The background cache no longer treats it as a member of that view.
- No misleading reply notification is generated merely because it left.

Current code prediction: **The fresh screen may remove it, but the background polling cache is expected to retain stale membership**.

Result: `NOT RUN`

Notes:

### D2. Ticket leaves and later re-enters the view

Zendesk operation:

1. Remove `zentip_tracking_test`.
2. Wait for a complete poll.
3. Add `zentip_tracking_test` again without adding a comment.

Expected Zentip behavior:

- The ticket reappears.
- Membership is handled consistently.
- It should not be described as a new reply.

Current code prediction: **May not be recognized as newly entering because the old cached ticket is retained**.

Result: `NOT RUN`

Notes:

### D3. Ticket is solved or closed

Zendesk operation:

1. Use a ticket visible in Assigned or the dedicated view.
2. Change it to solved.
3. If necessary, later close it.

Expected Zentip behavior:

- It disappears from views whose conditions exclude solved or closed tickets.
- It is removed from the background membership cache.
- The UI should not show a stale entry after refresh.

Current code prediction: **Background cache is expected to retain the ticket**.

Result: `NOT RUN`

Notes:

---

## E. Zendesk view-definition tests

### E1. Rename the Zendesk view

Zendesk operation:

1. Rename **Zentip Tracking Test** to **Zentip Tracking Test Renamed**.
2. Wait for a poll.
3. Close and reopen Zentip.
4. Open the view selector.

Expected Zentip behavior:

- Zentip eventually shows the new name.
- The active tab remains connected to the same Zendesk view ID.

Current code prediction: **The polling loop does not refresh view metadata; the old name may remain until views are explicitly fetched again**.

Result: `NOT RUN`

Notes:

### E2. Change the view condition

Zendesk operation:

1. Change the dedicated view condition to use a second test tag.
2. Add that tag to one test ticket.
3. Remove it from another.

Expected Zentip behavior:

- The next ticket query uses the new server-side view conditions automatically.
- Current results reconcile with the new membership.

Current code prediction: **New matching tickets can be returned, but removed tickets are expected to remain in the background cache**.

Result: `NOT RUN`

Notes:

### E3. Delete an active Zendesk view

Zendesk operation:

1. Only after completing the other tests, delete the dedicated test view.
2. Wait for a poll.
3. Reopen Zentip and inspect the active tabs and view selector.

Expected Zentip behavior:

- Zentip handles the missing view without marking the entire Zendesk connection as broken.
- The deleted view is removed or clearly marked unavailable.
- Other active views continue polling.

Current code prediction: **The deleted active view can fail, while other views should continue; automatic removal is not implemented**.

Result: `NOT RUN`

Notes:

---

## F. Polling-control tests

### F1. Automatic polling with the popup closed

Zendesk operation:

1. Close the Zentip popup.
2. Have the end user reply to a baseline ticket.
3. Wait at least one configured polling interval.

Expected Zentip behavior:

- A browser notification appears without opening Zentip.

Current code prediction: **Should work while Zendesk authentication and paid/trial access remain valid**.

Result: `NOT RUN`

Notes:

### F2. Manual refresh

Zentip operation:

1. Set polling to manual-only, or make a Zendesk change immediately after a poll.
2. Click Zentip's refresh control.
3. Observe the tab, notification center, and service worker storage.

Expected Zentip behavior:

- Every active view refreshes.
- The background cache is persisted.
- The refresh is reported as successful.

Current code prediction: **Expected partial/failure**. `pollSingleView()` expects a result object, but `processView()` returns a boolean.

Result: `NOT RUN`

Notes:

### F3. Manual-only mode

Zendesk operation:

1. Enable manual-only polling in Zentip.
2. Have the end user reply.
3. Wait longer than the usual automatic interval.
4. Trigger a manual refresh.

Expected Zentip behavior:

- No notification arrives before manual refresh.
- The update appears after manual refresh.

Current code prediction: **Automatic suppression should work; manual-refresh persistence may expose the F2 bug**.

Result: `NOT RUN`

Notes:

### F4. Quiet hours

Zentip operation:

1. Configure quiet hours to include the current time.
2. Have the end user reply.
3. Wait longer than one polling interval.
4. End quiet hours or temporarily change the time range.

Expected Zentip behavior:

- Polling is skipped during quiet hours.
- The update is detected after polling resumes.
- It does not create duplicate entries.

Current code prediction: **Should work, but needs live confirmation**.

Result: `NOT RUN`

Notes:

---

## G. Notification consistency tests

### G1. One ticket belongs to multiple active views

Zendesk operation:

1. Make one ticket belong to **Assigned** and **Zentip Tracking Test**.
2. Have the end user reply.

Expected Zentip behavior:

- Preferably, one system notification appears.
- The notification center should not contain confusing duplicate entries.
- If entries are intentionally grouped per view, they should clearly represent the same ticket.

Current code prediction: **The notification center may add the ticket separately under each view; browser notifications with the same ticket ID may replace each other**.

Result: `NOT RUN`

Notes:

### G2. Four or more tickets update in one view

Zendesk operation:

1. Prepare at least four baseline tickets in the dedicated view.
2. Have another user reply to all of them before the next poll.

Expected Zentip behavior:

- One grouped browser notification appears.
- Clicking it opens Zentip's notification center filtered to the relevant view.
- All updated tickets appear in the notification center.

Current code prediction: **Should work**.

Result: `NOT RUN`

Notes:

### G3. Ticket without accessible brand metadata

Only run this if the Zendesk account supports multiple brands or a ticket can be created without normal brand data.

Zendesk operation:

1. Create or locate a ticket whose brand is missing, deleted, or unavailable to the current user.
2. Put it in the dedicated view and update it.

Expected Zentip behavior:

- Zentip uses `Unknown Brand` or no logo.
- Polling for the rest of the view continues.

Current code prediction: **May throw while enriching the ticket and abort that view's poll**.

Result: `NOT RUN`

Notes:

---

## Recommended execution order

Run and fix the tests in this order:

1. `A1` — prove the core external-reply path.
2. `C2` — newly assigned ticket suppression.
3. `F2` — manual single-view refresh.
4. `B1`, `B2`, `B3`, and `B5` — separate replies from field changes.
5. `D1`, `D2`, and `D3` — reconcile view membership.
6. `E1`, `E2`, and `E3` — view metadata and lifecycle.
7. `C3`, `C4`, and `C5` — role-view behavior.
8. `G1` and `G2` — duplicate and grouped notifications.
9. `F3` and `F4` — polling controls.
10. `G3` — metadata resilience.

After fixing a failure:

1. Re-run that test.
2. Re-run `A1` to ensure normal reply notifications still work.
3. Re-run any earlier test that exercises the same code path.
4. Record the extension version or commit used for the successful result.

## Final acceptance criteria

Ticket and view tracking can be considered reliable when:

- External replies are detected once and attributed correctly.
- Self-authored replies do not notify the author.
- Assignment changes are detected and described accurately.
- Field-only changes never masquerade as new replies.
- Tickets entering and leaving views are reconciled.
- Renamed, changed, or deleted Zendesk views are handled safely.
- Automatic and manual polling persist the same state.
- Quiet hours and manual-only mode behave predictably.
- Overlapping views do not create confusing duplicates.
- One malformed ticket cannot stop polling for the rest of a view.
