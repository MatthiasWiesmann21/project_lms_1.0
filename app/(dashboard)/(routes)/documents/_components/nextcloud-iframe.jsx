import React from 'react';

const NextcloudIframe = ({ src, width, height }) => {
  async function fetchNextcloudFolderContents(baseUrl, username, password, folderPath) {
    const url = new URL(folderPath, baseUrl + '/remote.php/dav/files/' + username + '/');
    const response = await fetch(url, {
      method: 'PROPFIND',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/xml; charset=utf-8',
      }),
      body: '<?xml version="1.0"?>' +
            '<d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns">' +
            '<d:prop>' +
            '<d:getlastmodified />' +
            '<d:getetag />' +
            '<d:getcontenttype />' +
            '<d:resourcetype />' +
            '<oc:fileid />' +
            '<oc:permissions />' +
            '<oc:size />' +
            '</d:prop>' +
            '</d:propfind>',
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.text();
  }
  
  // Verwenden Sie diese Funktion, um den Inhalt eines Nextcloud-Ordners abzurufen.
  // Ersetzen Sie die Werte von baseUrl, username, password und folderPath entsprechend.
  fetchNextcloudFolderContents(
    'https://nextcloud.matthiasdev.com/index.php/s/TbjxbKHGFJNT3sY',
    'MatthiasDev',
    'Virus1232119ti',
    '/path/to/your/folder/'
  ).then(contents => {
    console.log(contents); // Hier würden Sie die Antwort verarbeiten
  }).catch(error => {
    console.error('Es gab einen Fehler beim Abrufen der Ordnerinhalte: ', error);
  });
  
  return (
    <iframe
      src={src}
      width={width || "100%"}
      height={height || "600px"}
      allowFullScreen
      style={{ border: "none", overflow: "hidden" }}
    >
    </iframe>
  );
};

export default NextcloudIframe;
