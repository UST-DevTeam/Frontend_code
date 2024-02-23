// import React, { useState } from 'react';

import { useEffect, useState } from "react";
import PPTViewer from "./PPTFileViewer";

// const FileViewer = ({ blobData }) => {
//   const [fileURL, setFileURL] = useState('');

//   // When component mounts, generate URL for the blob data
//   React.useEffect(() => {
//     if (blobData) {
//       const url = URL.createObjectURL(blobData);
//       setFileURL(url);
//     }
//     // Clean up URL when component unmounts
//     return () => {
//       if (fileURL) {
//         URL.revokeObjectURL(fileURL);
//       }
//     };
//   }, [blobData]);

//   // Render different types of files based on their MIME type
//   const renderFile = () => {
//     if (fileURL) {
//       if (blobData.type.includes('image')) {
//         return <img src={fileURL} alt="File" />;
//       } else if (blobData.type.includes('pdf')) {
//         return <embed src={fileURL} type="application/pdf" width="100%" height="600px" />;
//       } else {
//         return <a href={fileURL} download>Download File</a>;
//       }
//     } else {
//       return <div>No file to display</div>;
//     }
//   };

//   return (
//     <div className="file-viewer">
//       {renderFile()}
//     </div>
//   );
// };

// export default FileViewer;



// import React, { useState, useEffect } from 'react';
// import PPTFileViewer from './PPTFileViewer';

// const MyComponent = () => {
//   const [pptBlob, setPPTBlob] = useState(null);

//   useEffect(() => {
//     // Fetch your PPT blob data here
//     fetch('https://example.com/myfile.ppt')
//       .then(response => response.blob())
//       .then(blob => setPPTBlob(blob))
//       .catch(error => console.error('Error fetching PPT blob data:', error));
//   }, []);

//   return (
//     <div>
//       {pptBlob && <PPTFileViewer pptBlob={pptBlob} />}
//     </div>
//   );
// };

// export default MyComponent;




// ...

const FileViewer = () => {
    // ...

    const blobData = ""

    const [pptBlob, setPPTBlob] = useState(null);

    useEffect(() => {
        // Fetch your PPT blob data here
        fetch('http://10.5.50.198:8093/View/PitchDeck/Asset/65cb411f77da040683684770')
            .then(response => response.blob())
            .then(blob => setPPTBlob(blob))
            .catch(error => console.error('Error fetching PPT blob data:', error));
    }, []);


    return (
        <>
            <PPTViewer blobData={pptBlob} />
            {}

        </>
    );
};


export default FileViewer;
