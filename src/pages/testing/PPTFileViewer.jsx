import React from 'react';
// import PPTView from 'react-native-view-ppt';

const PPTViewer = ({ blobData }) => {
    const [filePath, setFilePath] = React.useState(null);

    //   React.useEffect(() => {
    //     if (blobData) {
    //       const filePath = `${FileSystem.documentDirectory}ppt_file.ppt`;
    //       FileSystem.writeAsStringAsync(filePath, blobData, {
    //         encoding: FileSystem.EncodingType.UTF8,
    //       }).then(() => {
    //         setFilePath(filePath);
    //       });
    //     }
    //   }, [blobData]);

    return (
        <iframe
            title="PPT Viewer"
            src={blobData}
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
        />
    );

};

export default PPTViewer;