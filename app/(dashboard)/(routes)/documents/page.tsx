import NextcloudIframe from './_components/nextcloud-iframe';


const DocumentsPage = () => {
    return (
        <div>
          <NextcloudIframe src="https://nextcloud.matthiasdev.com" width="100%" height="800px" />
    </div>
    );
}
 
export default DocumentsPage;