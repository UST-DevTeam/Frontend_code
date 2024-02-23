import React from 'react';
import FileViewer from './FileViewer';
import PDFViewer from '../../components/FileViewer/PDFViewer';
import { useDispatch, useSelector } from 'react-redux';
import CommonActions from '../../store/actions/common-actions';
import { backendassetUrl } from '../../utils/url';
const BlobFileViewer = () => {
    const [blobData, setBlobData] = React.useState(null);

    let fileblob=useSelector((state) => {
        console.log(state, "statestatestate")
        return state?.component?.setfileblob
    })

    // Fetch blob data (example)
    //   React.useEffect(() => {
    //     // Fetch your blob data here, for example:
    //     fetch('http://10.5.50.198:8093/View/PitchDeck/Asset/65cb411f77da040683684770')
    //       .then(response => console.log(response.body,"response.data"))
    //     //   .then(blob => setBlobData(res.data))
    //     //   .catch(error => console.error('Error fetching blob data:', error));
    //   }, []);



    const dispatch = useDispatch()

    // const docs = [
    //     { uri:  }
    // ];

    const file = backendassetUrl + "/View/PitchDeck/Asset/" + "65cb55084c4475f018bbe3e9";
    const type = 'ppt';

    // dispatch(CommonActions.commondownload(file, "testing.pptx"))

    return (
        <div>
            <h1>File Viewer</h1>
            <PDFViewer />

            
        </div>
    );
};

export default BlobFileViewer;