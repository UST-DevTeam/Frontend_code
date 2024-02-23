import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { backendassetUrl } from '../../utils/url';
import UiTopBar from '../../components/UiTopBar';
import FileViewer from '../../components/FileViewer';
import CommonActions from '../../store/actions/common-actions';
import { useDispatch } from 'react-redux';
import UiBottomBar from '../../components/UiBottomBar';

const ViewPitchDeck = () => {
    const { pitchId } = useParams()
    const dispatch = useDispatch()
    // const docs = [
    //     { uri:  }
    // ];
    const file = backendassetUrl + "/View/PitchDeck/Asset/" + "65cb55084c4475f018bbe3e9";
    const type = 'ppt';
    dispatch(CommonActions.commondownload("https://www.clickdimensions.com/links/TestPDFfile.pdf","testing.pptx"))
    return (
        <div className='w-full h-full'>
            <div className='h-[8vh]'>
                <UiTopBar />
            </div>
            <div className='h-[84vh]'>
                <FileViewer url={file} ftype={type} />
            </div>
            <div className='h-[8vh]'>
                <UiBottomBar/>
            </div>
        </div>
    );
    return <DocViewer documents={docs} />;
};
export default ViewPitchDeck;

