(async () => {
  const notificationId = 'zentip-screenshot-ticket-4827389';

  // Clearing the previous demo lets Windows show the banner again on repeated runs.
  await chrome.notifications.clear(notificationId);

  const createdId = await chrome.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/icon128.png'),
    title: 'New Delivery Issues ticket #4827389',
    message:
      'My order says delivered, but there’s nothing outside my building. The delivery photo doesn’t look like my doorway.',
    requireInteraction: true,
    silent: true,
  });

  console.log(`Created Zentip screenshot notification: ${createdId}`);
})();
